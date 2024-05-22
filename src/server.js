const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");

const routes = require("./routes");

const swaggerFile = require("./swagger.json");

const uploadConfig = require("./configs/upload");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

const PORT = 3100;
app.listen(PORT, () => console.log(`Server is  running on PORT ${PORT}`));