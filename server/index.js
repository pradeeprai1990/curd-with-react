let express=require("express");
let cors=require("cors")
const { mainRoute } = require("./App/mainRoute");

let app=express();
app.use(cors())
app.use(express.json())
app.use(mainRoute)
app.listen("8000")