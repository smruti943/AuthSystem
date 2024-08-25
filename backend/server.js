const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', //database password
    database: 'auth_db'   // database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Register User
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password || password.length < 6) {
        return res.status(400).json({ message: 'Invalid input: Password must be at least 6 characters' });
    }

    // Check if user already exists
    const queryCheck = `SELECT * FROM users WHERE email = ?`;
    db.query(queryCheck, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insert user into the database
        const queryInsert = `INSERT INTO users (email, password) VALUES (?, ?)`;
        db.query(queryInsert, [email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Login User
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    // Check if user exists
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'User does not exists' });
        }

        const user = results[0];

        // Compare password
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Password not matched' });
        }

     
        // Generate JWT
        const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '30m' });

        res.status(200).json({ token });
    });
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userEmail = decoded.email;
        next();
    });
};

// Protected Route
app.get('/welcome', verifyToken, (req, res) => {
    res.status(200).json({ message: `Hello, ${req.userEmail}` });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//Check Server response
app.get('/',(re,res)=> {
    return res.json("Backend response")
});