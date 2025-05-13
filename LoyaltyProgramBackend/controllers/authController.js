import connectToDatabase from "../config/db.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { pharmacyName, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const [existing] = await connectToDatabase.query(
      "SELECT * FROM Pharmacy WHERE email = ?",
      [email]
    );
    if (existing.length > 0)
      return res.status(400).json({ message: "Pharmacy already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connectToDatabase.query(
      "INSERT INTO Pharmacy (name, email, password_hash) VALUES (?, ?, ?)",
      [pharmacyName, email, hashedPassword]
    );

    res
      .status(201)
      .json({
        pharmacyId: result.insertId,
        message: "Pharmacy registered successfully!",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { pharmacyName, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [rows] = await connectToDatabase.query(
      "SELECT * FROM Pharmacy WHERE name = ?",
      [pharmacyName]
    );
    if (rows.length === 0)
      return res
        .status(400)
        .json({ message: "Invalid pharmacy name or password." });

    const pharmacy = rows[0];
    const isMatch = await bcrypt.compare(password, pharmacy.password_hash);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid pharmacy name or password." });

    const JWT_SECRET = "mySecret/Secure";
    const token = jwt.sign(
      { pharmacyId: pharmacy.pharmacy_id, pharmacyName: pharmacy.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful!", pharmacy_id: pharmacy.pharmacy_id, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { register, login };
