const express=require('express');
const searchingController=require('../controllers/SearchingController');
const router = express.Router();


router.get('/searching/:keyw',searchingController.search);

module.exports=router;
