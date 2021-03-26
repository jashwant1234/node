const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        return res.status(401).json({
            message : 'Not Authonticated'
        });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token , 'jashwant9658531212pradhan');
    }catch(err){
        return res.status(500).json({
            message : 'Not Authonticated',
            error : err
        })
    }
    if(!decodedToken){
        return res.status(401).json({
            message : 'Not Authonticated'
        });
    }
    console.log(decodedToken);
    req.userId = decodedToken.userId;
    //console.log(authHeader.split(' ')[2]);
    next();
}