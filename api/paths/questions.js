module.exports = function () {
    return {
        get,
        post,
    };

    async function get(req, res) {

        return res.status(200).send([
            {
                name: 'user test',
                email: 'test@email.com',
                observations: 'why is this like this?',
                date: '2022-05-04',
            }
        ]);
    }

    async function post(req, res) {
        return res.sendStatus(200);
    }
}