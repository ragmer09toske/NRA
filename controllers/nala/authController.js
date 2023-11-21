const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';
const User = require('../../Models/nala/UserModel'); 
const bcrypt = require('bcrypt');

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, secretKey, {
    // expiresIn: '1h', // Token will expire in 1 hour
  });
};

// Route for user login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Password is valid, generate a JWT token
    const token = generateToken(user);
    const userID = user._id
    res.json({ token, userID });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

// Route for user login
exports.getEmail = async (req, res) => {
  const { email } = req.body;
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email not found' });
    }
    res.json({email});

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

// Route for user registration
exports.register = async (req, res) => {
  const { name, email, number, password, account_type, district } = req.body;
  // Check if all required fields are present in the request body
  if (!name || !email || !number || !password || !account_type || !district) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ $or: [{ email }, { number }] });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      name,
      email,
      number,
      password: hashedPassword,
      account_type,
      district
    });

    // Save the user data to the database
    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = generateToken(savedUser);

    res.json({ newUser });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
};