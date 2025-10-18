import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Auth service API",
    description: "Automatically generated swagger docs",
    version: "1.0.0",
  },
  host: "localhost:6001/api",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endPointsFiles = ["./routes/auth.routes.ts"];

swaggerAutogen()(outputFile, endPointsFiles, doc);
