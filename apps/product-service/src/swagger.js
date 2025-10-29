import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Product service API",
    description: "Automatically generated swagger docs",
    version: "1.0.0",
  },
  host: "localhost:6002/product/api",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endPointsFiles = ["./routes/product.route.ts"];

swaggerAutogen()(outputFile, endPointsFiles, doc);
