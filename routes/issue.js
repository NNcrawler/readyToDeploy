var express = require('express');
var router = express.Router();
const sequelize = require('sequelize');
const Models = require('../models');
const checkLogin = require('../helpers/checkLogin')

router.use('/respond/:id', checkLogin)

let nonPegawaiBlocker = function(req, res, next){
	if(req.session.isGoverment==true){
		next()
	}else{
		res.redirect('/')
	}
}

let checkPermission = function(req, res, next){
	checkLogin(req, res, next, 'respond')
}

router.get('/:id/deactivate',nonPegawaiBlocker,(req,res)=>{
	//res.send(req.params)
	console.log(req.params.id);
	Models.Issue.findByI(req.params.id).then((issue)=>{
		issue.isActive = false;
		issue.save().then(()=>{
			res.redirect('/issue/myissue');
		}).catch((err)=>{
			console.log(err);
			res.redirect('/issue/myissue');
		})
	}).catch((err)=>{
		console.log(err);
		res.redirect('/issue/myissue');
	})
})

router.get('/:id/delete',nonPegawaiBlocker, (req,res)=>{
	Models.Issue.findById(req.params.id).then((issue)=>{
		issue.destroy().then(()=>{
			res.redirect('/issue/myissue')
		})

	})
})

router.get('/:id/activate',nonPegawaiBlocker,(req,res)=>{
	//res.send(req.params)
	console.log(req.params.id);
	Models.Issue.findById(req.params.id).then((issue)=>{
		issue.isActive = true;
		issue.save().then(()=>{
			res.redirect('/issue/myissue');
		}).catch((err)=>{
			console.log(err);
			res.redirect('/issue/myissue');
		})
	}).catch((err)=>{
		console.log(err);
		res.redirect('/issue/myissue');
	})
})

router.get('/',  (req, res)=>{
	// console.log(req.session)
	Models.Issue.findAll({order: ['vote'],where:{isActive:true}}).then((result)=>{

		res.render('issue/list', {dataIssue:result.reverse(), session:req.session})
	})
})


//router.get('/respond/:id',checkPermission, (req, res)=>{
router.get('/respond/:id', (req, res)=>{
	// console.log(checkLogin)
	// let data ={ userId: req.session.userId }
	// Models.Respond.findAll({where:{IssueId:req.params.id},include:Models.User}).then((result_respond)=>{
	// 	data.result_respond = result_respond
	// 	return Models.Issue.findById(req.params.id)
	// }).then((result_issue)=>{
	// 	data.result_issue = result_issue
	// 	res.send(data)
	//  	res.render('issue/respond', data)
	// })

	let data = {}
	Models.Respond.findAll({attributes:["id","IssueId", "UserId", "respond", "vote", "createdAt"],where:{IssueId:req.params.id},include:[Models.User], order:['createdAt']})
	.then((result)=>{
		data.result_respond = result
		Models.Issue.findById(req.params.id).then((result_issue)=>{
			data.result_issue = result_issue
			data.session = req.session;
			result_issue.getVoteIssues({where:{UserId:req.session.userId}}).then((voteIssue)=>{
				data.voteIssue = voteIssue
				//res.send(data)
				res.render('issue/respond', data)
			})


		})

	})

})

router.post('/respond/:id', (req, res)=>{
	// res.send(req.body)
	Models.Respond.create({
		IssueId: req.params.id,
		UserId: req.session.userId,
		respond: req.body.respond
	}).then(result=>{
		// res.send(result)
		res.redirect(`/issue/respond/${result.IssueId}`)
	})
})

router.get('/:id/:vote', (req, res)=>{
	Models.User.findById(req.session.userId).then((user)=>{
		return user.voteIssue(req.params.id, req.params.vote, Models.VoteIssue, Models.Issue)
	}).then((voteIssue)=>{
		res.redirect(`/issue/respond/${req.params.id}`)
	}).catch((err)=>{
		res.send(err)
	})
})

router.get('/respond/:issue_id/:res_id/:vote', (req, res)=>{
	Models.User.findById(req.session.userId).then((user)=>{
		return user.voteRespond(req.params.res_id, req.params.vote, Models.VoteRespond, Models.Respond)
	}).then(()=>{
		res.redirect(`/issue/respond/${req.params.issue_id}`)
	}).catch((err)=>{
		res.send(err)
	})
})

router.get('/respond/:id/command', (req, res)=>{
	console.log(req.session)
	let data = {
		id:req.params.id
	}

	res.render('issue/command', data)
})

router.get('/add',nonPegawaiBlocker, checkPermission,(req, res)=>{
	let dataPassed = {session:req.session}

	res.render('issue/add', dataPassed);
})

router.post('/add', nonPegawaiBlocker,(req,res)=>{
	Models.Issue.create({detail:req.body.description,GovermentId:req.session.govermentId, title:req.body.title, isActive:true, vote:0}).then((issue)=>{
		res.redirect('/issue')
	})
})


router.get('/myissue',nonPegawaiBlocker,(req,res)=>{
	let dataPassed = {}
	Models.Issue.findAll({where:{GovermentId:req.session.govermentId}}).then((issues)=>{
		dataPassed.issues=issues;
		dataPassed.session = req.session
		res.render('issue/myissue', dataPassed)
	}).catch((err)=>{
		res.send(err)
	})
})



module.exports = router
