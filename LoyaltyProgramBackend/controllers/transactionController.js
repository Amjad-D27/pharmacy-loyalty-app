import connectToDatabase from "../config/db.js";

const getAllTransactions = async (req, res) => {
  try {
    const [transactions] = await connectToDatabase.query(
      "SELECT * FROM `Transaction`"
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionByPhone = async (req, res) => {
  const { phone } = req.params;
  try {
    const [transactions] = await connectToDatabase.query(
      "SELECT * FROM `Transaction` WHERE phone = ?",
      [phone]
    );
    if (transactions.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transactions[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTransaction = async (req, res) => {
  const { phone, amount } = req.body;
  const connection = await connectToDatabase.getConnection();
  try {
    await connection.beginTransaction();
    const [customerRows] = await connection.query(
      `SELECT c.customer_id, c.pharmacy_id 
       FROM Customer c 
       WHERE c.phone = ?`,
      [phone]
    );

    if (customerRows.length === 0) 
      throw new Error('Customer not found with this phone number.');

    const { customer_id, pharmacy_id } = customerRows[0];

    const [[{ points_per_dollar }]] = await connection.query('SELECT points_per_dollar FROM PointsRule WHERE id = 1');
    const points_earned = Math.floor(amount * points_per_dollar);
    await connection.query(
      `INSERT INTO \`Transaction\` (customer_id, pharmacy_id, phone, amount, points_earned) 
       VALUES (?, ?, ?, ?, ?)`,
      [customer_id, pharmacy_id, phone, amount, points_earned]
    );

    //const expiryDate = new Date();
    //expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    await connection.query(
      `UPDATE LoyaltyAccount 
       SET total_points = total_points + ?, 
       last_updated = CURDATE(),
       expiry_date = DATE_ADD(CURDATE(), INTERVAL 1 YEAR)
       WHERE customer_id = ?`,
      [points_earned, customer_id]
    );

    await connection.commit();
    res.status(200).json({message: 'Points applied successfully.', pointsEarned: points_earned});
  } 
  catch (error) {
    await connection.rollback();
    res.status(400).json({ message: error.message });
  } 
  finally {
    connection.release();
  }
};

export default { getAllTransactions, getTransactionByPhone, createTransaction };
