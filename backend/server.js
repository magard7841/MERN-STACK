const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
dotenv.config();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

// Dummy database (replace with actual database)
let users = [];

// Routes
app.use('/api/users', userRoutes);

// Sign Up endpoint
app.post('/api/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    // Input validation
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        const newUser = { fullName, email, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error during sign up:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Update User endpoint
app.put('/api/users/:email', async (req, res) => {
    const { email } = req.params;
    const { fullName, password } = req.body;

    // Input validation
    if (!fullName && !password) {
        return res.status(400).json({ message: "At least one field is required to update." });
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    try {
        // Update fields
        if (fullName) user.fullName = fullName;
        if (password) user.password = await bcrypt.hash(password, 10);

        res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
        console.error("Error during update:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'MERN STACK BACKEND',
        },
    },
    apis: ['./routes/*.js'],
};

// Generate Swagger specs
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Example route for testing
app.get('/api', (req, res) => {
    res.send('Hello World');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
