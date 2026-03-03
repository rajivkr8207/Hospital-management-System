// const swaggerJsDoc = require("swagger-jsdoc");
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description:
        "Hospital management backend with authentication",
    },

    servers: [
      {
        url: "http://localhost:8000",
      },
    ],

    tags: [
      { name: "Auth", description: "Authentication routes" },
    //   { name: "Tasks", d1escription: "Hospital management routes" },
    //   { name: "Dashboard", description: "Dashboard analytics" },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
