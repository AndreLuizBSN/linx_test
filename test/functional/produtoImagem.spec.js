'use strict'

const { test, trait } = use('Test/Suite')('ProdutoImagem')

trait('Test/ApiClient')

test('Post imagem de produto - tentativa 1 - 200 - OK', async ({ client }) => {

  var dados = { data : [{
    productId: 'pid1', 
    images: [
      "http://www.linx.com.br/platform-test/1.png",
      "http://www.linx.com.br/platform-test/2.png",
      "http://www.linx.com.br/platform-test/7.png"]
  }]}

  const response = await client.post('/v1/produtos/imagens').send(dados).end();

  response.assertStatus(200)

}).timeout(0)

test('Post imagem de produto - tentativa 2 - 403 - Forbidden', async ({ client }) => {

  var dados = { data : [{
    productId: 'pid1', 
    images: [
      "http://www.linx.com.br/platform-test/1.png",
      "http://www.linx.com.br/platform-test/2.png",
      "http://www.linx.com.br/platform-test/7.png"]
  }]}

  const response = await client.post('/v1/produtos/imagens').send(dados).end();

  response.assertStatus(403)
}).timeout(0)

