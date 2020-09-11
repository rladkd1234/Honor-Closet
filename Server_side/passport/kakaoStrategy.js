const KakaoStrategy = require('passport-kakao').Strategy;

const { Customer } = require('../models');

//  흐름 (2) (4)
module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL : '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done) => {
        try{
            console.log(profile);
            console.log(profile._json.kakao_account.profile);
            
            console.log(profile._json.kakao_account);
            console.log(profile.username);
            console.log(profile.id);

            const exUser = await Customer.find({
                where: {
                    snsId : profile.id,
                    provider: 'kakao',
                },
            });
            if (exUser) {
                // console.log(exUser);   
                done(null, exUser);
            } else {
                const newUser = await Customer.create({
                    E_mail: profile._json && profile._json.kakao_account.email,
                    Name: profile.username,
                    snsId: profile.id,
                    provider: profile.provider,
                });
                done(null, newUser);
            }
     } catch (error) {
         console.error(error);
         done(error);
     }
    }));
};
