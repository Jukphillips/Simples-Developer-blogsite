const router = require('express').Router();
const { Post, Comment, User } = require("../../models/index")


router.post('/', async (req, res) => {
    try {
        const createNewPost = await Post.create({
            title: req.body.newPostTitle,
            content: req.body.newPostContent,
            user_id: req.session.username.id
        })

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


        res.render("updatePost", {updateYourPost, loggedIn: req.session.loggedIn})

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

router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found!" });
      return;
    }

    res.status(200).render("dashboard", {loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;