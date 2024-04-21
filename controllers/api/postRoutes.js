const router = require('express').Router();
const { Post } = require("../../models"); 

router.post('/newPost', async (req, res) => {
    try {
        const newPost = await Post.create({title: req.body.title, post: req.body.post, user_id: req.session.user_id});

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboardPosts', async (req, res) => {
    try {
        const getUserPosts = await Post.findAll({where: {user_id: req.session.user_id}, order: [['createdAt', 'ASC']]});
        
        if (!getUserPosts) {
            res.status(400).json({message: "No posts founds"});
            return;
        }

        res.status(200).json(getUserPosts);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/updatePost', async (req, res) => {
    try {
        const updatePost = await Post.update({title: req.body.title, post: req.body.content}, {where: {id: req.body.id, user_id: req.session.user_id}});
        
        res.status(200).json(updatePost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/deletePost', async (req, res) => {
    try {
        const deletePost = await Post.destroy({where: {id: req.body.id, user_id: req.session.user_id}});

        res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;