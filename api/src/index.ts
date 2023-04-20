import bodyParser from "body-parser";
import express from "express";

import { searchMetrics } from "./services/searchMetrics";
import { compareMetrics } from "./services/compareMetrics";

const PORT = process.env.PORT || 4000;

// Express server configuration
const app = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Routes
app.post("/api/metrics", searchMetrics);
app.post("/api/compare", compareMetrics);

app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`)
);
