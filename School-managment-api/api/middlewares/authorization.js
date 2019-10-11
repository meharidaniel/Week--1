const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(500).send('Token not given,please send token');
    
    try{
        const payload = jwt.verify(token,config.get('privateKey'));
        req.users = payload;
        next();
    }catch(error){
       res.status(500).send('Unauthorized request!');
    }
    

}