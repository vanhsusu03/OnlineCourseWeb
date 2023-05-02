const express=require('express');
const searchingController=require('../controllers/SearchingController');
const router = express.Router();


router.get('/searching/:slug',searchingController.search);

module.exports=router;