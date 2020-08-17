const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

//application/x-www-form-urlencodeed와 같은 데이터 분석 가져오는게 가능
app.use(bodyParser.urlencoded({extended:true}));

//json와 같은 데이터 분석 가져오는게 가능
app.use(bodyParser.json());

const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
const { User } = require('./models/users');

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',(req, res) => {
  //회원 가입 할떄 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다

  const user = new User(req.body)

  user.save((err, userInfo) => {
    //에러가 발생하면 JSON형식으로 몌시지를 클라이언트로 전달
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      //성공할경우에도 JSON형식으로 메시지를 전달
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})