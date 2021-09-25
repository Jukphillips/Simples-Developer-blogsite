const router = require('express').Router();
const { User, Post, Comment} = require('../models/index')
const sequelize = require("sequelize")

//gets all Post/ homepage
router.get('/', async (req, res) =>  {
    
    try {

        const userPostData = await Post.findAll({
            // attributes: [
            //     [sequelize.fn('date_format', sequelize.col('date_col'), '%Y-%m-%d'), 'date_col_formed']
            // ],
            
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


        
        res.render("homepage", {userPost, loggedIn: req.session.loggedIn})
    
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err)

    }

})

module.exports = router;