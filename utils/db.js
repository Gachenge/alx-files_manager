const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        const host = (process.env.DB_HOST) ? process.env.DB_HOST : 'localhost'
        const port = (process.env.DB_PORT) ? process.env.DB_PORT : 27017
        const dbName = (process.env.DB_DATABASE) ? process.env.DB_DATABASE : 'files_manager'
        const connectionString = `mongodb://${host}:${port}/${dbName}`;
        this.alive = false;
        this.client = new MongoClient(connectionString, { useUnifiedTopology: true });
        this.client.connect()
            .then(() => {
                this.alive = true;
            })
            .catch((err) => {
                console.log(err);
            })
    }
    isAlive() {
        return this.alive;
    }
    async nbUsers() {
        try{
            const users = await this.client.db(this.dbName).collection('users').countDocuments();
            return users;
        } catch (err) {
            console.log(err)
        }
    }
    async nbFiles() {
        try {
            const files = await this.client.db(this.dbName).collection('files').countDocuments();
            return files;
        } catch (err) {
            console.log(err);
        }
        
    }
    async getUser(){
        const user = await this.client.db(this.dbName).collection('users').find({ email }).toArray();

    }
}

const dbClient = new DBClient();
module.exports = dbClient;
