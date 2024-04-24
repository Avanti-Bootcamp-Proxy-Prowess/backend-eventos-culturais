import express from 'express';

const app = express();

//teste
app.get("/mensage/:id", (request, response) => {
    response.send(`Id da menssagem: ${request.params.id}`);
})

const PORT = 3100;
app.listen(PORT, ( ) => console.log(`Server is  running on PORT ${PORT}`));