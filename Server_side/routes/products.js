var express = require('express');
var { Product, Customer, Sequelize: { Op } } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Product.findAll()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.patch("/purchase/:Itemid", async (req, res, next) => {

    try{
        // console.log(req.body);

        const Itemid = req.params.Itemid;
        const customerName = req.body.customerName;
        console.log(Itemid);
        console.log(customerName);

        // const customer = await Customer.find({ where: { E_mail: customerName } });
        // let products = []; 
        // console.log(customer);

        // if(customer){
        Product.update(
            {
                //     Seller_ID: req.body.Seller_ID,
                    Progress: 2,
                    Buyer_ID: customerName,
                //     Thumbnail: req.body.Thumbnail,
                //     Image1: req.body.Image1,
                //     Image2: req.body.Image2,
                //     Image3: req.body.Image3,
                //     Image4: req.body.Image4,
                //     Video: req.body.Video,
            },
            { where: { id: req.params.Itemid } }
        )
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.error(err);
                next(err);
            });
        // }

    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.patch("/unpurchase/:Itemid", async (req, res, next) => {

    try {
        // console.log(req.body);

        const Itemid = req.params.Itemid;
        const customerName = req.body.customerName;
        console.log(Itemid);
        console.log(customerName);

        // const customer = await Customer.find({ where: { E_mail: customerName } });
        // let products = []; 
        // console.log(customer);

        // if (customer) {
        Product.update(
            {
                //     Seller_ID: req.body.Seller_ID,
                Progress: 1,
                Buyer_ID: "",
                //     Thumbnail: req.body.Thumbnail,
                //     Image1: req.body.Image1,
                //     Image2: req.body.Image2,
                //     Image3: req.body.Image3,
                //     Image4: req.body.Image4,
                //     Video: req.body.Video,
            },
            { where: { id: req.params.Itemid } }
        )
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.error(err);
                next(err);
            });
        // }

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// router.patch("/soldcomplete/:id", async (req, res, next) => {

//     try {
//         // console.log(req.body);
//         const ItemId = req.params.id;
//         console.log(ItemId);
   
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
//             { where: { id: req.params.id } }
//         )
//             .then(result => {
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

router.post("/soldcomplete/:Itemid", async (req, res, next) => {

    try {
        // console.log(req.body);
        const Itemid = req.params.Itemid;
        const Userid = req.body.Userid;

        Product.update(
            {
                //     Seller_ID: req.body.Seller_ID,
                Progress: 3,

                //     Thumbnail: req.body.Thumbnail,
                //     Image1: req.body.Image1,
                //     Image2: req.body.Image2,
                //     Image3: req.body.Image3,
                //     Image4: req.body.Image4,
                //     Video: req.body.Video,
            },
            { where: { id: req.params.Itemid } }
        )
            .then(async (result) => {

                const customer = await Customer.find({ where: { id: req.body.Userid} });
                await customer.addBuyer(parseInt(req.params.Itemid, 10));

                res.send('success');
            })
            .catch(err => {
                console.error(err);
                next(err);
            });

    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.post('/', function (req, res, next) {
    console.log(req.body);

    Product.create({
        //    No : req.body.~~
        Code: req.body.Code,
        Specification: req.body.Specification,
        Info: req.body.Info,
        FirstPrice: req.body.FirstPrice,
        DiscountRate: req.body.DiscountRate,
        // LastPrice: req.body.LastPrice,
        LastPrice: (100 - req.body.DiscountRate) * req.body.FirstPrice / 100,
        Progress: req.body.Progress,
        // Seller_ID: req.body.Seller_ID,
        // Buyer_ID: req.body.Buyer_ID,
        // Thumbnail: req.body.Thumbnail,
        // Image1: req.body.Image1,
        // Image2: req.body.Image2,
        // Image3: req.body.Image3,
        // Image4: req.body.Image4,
        // Video: req.body.Video,
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

router.patch("/discount/:Code", function (req, res, next) {
    console.log(req.body);
    
    Product.update(
        {
            FirstPrice: req.body.FirstPrice,
            DiscountRate: req.body.DiscountRate,
            LastPrice: (100 - req.body.DiscountRate) * req.body.FirstPrice / 100,
        
            //     Seller_ID: req.body.Seller_ID,
            //     Buyer_ID: req.body.Buyer_ID,
            //     Thumbnail: req.body.Thumbnail,
            //     Image1: req.body.Image1,
            //     Image2: req.body.Image2,
            //     Image3: req.body.Image3,
            //     Image4: req.body.Image4,
            //     Video: req.body.Video,
        },
        { where: { Code: req.params.Code } }
    )
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
});

router.patch("/selloff/:Code", function (req, res, next) {
    console.log(req.body);
    Product.update(
        {
            DiscountRate: 99,
            LastPrice: 5000,
        },
        { where: { Code: req.params.Code } }
    )
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
});


router.patch("/:id", function (req, res, next) {
    Product.update(
        {
            Code: req.body.Code,
            Specification: req.body.Specification,
            Info: req.body.Info,
            FirstPrice: req.body.FirstPrice,
            DiscountRate: req.body.DiscountRate,
            LastPrice: (100 - req.body.DiscountRate) * req.body.FirstPrice / 100,
            Progress: req.body.Progress,
        //     Seller_ID: req.body.Seller_ID,
        //     Buyer_ID: req.body.Buyer_ID,
        //     Thumbnail: req.body.Thumbnail,
        //     Image1: req.body.Image1,
        //     Image2: req.body.Image2,
        //     Image3: req.body.Image3,
        //     Image4: req.body.Image4,
        //     Video: req.body.Video,
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

router.delete("/:Code", function (req, res, next) {
    console.log(req);
    Product.destroy({ where: { Code: req.params.Code } })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            next(err);
        });
});

router.post('/:id/like', async (req, res, next) => {
    try {
        const customer = await Customer.find({ where: { id: req.params.id } });
        await customer.addLiker(req.customer.id);
        res.send('OK');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:id/unlike', async (req, res, next) => {
    try {
        const customer = await Customer.find({ where: { id: req.params.id } });
        await customer.removeLiker(req.customer.id);
        res.send('OK');
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;
