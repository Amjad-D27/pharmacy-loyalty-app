import connectToDatabase from "../config/db.js";

const getAllLoyaltyAccounts = async (req, res) => {
  try {
    const [accounts] = await connectToDatabase.query(
      "SELECT * FROM LoyaltyAccount"
    );
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLoyaltyAccountByPhone = async (req, res) => {
  const { phone } = req.params;
  try {
    const [accounts] = await connectToDatabase.query(
      "SELECT * FROM LoyaltyAccount WHERE phone = ?",
      [phone]
    );
    if (accounts.length === 0) {
      return res.status(404).json({ message: "Loyalty account not found" });
    }
    res.status(200).json(accounts[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLoyaltyAccountByPhone = async (req, res) => {
  const { phone } = req.params;
  const { total_points, status, expiry_date } = req.body;
  try {
    const [result] = await connectToDatabase.query(
      "UPDATE LoyaltyAccount SET total_points = ?, status = ?, expiry_date = ?, last_updated = CURRENT_TIMESTAMP WHERE phone = ?",
      [total_points, status, expiry_date, phone]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Loyalty account not found" });
    }
    res.status(200).json({ message: "Loyalty account updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLoyaltyAccountByPhone = async (req, res) => {
  const { phone } = req.params;
  const connection = await connectToDatabase.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.query(
      'SELECT * FROM LoyaltyAccount WHERE phone = ?',
      [phone]
    );
    if (result.length === 0) 
      return res.status(404).json({ message: 'Loyalty account not found' });
    
    await connection.query(
      'DELETE FROM LoyaltyAccount WHERE phone = ?',
      [phone]
    );

    await connection.commit();
    res.status(200).json({ message: "Loyalty account deleted successfully" });
  } 
  catch (error) {
    await connection.rollback();
    res.status(500).json({ message: error.message });
  }
  finally {
    connection.release();
  }
};

export default {getAllLoyaltyAccounts, getLoyaltyAccountByPhone, updateLoyaltyAccountByPhone, deleteLoyaltyAccountByPhone};
