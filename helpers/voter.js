'use strict';
//const Models = require('../models');

function voteAdder(user_id ,affected_id, vote, Conjunction, Affected, opt){
    //console.log('------------======================---------------1212121')
    let conjOpt  = null
    let foreigId = null
    if(opt == 'issue'){
      console.log('lahsdl102930190293091-0293=1-023=-01=-203');
      conjOpt = {where:{UserId:user_id, IssueId:affected_id}}
      foreigId = 'IssueId'
    }else if(opt == 'respond'){
      console.log('ulullulululul1u23lu1l23ul1u23l1u23l1u2l3u1l2u3-103=-0');
      conjOpt = {where:{UserId:user_id, RespondId:affected_id}}
      foreigId = 'RespondId'
    }
        console.log(Affected,foreigId);
    return new Promise((resolve, reject)=>{
      Conjunction.findOrBuild(conjOpt).then((conjunction)=>{
        let voteIssue = null;
        if(conjunction.length>0){
          voteIssue=conjunction[0]
        }else{
          voteIssue = conjunction
        }
        if(vote == 'up'){
          if(voteIssue.isVoteUp!=true){
            voteIssue.isVoteUp = true;
          }else{
            voteIssue.isVoteUp=null;
          }

        }else if(vote == 'down'){
          if(voteIssue.isVoteUp!=false){
            voteIssue.isVoteUp = false;
          }else{
            voteIssue.isVoteUp=null;
          }
        }
        //console.log(voteIssue);
        if(voteIssue.changed('isVoteUp')){
          let changeVote = 0;
          if((voteIssue.isVoteUp==true && voteIssue.previous('isVoteUp')!=true) ||
            (voteIssue.isVoteUp==null && voteIssue.previous('isVoteUp')==false)
            ){
            changeVote= 1
          }else if((voteIssue.isVoteUp==false && voteIssue.previous('isVoteUp')!=false) ||
            (voteIssue.isVoteUp==null && voteIssue.previous('isVoteUp')==true)
            ){
            changeVote=-1
          }
          console.log('Affected : ',Affected);
          console.log('voteIssue: ', voteIssue);
          console.log('foreigId : ', foreigId);
          console.log('get id : ', voteIssue[foreigId]);

          Affected.findOne({where:{id:voteIssue[foreigId]}}).then((affected)=>{
            affected.vote+=changeVote;
            console.log('affected', affected);
            Affected.update({vote:affected.vote},{where:{id:voteIssue[foreigId]}})
            //affected.save();
          })
        }

        voteIssue.save().then(()=>{
          resolve(voteIssue);
        });



      })
    }).catch((err) => {
      console.log(err);
      reject(err);
    })
}

module.exports = voteAdder;
