const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET ALL TAGS
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Uh oh! That did not work 😅', error: err });
  }
});

// GET ONE TAG BY ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    
    if (!tag) {
      return res.status(404).json({ message: 'No tag found with this id 🤭' });
    }
    
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ message: 'Uh oh! That did not work 😅', error: err });
  }
});

// POST CREATE A NEW TAG
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json({ message: 'Tag has been created 😄', tag });
  } catch (err) {
    res.status(400).json({ message: 'Error creating tag 😅', error: err });
  }
});

// PUT UPDATE A TAG BY ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Tag.update(req.body, { where: { id: req.params.id } });

    if (!updated[0]) {
      return res.status(404).json({ message: 'No tag found with this id 🤭' });
    }

    res.status(200).json({ message: 'Tag has been updated 😄' });
  } catch (err) {
    res.status(400).json({ message: 'Error updating tag 😅', error: err });
  }
});

// DELETE A TAG
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ message: 'No tag found with this id 🤭' });
    }

    res.status(200).json({ message: 'Tag Deleted ☠️' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting tag 😅', error: err });
  }
});

module.exports = router;
