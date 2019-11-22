import express from 'express';
const router = express.Router();
import pool from '../database';
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('servicios/add');
});

router.post('/add', async (req, res) => {
    const { titulo, descripcion, fotos} = req.body;
    const newServicio = {
        titulo,
        descripcion,
        fotos
    };
    await pool.query('INSERT INTO servicios set ?', [newServicio]);
    req.flash('success', 'Servicio nuevo');
    res.redirect("/servicios");
    console.log(newServicio);
});

router.get('/', isLoggedIn, async(req, res) => {
    const servicios = await pool.query('SELECT * FROM servicios WHERE `active`= 1');
    res.render('servicios/list', {servicios});
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE servicios SET `active`= 0 WHERE id = ?', [id]);
    req.flash('success', 'Servicio Alterado');
    res.redirect("/servicios");
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const servicios = await pool.query('SELECT * FROM servicios WHERE id = ?', [id])
    res.render('servicios/edit', {servicio: servicios[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fotos} = req.body;
    const editServicio = {
        titulo,
        descripcion,
        fotos
    };
    await pool.query('UPDATE servicios SET ? WHERE id = ?', [editServicio, id]);
    console.log(editServicio);
    req.flash('success', 'Servicio editad0');
    res.redirect('/servicios');
});

export default router;