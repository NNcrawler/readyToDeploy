'use strict'

let islogin= function(req, res, next, page){
	if(req.session.isLogin==true){
		if(page=='respond'){
			next();
		}else if(page == 'login'){
			res.redirect('/')
		}
	}else{
		if(page!='login'){
			res.redirect('/login')
		}else{
			next()
		}
	}
}

module.exports = islogin;