require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const connection = require('./config/database');
const configViewEngine = require('./config/viewEngine');
const studentRoute = require('./routes/studentRoute')
const passwordRouter = require('./routes/authRoute')
const forumRouter = require('./routes/forumRoute')
const postRoutes = require("./routes/postRoute");
const commentRoutes = require("./routes/commentRoute");


const app = express();
app.use(express.json()); 
app.use(fileUpload());
app.use(express.urlencoded({ extended: true })); 
const port = process.env.PORT || 8888;
// const hostname = process.env.HOST_NAME ||'0.0.0.0';

const student = require('./models/Student');
const forum = require('./models/Forum');
const post = require('./models/Post');
const comment = require('./models/Comment');
const Otp = require('./models/Otp');
// config req.body
app.use(cors({
    origin:[],
    credentials: true
  }));
app.use(express.urlencoded({extended: true}))
// Config view engine
configViewEngine(app);

app.use('/v1/student/', studentRoute);
app.use('/v1/auth', passwordRouter);
app.use('/v1/forum', forumRouter);
app.use('/v1/post', postRoutes);
app.use('/v1/comment', commentRoutes);
(async () => {
    try {
        await connection();
        app.listen(port,  () => {
            console.log(`Backend zero app listening on http://:${port} `);
        });
    } catch (error) {
        console.log(">>> Error connect to DB: ", error);
    }
})();
