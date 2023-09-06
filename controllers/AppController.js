import dbClient from "../utils/db";
import redisClient from "../utils/redis"

export default class AppController {
    static getStatus(request, response) {
        if (dbClient.isAlive() && redisClient.isAlive()){
            response.status(200).send({ "redis": true, "db": true });
        }
    }
    static async getStats(request, response) {
        const users = await dbClient.nbUsers();
        const files = await dbClient.nbFiles();
        response.json({ users, files });
        response.end();
    }
}
