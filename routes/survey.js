const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
let cat;

const Sequelize = new sequelize('postgres://bdzotqeidhrgoa:d180e8abaf344ab6887c329a60fe8098ac6b1e32838e20782bd89b5d25192c0a@ec2-184-72-230-93.compute-1.amazonaws.com:5432/derd227lc2pjuc',{
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
    Cat.findAll({
        where: {
            fluffiness: req.body.catFluff
        }
    }).then((response)=>{
        cat = response[0].dataValues;
        res.send(cat);
    })
});
module.exports = router;