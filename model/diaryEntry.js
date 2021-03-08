const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({


entryHeader: {type:String, required:true, minlength:1, maxlength:30},
entryBody: {type:String, required:true, maxlength:1200},
date: Date,
public:Boolean

})



const Entry = mongoose.model("diaryEntry", entrySchema);

module.exports = Entry;


