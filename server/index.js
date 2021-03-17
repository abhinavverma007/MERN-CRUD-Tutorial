const express=require('express');
const app=express();
const mongoose=require('mongoose');
// for self made calls to backend api
const cors=require('cors');
// we need our schema in here
const foodModel=require('./models/Food');
// receive information from front-end in json format
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://newUser:zabGvYzQuGX4suNu@crud.qef6s.mongodb.net/food?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

app.post('/insert', async (req,res)=>{
    const namefood=req.body.nameOfFood;
    const countDays=req.body.numberOfDays;
    const food=new foodModel({foodName: namefood, daysSinceIAte: countDays});
    try{
        // telling database to save
        await food.save();
        res.send('inserted data');
    }catch(err){
        console.log(err);
    }
});
app.get("/read",async (req,res)=>{
    // find {} empty because we want all data
    foodModel.find({}, (err,result)=> {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
});
app.listen(3001,()=>{
    console.log("Server running on port 3001");
});