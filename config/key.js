if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod'); // 환경변수가 production이면 ./prod모듈을 가져오고
} else{
    module.exports = require('./dev');   // 환경변수가 development이면 ./dev모듈을 가져온다
}