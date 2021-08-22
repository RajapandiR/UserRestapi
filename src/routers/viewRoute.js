import UserController from "../controllers/views/user_controller";

import express from 'express';

import multer from 'multer';
import path from 'path';

const router = express.Router()


var userStorage = multer.diskStorage(
    {    	
    	destination : path.join(__dirname, '../../public/images'),
        filename: function ( req, file, cb ) {
          
        	// cb( null, path.basename(file.originalname) + '-' + Date.now() + path.extname(file.originalname));
            cb( null, path.basename(file.originalname));
        }
    }
);
const userUpload = multer({storage: userStorage, fileFilter: function (req, file, cb) {
	// var filetypes = /jpeg|jpg|png/;
	// var mimetype = filetypes.test(file.mimetype);
	var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
       if(file.mimetype === 'image/jpeg') {
        filetype = 'jpeg';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      // var mimetype = filetype.test(file.mimetype);
	// var extname = filetype.test(path.extname(file.originalname).toLowerCase());
	if (file.mimetype) {
	  return cb(null, true);
	}
	cb("Error: File upload only supports the following filetypes - " + filetypes);
}});


router.route('/').get(UserController.getUserViewAll);
router.route('/add-user').get(UserController.getAddUserPage);
router.route('/add-user').post(userUpload.single('image'),UserController.getAddUser);
router.route('/edit-user').get(UserController.getEditUserPage);
router.route('/edit-user/:id').get(UserController.getEditUserPage);
router.route('/edit-user/:id').post(userUpload.single('image'),UserController.getEditUser);
router.route('/:id').get(UserController.getDeleteUserPage);


export default router;