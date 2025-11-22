import express from 'express';
import cors from 'cors';
import tourismRoutes from './routes/tourism.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', tourismRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Tourism Multi-Agent System API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
