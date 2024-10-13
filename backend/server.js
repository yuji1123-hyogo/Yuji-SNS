require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/realsns';

const cors = require('cors');
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'], // フロントエンドのURLを指定
  credentials: true,
}));

const userRoutes = require("./routes/users")
const autRouter = require("./routes/auth")
const postsRouter = require("./routes/post")

// MongoDBへの接続
// MongoDBへの接続
mongoose.connect(mongoURI)
  .then(() => console.log("MONGODBコネクション成功！"))
  .catch(err => console.error("MongoDB接続エラー:", err));


console.log("使用しているMongoDBのURI: ", mongoURI); // ここでどのURIが使用されているか確認

// const fs = require("fs");

// // サーバー起動時にディレクトリが存在するか確認
// const imageDirectory = "public/images";
// if (!fs.existsSync(imageDirectory)) {
//   fs.mkdirSync(imageDirectory, { recursive: true });
// }


//ミドルウェア(apiへの中継役)
//json形式でリクエストやレスポンスを行う場合次の記述が必須
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/auth",autRouter);
app.use("/api/posts",postsRouter);


app.listen(PORT,()=>console.log("サーバーが起動しました"))

