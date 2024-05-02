## 📓 Sobre o projeto

Backend de uma plataforma web de gerenciamento de eventos culturais. A plataforma permite aos usuários criar, listar, pesquisar e filtrar
eventos de forma eficaz.

## 🛠️ Tecnologias
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,prisma,postgres,js,nodejs" />
  </a>
</p>

- Git: Sistema de controle de versão distribuído amplamente usado para rastrear mudanças no código fonte durante o desenvolvimento de software.
- Prisma: Ferramenta de ORM (Object-Relational Mapping) para Node.js, facilita a interação com bancos de dados relacionais como PostgreSQL através de uma interface de programação amigável.
- PostgreSQL: Sistema de Gerenciamento de Banco de Dados relacional de código aberto.
- JavaScript (JS): Linguagem de programação utilizada para desenvolvimento do backend.
- Nodejs: ambiente de execução de código JavaScript do lado do servidor,

## Para  rodar o projeto
### É necessário ter o [Nodejs](https://nodejs.org/en/download) e [Postgres](https://www.postgresql.org/download/) instalados na máquina.
- clone o repositório
```bash
git clone https://github.com/queziafiladelfo/backend-eventos-culturais.git
```
- instale as dependências
```bash
npm install
```
- renomei o arquivo ".env-exemplo" para ".env" e configure a variável "DATABASE_URL" de acordo com as configurações do seu computador
```javascript
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
- Atualize as migrattions do banco de dados
```bash
npx prisma migrate dev
```
- rode a API
```bash
npm run dev
```
*obs.: o postgres deve estar iniciado*

## Documentação API
A documentação foi desenvolvida utilizando a biblioteca do swagger. 
Para acessar:
- 1º rode a API
```bash
npm run dev
```
- 2º No seu navegador acesse a rota "/api-docs"

   ![](https://github.com/queziafiladelfo/backend-eventos-culturais/blob/main/imgsReadme/url_API.PNG)

   *obs.: o número da porta pode mudar de acordo com a porta específicada no arquivo server.js*
- 3º Deve aparecer da seguinte forma no navegador depois de acessar a rota
  
  ![](https://github.com/queziafiladelfo/backend-eventos-culturais/blob/main/imgsReadme/API_doc.PNG)
  


