const jwt=require('jsonwebtoken');

const generateTokens=(user)=>{

    return jwt.sign(
        {
            id:user.id,
            email:user.email,
            name:user.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'7d'
        }
    )
}

module.exports=generateTokens;