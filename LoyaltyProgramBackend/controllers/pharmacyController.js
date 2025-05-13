import connectToDatabase from "../config/db.js";

const getAllPharmacies = async (req, res) => {
  try {
    const [pharmacies] = await connectToDatabase.query(
      "SELECT * FROM Pharmacy"
    );
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPharmacyByName = async (req, res) => {
  const { name } = req.params;
  try {
    const [pharmacy] = await connectToDatabase.query(
      "SELECT * FROM Pharmacy WHERE name = ?",
      [name]
    );
    if (pharmacy.length === 0) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }
    res.status(200).json(pharmacy[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPharmacy = async (req, res) => {
  const { email, name, password_hash } = req.body;
  try {
    const [result] = await connectToDatabase.query(
      "INSERT INTO Pharmacy (email, name, password_hash) VALUES (?, ?, ?)",
      [email, name, password_hash]
    );
    res.status(200).json({ pharmacyId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePharmacyByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const [result] = await connectToDatabase.query(
      "DELETE FROM Pharmacy WHERE email = ?",
      [email]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }
    res.status(200).json({ message: "Pharmacy deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllPharmacies,
  getPharmacyByName,
  createPharmacy,
  deletePharmacyByEmail,
};
