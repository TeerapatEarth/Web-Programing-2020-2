const express = require("express");
const path = require("path")
const pool = require("../config");

router = express.Router();

router.post("/blogs/search", async function (req, res, next) {
  // Your code here
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try{
    let str = await conn.query("SELECT * FROM blogs WHERE title like ?" , ['%'+req.query.search+'%'])
    res.send(str[0])
    conn.commit()
  }catch(err){
    await conn.rollback();
    return next(err)
  }
  finally{
    conn.release()
  }
});

router.post("/blogs/addlike/:blogId", async function (req, res, next) {
  // Your code here
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try{
    let countlike = await conn.query("SELECT `like` FROM blogs WHERE id=?", [req.params.blogId])
    await conn.query("UPDATE blogs SET `like`=? WHERE id=?", [countlike[0][0].like + 1, req.params.blogId])
    conn.commit()
    res.json({ message: "Add like in Blog " + req.params.blogId + ", Current Like is " + parseInt(countlike[0][0].like + 1)})
  }catch(err){
    await conn.rollback();
    return next(err)
  }finally{
    conn.release()
  }
});

router.post("/blogs", async function (req, res, next) {
  // Your code here

});

router.get("/blogs/:id", function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM blogs WHERE id=?", [req.params.id]);
  const promise2 = pool.query("SELECT * FROM comments WHERE blog_id=?", [req.params.id]);
  const promise3 = pool.query("SELECT * FROM images WHERE blog_id=?", [req.params.id])

  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      const blogs = results[0];
      const comments = results[1];
      const images = results[2];
      res.json({
        blog: blogs[0][0],
        images: images[0],
        comments: comments[0],
        error: null,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.put("/blogs/:id", function (req, res) {
  // Your code here
  return;
});

router.delete("/blogs/:id", function (req, res) {
  // Your code here
  return;
});

router.post("/:blogId/comments", async function (req, res, next){
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try{
    let body = {
      comment: "new comment",
      like: 0,
      comment_by_id: null
    }
    await conn.query("INSERT INTO comments(blog_id, comment, `like`, comment_date, comment_by_id)\
      VALUES (?,?,?,CURRENT_TIMESTAMP,?)", [req.params.blogId, body.comment, body.like, body.comment_by_id])
    conn.commit()
    res.json({"message":"Add Comment at Blog id "+req.params.blogId})
  }catch(err){
    await conn.rollback();
    return next(err)
  }finally{
    conn.release()
  }
});

exports.router = router;
