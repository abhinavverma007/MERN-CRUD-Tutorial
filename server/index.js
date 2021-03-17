const express=require('express');
const app=express();
const mongoose=require('mongoose');

// we need our schema in here
const foodModel=require('./models/Food');
// receive information from front-end in json format
app.use(express.json());

mongoose.connect("mongodb+srv://newUser:zabGvYzQuGX4suNu@crud.qef6s.mongodb.net/food?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

app.get('/', async (req,res)=>{
    const food=new foodModel({foodName: 'Apple', daysSinceIAte: 3});
    try{
        // telling database to save
        await food.save();
        res.send('inserted data');
    }catch(err){
        console.log(err);
    }
})
app.listen(3001,()=>{
    console.log("Server running on port 3001");
});