const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://aseth9588:9824491931abheetseth@cluster0.bhtnmrh.mongodb.net/admin_selling_app_JWT');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String , 
    password : String ,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username : String , 
    password : String ,
    purchase_course : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title : String ,
    description : String,
    img_link : String ,
    price : Number,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}