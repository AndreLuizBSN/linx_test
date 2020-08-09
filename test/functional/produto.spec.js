'use strict'

const { test, trait } = use('Test/Suite')('Produto')

trait('Test/ApiClient')

test('Post produto 103 - tentativa 1 - 200 - OK', async ({ client }) => {

  var dados = { data : [{
    id: '103',
    nome: 'Blog post content'
  }]}

  const response = await client.post('/v1/produtos').send(dados).end();

  response.assertStatus(200)

}).timeout(0)

test('Post produto 103 - tentativa 2 - 403 - Forbidden', async ({ client }) => {

  var dados = { data : [{
    id: '103',
    nome: 'Blog post content'
  }]}

  const response = await client.post('/v1/produtos').send(dados).end();

  response.assertStatus(403)
}).timeout(0)

