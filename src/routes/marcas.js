import express from 'express';
const router = express.Router();
import pool from '../database';
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('marcas/add');
});

router.post('/add', async (req, res) => {
    const { titulo, descripcion, logo, imagen} = req.body;
    const newMarca = {
        titulo,
        descripcion,
        logo,
        imagen
    };
    await pool.query('INSERT INTO marcas set ?', [newMarca]);
    req.flash('success', 'Marca nueva');
    res.redirect("/marcas");
    console.log(newMarca);
});

router.get('/', isLoggedIn, async(req, res) => {
    const marcas = await pool.query('SELECT * FROM marcas WHERE active = 1');
    res.render('marcas/list', {marcas});
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE marcas SET `active`= 0 WHERE id = ?', [id]);
    req.flash('success', 'Link Alterado');
    res.redirect("/marcas");
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const marcas = await pool.query('SELECT * FROM marcas WHERE id = ?', [id])
    res.render('marcas/edit', {marca: marcas[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, logo, imagen} = req.body;
    const editMarca = {
        titulo,
        descripcion,
        logo,
        imagen
    };
    await pool.query('UPDATE marcas SET ? WHERE id = ?', [editMarca, id]);
    console.log(editMarca);
    req.flash('success', 'Marca editada');
    res.redirect('/marcas');
});

export default router;