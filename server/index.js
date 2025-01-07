import express from 'express'
import dotenv from 'dotenv'
import connectDB from './dataBase/db.js'
import userRoute from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import courseRoute from './routes/course.route.js'
import mediaRoute from './routes/media.route.js'
import purchaseRoute from './routes/purchaseCourse.route.js'
import courseProgressRoute from './routes/courseProgress.route.js'
import path from 'path'

dotenv.config({})
connectDB()

const app = express()

const port = process.env.PORT || 3000;

const DIRNAME = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}))

app.use('/api/media', mediaRoute)
app.use('/api/user', userRoute)
app.use('/api/course', courseRoute)
app.use('/api/purchase', purchaseRoute)
app.use('/api/progress', courseProgressRoute)

app.use(express.static(path.join(DIRNAME, '/client/dist')))
app.use('*', (_, res)=>{
    res.sendFile(path.resolve(DIRNAME, 'client', 'dist', 'index.html'))
})

app.listen(port, () => console.log(`http://localhost:${port}`))