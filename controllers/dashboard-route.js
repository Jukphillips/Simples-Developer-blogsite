const router = require('express').Router();
const { User, Post, Comment} = require('../models/index')


router.get("/", async (req, res) => {
    if(!req.session.loggedIn){
        res.redirect("/user")
    } else {
    
    const myUserData = await Post.findAll({
        where: {
            user_id: req.session.username.id
        },

        include: {
            model: User,
        }

    })

    const userPost = myUserData.map((post) => post.get({plain: true}));

    

    res.render('dashboard', {userPost, loggedIn: req.session.loggedIn} )


}})

router.get('/post', async (req, res) => {
    if(!req.session.loggedIn){
        res.render("login")
    } else {
    res.render('newPost')
    }
})


module.exports = router;