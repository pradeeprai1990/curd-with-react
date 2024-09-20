const { ObjectId } = require("mongodb");
const { dbConnection } = require("../../../dbConnection")

let studentInsert=async (req,res)=>{
    let {uname,email,phone}=req.body
    let obj={
        uname,
        email,
        phone
    }
    try{
        let db=await dbConnection();
        let studentTable=await db.collection("student")
        let finalres=await studentTable.insertOne(obj)
        let apiobj={
            status:true,
            message:finalres
        }
        res.send(apiobj)
    }
    catch(error){
        res.send(error)
    }
}

let studentView=async (req,res)=>{
    let db=await dbConnection();
    let studentTable=await db.collection("student")
    let studentList=await studentTable.find().toArray();
    let obj={
        status:1,
        data:studentList
    }
    res.send(obj)
}

let studentDelete=async (req,res)=>{
    let id=req.params.id;
    let db=await dbConnection();
    let studentTable=await db.collection("student")
    let delRes=await studentTable.deleteOne({_id:new ObjectId(id)})
    let obj={
        status:true,
        message:delRes
    }
    res.send(obj)
}


module.exports={studentInsert,studentView,studentDelete}