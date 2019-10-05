const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /staffs'
    });
});

router.post('/',async (req, res) => {
    const staff = new Staff({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        sex: req.body.sex,
        occupation:req.body.occupation
    });
    await staff.save();
    res.status(200).json({
        message: 'Handling POST request to /staffs',
        createdStaff: staff
    });
});

router.get('/:staffId', (req, res, next) => {
    const id = id.params.staffId; 
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

router.patch('/:staffId', (req, res, next) => {
    res.status(200).json({
        message: 'updated staff'
    });
});

router.delete('/:staffId', (req, res, next) => {
    res.status(200).json({
        message: 'deleted staff'
    });
});



module.exports = router;