const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');

// Create a new bug
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const bug = new Bug({ title, description });
    await bug.save();
    res.status(201).json(bug);
  } catch (error) {
    console.error('POST /bugs failed:', error); // 🔍 log it
    next(error); // ✅ let middleware handle it
  }
});

// Get all bugs
router.get('/', async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (error) {
    console.error('GET /bugs failed:', error);
    next(error);
  }
});

// Update bug status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    console.log('PATCH request received:', req.params.id, status); // 👈 Add this
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (error) {
    console.error('Failed to update bug:', error); // 👈 Add this too
    res.status(500).json({ message: 'Failed to update bug', error });
  }
});

// Delete a bug
router.delete('/:id', async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (error) {
    console.error(`DELETE /bugs/${req.params.id} failed:`, error);
    next(error);
  }
});

module.exports = router;
