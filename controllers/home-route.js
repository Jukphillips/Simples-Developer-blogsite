const router = require('express').Router();
const { User, Post, Comment} = require('../models/index')

//gets all Post/ homepage
router.get('/', async (req, res) =>  {
    
    try {

        const userPostData = await Post.findAll({

            include: [
                {model: User, 
                attributes: ["username", "id"]
            }, 
            {
                model: Comment,
                attributes: ["id", "comment", "createdAt"]
            }
            ]

        })

        const userPost = userPostData.map((post) => post.get({plain: true}))
        
        res.json('homepage', {userPost})
    
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err)

    }

})

module.exports = router;