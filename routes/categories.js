var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.get('/fetchallcategories', function(req, res, next) {
 
    pool.query("select * from categories",function(error,result){
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

  router.post("/fetchcategorynamebyid", function(req,res){
    var q = "select categoryname from categories where categoryid=?";
    pool.query(q,[req.body.categoryid],function(err,result){
      if(err){
        console.log(err);
      res.status(500).json({ data: [] });

      }
      else{
        console.log(result);
      res.status(200).json({ data: result });

      }
    })
  })

  router.post('/insertcategories',upload.single("adpicture"), function(req, res, next) {
    console.log("BODY:", req.body);
    console.log("FILE", req.file);
    pool.query("insert into categories (categoryname,adpicture) values(?,?)",
    [req.body.categoryname,req.body.myfilename],function(error,result){
      console.log(error)
        if(error)
        { console.log(error)
          
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });

  router.post('/deletecategories', function(req, res, next) {
    console.log("BODY:", req.body);
    pool.query("delete from categories where categoryid=?",[req.body.categoryid],function(error,result){
      console.log(error)
        if(error)
        {
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });
   
  module.exports = router;