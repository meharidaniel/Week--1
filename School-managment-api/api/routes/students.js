const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /students'
    });
});

router.post('/',auth,async(req, res, next) => {
    const student = new Student({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        sex: req.body.sex,
        faculty: req.body.faculty,
        department: req.body.department,
        level: req.body.level
    });
    await student.save();
    
    res.status(200).json({
        message: 'Handling POST request to /students',
        createdStudent: student
    });
});

router.get('/:studentId', (req, res, next) => {
    const id = id.params.studentId; 
    if (id === 'special'){
        res.status(200).json({
            message: 'you discovered a special ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'you passed an ID'
        });
    }
});

router.patch('/:studentId', (req, res, next) => {
    res.status(200).json({
        message: 'updated student'
    });
});

router.delete('/:studentId', (req, res, next) => {
    res.status(200).json({
        message: 'deleted student'
    });
});



module.exports = router;