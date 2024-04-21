const router = require('express').Router();
const { Comment } = require("../../models");


router.post('/createComment', async (req, res) => {
    try {
        const createComment = await Comment.create({comment: req.body.comment, user_id: req.session.user_id, post_id: req.body.post_id});

        res.status(200).json(createComment);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;