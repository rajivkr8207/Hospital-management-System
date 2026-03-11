import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.routes.js'
import Doctorrouter from './routes/doctor.route.js'
import Departmentrouter from './routes/department.routes.js'
import Adminrouter from './routes/admin.route.js'
import TreatmentRouter from './routes/treatment.route.js'
import handleError from './middleware/error.middleware.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
  // allowedHeaders: ["Content-Type", "Authorization"]
}));

// app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req, res) => {
  // logger.info("health route accessed");
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date(),
  });
});

app.get("/", (req, res, next) => {
  res.json({
    success: true,
    message: "Hospital Management API is running",
  });
});


app.use('/api/auth', AuthRouter)
app.use('/api/doctor', Doctorrouter)
app.use('/api/department', Departmentrouter)
app.use('/api/admin', Adminrouter)
app.use('/api/treatment', TreatmentRouter)


// app.use(handleError)
export default app