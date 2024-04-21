const router = require('express').Router();
const { User, Post, Comment } = require("../models");

router.get('/', async (req, res) => {
    try {
        const logged_in = req.session.logged_in;
        const postData = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    },
                }
            ],
        });

        const posts = postData.map((post) =>
      post.get({ plain: true })
    );

        res.render('homepage', { logged_in, posts});
    } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
    } else {
    res.render('login');
    }
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in){
        res.redirect('/dashboard');
    } else {
    res.render('signup');
    };
});


router.get('/dashboard', async (req, res) => {
    if (req.session.logged_in) {
        try {
            const dashboardData = await Post.findAll({
                order: [['createdAt', 'DESC']],
                where: {
                    user_id: req.session.user_id,
                },
            })

            const dashboardPosts = dashboardData.map((post) => 
                post.get({plain: true})
            )
            
            res.render("dashboard", { logged_in: req.session.logged_in, dashboardPosts});
        } catch (err) {
            console.error(err);
        }
    } else {
        res.redirect('/login');
    }
})
module.exports = router;