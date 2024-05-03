## 📓 Sobre o projeto

Backend de uma plataforma web de gerenciamento de eventos culturais. A plataforma permite aos usuários criar, listar, pesquisar e filtrar
eventos de forma eficaz.

## 🛠️ Tecnologias
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,prisma,postgres,js,nodejs,express" />
  </a>
</p>

- **Git**: Sistema de controle de versão distribuído amplamente usado para rastrear mudanças no código fonte durante o desenvolvimento de software.
- **Prisma**: Ferramenta de ORM (Object-Relational Mapping) para Node.js, facilita a interação com bancos de dados relacionais como PostgreSQL através de uma interface de programação amigável.
- **PostgreSQL**: Sistema de Gerenciamento de Banco de Dados relacional de código aberto.
- **JavaScript (JS)**: Linguagem de programação utilizada para desenvolvimento do backend.
- **Nodejs**: ambiente de execução de código JavaScript do lado do servidor
- **Express**: framework para Node.js que fornece recursos mínimos para construção de servidores web.

## Para  rodar o projeto
### É necessário ter o [Nodejs](https://nodejs.org/en/download) e [Postgres](https://www.postgresql.org/download/) instalados na máquina.
- Clone o repositório
```bash
git clone https://github.com/queziafiladelfo/backend-eventos-culturais.git
```
- Instale as dependências
```bash
npm install
```
- Renomeie o arquivo ".env-exemplo" para ".env" e configure a variável "DATABASE_URL" de acordo com as configurações do seu computador, abaixo segue um os trechos que devem ser configurados a partir da exemplo dado 
   - **postgresql**: banco que está sendo utilizado
   - **johndoe**: nome de usuário que está conectado no seu banco de dados
   - **randompassword**: senha do banco de dados
   - **5432**: porta utilizada pelo banco
   - **mydb**: nome do banco utilizado
```javascript
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
- Atualize as migrattions do banco de dados
```bash
npx prisma migrate dev
```
- Rode a API
```bash
npm run dev
```
*obs.: o postgres deve ter sido iniciado*

## Documentação API
A documentação foi desenvolvida utilizando a biblioteca do swagger. 
Para acessar:
- 1º Rode a API
```bash
npm run dev
```
- 2º No seu navegador acesse a rota "/api-docs"

   ![](https://github.com/queziafiladelfo/backend-eventos-culturais/blob/main/imgsReadme/url_API.PNG)

   *obs.: o número da porta pode mudar de acordo com a porta específicada no arquivo server.js*
- 3º Deve aparecer da seguinte forma no navegador depois de acessar a rota
  
  ![](https://github.com/queziafiladelfo/backend-eventos-culturais/blob/main/imgsReadme/API_doc.PNG)
