import express from 'express';
const router = express.Router();
import pool from '../database';
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('categorias/add');
});

router.post('/add', async (req, res) => {
    const { titulo, descripcion, imagen} = req.body;
    const newCategoria = {
        titulo,
        descripcion,
        imagen
    };
    await pool.query('INSERT INTO categorias set ?', [newCategoria]);
    req.flash('success', 'Categoria nueva');
    res.redirect("/categorias");
    console.log(newCategoria);
});

router.get('/', isLoggedIn, async(req, res) => {
    const categorias = await pool.query('SELECT * FROM categorias WHERE active = 1');
    res.render('categorias/list', {categorias});
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE categorias SET `active`= 0 WHERE id = ?', [id]);
    req.flash('success', 'Link Alterado');
    res.redirect("/categorias");
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const categorias = await pool.query('SELECT * FROM categorias WHERE id = ?', [id])
    res.render('categorias/edit', {categoria: categorias[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, imagen} = req.body;
    const editCategoria = {
        titulo,
        descripcion,
        imagen
    };
    await pool.query('UPDATE categorias SET ? WHERE id = ?', [editCategoria, id]);
    console.log(editCategoria);
    req.flash('success', 'Categoria editada');
    res.redirect('/categorias');
});

export default router;