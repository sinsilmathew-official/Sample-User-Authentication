const UserModel = require('../models/user_model');
const jwt = require('jsonwebtoken');
const { mailFuncs } = require('../controllers/helper/sendgrid-helper');
const jwtOptions = {};
jwtOptions.secretOrKey = 'secret_key';
const error = require("../controllers/helper/common-error");
const throwError = error.throwError;
let mailFuncsObj = new mailFuncs;

class UserController {
    //Sign Up Function
    async userSignup(name, email, password) {
        try {
            let queryResult = await UserModel.findOne({ "email": email });
            if (queryResult !== null && queryResult.email == email) {
                throwError(400, "User already registered");
            } else {
                let newSignup = new UserModel({
                    "name": name,
                    "email": email,
                    "password": password
                });
                let result = await newSignup.save();
                if (result.id != '') {
                    
                    await mailFuncsObj.sendMail(email, "No-replay@testapp.com", "User Registration", "Successfully Registered");
                }
                return result;
            }
        }
        catch (error) {
            throw error;
        }
    }
    //Login Function
    async userLogin(email, password) {
        try {
            let queryResult = await UserModel.findOne({ $and: [{ "email": email }, { "password": password }] });
            if (queryResult !== null && queryResult.email == email && queryResult.password == password) {
                let payload = { user_name: queryResult.user_name, email: queryResult.email };
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                return token;
            }
            else {
                throwError(400, "Invalid User");
            }
        }
        catch (error) {
            throw error;
        }
    }
    //Password Reset
    async userPasswordReset(email, new_password) {
        try {
            let queryResult = await UserModel.findOne({ "email": email });
            if (queryResult !== null && queryResult.email == email) {
                let result = await UserModel.findOneAndUpdate({ "email": email }, { "password": new_password }, { new: true });
                return result;
            }
            else {
                throwError(400, "Invalid User");
            }
        }
        catch (error) {
            throw error;
        }
    }

    async userForgetPassword(email) {
        try {
        
            let queryResult = await UserModel.findOne({ "email": email });
            if (queryResult !== null && queryResult.email == email) {
                let temp='<html><body><h3>Password Reset</h3><a href="#">Click here for reset password </a></body></html>';
                await mailFuncsObj.sendMail(email, "No-replay@testapp.com", "Password Reset", temp);
            }
            else {
                throwError(400, "Invalid User");
            }

        }
        catch (error) {
            throw error;
        }
    }

}

exports.UserController = UserController;