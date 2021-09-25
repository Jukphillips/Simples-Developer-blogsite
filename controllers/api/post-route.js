const router = require('express').Router();
const { Post, Comment, User } = require("../../models/index")


router.post('/', async (req, res) => {
    try {
        const createNewPost = await Post.create({
            title: req.body.newPostTitle,
            content: req.body.newPostContent,
            user_id: req.session.username.id
        })

        console.log(createNewPost)
        res.status(200).json(createNewPost)

    } catch (err) {
        console.log(err)
        res.status(400).json(err)

    }
})

router.get('/updatePost/:id', async (req, res) =>{

    try {
        
        const updateYourPostQuery = await Post.findByPk(req.params.id)
        const updateYourPost = await updateYourPostQuery.get({plain: true})

        console.log(updateYourPost)

        res.render("updatePost", {updateYourPost})

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }


})

router.put('/updatePost', async (req, res) => {
    try {
        
        const createNewPost = await Post.update(
            {
            title: req.body.updatePostTitle,
            content: req.body.updatePostContent,
        },
        {
            where: {
                id: req.body.id
            }
        })

        console.log(createNewPost)
        res.status(200).json(createNewPost)

    } catch (err) {
        console.log(err)
        res.status(400).json(err)

    }
})

router.get("/:id", async (req, res) => {
    if(!req.session.loggedIn){
        res.redirect("/user")
    } else{

    try {
        const postQuery = await Post.findOne({where: {id: req.params.id}, include: [{
            model: User,
            attributes: ["id", "username"]
        }, {
            model: Comment,
            attributes: ["id", "comment", "createdAt", "user_id"],
            include: {
                model: User,
            }
        }]}) 

        const post = postQuery.get({plain: true})                                                                                              

        
        res.render("makeComment", {post, loggedIn: req.session.loggedIn})

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}})


module.exports = router;