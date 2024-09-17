const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Carrierroutes = require('./routes/CarrierRoutes');
const AuthRoutes = require('./routes/authRoutes'); 

const Mentorroutes = require('./routes/MentorRoutes');
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors({ origin: 'http://localhost:2005' }));
app.use(express.json());

// Use the carrier and auth routes
app.use('/carriers', Carrierroutes);
app.use('/auth', AuthRoutes);  // Adding the auth routes
app.use('/mentors', Mentorroutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
