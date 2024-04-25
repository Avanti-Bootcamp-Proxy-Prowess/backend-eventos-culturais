import express from "express";

import { routes } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(routes);

const PORT = 3100;
app.listen(PORT, () => console.log(`Server is  running on PORT ${PORT}`));