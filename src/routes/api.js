import express from 'express';
const router = express.Router();
import pool from '../database';
//import nodemailer from 'nodemailer';

router.get('/', async (req, res) => {
    const productos = await pool.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', p.descripcion AS 'descripcion' , p.especificaciones AS 'especificaciones', p.aplicaciones AS 'aplicaciones', p.folleto AS 'folleto', p.fotos AS 'fotos', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1");
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        productos
    });
});

router.get('/producto/:id', async (req, res) => {
    const { id } = req.params;
    const productos = await pool.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', p.descripcion AS 'descripcion' , p.especificaciones AS 'especificaciones', p.aplicaciones AS 'aplicaciones', p.folleto AS 'folleto', p.fotos AS 'fotos', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.id = ?", [id]);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        productos
    });
});

router.get('/pormarca/:id', async (req, res) => {
    const {id} = req.params;
    const productos = await pool.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', p.descripcion AS 'descripcion' , p.especificaciones AS 'especificaciones', p.aplicaciones AS 'aplicaciones', p.folleto AS 'folleto', p.fotos AS 'fotos', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.marcas_id = ?", [id]);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        productos
    });
});

router.get('/porcategoria/:id', async (req, res) => {
    const {id} = req.params;
    const productos = await pool.query("Select p.id AS 'id', p.nombre AS 'nombre', p.modelo AS 'modelo', p.descripcion AS 'descripcion' , p.especificaciones AS 'especificaciones', p.aplicaciones AS 'aplicaciones', p.folleto AS 'folleto', p.fotos AS 'fotos', m.titulo AS 'marca', c.titulo AS 'categoria' From productos p INNER JOIN marcas m on p.marcas_id = m.id INNER JOIN categorias c on c.id = p.categorias_id WHERE p.active= 1 AND p.categorias_id = ?", [id]);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        productos
    });
});

router.get('/marcas', async (req, res) => {
    const marcas = await pool.query('SELECT * FROM marcas WHERE active = 1');
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        marcas
    });
});

router.get('/marcas/:id', async (req, res) => {
    const { id } = req.params;
    const marcas = await pool.query('SELECT * FROM marcas WHERE active = 1 AND id = ?', [id]);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        marcas
    });
});

router.get('/categorias', async (req, res) => {
    const categorias = await pool.query('SELECT * FROM categorias WHERE active = 1');
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        categorias
    });
});

router.get('/categorias/:id', async (req, res) => {
    const { id } = req.params;
    const categorias = await pool.query('SELECT * FROM categorias WHERE active = 1 AND id = ?', [id]);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        categorias
    });
});

router.get('/servicios', async (req, res) => {
    const servicios = await pool.query('SELECT * FROM servicios WHERE active = 1');
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        servicios
    });
});

router.get('/servicios/:id', async (req, res) => {
    const { id } = req.params;
    const servicios = await pool.query('SELECT * FROM servicios WHERE active = 1 AND id = ?', [id]);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        servicios
    });
});

router.get('/soluciones', async (req, res) => {
    const soluciones = await pool.query('SELECT * FROM soluciones WHERE active = 1');
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        soluciones
    });
});

router.get('/soluciones/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const soluciones = await pool.query('SELECT * FROM soluciones WHERE active = 1 AND id = ?', [id]);
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        soluciones
    });
});

router.get('/mail/:sender', async (req, res) => {
    const { sender } = req.params;
    var result = '';
    var fromQuery = '';
    fromQuery = fromQuery.concat('WebCustomer <', sender, '>');
    const api_key = '';
    const DOMAIN = 'mg.mechatronik-group.com';
    const mailgun = require("mailgun-js")({ apiKey: api_key, domain: DOMAIN });
    var data = {
        from: fromQuery,
        to: 'info@mechatronikgroup.com',
        subject: 'Mechatronik Site Customer',
        text: 'Estoy interesado en conseguir informacion a profundidad de mechatronik, sus servicios y-o productos, por favor responderme'
    };

    mailgun.messages().send(data, function (error, body) {
        if (error) {
            console.log(error);
        }
        result = 'success';
        console.log(body);
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        result
    });
});

export default router;