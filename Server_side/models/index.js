const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Customer = require('./customer')(sequelize, Sequelize);

db.Article = require('./article')(sequelize, Sequelize);
// db.Behindcut = require('./behindcut')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);
// db.Cart = require('./cart')(sequelize, Sequelize);
// db.Collection = require('./collection')(sequelize, Sequelize);
db.Donateproduct = require('./donateproduct')(sequelize, Sequelize);
db.Donator = require('./donator')(sequelize, Sequelize);
// db.Interestitem = require('./interestitem')(sequelize, Sequelize);
db.Order = require('./order')(sequelize, Sequelize);
db.Orderedproduct = require('./orderedproduct')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);

db.Member = require('./member')(sequelize, Sequelize);
db.Behindimage = require('./behindimage')(sequelize, Sequelize);
db.Behindvideo = require('./behindvideo')(sequelize, Sequelize);
db.Lookbookimage = require('./lookbookimage')(sequelize, Sequelize);
db.Lookbookvideo = require('./lookbookvideo')(sequelize, Sequelize);

db.Mainpageimage = require('./mainpageimage')(sequelize, Sequelize);
db.Mainpagevideo = require('./mainpagevideo')(sequelize, Sequelize);

db.Donator.hasMany(db.Donateproduct, {foreingKey: 'Donator_Name', sourceKey: 'Name'});
db.Donateproduct.belongsTo(db.Donator, { foreingKey: 'Donator_Name', targetKey: 'Name' });

db.Customer.hasMany(db.Post);
db.Post.belongsTo(db.Customer);

db.Customer.belongsToMany(db.Post, { through: 'Like', as: 'Liker' });
db.Post.belongsToMany(db.Customer, { through: 'Like', as: 'Liker' });

db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });

db.Customer.belongsToMany(db.Customer, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
db.Customer.belongsToMany(db.Customer, { through: 'Follow', as: 'Followings', foreignKey: 'followerID' });

db.Customer.belongsToMany(db.Product, { through: 'InterestItem' });
db.Product.belongsToMany(db.Customer, { through: 'InterestItem' });

db.Customer.belongsToMany(db.Product, { through: 'Cart', as: 'Carter' });
db.Product.belongsToMany(db.Customer, { through: 'Cart', as: 'Carter' });

// db.Customer.hasMany(db.Product, { foreignKey : 'buyer', sorceKey: 'id', as : 'Buyer'});
// db.Product.belongsTo(db.Customer, { foreignKey: 'buyer', targetKey: 'id', as : 'Buyer' });

module.exports = db;

