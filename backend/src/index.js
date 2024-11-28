const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Parse JSON requests

// Use the profileRoutes
app.use('/api/profiles', profileRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
