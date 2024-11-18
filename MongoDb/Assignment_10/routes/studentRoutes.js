import express from 'express';
const router = express.Router();
import {getStudentsData,getByID,addStudent,updateStudentData,deleteStudent} from '../controllers/studentControllers.js';

router.route('/')
    .get(getStudentsData)
    .post(addStudent);

router.route('/:id')
    .get(getByID)
    .patch(updateStudentData)
    .delete(deleteStudent);

export default router;