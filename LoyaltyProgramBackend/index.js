import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import pointsRuleRoutes from './routes/pointsRuleRoutes.js';
import pharmacyRoutes from './routes/pharmacyRoutes.js';
import pharmacistRoutes from './routes/pharmacistRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import loyaltyAccountRoutes  from './routes/loyaltyAccountRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import redemptionRoutes from './routes/redemptionRoutes.js';


const app = express();
const PORT = 8080;

const corsOptions = {
    origin: '*', 
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, 
    allowedHeaders: 'Content-Type,Authorization',
  };

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => res.send("API Running!!!"));

app.use('/api/auth', authRoutes);
app.use('/api/PointsRule', pointsRuleRoutes);
app.use('/api/Pharmacy', pharmacyRoutes);
app.use('/api/Pharmacist', pharmacistRoutes);
app.use('/api/Customer', customerRoutes);
app.use('/api/LoyaltyAccount', loyaltyAccountRoutes);
app.use('/api/Transaction', transactionRoutes);
app.use('/api/Redemption', redemptionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
