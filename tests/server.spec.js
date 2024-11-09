const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  describe("Ruta GET", () => {
    it("ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
      const response = await request(server).get("/cafes");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Ruta DELETE", () => {
    it("se obtiene un código 404 al intentar eliminar un café con un id que no existe", async () => {
      const jwt = "token";
      const idProductoEliminar = "6";
      const { statusCode } = await request(server)
        .delete(`/cafes/${idProductoEliminar}`)
        .set("Authorization", jwt)
        .send();
      expect(statusCode).toBe(404);
    });
  });

  describe("RUTA POST", () => {
    it("ruta /cafes agrega un nuevo café y devuelve un código 201", async () => {
      const id = Math.floor(Math.random() * 999);
      const nuevoCafe = { id, nombre: "Cafe nuevo" };
      const response = await request(server).post("/cafes").send(nuevoCafe);
      expect(response.body).toContainEqual(nuevoCafe);
      expect(response.status).toBe(201);
    });
  });

  describe("RUTA PUT", () => {
    it("ruta /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
      const nuevoCafe = { id: 3, nombre: "Cafe nuevo" };
      const response = await request(server).put("/cafes/2").send(nuevoCafe);
      expect(response.status).toBe(400);
    });
  });
});
