const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  host: 'redis',
  port: 6379
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

app.use(express.json());

// Create a new item
app.post('/items', (req, res) => {
  const { id, name } = req.body;

  client.hmset(`item:${id}`, 'name', name, (err) => {
    if (err) {
      console.error('Redis error:', err);
      res.status(500).json({ error: 'Failed to create item' });
    } else {
      res.status(201).json({ message: 'Item created successfully' });
    }
  });
});

// Get an item by ID
app.get('/items/:id', (req, res) => {
  const id = req.params.id;

  client.hgetall(`item:${id}`, (err, item) => {
    if (err) {
      console.error('Redis error:', err);
      res.status(500).json({ error: 'Failed to retrieve item' });
    } else if (!item) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json(item);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
