# Projeto Talker Manager

## Desenvolvimento

Projeto desenvolvido na <a href="https://betrybe.com/" target="_blank">Trybe</a> durante o módulo de Back-End!

Nesse projeto abordamos a construção de uma aplicação para cadastro de talkers, onde será possível cadastrar, visualizar, pesquisar, editar e excluir talkers.

#

## Documentação

<details>
<summary>Instalação e execução</summary>
    <br />
  
Clone o repositório:

```
git clone git@github.com:emilylmenezes/Project-Talker-Manager.git
```

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>
  
  ## Com Docker
 
  > Rode o serviço `node` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `talker_manager`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
> Use o comando `docker exec -it talker_manager bash`.
- Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

> Instale as dependências [**Caso existam**] com `npm install`
> Execute a aplicação com `npm start` ou `npm run dev`
:eyes: **De olho na dica:**

A extensão `Remote - Containers` do VS Code (que estará na seção de extensões recomendadas do programa) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

---

## Sem Docker

> :information_source: Instale as dependências [**Caso existam**] com `npm install`
- **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

- **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
- **✨ Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

  <br/>
</details>
</details>
  <br />

## Habilidades

- Entender a diferença entre execução síncrona e assíncrona;
- Realizar operações assíncronas com callbacks e Promises;
- Ler e escrever arquivos localmente com NodeJS;
- Escrever os próprios scripts que criam e consomem Promises;
- Realizar chamadas de funções de forma consciente;
- Entender o que é o HTTP, o que é uma API e o que os dois têm a ver com o Express;
- Entender a estrutura de uma aplicação Express e como organizar seu código;
- Criar rotas e aplicar middlewares;
- Escrever APIs utilizando Node e Express.

#

## Rotas

### Login

<details>
  <summary><strong>POST /login</strong></summary>
  </br>
  • Se o login for feito com sucesso retorna um token para o usuário.
</details>

### Talkers

<details>
  <summary><strong>GET /talkers</strong></summary>
  </br>
  • Traz todos os talkers (palestrantes) do banco de dados.
  </br>
</details>

<details>
  <summary><strong>GET /talkers/search</strong></summary>
  </br>
  • Busca talkers pelo nome através da query "q".
  </br>
</details>

<details>
  <summary><strong>GET /talkers/:id</strong></summary>
  </br>
  • Traz um talker por id do banco de dados.
  </br>
</details>

<details>
  <summary><strong>POST /talkers</strong></summary>
  </br>
  • Cadastra um novo talker (pessoa palestrante).
  </br>
  • Valida o token - req.authorization.
</details>

<details>
  <summary><strong>PUT /talkers/:id</strong></summary>
  </br>
  • Atualiza um talker por ID.
  </br>
  • Valida o token - req.authorization.
</details>

<details>
  <summary><strong>DELETE /talkers/:id</strong></summary>
   </br>
  • Deleta um talker por id do banco de dados.
  </br>
  • Valida o token - req.authorization.
</details>

#

## Tecnologias

- JavaScript
- Node.js
- Express.js
- Docker
