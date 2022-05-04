module.exports = function () {
    return {
        get,
    };

    async function get(req, res) {

        return res.status(200).json([
            {
                name: 'levantas',
                email: 'ou',
                observations: 'n',
                date: 'levantas',
            }
        ]);
    }
}