const connection = require('../database/connection');


module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('solicitacoes').count();

        const solicitacoes = await connection('solicitacoes')
         .join('empresas', 'empresas.id', '=', 'solicitacoes.empresas_id')
         .limit(5)
         .offset((page - 1) * 5)
         .select([
            'solicitacoes.*',
            'empresas.name', 
            'empresas.email', 
            'empresas.whatsapp',
            'empresas.city', 
            'empresas.uf'
         ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(solicitacoes);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const empresas_id = request.headers.authorization;

        const [id] = await connection('solicitacoes').insert({
            title,
            description,
            value,
            empresas_id,
        });

       return response.json({ id }); 

    },

    async delete(request, response) {
        const { id } = request.params;
        const empresas_id = request.headers.authorization;

        const solicitacoes = await connection('solicitacoes')
          .where('id', id)
          .select('empresas_id')
          .first();

        if (solicitacoes.empresas_id !== empresas_id) {
           return response.status(401).json({ error: 'Operation not permitted'});
        }


        await connection('solicitacoes').where('id', id).delete();

        return response.status(204).send();
    }
};