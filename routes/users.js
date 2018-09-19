let express = require('express');
let router = express.Router();
let Joi = require('joi');
const error = require("../controllers/helper/common-error");
const throwError = error.throwError;
let { UserController }= require('../controllers/user');
let userControllerObj = new UserController;
let emailSchema = Joi.string().email({ minDomainAtoms: 2 });

/**
 * @api {post} /user/:email User Creation
 * @apiName User Creation
 * @apiGroup Users
 * @apiParam  {String} email Email id.
 * @apiParam  {String} name  Name
 * @apiParam  {String} password Password.
 * @apiSuccess {String} response Registered Successfully.
 * @apiSuccess {String} user_id User id.

 * @apiError   {String} error Error Message
 */
router.post('/:email',function(req,res,next){
  Joi.validate(req.params.email, emailSchema, 
    function(error) {
    if(error)
        res.status(400).json({"Error":"Email not valid"})
    else{
    let Result = userControllerObj.userSignup(req.body.name,req.params.email,req.body.password);
    Result.then(result => {
        res.status(201).send({
            message: "Registered Successfully",
            user_id: result._id
        })
    }).catch((error) => {
        res.status(error.status || 400).json({"Error":error.message});
    })
    }
  });
});

/**
 * @api {post} /user/:email User Login
 * @apiName User Login
 * @apiGroup Users
 * @apiParam  {String} email Email id.
 * @apiParam  {String} password Password.
 * @apiSuccess {String} response Login Successfull.
 * @apiSuccess {String} token Encrypted token.

 * @apiError   {String} error Error Message
 */
router.post('/login/:email',function(req,res,next){
  Joi.validate(req.params.email, emailSchema, 
    function(error) {
    if(error)
        res.status(400).json({"Error":"Email not valid"})
    else{
    let Result =userControllerObj.userLogin(req.params.email, req.body.password);
    Result.then(result => {
        res.status(200).send({
            message: "Login Successfull",
            token: result
        })
    }).catch((error) => {
        res.status(error.status || 400).json({"Error":error.message});
    })
    }
  });
});

/**
 * @api {patch} /user/forget_password/:email Forget Password
 * @apiName Forget Password
 * @apiGroup Users
 * @apiParam  {String} email Email id.
 * @apiSuccess {String} response Password reset link send to email.
 * @apiError   {String} error Error Message
 */
router.patch('/forget_password/:email',function(req,res,next){
  Joi.validate(req.params.email, emailSchema, function(error) {
    if(error)
        res.status(400).json({"Error":"Email not valid"})
    else{
          let Result =userControllerObj.userForgetPassword(req.params.email);
          Result.then(result => {
          res.status(200).send({
            message: "Password reset link send to email"
          })
        }).catch((error) => {
        res.status(error.status || 400).json({"Error":error.message});
      })
    }
  });
});
/**
 * @api {post} /user/reset_password/:email Password Reset
 * @apiName Password Reset
 * @apiGroup Users
 * @apiParam  {String} email Email id.
 * @apiParam  {String} password New Password.
 * @apiSuccess {String} response Password reset successfully.
 * @apiSuccess {String} response name Name.
 * @apiSuccess {String} password Password.
 * @apiError   {String} error Error Message
 */
router.put('/reset_password/:email',function(req,res,next){
  Joi.validate(req.params.email, emailSchema, function(error) {
    if(error)
        res.status(400).json({"Error":"Email not valid"})
    else{
          let Result =userControllerObj.userPasswordReset(req.params.email, req.body.password);
          Result.then(result => {
          res.status(200).send({
            message: "Password reset successfully",
            name: result.name,
            new_password:result.password
          })
        }).catch((error) => {
        res.status(error.status || 400).json({"Error":error.message});
      })
    }
  });
  

});


module.exports = router;
