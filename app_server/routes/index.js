var express = require('express');
var router = express.Router();
var controllerIndex = require('../controllers/index');

const CosmosClient = require('@azure/cosmos').CosmosClient

const config = require('../config')

const cosmosClient = new CosmosClient({
    endpoint: config.host,
    key: config.authKey
})
const AccountAPI = require('../controllers/index')
const Acccont = require('../models/account')
const account = new Acccont(cosmosClient, config.databaseId, config.containerId)
const accountAPI = new AccountAPI(account)
account
.init(err => {
    console.error(err)
})
.catch(err => {
    console.error(err)
    console.error(
    'Shutting down because there was an error settinig up the database.'
    )
    process.exit(1)
})

/* GET home page. */
router.get('/', (req, res, next) => accountAPI.renderPages(req, res).catch(next));
router.post('/', (req, res, next) => accountAPI.findPhone(req,res).catch(next));


module.exports = router;