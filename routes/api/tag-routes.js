const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all products from the product model and include the category name
router.get('/', (req, res) => {
  // find all categories
  Tag.findAll({
    attributes: [
      'id', 'tag_name'
    ],
    // include the product table data. 
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ]
  })
  // then send a response as json
.then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Tags found' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// get one tag from the Tag model and include all collumns from Product model
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne( {
    where:{
      id:req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ]
  })
  // then send a response as json
.then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Tags found' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Post a new tag to the Tag model
router.post('/', (req, res) => {
  // create a new tag
});


// UPDATE an  existing tag in the Tag model
router.put('/:id', (req, res) => {
  // update a category by its `id` value
});



// DELETE an existing tag in the Tag model
router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
