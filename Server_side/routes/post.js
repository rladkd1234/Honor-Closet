const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Hashtag, Customer } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'public/uploads/');
        },
        filename(req, file, cb){
            // multer가 파일 이름 마음대로만들고 확장자도 안만들어줌.
            const ext = path.extname(file.originalname); // 확장자 가져옴
            cb(null, path.basename(file.originalname, ext) + ext);
            // cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize : 5 * 1024 * 1024 },
});

// 이미지 업로드
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    // console.log(req.body, req.file);
    res.json({ url: `uploads/${req.file.filename}` });
});


const memberUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/uploads/members/');
        },
        filename(req, file, cb) {
            // multer가 파일 이름 마음대로만들고 확장자도 안만들어줌.
            const ext = path.extname(file.originalname); // 확장자 가져옴
            cb(null, path.basename(file.originalname, ext) + ext);
            // cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});


// 이미지 업로드
// router.post('/members/img', isLoggedIn, memberUpload.single('img'), (req, res) => {
router.post('/members/img', memberUpload.single('img'), (req, res) => {

    console.log(req.body)
    console.log(req.file);

    res.json({ url: `uploads/members/${req.file.filename}` });
});


const memberUpload2 = multer();
router.post('/members', isLoggedIn, memberUpload2.none(), async (req, res, next) => {
    // 게시글 업로드
    // console.log('post함');
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            customerId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if (hashtags) {
            //  #안녕하세요 #노드 #익스프레스
            // hashtags = ['#노드', '#익스프레스'] ['#노드', '#atom']
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                // Apple apple 
                where: { title: tag.slice(1).toLowerCase() },
            })));
            await post.addHashtags(result.map(r => r[0])); // post (게시물) hashtag를 이어주는 것
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);

    }
});

// -----------------------------------------------------
// router.post('/members/img', function (req, res, next) {

//     // res.json({ url: `uploads/members/${req}` });
//     console.log(req.file, req.body);

// });


const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next)=>{
    // 게시글 업로드
    // console.log('post함');
    try{
        const post = await Post.create({
            content : req.body.content,
            img : req.body.url,
            customerId : req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
      if (hashtags){
        //  #안녕하세요 #노드 #익스프레스
        // hashtags = ['#노드', '#익스프레스'] ['#노드', '#atom']
          const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
              // Apple apple 
              where : { title: tag.slice(1).toLowerCase() },
          })));
          await post.addHashtags(result.map(r => r[0])); // post (게시물) hashtag를 이어주는 것
      }
     res.redirect('/');
    } catch (error){
        console.error(error);
        next(error);
        
    }     
});

router.post('/:id', async (req, res, next) => {
    try{
        await Post.destroy({ where: { id: req.params.id, customerId: req.user.id }});
        res.send('OK');
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/hashtag', isLoggedIn, async (req, res, next) => {
    const query = req.query.hashtag;
    console.log(query);

    if (!query){
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.find({ where : { title: query }});
        let posts = [];

        console.log(hashtag);

        if(hashtag){
            posts = await hashtag.getPosts({ include: [{ model: Customer }]});
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            customer : req.user,
            twits : posts,
        });
    } catch (error){
        console.error(error);
        next(error);
    }
});

router.post('/:id/like', async (req, res, next) => {
    try{
        const post = await Post.find({ where: { id: req.params.id}});
        await post.addLiker(req.user.id);
        res.send('OK');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:id/unlike', async (req, res, next) => {
    try {
        const post = await Post.find({ where: { id: req.params.id } });
        await post.removeLiker(req.user.id);
        res.send('OK');
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb){
//             cb(null, 'public/uploads/');
//         },
//         filename(req, file, cb){
//             // multer가 파일 이름 마음대로만들고 확장자도 안만들어줌.
//             const ext = path.extname(file.originalname); // 확장자 가져옴
//             cb(null, path.basename(file.originalname, ext) + ext);
//             // cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//         },
//     }),
//     limits: {fileSize : 5 * 1024 * 1024 },
// });

// // 이미지 업로드
// router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
//     // console.log(req.body, req.file);
//     res.json({ url: `uploads/${req.file.filename}` });
// });


// const memberUpload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb) {
//             cb(null, 'public/uploads/members/');
//         },
//         filename(req, file, cb) {
//             // multer가 파일 이름 마음대로만들고 확장자도 안만들어줌.
//             const ext = path.extname(file.originalname); // 확장자 가져옴
//             cb(null, path.basename(file.originalname, ext) + ext);
//             // cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// });


module.exports = router;