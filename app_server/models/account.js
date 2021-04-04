// module.exports.get = function(req,phone,cb){
//     req.app.get('connectPool').getConnection(function(error, connection) {
//         if (error) {
//             return console.error(error);
//         } else {
//             var sql = "select count(facebook_id) as matched from facebook_accounts where cast(phone as CHAR) Like '%??%' "
//             connection.query(sql,{phone},function(error, results) {
//                 if (error) {
//                     return console.error(error);
//                 }
//                 connection.release();
//                 cb(results);
//             })
//         }
//     });
// }

// @ts-check
const CosmosClient = require('@azure/cosmos').CosmosClient

// For simplicity we'll set a constant partition key
const partitionKey = undefined
class Accounts {
  /**
   * Manages reading, adding, and updating Tasks in Cosmos DB
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} containerId
   */
  constructor(cosmosClient, databaseId, containerId) {
    this.client = cosmosClient
    this.databaseId = databaseId
    this.collectionId = containerId
    this.database = null
    this.container = null
  }

  async init() {
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId
    })
    this.database = dbResponse.database
    const coResponse = await this.database.containers.createIfNotExists({
      id: this.collectionId
    })
    this.container = coResponse.container
  }

  async find(querySpec) {
    if (!this.container) {
      throw new Error('Collection is not initialized.')
    }
    console.log(querySpec);
    const { resources } = await this.container.items.query(querySpec).fetchAll()
    return resources
  }
}

module.exports = Accounts