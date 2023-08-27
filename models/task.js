const mongoose = require('mongoose');

const kanbanTaskSchema = new mongoose.Schema({
    title :{
        type : String,
        required:true
    },
    description : {
        type: String,
        required : true 
    },
 
});


const Task = mongoose.model('Contact',kanbanTaskSchema);

module.exports= Task;