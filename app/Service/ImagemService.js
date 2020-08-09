const ProdutoImagem = use("App/Models/ProdutoImagem")
const Database = use('Database')

class ImagemService {

    async sync( dados ) {

        //montar a lista de imagens para ver quais existe e quais não
        var listaCompletaImagensOK = [];
        var listaCompletaImagensFail = [];
        dados.forEach(dado => {
            if ( dado.ok ) {
                listaCompletaImagensOK.push(dado.image);
            } else {
                listaCompletaImagensFail.push(dado.image);
            }
        });

        //eliminar as imagens fail
        await Database.from('produto_imagems').whereIn('url', listaCompletaImagensFail).delete()

        var listaRetornoExistente = await ProdutoImagem.query().whereIn('url', listaCompletaImagensOK).fetch();

        var listaInserir = []
        var hasImg = false;
        var dImgObj;

        dados.forEach(dImg => {
            if ( dImg.ok ) {
                listaRetornoExistente.rows.forEach(dImgR => {
                    if ( dImg.image == dImgR.url ) {
                        hasImg = true;
                    }
                });

                if ( ! hasImg ) {
                    dImgObj = new Object()
                    dImgObj.url = dImg.image;
                    dImgObj.produto_id = dImg.productId;
                    listaInserir.push(dImgObj)

                }

                hasImg = false;
            }
        });

        console.log(listaInserir);

        await Database.insert(listaInserir).into('produto_imagems')

    }


}

module.exports = ImagemService