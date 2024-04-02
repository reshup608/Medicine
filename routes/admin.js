var express = require('express');
var router = express.Router();
var pool = require('./pool');


router.post('/checkadminlogin', function(req, res, next) {
  pool.query("select * from signup where emailid=? and password=?",[req.body.emailid,req.body.password],function(err,result){
      if(err)
      {
          res.status(500).json([])
      }
      else {
          if(result.length==1)
          {
          res.status(200).json({result:true,data:result})
          }
          else
          {
            res.status(200).json({result:false})
          }
      }
  })
});



router.post('/checkemailid', function(req,res,next){
  pool.query("select * from signup where emailid=?",[req.body.emailid],function(err,result){
    console.log(err);
    if(err)
      {
          res.status(500).json([])
      }
      else {
          if(result.length==1)
          {
          res.status(200).json({result:true,data:result})
          }
          else{
            res.status(200).json({result:false})
          }
      }
  })
});

router.post('/insertdata',function(req, res, next){
  pool.query("insert into signup (firstname,lastname,emailid,password) values(?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.emailid,req.body.password],function(error,result){
  console.log(error)
  if(error)
  {
      console.log(error)
      res.status(500).json({result:false})
  }
  else
  {
      res.status(200).json(true)}
  })
 
  })

router.post('/editpassword',function(req,res,next){
  pool.query("update signup set password=? where emailid=?",[req.body.password,req.body.emailid],function(error,result){
    if(error){
      res.status(500).json(false);
    }
    else{
      res.status(200).json(true);
    }
  })
})

router.get('/fetchadmin', function(req, res, next) {
 
    pool.query("select * from signup",function(error,result){
        if(error)
        {
          res.status(500).json([])
        }
        else
        {
          res.status(200).json({data:result})
        }
      })
  });

  router.post('/fetchfirstname', function(req, res, next) {
 
    pool.query("select firstname from signup where emailid=?",[req.body.emailid],function(error,result){
        if(error)
        {
          res.status(500).json([])
        }
        else
        {
          res.status(200).json({data:result})
        }
      })
  });







module.exports = router;
  