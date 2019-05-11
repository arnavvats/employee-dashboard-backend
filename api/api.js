const express = require('express');
const router = express.Router();
const Employee = require("../models/employee");
const Skill = require('../models/skill');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/employee-list', async (req, res) => {
    const employeeList = await Employee.find();
    res.json(employeeList);
});

router.get('/skills', async (req, res) => {
   const skills = await Skill.find();
   res.json(skills);
});
router.post('/photo', upload.single('photo'), (req, res) => {
    res.json({photo_url: 'http://localhost:3000/' + req.file.filename});
});
router.get('/employee', async (req, res) => {
    const employee_id = req.query.employee_id;
    const employee = await  Employee.findOne({employee_id});
    res.json(employee);
});

router.post('/employee', async (req, res) => {
    const data = req.body;
    await new Employee(data).save();
    res.json({success: true});
});

router.put('/employee', async (req,res) => {
    const data = req.body;
    await  Employee.findOneAndUpdate({employee_id: data.employee_id}, data);
    res.json({success: true});
});

router.delete('/employee', async (req,res) => {
    const employee_id = req.query.employee_id;
    await Employee.findOneAndDelete({employee_id});
    res.json({success: true});
});


module.exports = router;
