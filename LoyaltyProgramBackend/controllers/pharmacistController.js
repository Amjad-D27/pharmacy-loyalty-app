
import connectToDatabase from "../config/db.js";

const getAllPharmacists = async (req, res) => {
  try {
    const [pharmacists] = await connectToDatabase.query(
      "SELECT * FROM Pharmacist"
    );
    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPharmacistById = async (req, res) => {
  const { pharmacist_id } = req.params;
  try {
    const [pharmacists] = await connectToDatabase.query(
      "SELECT * FROM Pharmacist WHERE pharmacist_id = ?",
      [pharmacist_id]
    );
    if (pharmacists.length === 0) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }
    res.status(200).json(pharmacists[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPharmacist = async (req, res) => {
  const { pharmacy_id, password_hash, role } = req.body;
  try {
    const [result] = await connectToDatabase.query(
      "INSERT INTO Pharmacist (pharmacy_id, password_hash, role) VALUES (?, ?, ?)",
      [pharmacy_id, password_hash, role]
    );
    res.status(200).json({ pharmacistId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePharmacistById = async (req, res) => {
  const { pharmacist_id } = req.params;
  const { password_hash, role } = req.body;
  try {
    const [result] = await connectToDatabase.query(
      "UPDATE Pharmacist SET password_hash = ?, role = ? WHERE pharmacist_id = ?",
      [password_hash, role, pharmacist_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }
    res.status(200).json({ message: "Pharmacist updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePharmacistById = async (req, res) => {
  const { pharmacist_id } = req.params;
  try {
    const [result] = await connectToDatabase.query(
      "DELETE FROM Pharmacist WHERE pharmacist_id = ?",
      [pharmacist_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }
    res.status(200).json({ message: "Pharmacist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {getAllPharmacists, getPharmacistById, createPharmacist, updatePharmacistById, deletePharmacistById};
