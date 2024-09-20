let express=require("express")
const { studentInsert, studentView, studentDelete } = require("../../controller/website/HomeController")
let homeapi=express.Router()

homeapi.post("/student-insert",studentInsert)
homeapi.get("/student-view",studentView)
homeapi.delete("/student-delete/:id",studentDelete)
module.exports={homeapi}