const express=require("express");
const router=express.Router();

const authMiddleware=require("../middleware/authMiddleware");

const {createTask,getTasks,getTaskById,updateTask,deleteTask}=require("../controllers/taskcontroller");

router.get("/gettask",authMiddleware,getTasks);
router.post("/createtask",authMiddleware,createTask);
router.put("/updatetask/:id",authMiddleware,updateTask);
router.delete("/deletetask/:id",authMiddleware,deleteTask);

module.exports=router;