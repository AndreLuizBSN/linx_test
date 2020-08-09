# Linx - Teste André Luiz Alexandrini
## Técnologias utilizadas
PostgreSQL versão 12
NodeJS v12.18.2
NPM v6.14.5
AdonisJS

## Técnologias utilizadas em desenvolvimento
Visual Studio Code
Insomnia

## Banco de dados
O banco está na pasta de Banco de Dados dentro do repositório git.
Caso não queira utilizar os bancos de dados que estão no repositório, basta seguir até a sessão de Migrations deste README.md

## Sistema
### Introdução
Utilizei o AdonisJS como FrameWork para criar a aplicação. É uma framework bastante completa, e muito semelhante ao Laravel do PHP.
Pode ser utilizado para aplicações WEB convencionais e/ou API REST. Ao inicializar, o Adonis cria uma estrutura de projeto onde já pré-configura por exemplo acesso a banco de dados e autenticação;

### Instalação base
Inicialmente, execute o comando abaixo para instalar o AdonisJS e poder executar os comandos a partir dele.
```sh
$ npm i -g @adonisjs/cli
```

### Configuração de ambiente - dev
A configuração de IP, Porta, dados do banco estão no arquivo **.env** disponível na raíz do projeto
```
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=dl4Fa94t8stPqDrbKgVHHEabycldKEzU
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=prince
DB_DATABASE=linx
HASH_DRIVER=bcrypt
```
### Configuração de ambiente - test
A configuração de IP, Porta, dados do banco estão no arquivo **.env.testing** disponível na raíz do projeto
```
HOST=127.0.0.1
PORT=4000
NODE_ENV=testing
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=dl4Fa94t8stPqDrbKgVHHEabycldKEzU
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=prince
DB_DATABASE=linx_test
HASH_DRIVER=bcrypt
```

### Instalação das dependencias
```sh
$ npm i
```

### Migration
Somente caso não tenha restaurado a base de dados que está no repositório.
Primeiramente, deve-se criar dois bancos de dados novos com nomes linx e linx_test, conforme está descrito nas sessões **Configuração de ambiente - dev** e **Configuração de ambiente - test** em **DB_DATABASE=linx** e **DB_DATABASE=linx_test**.
Logo após, execute o comando abaixo. Irá criar toda a estrutura de tabelas do sistema(a estrutura fica no repositório da aplicação `database\migrations`).
Executar essa ação na raíz do projeto.
```sh
$ adonis migration:run
```

### Execução
Para executar o projeto usando Adonis, use o comando
```sh
$ adonis serve
```
Para executar o projeto usando Node, use o comando
```sh
$ npm start
ou
$ node serve.js
```
Os logs, quando ocorra algo, ficam na pasta **tmp**.

### Execução dos testes
Para executar os testes do projeto, use o comando
```sh
$ npm test
ou
$ node ace test
```

### Endpoints(produtos)
Nesse endpoint, será enviado um POST contendo um corpo com os produtos que deseja cadastrar/atualizar no sistema.
```sh
POST http://server:port/v1/produtos
body JSON
{
	"data": 
		[{"id": "123", "name": "mesa"}]
}
Result HTTP 200
{
  "msg": "OK"
}
```
Ao tentar executar a requisição acima dentro do tempo de 10 minutos, o retorno será conforme abaixo:
```sh
POST http://server:port/v1/produtos
body JSON
{
	"data": 
		[{"id": "123", "name": "mesa"}]
}
Result HTTP 403
```
O mesmo corpo não deve ser aceito no prazo de 10 minutos. Somente a partir desse tempo.


### Endpoints(imagens de produtos)
Nesse endpoint, será enviado um POST contendo um corpo com os produtos(codigo) e uma lista de imagens que deseja cadastrar/atualizar no sistema.
**Observação: Totas as imagens contidas no corpo, serão avaliadas, pois caso ela não exista mais no servidor de origem, ela deve ser eliminada do banco para evitar ter dados falsos!**
```sh
POST http://server:port/v1/produtos/imagens
body JSON
{
	"data" : [
		{
			"productId": "pid1"
			, "images": [
				"http://www.linx.com.br/platform-test/1.png",
				"http://www.linx.com.br/platform-test/2.png",
				"http://www.linx.com.br/platform-test/7.png"]
		}
	]
}
Result HTTP 200
{
  "msg": "OK"
}
```
Ao tentar executar a requisição acima dentro do tempo de 10 minutos, o retorno será conforme abaixo:
```sh
POST http://server:port/v1/produtos/imagens
body JSON
{
	"data" : [
		{
			"productId": "pid1"
			, "images": [
				"http://www.linx.com.br/platform-test/1.png",
				"http://www.linx.com.br/platform-test/2.png",
				"http://www.linx.com.br/platform-test/7.png"]
		}
	]
}
Result HTTP 403
```
O mesmo corpo não deve ser aceito no prazo de 10 minutos. Somente a partir desse tempo.

