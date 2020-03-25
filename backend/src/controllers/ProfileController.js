const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const ong_id = req.headers.authorization;

        if (!ong_id) {
            return res.status(500).json({ error: 'Internal server error!'});
        }

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return res.json(incidents);
    }
}