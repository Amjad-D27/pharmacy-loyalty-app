import connectToDatabase from "../config/db.js";

const getAllCustomers = async (req, res) => {
  try {
    const [customers] = await connectToDatabase.query("SELECT * FROM Customer");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerByPhone = async (req, res) => {
  const { phone } = req.params;
  try {
    const [customer] = await connectToDatabase.query(
      "SELECT * FROM Customer WHERE phone = ?",
      [phone]
    );
    if (customer.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCustomer = async (req, res) => {
  const { pharmacy_id, firstName, lastName, phone, dateOfBirth, gender } = req.body;
  const connection = await connectToDatabase.getConnection();
  try {
    await connection.beginTransaction();
    const [customerResult] = await connection.query(
      "INSERT INTO Customer (first_name, last_name, phone, date_of_birth, gender, pharmacy_id) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, phone, dateOfBirth, gender, pharmacy_id]
    );
    const customerId = customerResult.insertId;

    await connection.query(
      "INSERT INTO LoyaltyAccount (customer_id, first_name, last_name, phone) VALUES (?, ?, ?, ?)",
      [customerId, firstName, lastName, phone]
    );

    await connection.commit();
    res.status(200).json({ customerId });
  } 
  catch (error) {
    await connection.rollback();
    res.status(500).json({ message: error.message });
  } 
  finally {
    connection.release();
  }
};

const updateCustomerByPhone = async (req, res) => {
  const { phone } = req.params;
  const { first_name, last_name, date_of_birth, gender } = req.body;
  try {
    const [result] = await connectToDatabase.query(
      "UPDATE Customer SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ? WHERE phone = ?",
      [first_name, last_name, date_of_birth, gender, phone]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCustomerByPhone = async (req, res) => {
  const { phone } = req.params;
  try {
    const [result] = await connectToDatabase.query(
      "DELETE FROM Customer WHERE phone = ?",
      [phone]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {getAllCustomers, getCustomerByPhone, createCustomer, updateCustomerByPhone, deleteCustomerByPhone};
