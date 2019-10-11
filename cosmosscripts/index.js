console.log();
console.log("Querying Documents");

const CosmosClient = require("@azure/cosmos");
const config = require("./config");
const fs = require("fs");
const databaseId = config.names.database;
const containerId = config.names.container;
const endpoint = config.connection.endpoint;
const masterKey = config.connection.authKey;

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({
    endpoint,
    auth: {
        masterKey
    }
});


async function run() {
    //ensuring a database & container exists for us to work with
    const {
        container,
        database
    } = await init();
    const querySpec = {
        query: "SELECT * FROM sensordata c where c.sensorId = @sensorId ORDER BY c.currentTime ASC",
        parameters: [{
            name: "@sensorId",
            value: "24718906a880"
        }]
    };

    console.log(`querying items in container '${container.id}'`);
    var lux_prev = 0.0;

    if (!container) {
        throw new Error("Collection is not initialized.");
    }
    try {
        const {
            result: results
        } = await container.items.query(querySpec).toArray();
        console.log(`The Current Reading is : '${results[0].lux}'`);
        for (const item of results) {
            if ((item.lux - lux_prev) > 1.0) {
                console.log(`The Current Reading is : '${item.lux}'`);
                console.log(`The Previous Reading is : '${lux_prev}'`);
                console.log(`The Current Time is : '${item.currentTime}'`);
                console.log("Something Changed with respect to lighting!!!!");
            }
            lux_prev = item.lux;

        }
    } catch (err) {
        handleError(err);
    }
    async function init() {
        const {
            database
        } = await client.databases.createIfNotExists({
            id: databaseId
        });
        const {
            container
        } = await database.containers.createIfNotExists({
            id: containerId
        });
        return {
            database,
            container
        };
    }

}

async function handleError(error) {
    console.log(`\nAn error with code '${error.code}' has occurred:`);
    console.log("\t" + error.body || error);
}

run().catch(handleError);