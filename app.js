const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const FirstName=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;
  // console.log(FirstName,lastname,email);
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:FirstName,
          LNAME:lastname
        }
      }
    ]
  }
  const jsondata=JSON.stringify(data);
  const url="https://us9.api.mailchimp.com/3.0/lists/623cfb4274"
  const options={
    method:"POST",
    auth:"satish1:1b7ccaef1724d3d7271d835fae533c27-us9"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  });
  request.write(jsondata);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});
// 623cfb4274.
// 1b7ccaef1724d3d7271d835fae533c27-us9
