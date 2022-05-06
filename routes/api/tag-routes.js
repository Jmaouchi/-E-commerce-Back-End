const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

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

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
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

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then(data => {
    // if the id provided is not available in the database, then send a message back, (No user found with this id), else send the data as json format
    if (!data) {
      res.status(404).json({ message: 'No tags found with this id' });
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

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then(data => {
    // if the id provided is not available in the database, then send a message back, (No user found with this id), else send the data as json format
    if (!data) {
      res.status(404).json({ message: 'No tags found with this id' });
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

module.exports = router;
