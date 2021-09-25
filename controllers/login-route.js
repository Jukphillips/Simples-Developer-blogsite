const router = require('express').Router();
const { request } = require('express');
const { User } = require('../models/index')

//Creates a user 
router.post('/register', async (req, res) => {
    try {

            const dbUserCreate = await User.create({
                username: req.body.username,
                password: req.body.password,
            })

            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.username = dbUserCreate;
                res.status(200).json(dbUserCreate)

            })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// Get login page
router.get('/', async (req, res) => {
    try {
        if(req.session.loggedIn){
            res.redirect('/');
            return;
        }
        res.render('login')
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }


})

// Login Post
router.post('/login',  async (req, res) => {
try {
    // finds user with email or username
    const dbUserData = await User.findOne({
        where: {            
        username: req.body.username        
        }
    });

    // checks to see if there is a user with that email or username, if not a json message is displayed
    if(!dbUserData) {
        res.status(400).json({message: 'Incorrect email or password. Please try again!'})
        return
    }

    /// uses hooks in our models to compare if the user passwords is the same as the one created. We are using bycrypt
    const validPassword = await dbUserData.checkpassword(req.body.password)

    // if the response returns false then they are presented with an error code
    if(!validPassword) {
        console.log('invaild password')
        res.status(400).send('Incorrect email or password. Please try again!')
    }

        console.log(dbUserData)
    const userObject = {username: dbUserData.username, id: dbUserData.id}
    console.log(userObject)
    // if validpassword returns true then the user is logged in
    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.username = userObject
        res.status(200).json({message: "You are now logged in!"})
        
    })


} catch (err) {
    console.log(err)
    res.status(500).json(err)    
}

})

// logs the user out
router.post('/logout', (req, res) => {
    // if the user is logged in then the user will be loged out
    console.log(req.session)
    if(req.session.loggedIn){
        req.session.destroy(() => {
            console.log('You are now logged out!');
            res.status(200).send("you're logged out!")
        })
    } else {
        res.status(204).end()
            console.log('You are now logged out!')
    }
})


module.exports = router;