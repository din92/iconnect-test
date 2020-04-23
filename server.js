require("dotenv").config();
let express = require("express");
let app = express();
let path = require("path");
let http = require("http");
let router = express.Router();
router = require("./route")(router);
let server = http.createServer(app);
let bodyParser = require("body-parser");
let session = require("express-session")({
    secret:"my-secret",
    saveUninitialized:true,
    resave:true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session);
app.use(router);
app.use(express.static(path.join(__dirname,"/src/dist")));

let port = process.env.PORT;
server.listen(port);

server.on("listening",()=>{
    console.log("server is active on port ",port)
})