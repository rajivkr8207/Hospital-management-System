import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import swaggerUi from 'swagger-ui-express'
// import swaggerSpec from './config/swagger.js'
import AuthRouter from './routes/auth.routes.js'
import Doctorrouter from './routes/doctor.route.js'
import Departmentrouter from './routes/department.routes.js'
import Adminrouter from './routes/admin.route.js'
import { mailQueue } from './queues/mail.queue.js'
import TreatmentRouter from './routes/treatment.route.js'
// import multer 
// const AuthRouter = require('./routes/auth.routes.js')
// const cookieParser = require('cookie-parser')
// const cors = require('cors')/
// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./config/swagger");

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type", "Authorization"]
}));

// app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health",(req, res) => {
  const jobid =  mailQueue.add("welcomeMail", {});
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date(),
    jobid
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TaskFlow API is running",
  });
});


app.use('/api/auth', AuthRouter)
app.use('/api/doctor', Doctorrouter)
app.use('/api/department', Departmentrouter)
app.use('/api/admin', Adminrouter)
app.use('/api/treatment', TreatmentRouter)


export default app