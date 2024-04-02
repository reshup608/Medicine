var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.get('/fetchallproducts', function(req, res, next) {
 
    pool.query("select * from product",function(error,result){
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

  router.post("/fetchproductbyid",function(req,res){
    var q = "select * from product where productid=?"
    pool.query(q,[req.body.productid],function(err,result){
      if (err) {
        console.log(err);
        res.status(500).json({ data: [] });
      } else {
        console.log(result);
        res.status(200).json({ data: result });
      }
    })
  
  });

  router.post("/fetchcategorybyid",function(req,res){
    var q = "select * from product where categoryid=?"
    pool.query(q,[req.body.categoryid],function(err,result){
      if (err) {
        console.log(err);
        res.status(500).json({ data: [] });
      } else {
        console.log(result);
        res.status(200).json({ data: result });
      }
    })
  
  });

  router.post('/insertproduct',upload.single("picture"), function(req, res, next) {
    console.log("BODY:", req.body);
    console.log("FILE", req.file);
    pool.query("insert into product (productname,categoryid,description,picture,offerprice,price) values(?,?,?,?,?,?)",
    [req.body.productname,req.body.categoryid,req.body.description,req.body.myfilename,req.body.offerprice,req.body.price],function(error,result){
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

  module.exports = router;