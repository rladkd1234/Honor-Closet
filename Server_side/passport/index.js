const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const { Customer } = require('../models');

// const user = {};

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        // { id : 1, name: zero, age : 25}
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // if (user[id]){
        //     done(user[id]);
        // } else {
        // User.findOne({where : { id }})
        //  .then(user => user[id] = user, done(null, user))
        //  .catch(err => done(err));
        // }

        // 1 -> { id:1, name: zero, age: 25} -> req.user
       Customer.find({
           where : { id },
           include: [{
               model: Customer,
               attributes: ['id', 'Name'],
               as: 'Followers',
           }, {
               model: Customer,
               attributes: ['id', 'Name'],
               as: 'Followings',
           }],
           })
            .then(user => done(null, user))
            .catch(err => done(err));

    });

    local(passport);
    kakao(passport);
};