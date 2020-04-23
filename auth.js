let {MongoClient} = require("mongodb");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
class Auth {
    constructor(){
        this.dbObject=null;
        MongoClient.connect("mongodb://127.0.0.1:27017/UserDB",{ useUnifiedTopology: true },(err,db)=>{
            if(err) {
                console.error("Error in connecting to mongodb");
            }
            this.dbObject=db;
        });
    }
    getPasswordHash(password){
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password,salt);
    }
    comparePassword(entered_pwd,pwd){
        return new Promise((resolve,reject)=>{
            bcrypt.compare(entered_pwd, pwd, function (err, cmpresult) {
                if (err) {
                    console.error(err)
                    resolve(false);
                }
                else {
                    resolve(cmpresult);
                }
            });
        });

    }
    generateWebToken(session){
        return jwt.sign(session,"environment-iconnect",{expiresIn:3600 * 24 * 30});
    }
    addUser({username="",password=""}){
        return new Promise((resolve,reject)=>{
            if(!username )
            reject({error:true,msg:"Username not provided"});
        if(!password)
            reject({error:true,msg:"Password not provided"});
        
        // check if user already exists
        this.dbObject.db("UserDB").collection("users",async(err,coll)=>{
            if(err){
                reject({error:true,msg:"Error in adding user"}); 
            }
            else{
                let user =await coll.findOne({username});
                if(user){
                    reject({error:true,msg:"User already exists"}); 
                }
                else{
                    let hash =  this.getPasswordHash(password);
                    let inserted =await coll.insertOne({username,hash});
                    if(inserted.insertedId){
                        resolve({done:true,msg:"User registration success"}); 
                    }
                    else reject({done:true,msg:"Error in registering user"}); 
                }
            }
        });
    })
        
    }
    findUser({username='',password=''}){
        return new Promise((resolve,reject)=>{
            if(!username )
             reject({error:true,msg:"Username not provided"});
        if(!password)
            reject({error:true,msg:"Password not provided"});
        
        this.dbObject.db("UserDB").collection("users",async(err,coll)=>{
            if(err){
                console.error("checking user existence",err);
                reject({error:true,msg:"Error in adding user"}); 
            }
            else{
                let user =await coll.findOne({username}); 
                if(user){
                    let res = await this.comparePassword(password,user.hash);
                    if(res){
                        let token =this.generateWebToken(user);
                        resolve({done:true,token});
                    }
                    else{
                        reject({error:true,msg:"Incorrect password entered"}); 
                    }
                }
                else{
                    reject({error:true,msg:"User not found"}); 
                }
            }
        });
    })
        
    }
}

module.exports=Auth;