
import connectToDatabase from "../config/db.js";

const getAllRedemptions = async (req, res) => {
  try {
    const [redemptions] = await connectToDatabase.query(
      "SELECT * FROM `Redemption`"
    );
    res.status(200).json(redemptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRedemptionByPhone = async (req, res) => {
  const { phone } = req.params;
  try {
    const [redemptions] = await connectToDatabase.query(
      "SELECT * FROM `Redemption` WHERE phone = ?",[phone]
    );
    if (redemptions.length === 0) {
      return res.status(404).json({ message: "Redemption not found" });
    }
    res.status(200).json(redemptions[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const redeemPointsByPhone = async (req, res) => {
  const { phone, amount, points } = req.body;
  if (points !== 1000) 
    return res.status(400).json({ message: "Exactly 1000 points must be redeemed." });

  const connection = await connectToDatabase.getConnection();
  try {
    await connection.beginTransaction();
    const [customerRows] = await connection.query(
      `SELECT c.customer_id, c.pharmacy_id, l.total_points 
       FROM Customer c 
       JOIN LoyaltyAccount l ON c.customer_id = l.customer_id 
       WHERE c.phone = ?`, [phone]
    );

    if (customerRows.length === 0) 
      return res.status(404).json({ message: "Customer not found." });

    const customer = customerRows[0];

    if (customer.total_points < 1000) 
      return res.status(400).json({ message: "Do not have enough points." });

    const discount = amount * 0.25;
    const discountedAmount = amount - discount;

    await connection.query(
      `INSERT INTO Redemption (customer_id, pharmacy_id, phone, amount, points_used, discount_applied)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [customer.customer_id, customer.pharmacy_id, phone, discountedAmount, points, discount]
    );

    await connection.query(
      `UPDATE LoyaltyAccount SET total_points = total_points - ? WHERE customer_id = ?`,
      [points, customer.customer_id]
    );

    await connection.commit();
    res.status(200).json({ message: "Points redeemed successfully", discountedAmount });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
  finally {
    connection.release()
  }
};

export default {getAllRedemptions, getRedemptionByPhone, redeemPointsByPhone};
