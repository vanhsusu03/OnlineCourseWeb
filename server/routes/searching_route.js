const express=require('express');
const searchingController=require('../controllers/SearchingController');
const router = express.Router();


router.get('/searching/:keyw',searchingController.search);
// router.get('/searching/:keyw/:price',searchingController.search);
router.get('/searching/paid/:keyw',searchingController.searchPaid);
router.get('/searching/free/:keyw',searchingController.searchFree);
module.exports=router;
