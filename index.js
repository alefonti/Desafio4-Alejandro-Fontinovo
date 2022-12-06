const express = require("express");
const app = express();
const productosRouter = express.Router();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const productos = [];

productosRouter.get("/", (req, res) => {
    res.json(productos);
});

productosRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const productoById = productos.find((product) => product.id == id);
    productoById ? res.json(productoById) : res.json({"Error": "Producto No Encontrado"});
});

productosRouter.post("/", (req, res) => {
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length + 1;
    productos.push(nuevoProducto);
    res.json(nuevoProducto);
});

productosRouter.put("/:id", (req, res) => {
    const id = req.params.id;
    const index = productos.findIndex((product) => product.id == id);
    if (index !== -1) {
        productos[index] = req.body;
        productos[index].id = id;
        res.send("Producto actualizado con éxito");
    } else {
        res.json({"Error": "Producto No Encontrado"});
    }   
});

productosRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const index = productos.findIndex((product) => product.id == id);
    if (index !== -1) {
        productos.splice(index, 1)
        for(let i=0; i < productos.length; i++) {
            productos[i].id = i + 1;
        }
        res.send("Producto eliminado con éxito");
    } else {
        res.json({"Error": "Producto No Encontrado"})
    }   
})





app.use("/api/productos", productosRouter);

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto: ${PORT}`));