import studentModel from '../models/studentModel.js';

const getStudentsData = async (req,res) =>{
    try {
        const studentsData = await studentModel.find();
        res.json({success:true,studentsData});
    } catch (error) {
        res.json({success:false,message:"error fetching data"});
    }
}

const addStudent = async(req,res) => {
    try {
        const {name,age,grade} = req.body;
        const newStudent = new studentModel({
            name,
            age,
            grade
        })
        await newStudent.save();
        res.json({success:true,newStudent});
    } catch (error) {
        res.json({success:false,message:"error adding student"});
    }
}

const getByID = async(req,res) => {
    try {
        const {id} = req.params;
        const student = studentModel.findById(id);
        if(!student) return res.json({success:false,message:"invalid id"});
        res.json({success:true,student});
    } catch (error) {
        res.json({success:false,message:"error fetching data"});
    }
}


const updateStudentData = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body;

        const updatedStudent = await studentModel.findByIdAndUpdate(
            id, 
            updateData, 
            {new:true}
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({success:true,updatedStudent});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteStudent = async(req,res) => {
    try {
        const {id} = req.params;
        await studentModel.findByIdAndDelete(id);
        res.json({success:true,message:`deleted student with id ${id}`})
    } catch (error) {
        res.json({success:false,message:`failed to delete`});
    }
}

export {getStudentsData,getByID,addStudent,updateStudentData,deleteStudent};
