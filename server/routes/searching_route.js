const express=require('express');
const searchingController=require('../controllers/SearchingController');
const router = express.Router();


router.get('/searching',searchingController.search);

module.exports=router;