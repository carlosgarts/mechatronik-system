import express from 'express';
const router = express.Router();
import pool from '../database';
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('soluciones/add');
});

router.post('/add', async (req, res) => {
    const { titulo, descripcion, fotos} = req.body;
    const newSolucion = {
        titulo,
        descripcion,
        fotos
    };
    await pool.query('INSERT INTO soluciones set ?', [newSolucion]);
    req.flash('success', 'Solucion nuevo');
    res.redirect("/soluciones");
    console.log(newSolucion);
});

router.get('/', isLoggedIn, async(req, res) => {
    const soluciones = await pool.query('SELECT * FROM soluciones WHERE `active`= 1');
    res.render('soluciones/list', {soluciones});
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE soluciones SET `active`= 0 WHERE id = ?', [id]);
    req.flash('success', 'Solucion Alterada');
    res.redirect("/soluciones");
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const soluciones = await pool.query('SELECT * FROM soluciones WHERE id = ?', [id])
    res.render('soluciones/edit', {solucion: soluciones[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fotos} = req.body;
    const editSolucion = {
        titulo,
        descripcion,
        fotos
    };
    await pool.query('UPDATE soluciones SET ? WHERE id = ?', [editSolucion, id]);
    console.log(editSolucion);
    req.flash('success', 'Solucion editad0');
    res.redirect('/soluciones');
});

export default router;