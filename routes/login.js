var express = require('express');
var router = express.Router();
const Models = require('../models');
const encryptMD5 = require('../helpers/encryptMD5')
const randomString = require('../helpers/randomString')
const checkLogin = require('../helpers/checkLogin')

let checkPermission = function(req, res, next){
	checkLogin(req, res, next, 'login')
}

/* GET users listing. */
router.get('/',checkPermission ,(req, res)=>{
	res.render('login/login.ejs')
})


router.post('/', function(req, res, next) {
 console.log(req.body);
  Models.User.find({where:{username:req.body.username},include:Models.Goverment}).then((user)=>{
    console.log(user);
     // res.send(user)

    if(user!=null){

      if(user.password == encryptMD5(req.body.password, user.salt)){
      	 // res.send(user)
        req.session.userId = user.id;
        req.session.isLogin = true;
          console.log(user.Goverment)
          if(user.Goverment != null){
             req.session.isGoverment = true
						 req.session.govermentId = user.Goverment.id
          }
					console.log(req.session);
        	res.redirect('/')
      }else{
        res.render('login/login.ejs')
      }
    }else{
      res.render('login/login.ejs')
    }
  }).catch((err)=>{
    console.log(err);

  })
});



router.get('/signup',checkPermission, (req, res)=>{
	res.render('login/signup')
})

router.post('/signup', (req, res)=>{
	let secret = randomString(8)
	//console.log(req.body.password)
	Models.User.create({
		username: req.body.username,
		salt: secret,
		password: encryptMD5(req.body.password, secret)
	}).then((user)=>{
				if(req.body.isPegawai=="true"){
				Models.Goverment.create({
					UserId:user.id
				}).then((gov)=>{
					res.redirect('/login')
				}).catch((err)=>{
					console.log(err);
					res.redirect('/login')
				})
				}
	res.redirect('/login')
	})
})

module.exports = router;
