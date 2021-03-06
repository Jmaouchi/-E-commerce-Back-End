const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products from the product model and include the category name
router.get('/', (req, res) => {
  // find all categories
  Product.findAll({
    attributes: [
      'id', 'product_name', 'price', 'stock', 'category_id'
    ],
    // include the product table data. 
    include: [
      {
        model: Category,
        attributes: ['category_name'],
      },

      {
        model: Tag,
        attributes: ['tag_name'],
      }
    ]
  })
  // then send a response as json
.then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Product found' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product from the product model and include the category name, when the category.id is equal to the product.id (that is in the categroy model)
// and name that collumn category_id
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 'product_name', 'price', 'stock', 'category_id'
    ],
    include: [

      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes:['id', 'tag_name'], 
        through: ProductTag,  
      },

    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Product found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product 
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        //When you need to insert multiple rows to your SQL database table, you can use the Sequelize bulkCreate() method.
        // The bulkCreate() method allows you to insert multiple records to your database table with a single function call
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


// Delete a product
router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id:req.params.id,
    },
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No Product found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
