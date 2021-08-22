import UserController from "../user_controller";
import path from 'path';

class Controller {
    static async getUserViewAll(req, res){
        try{
            req.body.apiType = "render";
            await UserController.getuser(req, res, function(err, userData) {
                if(err)
                    console.log("Err", err);
                res.render(path.join('user_view'), {
                    result :{
                        title : "User - View All",
                        data : userData
                    }
                });
            });
        }catch(err){
            console.log("Error", err);

        }
    }

    static async getAddUserPage(req, res) {
        try{
            req.body.apiType = "render";
            res.render(path.join('user_add'), {
                result :{
                    title : "Add User"
                }
            })

        }catch(err){
            console.log("Error", err);
        }
    }

    static async getAddUser(req, res){
        try{
            req.body.apiType = "render";
            await UserController.postuser(req, res, function(err, userData) {
                if(err){
                    res.render(path.join('user_add'), {
                        result: {
                            "error": err.message, 
                            "title": "Edit User",
                        }
                    });
                }
                else{
                    res.redirect('/')
                }
                   
            });
        }catch(err){
            console.log("Error", err);

        }
    }

    static async getEditUserPage(req, res){
        try{
            req.body.apiType = "render";
            let id = req.params.id;
            await UserController.getuserById(req, res, function(err, userData) {
                
                let result = {};
                if(err){
                    res.redirect({
						"result": {
							"error": err.message,
							"_id": id,
						}
					} , 'user_edit/'+id);
                }
                else if(userData){
                    result = userData.data;
                    res.render(path.join('user_edit'), {
                        result: {
                            title: "Edit User",
                            _id: id,
                            UserDatas: result,
                            // success: req.flash('success') || '',
                        }

                    })
                    
                }
                   
            });
        }catch(err){
            console.log("Error", err);

        }
    }

    static async getEditUser(req, res){
        try{
            const id = req.params.id;
            req.body.apiType = "render";
            await UserController.putuser(req, res, function(err, userData) {
                if(err){
                    res.redirect('/edit-user/'+id);                    
                }
                else{
                    // req.flash('success', 'Updated.' );
                    res.redirect('/')
                }
                   
            });
        }catch(err){
            console.log("Error", err);

        }
    }

    static async getDeleteUserPage(req, res){
        try{
            const id = req.params.id;
            req.body.apiType = "render";
            await UserController.deleteuser(req, res, function(err, userData) {
                if(err){
                    res.redirect('/edit-user/'+id);                    
                }
                else{
                    const msg = "Deleted Success Full";
                    res.redirect('/?msg='+msg)
                }
                   
            });
        }catch(err){
            console.log("Error", err);

        }
    }


}

export default Controller;
