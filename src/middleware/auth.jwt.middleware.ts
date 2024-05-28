import JWTRedis from './../utils/auth.jwt'
import { Request, Response, NextFunction } from 'express';

const validToken = function(req:Request, res:Response, next:NextFunction) {

    let token =req.headers['authorization']; 
    if(token) {
        token = token.replace(/^Bearer\s/, '');
    }

    if(token)
    {
        let jwt = new JWTRedis()
        jwt.verifyToken(token)
        .then(_decoded => {
            if(_decoded){
             req.body.user = _decoded;
                return next();
            }else{
               return res.status(401).send("invalid token")
            }
        })
        .catch(err =>{
            return res.status(400).send("unexpected error")
        })
    }else{
        return res.status(401).send("invalid token")
    } 
  };
  export default validToken