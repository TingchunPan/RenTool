import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import imageRouter from './routers/imageRouter.js';
import path from 'path';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/dotenv
 * @reference https://github.com/basir/amazona/blob/master/backend/server.js
 */
const app = express();
dotenv.config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://wendypan:1234@cluster0.1lwsv.mongodb.net/rentool?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => { console.log('MongoDB connected...'); }
).catch(error => {
  console.log(error)
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});
app.use('/api/imageUpload', imageRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

const __dirname = path.resolve();
app.use('/imageUpload', express.static(path.join(__dirname, 'imageUpload')));

// app.get('/', (req, res) => {
//   res.send('The server is working');
// });
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});





