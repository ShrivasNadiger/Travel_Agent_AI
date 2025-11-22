import express from 'express';
import cors from 'cors';
import tourismRoutes from './routes/tourism.js';
import { fileURLToPath } from 'url';

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

// Export the app for Vercel
export default app;

// Only start the server if running directly (not imported)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
