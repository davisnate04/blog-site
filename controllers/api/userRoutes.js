const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
    const userData = await User.findOne({where: {username: req.body.username}});

    if (userData) {
        res.status(400).json({message: "Username is already in use"});
        
        return;
    }
    
    const newUser = await User.create(req.body);

    req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.status(200).json(newUser);
    });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {username: req.body.username}});


        if (!userData) {
            res.status(400).json({message: "Incorrect username, please try again"});

            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: "Incorrect password, please try again"});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({message: "You are now logged in!"});
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
                console.log("logged out");
            });
        } else {
            res.status(404).end();
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;