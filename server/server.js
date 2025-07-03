import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';
import path from 'path';



const PORT = process.env.PORT || 4000
const app = express();
await connectDB()

const __dirname = path.resolve();

app.use(express.json())
app.use(cors())


app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
