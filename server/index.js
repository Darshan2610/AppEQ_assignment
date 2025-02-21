const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Read data from JSON file
const readData = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { users: [] };
  }
};

// Writing data to JSON file
const writeData = async (data) => {
  try {
    await fs.writeFile(
      path.join(__dirname, 'data', 'users.json'),
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

// API Routes
app.get('/api/users', async (req, res) => {
  const data = await readData();
  res.json(data.users);
});

app.get('/api/metrics', async (req, res) => {
  const data = await readData();
  const metrics = calculateMetrics(data.users);
  res.json(metrics);
});

app.get('/api/insights', async (req, res) => {
  const data = await readData();
  const insights = generateInsights(data.users);
  res.json(insights);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 