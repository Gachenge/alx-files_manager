export default class UsersController {
    static async addNew(request, response) {
        const { email, password } = request.body;
        if (!email) {
            response.status(400).send({ "error": "Missing email" });
        }
        if (!password) {
            response.status(400).send({ "error": "Missing password" });
        }
        if ()
    }
}
