'use strict'

const Produto = use("App/Models/Produto")
const Database = use('Database')
const CacheService = use("App/Service/CacheService")
const ImagemService = use("App/Service/ImagemService")
const axios  = use('axios')

class ProdutoController {

    async atualizar( { request, response, transform, auth } ) {

        var cacheService = new CacheService();
        
        var req = request.all();

        var dadosStr = JSON.stringify(req)

        const isExist = await cacheService.isExists( dadosStr );

        if ( isExist ) {
            return response.status(403).send()
        }

        try {

            //montar lista com IDs
            var ids = [];
            req.data.forEach(r => {
                ids.push(r.id)
            });

            //VERIFICAR OS EXISTENTES
            var dadosSalvos = await Database
                .from('produtos')
                .whereIn('id', ids);

            var dadosSalvarNovo = [];
            var dadosSalvarAlterar = [];
            var isExists = false;
            req.data.forEach(r => {
                dadosSalvos.forEach(dados => {
                    if ( dados.id == r.id ) {
                        isExists = true;
                    }
                });    

                if ( ! isExists ) {
                    dadosSalvarNovo.push(r)
                } else {
                    dadosSalvarAlterar.push(r)
                }

                isExists = false;
            });

            await Produto.createMany(dadosSalvarNovo)

            var sqlExec = '';
            dadosSalvarAlterar.forEach(r => {
                sqlExec += "update produtos set nome = '" + r.nome + "' where id = '" + r.id + "';"
            });

            await Database.raw(sqlExec)

            return response.send({"msg": "OK"})

        } catch( err ) {
            return response.status(400).send(err)
        }
    }

    async atualizarImagem( { request, response, transform, auth } ) {

        var cacheService = new CacheService();
        
        var req = request.all();

        var dadosStr = JSON.stringify(req)

        const isExist = await cacheService.isExists( dadosStr );

        if ( isExist ) {
            return response.status(403).send()
        }
        
        //criar uma lista unica de imagem com produtoID vinculado
        var lUnit;
        var lista = [];
        req.data.forEach(dt => {
            dt.images.forEach(img => {
                lUnit = new Object()
                lUnit.productId = dt.productId;
                lUnit.image = img;
                lista.push(lUnit)
            });
        });
        
        //lista de dados existentes na origem
        var listaOK = [];

        const promises = lista.map(async dado => {
                try {
                    await axios.get(dado.image);
                    dado.ok = true;
                    listaOK.push(dado)
                } catch (e) {
                    dado.ok = false;
                    listaOK.push(dado)
                } 
        });

        await Promise.all(promises);

        var imagemService = new ImagemService();
        await imagemService.sync( listaOK );

        return response.send({"msg": "ok"})

    }

}

module.exports = ProdutoController
