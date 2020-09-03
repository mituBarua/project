const express = require('express');
const bodyParser = require('body-parser');
const sql = require("mssql");
const cookieParser = require('cookie-parser');
const crypto = require("crypto");
const { waitForDebugger } = require('inspector');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var conn = require("../connect")();
const router = express.Router();

var users = [
  {
    email : 'abc@gmail.com', password: 'password'
  }
]

// config for your database
var config = {
  user: 'pdmUser',
  password: '123@pdm',
  server: '192.168.57.2',
  database: 'PDM',
  "options": {
      "encrypt": true,
      "enableArithAbort": true
      },
 
};


/* GET home page. */
router.get('/', function(req, res, next) {
 res.send("welcome to backend");
});


// router.post('/login',function(req,res) {
//   let result = users.find(user => user.email == req.body.email);
//  if(result) {
//   if(result.password == req.body.password) {
//     res.status(200).send( {
//       message: "Successful Login!!"
//     })
//   } else {
//     res.status(400).send({
//       message : "Password incorrect!!"
//     })
//   } 
//   } else {
//     res.status(404).send( {
//       message: "User not found!"
//     })
//   }
// })
        
    const PassHash = password => {

      const hash = crypto.createHash('sha256');
      hash.update(password);
      return hash.digest('base64');

    }


router.post('/reg',function(req,res,next) {

    conn.connect().then(function () {
 
      var transaction = new sql.Transaction(conn);
      transaction.begin().then(function () {
          
          var request = new sql.Request(transaction);
          
          let {UserName, Email, Password} = req.body;
          
          request.input("UserName", sql.VarChar(50), UserName)
          request.input("Email", sql.VarChar(50), Email)
          request.input("Password", sql.VarChar(50), PassHash(Password))
      
          request.execute("spRegisterInfo").then(function () {
              transaction.commit().then(function (recordSet) {
               
                  conn.close();
                  res.status(200).send(req.body);
              }).catch(function (err) {
                  conn.close();
                  res.status(400).send("Error while inserting data1");
              });
              
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while inserting data2");
                console.log(err);

            });
        }).catch(function (err) {
            conn.close();
            res.status(400).send("Error while inserting data3");
        });
      }).catch(function (err) {
          conn.close();
          res.status(400).send("Error while inserting data4");
      });
   
    
  // }
 

//console.log('----------------------------')
 // console.log(req.body);
 // console.log('----------------------------')

});  
        module.exports = router;

        
     
      

     

      
 
