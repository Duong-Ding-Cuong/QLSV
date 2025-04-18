const express = require('express');
const { createStudent, loginStudentController, getStudentsController, getStudentByIdController, updateStudentController, deleteStudentController, restoreStudentController } = require('../controllers/studentController'); 
const studentRouter = express.Router();

studentRouter.post('/register', createStudent);
studentRouter.post('/login', loginStudentController);
studentRouter.get("/", getStudentsController);          
studentRouter.get("/:id", getStudentByIdController);   
studentRouter.put("/:id", updateStudentController);     
studentRouter.delete("/:id", deleteStudentController);  
studentRouter.patch("/:id/restore", restoreStudentController); 
module.exports = studentRouter;