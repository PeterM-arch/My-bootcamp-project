console.log("SERVER IS AWAKE");
console.log("=================== SERVER IS AWAKE! ===================");
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// ==========================================
// DB MODEL & SYNC (With Validations)
// ==========================================
const Brew = sequelize.define('Brew', {
  title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  method: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  coffeeGrams: { type: DataTypes.INTEGER, allowNull: false },
  waterGrams: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  tastingNotes: { type: DataTypes.TEXT, allowNull: true }
});

// Sync Database tables
sequelize.sync()
  .then(() => console.log("Database & SQLite tables ready."))
  .catch(err => console.error("Database sync failed:", err));

// ==========================================
// CRUD ENDPOINTS (JSON API with Status Codes)
// ==========================================

// 1. READ ALL (Get Log History)
app.get('/api/brews', async (req, res) => {
  try {
    const history = await Brew.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch brew log history" });
  }
});

// 2. CREATE (Add new brew)
app.post('/api/brews', async (req, res) => {
  try {
    const { title, method, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;
    if (!title || !method || !coffeeGrams || !waterGrams || !rating) {
      return res.status(400).json({ error: "All required fields must be supplied before saving." });
    }
    const newBrew = await Brew.create({ title, method, coffeeGrams, waterGrams, rating, tastingNotes });
    return res.status(201).json(newBrew);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 3. UPDATE (Edit an existing brew entry)
app.put('/api/brews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, method, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;
    const brew = await Brew.findByPk(id);
    if (!brew) return res.status(404).json({ error: "Brew log entry not found" });

    await brew.update({ title, method, coffeeGrams, waterGrams, rating, tastingNotes });
    return res.status(200).json(brew);
  } catch (error) {
     return res.status(400).json({ error: error.message });
   }
 });

// 4. DELETE (Remove entry)
app.delete('/api/brews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const brew = await Brew.findByPk(id);
    if (!brew) return res.status(404).json({ error: "Brew log entry not found" });

    await brew.destroy();
    return res.status(204).send(); 
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete item" });
  }
});

// ==========================================
// ENVIRONMENT INTERACTION & LISTENER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`==================== SERVER IS AWAKE! ====================`);
  console.log(`Running in backend context on port ${PORT}`);
});

