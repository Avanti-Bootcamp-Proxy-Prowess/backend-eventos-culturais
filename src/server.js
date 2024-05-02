const express = require("express");

const swaggerUi = require("swagger-ui-express");

const routes = require("./routes");

const swaggerFile = require("./swagger.json");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

const PORT = 3100;
app.listen(PORT, () => console.log(`Server is  running on PORT ${PORT}`));