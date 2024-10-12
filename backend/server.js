
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

const cors = require('cors');
app.use(cors()); // CORSを有効にする

const userRoutes = require("./routes/users")
const autRouter = require("./routes/auth")
const postsRouter = require("./routes/post")

// MongoDBへの接続
mongoose.connect('mongodb://localhost:27017/realsns', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'conection error'));
db.once('open',function(){
    //we're conect!
    console.log("MONGODBコネクション成功！");
});

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

