var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");


router.post("/addproductpictures", upload.any(), function (req, res) {
    console.log(req.body);
    console.log(req.files);
    var q = "insert into finalproduct (productid,productpictures) values ?";
    pool.query(
      q,
      [req.files.map((item) => [req.body.productid,item.filename])],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ result: false });
        } else {
          res.status(200).json({ result: true });
        }
      }
    );
  });


  

router.post("/fetchallproductpictures",function(req,res){
  console.log(req.body)
  var q = "select productpictures from finalproduct where productid=?";
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

module.exports = router;