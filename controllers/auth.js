const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.register = async (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  try {
    const results = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (results.length > 0) {
      return res.render('register', {
        message: 'That email is already in use'
      });
    } else if (password !== passwordConfirm) {
      return res.render('register', {
        message: 'Passwords do not match'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    res.send("testing")

    // Save the user to the database
    await db.query('INSERT INTO users SET ?', { name:name, email:email, password: hashedPassword });
    res.send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};