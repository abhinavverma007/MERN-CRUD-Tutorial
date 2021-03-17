const mongoose=require('mongoose');
const foodSchema=new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    daysSinceIAte: {
        type: Number,
        required: true
    }
});

// passing our schema to main server
const Food=mongoose.model("food",foodSchema);
module.exports=Food;
