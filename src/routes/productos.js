import express from 'express';
const router = express.Router();
import pool from '../database';
const { isLoggedIn } = require('../lib/auth');

router.get('/add', async (req, res) => {
    const categorias = await pool.query('SELECT * FROM categorias WHERE active = 1');
    const marcas = await pool.query('SELECT * FROM marcas WHERE active = 1');
    res.render('productos/add', {categorias, marcas});
});

router.post('/add', async (req, res) => {
    const { nombre, modelo, descripcion, especificaciones, aplicaciones, folleto, fotos, marcas_id, categorias_id } = req.body;
    const newProducto = {
        nombre,
        modelo,
        descripcion,
        especificaciones,
        aplicaciones,
        folleto,
        fotos,
        marcas_id,
        categorias_id
    };
    await pool.query('INSERT INTO productos set ?', [newProducto]);
    req.flash('success', 'Producto nuevo');
    res.redirect("/productos");
    console.log(newProducto);
});

router.get('/', isLoggedIn, async(req, res) => {
    const productos = await pool.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1");
    res.render('productos/list', {productos});
});

router.get('/marca/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const productos = await pool.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.marcas_id = ?", [id]);
    res.render('productos/list', {
        productos
    });
});

router.get('/categoria/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const productos = await pool.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.categorias_id = ?", [id]);
    res.render('productos/list', {
        productos
    });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE productos SET `active`= 0 WHERE id = ?', [id]);
    req.flash('success', 'Producto Alterado');
    res.redirect("/productos");
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const categorias = await pool.query('SELECT * FROM categorias WHERE 1');
    const marcas = await pool.query('SELECT * FROM marcas WHERE 1');
    const productos = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    res.render('productos/edit', {
                producto: productos[0],
                categorias: categorias,
                marcas: marcas
    });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, modelo, descripcion, especificaciones, aplicaciones, folleto, fotos} = req.body;
    const editProducto = {
        nombre,
        modelo,
        descripcion,
        especificaciones,
        aplicaciones,
        folleto,
        fotos
    };
    await pool.query('UPDATE productos SET ? WHERE id = ?', [editProducto, id]);
    console.log(editProducto);
    req.flash('success', 'Producto editad0');
    res.redirect('/productos');
});

export default router;