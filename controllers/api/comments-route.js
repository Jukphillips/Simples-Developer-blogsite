const router = require('express').Router();
const {Comment} = require("../../models/index")

router.post("/:id", async (req, res) => {
    console.log("in here")
    console.log(req.session.username)
    try {


        const createNewComment = await Comment.create({
            comment: req.body.contentComment,
            post_id: req.body.post_id,
            user_id: req.session.username.id
        })

        console.log(createNewComment)
        res.status(200).json(createNewComment)


    } catch {
        console.log(err)
        res.status(500).json(err)
    }

})

module.exports = router;