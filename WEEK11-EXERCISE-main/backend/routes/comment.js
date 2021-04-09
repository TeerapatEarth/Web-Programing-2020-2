const { json } = require("express");
const express = require("express");
const pool = require("../config");

const router = express.Router();

// Get comment
router.get('/:blogId/comments', function(req, res, next){
});

// Create new comment
router.post('/:blogId/comments', async function(req, res, next){
    comment = req.body.comment
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    try{
        const [rows1, fields1] = await conn.query(
            'INSERT INTO `comments` (`blog_id`, `comment`, `like`, `comment_date`) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', 
            [req.params.blogId, comment, 0]
        )
        const [rows2, fields2] = await conn.query(
            'SELECT * FROM `comments` WHERE `id` = ?', 
            [rows1.insertId]
        )
        await conn.commit()
        return res.json(rows2[0])
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err)
    }finally{
        console.log('finally')
        conn.release();
    }
});

// Update comment
router.put('/comments/:commentId', async function(req, res, next){
    editcomment = req.body.editcomment
    const conn = await pool.getConnection();
    await conn.beginTransaction()
    try{
        await conn.query("UPDATE comments SET comment=? WHERE id=?", [editcomment, req.params.commentId])
        conn.commit()
        res.status(200).json('.....')
    }catch(err){
        await conn.rollback();
        return res.status(500).json(err);
    }finally{
        conn.release()
    }
});

// Delete comment
router.delete('/comments/:commentId', async function(req, res, next){
    const conn = await pool.getConnection();
    await conn.beginTransaction()
    try{
        await conn.query("DELETE FROM comments WHERE id=?", [req.params.commentId])
        conn.commit()
        res.status(200).json('.....')
    }catch{
        await conn.rollback();
        return res.status(500).json(err);
    }finally{
        conn.release()
    }
});

// Delete comment
router.put('/comments/addlike/:commentId', async function(req, res, next){
    const conn = await pool.getConnection();
    await conn.beginTransaction()
    try{
        let [rows, fields] = await conn.query("SELECT `like` FROM `comments` WHERE `id` = ?", [req.params.commentId])
        let like = rows[0].like + 1;
        await conn.query("UPDATE `comments` SET `like` = ? WHERE `id` = ?", [like, req.params.commentId])
        await conn.commit()
        res.json({ like: like });
    } catch{
        await conn.rollback();
        return res.status(500).json(err);
    } finally {
        console.log("finally");
        conn.release();
    }
});


exports.router = router