const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

// api route that will get all the categories from the Category model 
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      'id',
      'category_name'
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
  .then(data => res.json(data))
  // catch if there is any errors caused by the server, if so send a 500 server error 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


// api route that will get one categorie from the Category model
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    // find one collumn from the category table, where the id of that collumn is equal to the user req ID  
    where: {
      id: req.params.id,
    },

    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(data => {
    // if the id provided is not available in the database, then send a message back, (No user found with this id), else send the data as json format
    if (!data) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(data);
  })
  // catch if there is any errors caused by the server, if so send a 500 server error 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});


// api route that will post a new categorie to the Category model
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then(dbCateData => res.json(dbCateData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// api route that will update an existing categorie in the Category model
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then(data => {
    // if the id provided is not available in the database, then send a message back, (No user found with this id), else send the data as json format
    if (!data) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(data);
  })
  // catch if there is any errors caused by the server, if so send a 500 server error 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



// api route that will delete one categorie from the Category model
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id:req.params.id,
    },
  })
  .then(data => {
    if(!data){
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(data)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});



//export the model
module.exports = router;
