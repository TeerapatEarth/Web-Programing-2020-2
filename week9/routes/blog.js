const express = require("express");
const path = require("path")
const pool = require("../config");

const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads') // path to save file
  },
  filename: function (req, file, callback) {
    // set file name
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

router = express.Router();

router.get("/blogs/search", async function (req, res, next) {
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
    await conn.release()
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
  }
});

router.post("/blogs", upload.single('myImage'), async function (req, res, next) {
  // Your code here
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const pinned = req.body.pinned;
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try{
    let results = await conn.query(
      "INSERT INTO blogs(`title`, `content`, `status`, `pinned`, `like`, `create_date`) VALUES(?, ?, ?, ?, 0,CURRENT_TIMESTAMP);",
      [title, content, status, pinned]
    )
    const blogId = results[0].insertId;
    await conn.query("INSERT INTO images(blog_id, file_path) VALUES(?, ?);",[blogId, file.path.substr(6)])

    conn.commit()
    res.send("success!");
  }catch(err){
    await conn.rollback();
    return next(err)
  }finally{
    console.log('finally')
    conn.release();
  }
});

router.get("/blogs/:id", function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM blogs WHERE id=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM comments WHERE blog_id=?", [
    req.params.id,
  ]);

  Promise.all([promise1, promise2])
    .then((results) => {
      const blogs = results[0];
      const comments = results[1];
      res.render("blogs/detail", {
        blog: blogs[0][0],
        comments: comments[0],
        error: null,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.put("/blogs/:id", upload.single('myImage'), async function (req, res, next) {
  // Your code here
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try{
    const file = req.file;
    if (file) {
      await conn.query("UPDATE images SET file_path=? WHERE blog_id=?",[file.path.substr(6), req.params.id])
    }
    await conn.query('UPDATE blogs SET title=?,content=?, pinned=?, blogs.like=?, create_by_id=? WHERE id=?', [req.body.title, req.body.content, req.body.pinned, req.body.like, null, req.params.id])
    conn.commit()
    res.json({ message: "Update Blog id " + req.params.id + " Complete" })
  }catch(err){
    await conn.rollback();
    return next(err)
  }
  return;
});


router.delete("/blogs/:id", async function (req, res, next) {
  // Your code here
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try{
    let comments = await conn.query('SELECT * FROM comments WHERE blog_id=?', [req.params.id])
    if (comments[0].length > 0) {
      res.status(409).json({ message: "Can't Delete because this blog has comment!!!" })
    } else { 
      // continue delete ...
      await conn.query('DELETE FROM blogs WHERE id=?;', [req.params.id]) // delete blog
      await conn.query('DELETE FROM images WHERE blog_id=?;', [req.params.id]) // delete image
      await conn.commit()
      res.json({ message: 'Delete Blog id ' + req.params.id + ' complete' })
    }
  }catch(err){
    await conn.rollback();
    return next(err)
  }finally {
    console.log('finally')
    conn.release();
  }
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

router.put("/comments/:commentId", async function(req, res, next){
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try{
    await conn.query("UPDATE comments SET comment = 'Edit comment', comment_date = CURRENT_TIMESTAMP\
    WHERE id = ?", [req.params.commentId])
    conn.commit()
    res.json({"message": "Edit Comment at id "+req.params.commentId})
  }catch(err){
    await conn.rollback();
    return next(err)
  }finally{
    conn.release()
  }
});

router.delete("/comments/:commentId", async function(req, res, next){
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try{
    await conn.query("DELETE FROM comments WHERE id=?", [req.params.commentId])
    conn.commit()
    res.json({"message": "Delete Comment id "+req.params.commentId+" Complete"})
  }catch(err){
    await conn.rollback();
    return next(err)
  }finally{
    conn.release()
  }
});

router.put("/comments/addlike/:commentId", async function(req, res, next){
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try{
    let countlike = await conn.query("SELECT `like` FROM comments WHERE id = ?", [req.params.commentId])
    await conn.query("UPDATE comments SET `like` = ? WHERE id = ?", [countlike[0][0].like + 1, req.params.commentId])
    conn.commit()
    res.json({"message":"Add like in Comment id "+req.params.commentId+", Current Like is "+parseInt(countlike[0][0].like + 1)})
  }catch(err){
    await conn.rollback();
    return next(err)
  }finally{
    conn.release()
  }
})

exports.router = router;
