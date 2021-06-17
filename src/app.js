import express from 'express';
import TaskRoutes from './routes/tasks.routes';
import morgan from 'morgan'
import cors from 'cors'

const app = express();

// Settings
app.set('port',process.env.PORT || 3000);


// Middleware
app.use(cors())  // Hacer peticiones entre servidores
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false})); // Para manejar form. HTML

// Routes
app.get('/', (req, res) => {
  res.json({message: 'Welcome to my app!'})
});

app.use('/api/tasks',TaskRoutes);

export default app;