let Auth = require("./auth");
let auth = new Auth();

module.exports=(router)=>{
    router.get("/test",(req,res)=>{
        res.send('<h1>testing</h1>')
    });

    router.post('/loginUser',async(req,res,next)=>{
        try{
            let {username='',password=''} = req.body;
            let result = await auth.findUser({username,password})
            return res.status(200).json(result);
        }
        catch(err){
            return res.json(err);
        }
    });
    router.post('/registerUser',async(req,res,next)=>{
        try{
            let {username='',password=''} = req.body;
            let result = await auth.addUser({username,password})
            console.log("got result ",result)
            return res.status(200).json(result);
        }
        catch(err){
            return res.json(err);
        }
        
    })

    return router;
}