const express=require("express");
const router=express.Router();

const authMiddleware=require("../middleware/authMiddleware");

const {createTask,getTasks,getTaskById,updateTask,deleteTask}=require("../controllers/taskcontroller");

router.get("/",authMiddleware,getTasks);
router.post("/",authMiddleware,createTask);
router.put("/:id",authMiddleware,updateTask);
router.delete("/:id",authMiddleware,deleteTask);

module.exports=router;