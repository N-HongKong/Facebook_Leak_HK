const account = require("../models/account");

class AccountAPI {
/**
* Handles the various APIs for displaying and managing tasks
* @param {Account} account
*/
constructor(account) {
    this.account = account;
}
    async findPhone(req, res) {
        const querySpec = {
            query: "SELECT a.phone from accounts a where a.phone = @phone",
            parameters: [{"name": "@phone", "value": parseInt(req.body.phone)}]
        };
        const items = await this.account.find(querySpec);
        res.json(items);
    }

    async renderPages(req, res, next) {
        res.render('index');
    };
}

module.exports = AccountAPI;