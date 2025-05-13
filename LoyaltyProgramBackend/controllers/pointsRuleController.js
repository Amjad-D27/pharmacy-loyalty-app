
import connectToDatabase from "../config/db.js";

const updatePointsRule = async (req, res) => {
  const { pointsPerDollar } = req.body;
  const connection = await connectToDatabase.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query(
      'UPDATE PointsRule SET points_per_dollar = ? WHERE id = 1',
      [pointsPerDollar]
    );

    await connection.commit();
    res.status(200).json({ message: 'Points rule updated successfully' });
  } 
  catch (error) {
    await connection.rollback();
    res.status(500).json({ message: error.message });
  }
  finally {
    connection.release();
  }
};

const getPointsRule = async (req, res) => {
  try {
    const [rows] = await connectToDatabase.query('SELECT points_per_dollar FROM PointsRule WHERE id = 1');
    res.status(200).json(rows[0]);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {updatePointsRule, getPointsRule};
