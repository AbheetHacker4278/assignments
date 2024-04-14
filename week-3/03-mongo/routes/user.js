const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User , Course } = require("../db");
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const exist = await User.findOne({username : username});
    if(exist){
        res.send({
            Server: "User already Present with Same name"
        })
    }else{
        await User.create({
            username: username,
            password: password,
        })
        res.send({
            ServerReply : "User Created Successfully"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allcourses = await Course.find({Course});
    res.send({
        Message: "All Courses Are",
        allcourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({
        username: username,
    } , {
        "$push" : {
            purchase_course: courseId
        }
    })
    res.send({
        Messaage : "Thank you for your purchases"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username : req.headers.username
    })
    const all_course_of_users = await Course.find({
        _id : {
            "$in" : user.purchase_course
        }
    })
    res.json({
        message : "Purchased courses",
        all_course_of_users
    })
});

module.exports = router