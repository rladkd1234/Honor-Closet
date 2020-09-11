const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

const mainpageUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/assets/image/');
        },
        filename(req, file, cb) {
            // console.log(file);
            
            // multer가 파일 이름 마음대로만들고 확장자도 안만들어줌.
            const ext = path.extname(file.originalname); // 확장자 가져옴
            cb(null, path.basename(file.originalname, ext) + ext);

            // console.log("123123");
            
            // cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 업로드
router.post('/mainpage/img/:filename', mainpageUpload.single('img'), (req, res) => {
    console.log(req.body, req.file);
    //  console.log(req.params);
    // console.log(req.file.filename);
    
    // console.log(req.params.filename);
    
    // console.log(req.body);
    // res.json({ url: `/public/assets/image/${req.file.filename}` });
    // console.log(__dirname);
    const oldPath = `C:/Users/rladk/Desktop/learn-sequelize/public/assets/image/${req.file.filename}`;
    const newPath = `C:/Users/rladk/Desktop/learn-sequelize/public/assets/image/${ req.params.filename }`;
    // console.log(newPath);
    
    
    // fs.rename(oldPath, newPath, callback)

    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        console.log('File Renamed!');
    });

    // res.json({ url: `public/assets/image/mainpage/${req.params.filename}` });
    res.json({ url: newPath });

});


const memberUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/assets/image/member');
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
router.post('/member/img/:filename', memberUpload.single('img'), (req, res) => {
    // console.log(req.body, req.file);
    // res.json({ url: `public/assets/image/member/${req.file.filename}` });
    // res.json({ url: `/public/assets/image/member/${req.params.filename}` });

    const oldPath = `C:/Users/rladk/Desktop/learn-sequelize/public/assets/image/member/${req.file.filename}`;
    const newPath = `C:/Users/rladk/Desktop/learn-sequelize/public/assets/image/member/${req.params.filename}`;
    // console.log(newPath);


    // fs.rename(oldPath, newPath, callback)

    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        console.log('File Renamed!');
    });

    // res.json({ url: `public/assets/image/mainpage/${req.params.filename}` });
    res.json({ url: newPath });

});


module.exports = router;