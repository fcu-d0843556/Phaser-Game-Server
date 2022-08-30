const express = require("express")
const mongoose = require("mongoose")

const app = express()

//connect
mongoose.connect('mongodb://root:rootrootroot@140.134.26.66:8010/PhaserGame?authSource=admin&readPreference=primary&ssl=false', function (err) {
  if (err) {
    console.debug(err)
    return
  }
  console.debug('數據庫連接成功')
})

//Schema
let userSchema = new mongoose.Schema({
  username: String,
  password: String
})

let userModel = mongoose.model('UserDatas',userSchema)


//app
app.post("/register", function (req, res) {
  const {username,password} = req.query;
  let message = ""
  let isUsernameExisted

  userModel.findOne({
    username
  })
  .then((data) => {
    isUsernameExisted = data
    if(!isUsernameExisted){
      userModel.create({
        'username': username,
        'password': password
      })
      message = "Register Success!"
    }else{
      message = "Username has been used."
    }
    console.log("register message: " , message);
    res.json({message})
  })
  
})








// app.get("/search/users", function (req, res) {
//   const {q} = req.query
//   axios({
//     url: 'https://api.github.com/search/users',
//     params: {q}
//   }).then(response => {
//     res.json(response.data)
//   })
// })

// app.get("/search/users2", function (req, res) {
//   res.json({
//     items: [
//       {
//         login: "yyx990803",
//         html_url: "https://github.com/yyx990803",
//         avatar_url:
//           "https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4",
//         id: 1,
//       },
//       {
//         login: "ruanyf",
//         html_url: "https://github.com/ruanyf",
//         avatar_url: "https://avatars2.githubusercontent.com/u/905434?s=460&v=4",
//         id: 2,
//       }
//     ],
//   });
// });

app.listen(5000, "localhost", (err) => {
  if (!err){} 
  else console.log(err);
})
