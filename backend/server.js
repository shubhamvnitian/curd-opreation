const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.config');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
    res.send('Backend is working ✅');
  });
  