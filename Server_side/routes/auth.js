const express = require('express');
const bcrypt = require('bcrypt')
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Customer } = require('../models');

const router = express.Router();

// POST/auth/join
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { E_mail, Password, Name, Sex, Specification, Birth, isSolar, PhoneNum } = req.body;
    try{
        const exUser = await Customer.find({ where: { E_mail } });
        if(exUser){
            req.flash('joinError', '이미 가입된 이메일입니다.');
            // return res.redirect('/join');
            return res.json({ joinStatus: "ALREADY" });
        }
        console.time('암호화시간');
        const hash = await bcrypt.hash(Password, 12);
        console.timeEnd('암호화시간');

        console.log(PhoneNum);
        
        await Customer.create({
            E_mail,
            Password: hash,
            Name,
            Sex,
            Specification,
            Birth,
            isSolar,
            PhoneNum,
    
        });
        // return res.redirect('/');
        return res.json({ joinStatus: "SUCCESS" });
    } catch (error){
        console.error(error);
        next(error);
    }
});

// POST /auth/login
router.post('/login', isNotLoggedIn, (req, res, next) => { // req.body.email, req.body.password
    passport.authenticate('local', (authError, user, info)=>{
        if(authError) {
            console.error(authError);
            return next(authError); //에러니까 에러처리 헨들러로 넘겨버림.
        }
        if(!user){
            req.flash('loginError', info.message);
            return res.json({ loginStatus: "NO" });
        }
        return req.login(user, (loginError) => { // req.user 에서 사용자 정보를 찾을 수 있음.
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }

            return res.json({ loginStatus: "YES" });
        });
    })(req, res, next);
});

// GET /auth/logout
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy(); // req.user
    // res.redirect('/');
    return res.json({ logoutStatus: "SUCCESS" });
})

// 흐름 (1) 카카오 인증시스템으로 넘김
router.get('/kakao', passport.authenticate('kakao'));

// 흐름 (3) 카카오에서 인증이 끝나면 실행
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureReDirect: '/',
}), (req, res) => {
    // console.log(req.user); 
    // res.redirect('/');
        res.json({ Info: "SUCCESS" });
});

module.exports = router;