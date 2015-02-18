/**
 * UserController.js
 *
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */
module.exports = require('waterlock').actions.user({
/* e.g.
    action: function(req, res){

    }
  */
  //overriding default waterline behaviour and slipting login / sign up
  login: function (req, res) {
    //TODO define
    if (req.body['email']) {
      Auth.findOne().where({
        email: req.body['email']
      }).exec(function (err, user) {
        if (err) {
          return res.serverError(err.message)
        }
        else {
          if (user) {
            return res.ok();
          }
          else return res.badRequest('No user in our system with this mail address');

        }


      });

    } else {
      return res.badRequest('need  mail address');
    }



  },
  signup: function (req, res) {

    if (req.body['email'] && req.body['password']) {
      Auth.findOne().where({
        email: req.body['email']
      }).exec(function (err, user) {
        if (err) {
          return res.serverError(err.message)
        }
        else {
          if (!user)
          //TODO sign up user
          return res.ok();
          else return res.badRequest('user existing ');

        }


      });

    }
    else {
      return res.badRequest('need  mail address and password');
    }



  }




});
