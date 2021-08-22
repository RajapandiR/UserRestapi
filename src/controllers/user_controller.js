import CreateError from "http-errors"
import UserSchema from '../schemas/user_schema';
import User from '../models/user_model';
import JsonSchemaValidator from '../utils/jsonschemavalidator';

class UserController{
    static async getuser(req, res) {
        try{
            const user = await User.find(function(err, result) {
                if(err)
                    console.log("Error", err);
                if(result){
                    const response = {
                        "statusCode" : 200,
                        "messege": "Data",
                        "data": result
                    }
                    res.json(response)
                }
                
            })
        }catch(err){
            res.json({message: err});
        }

    }

    static async postuser(req, res, next) {
        const { body } = req;
        try{
            const validator = JsonSchemaValidator.validate(body, UserSchema.addUser())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
            if(req.file != undefined && (req.file.filename != undefined && req.file.filename != ''))
                body.image = req.file.filename;
            const user = await User.create(body, function(err, result) {
                const response = {
                    "statusCode" : 200,
                    "messege": "Create Successfull",
                    "data": result
                }
                if(!err)
                        res.status(200).json(response);
                else{
                    next(err,response)
                }
            })
        }catch(err){
            res.json({message: err});
        }
    }

    static async putuser(req, res, next) {
        const { body } = req;
        try{
            const validator = JsonSchemaValidator.validate(body, UserSchema.editUser())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
            const _id = body._id;
            const user = await User.updateOne({_id}, body, function(err, result) {
                if(err)
                    console.log("Error", err);
                const response = {
                    "statusCode" : 200,
                    "messege": "Update Successfull",
                    "data": result
                }
                if(!err)
                    res.status(200).json(response);
                else{
                    next(err,response)
                }
            })
        }catch(err){
            res.json({message: err});
        }
    }
}

export default UserController;