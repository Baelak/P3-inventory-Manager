const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET ALL CATEGORIES
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product], // Include associated products
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories 😅', error: err });
  }
});

// GET ONE CATEGORY BY ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product], // Include associated products
    });

    if (!category) {
      return res.status(404).json({ message: 'No category found with this id 🤭' });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching category 😅', error: err });
  }
});

// POST A NEW CATEGORY
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ message: 'Category has been created 😄', category });
  } catch (err) {
    res.status(400).json({ message: 'Error creating category 😅', error: err });
  }
});

// UPDATE A CATEGORY
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.update(req.body, { where: { id: req.params.id } });

    if (!updated[0]) {
      return res.status(404).json({ message: 'No category found with this id 🤭' });
    }

    res.status(200).json({ message: 'Category has been updated 😄' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating category 😅', error: err });
  }
});

// DELETE A CATEGORY
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ message: 'No category found with this id 🤭' });
    }

    res.status(200).json({ message: 'Category deleted ☠️' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category 😅', error: err });
  }
});

module.exports = router;
