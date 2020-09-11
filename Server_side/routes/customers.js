var express = require('express');
var { Customer, Product, Sequelize: { Op } } = require('../models');
var router = express.Router();

const { isLoggedIn } = require('./middlewares');

router.get('/', function (req, res, next) {
    Customer.findAll()
        .then((customers) => {
            res.json(customers);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


router.get('/:Name/purchaselist', async (req, res, next) => {
    try {
        // console.log(req.body);

        // console.log(req.body.Itemid);
        console.log(req.params.Name);

        // const ItemId = req.body.Itemid;
        const customerName = req.params.Name;

        const product = await Product.findAll({ 
            where:  {
             Buyer_ID: req.params.Name, 
             [Op.or] : [{Progress : 2}, {Progress : 3}],
            
        }, 
        });
        // let products = []; 

        console.log(product)
   
        res.json(product);
    } catch (error) {
        console.error(error);
        next(error);
    }

});

// outer.post("/soldcomplete/:Itemid", async (req, res, next) => {

//     try {
//         // console.log(req.body);
  
//         Product.update(
//             {
//                 //     Seller_ID: req.body.Seller_ID,
//                 Progress: 3,

//                 //     Thumbnail: req.body.Thumbnail,
//                 //     Image1: req.body.Image1,
//                 //     Image2: req.body.Image2,
//                 //     Image3: req.body.Image3,
//                 //     Image4: req.body.Image4,
//                 //     Video: req.body.Video,
//             },
//             { where: { id: req.params.Itemid } }
//         )
//             .then(result => {
//                 const customer = Customer.find({ where: { id: req.params.Itemid } });
//                 await customer.addBuyer(req.customer.id);

//                 res.json(result);
//             })
//             .catch(err => {
//                 console.error(err);
//                 next(err);
//             });
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// });




router.post('/', function (req, res, next) {
    console.log(req.body);
    Customer.create({
        //    No : req.body.~~
        Password: req.body.Password,
        Name: req.body.Name,
        E_mail: req.body.E_mail,
        Sex: req.body.Sex,
        Specification: req.body.Specification,
        Birth: req.body.Birth,
        PhoneNum: req.body.PhoneNum,
        isCertificated: req.body.isCertificated,
    })
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
});


router.patch("/:id", function (req, res, next) {
   Customer.update(
        {
            Password: req.body.Password,
            Name: req.body.Name,
            E_mail: req.body.E_mail,
            Sex: req.body.Sex,
            Specification: req.body.Specification,
            Birth: req.body.Birth,
            PhoneNum: req.body.PhoneNum,
            isCertificated: req.body.isCertificated,
        },
        { where: { id: req.params.id } }
    )
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
});

router.delete("/:id", function (req, res, next) {
    // console.log(req);
    Customer.destroy({ where: { id: req.params.id } })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
});


// router.post('/:userid/follow', isLoggedIn, async (req, res, next) => {
router.post('/:Userid/follow', async (req, res, next) => {
    try {
        const user = await Customer.find({ where: { id: req.user.id } });
        await user.addFollowing(parseInt(req.params.Userid, 10));
        // await user.addCarter(parseInt(req.params.id, 10));

        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:Userid/unfollow', async (req, res, next) => {
    try {
        const user = await Customer.find({ where: { id: req.user.id } });
        await user.removeFollowing(parseInt(req.params.Userid, 10));
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:Name/cart',  async (req, res, next) => {
    try {
        // console.log(req.body);
        console.log(req.body.Itemid);
        console.log(req.params.Name);

        const Name = req.params.Name;
        const Itemid = req.body.Itemid;

        const customer = await Customer.find({ where: { E_mail : req.params.Name  } });
        let products = [];
        // await customer.addProcuts(parseInt(req.body.Itemid, 10));
        await customer.addCarter(parseInt(req.body.Itemid, 10));

        console.log(customer);

        if (customer)
        {
            // products = await customer.getCart({ include : [{ model: Customer }]});
            products = await customer.getCarter({ include: [{ model: Customer }] });

        }

        // console.log(products);
        
        // Product.find({ where : { id : products }})
        //     .then(result => {
        //         res.json(result);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         next(err);
        //     });

        res.json(products);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:Name/cart', async (req, res, next) => {
    try {
        // console.log(req.body);
        console.log(req.body.Itemid);
        console.log(req.params.Name);

        const Name = req.params.Name;

        const customer = await Customer.find({ where: { E_mail: Name } });
        // await customer.addProducts(req.body.Itemid);
        await customer.addCarter(req.body.Itemid);
    
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:Name/uncart', async (req, res, next) => {
    try {

        const Name = req.params.Name;
        console.log(req.body.Itemid);

        const customer = await Customer.find({ where: { E_mail : Name } });
        // await customer.removeProducts(parseInt(req.body.Itemid, 10));
        await customer.removeCarter(parseInt(req.body.Itemid, 10));

        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// ------------------


router.get('/:Name/like', async (req, res, next) => {
    try {
        // console.log(req.body);
        console.log(req.body.Itemid);
        console.log(req.params.Name);

        const Name = req.params.Name;

        const customer = await Customer.find({ where: { E_mail : Name } });
        let products = [];
        // await customer.addProcuts(parseInt(req.body.Itemid, 10));

        console.log(customer);

        if (customer) {
            products = await customer.getProducts({ include: [{ model: Customer }] });
        }

        // console.log(products);

        // Product.find({ where : { id : products }})
        //     .then(result => {
        //         res.json(result);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         next(err);
        //     });

        res.json(products);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:Name/like', async (req, res, next) => {
    try {
        // console.log(req.body);
        console.log(req.body.Itemid);
        console.log(req.params.Name);

        const Name = req.params.Name;

        const customer = await Customer.find({ where: { E_mail: Name } });
        await customer.addProducts(req.body.Itemid);
        // await customer.addInterestItems(req.body.Itemid);

        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:Name/unlike', async (req, res, next) => {
    try {

        // console.log(req.body);
        console.log(req.body.Itemid);
        console.log(req.params.Name);

        const Name = req.params.Name;
        // console.log(req.body.Itemid);
        const customer = await Customer.find({ where: { E_mail: Name } });
        await customer.removeProducts(parseInt(req.body.Itemid, 10));
        
        // await customer.removeInterestItems(parseInt(req.body.Itemid, 10));
       
        res.send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//----------------------------------------

router.post('/profile', async (req, res, next) => {
    console.log(req.body);
    
    try {
        await Customer.update({ Name: req.body.Name }, {
            where: { id: req.user.id },
        });
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;
