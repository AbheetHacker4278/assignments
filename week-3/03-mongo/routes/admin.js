const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin , Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    //check user is exist or not
    const exist = await Admin.findOne({username : username});
    if(exist){
        res.send({
            Server: "User already Present in Admin as Same name"
        })
    }else{
        await Admin.create({
            username: username,
            password: password,
        })
        res.send({
            ServerReply : "Admin Created Successfully"
        })
    }
});

router.post('/courses',  adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const img_link = req.body.img_link;
    const price = req.body.price;

    const createdcourse = await Course.create({
        title : title,
        description : description,
        img_link : img_link,
        price : price,
    })
    res.send({
        ServerReply : "Course Created Successfully",
        CourseId : createdcourse._id,
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allcourse = await Course.find({Course})

    res.status(200).json({
        ServerReply : "All Courses Are: ",
        createdCourse : allcourse
    })
});

module.exports = router;