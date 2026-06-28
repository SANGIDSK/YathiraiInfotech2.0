const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const enquiryRoutes = require('./routes/enquiry');
const courseRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/yathirai', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

app.use('/api/enquiry', enquiryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'Yathirai InfoTech' }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
