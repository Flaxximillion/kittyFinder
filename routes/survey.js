const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
let cat;

const Sequelize = new sequelize(process.env.DATABASE_URL,{
    define:{
        timestamps: false
    }
});

Sequelize.authenticate()
    .then(() => {
        console.log('connected');
    })
    .catch(err => {
        console.log(err);
    });

const Cat = Sequelize.define('kitties', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    fluffiness: sequelize.STRING(30),
    personality: sequelize.STRING(30),
    size: sequelize.STRING(30),
    description: sequelize.TEXT,
    image:sequelize.STRING(100),
});

let catVars =
    {
        catFluff: {
            query: "Select a level of fluffiness!",
            params: {
                "noFluff": "No Fluff",
                "aLittleFluff": "A Little Fluff",
                "fluffy": "Fluffy",
                "veryFluffy": "Very Fluffy",
                "superFluffy": "Super Fluffy"
            }
        },
        catPersonality: {
            query: "Select a purrsonality!",
            params: {
                "mellow": "Mellow",
                "active": "Active",
                "independent": "Independent",
                "playful": "Playful",
                "loving": "Loving"
            }
        },
        catSize: {
            query: "Select a size!",
            params:{
                "small":"Small",
                "medium": "Medium",
                "large": "Large"
            }
        }
    };


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('survey', {
        title: "Kitty Survey!",
        catQuestions: catVars
    });
});

router.post('/submit', jsonParser, function(req, res, next){
    console.log('submit');
    Cat.findOne({
        where: {
            fluffiness: req.body.catFluff,
            personality: req.body.catPersonality,
            size: req.body.catSize
        }
    }).then((response)=>{
        if(!response){
            Cat.findOne({
                where: {
                    fluffiness: req.body.catFluff,
                    personality: req.body.catPersonality,
                }
            }).then((response)=>{
                if(!response){
                    Cat.findOne({
                        where: {
                            fluffiness: req.body.catFluff
                        }
                    }).then((response)=>{
                        cat = response.dataValues;
                        console.log(cat);
                    })
                } else {
                    console.log(cat);
                    cat = response.dataValues;
                }
            });
        } else {
            console.log(cat);
            cat = response.dataValues;
        }
    }).then(()=>{
        res.send(cat);
    })
});
module.exports = router;
