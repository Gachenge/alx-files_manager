import { error } from "console";
import { createClient } from "redis";
import { promisify } from "util"


class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('connect', () => {
            this.alive = true;
        })
                    .on('error', (error) => {
                        this.alive = false;
                        console.log(error)
                    })
    }

    isAlive() {
        return this.alive === true;
    }

    async get(key) {
        const gets = promisify(this.client.get).bind(this.client);
        return await gets(key);
    }
    async set(key, value, duration) {
        const sets = promisify(this.client.set).bind(this.client);
        await sets(key, value, 'EX', duration);
    }

    async del(key) {
        const dels = promisify(this.client.del).bind(this.client.del);
        await dels(key);
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;
