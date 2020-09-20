const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'xiybwqfi',
  host: 'lallah.db.elephantsql.com',
  database: 'xiybwqfi',
  password: '2EA5rZ_hqeVRjI5mf0OpdezfgG8obZS7',
  port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  const { id } = req.body
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});


router.post('/actualizarpaciente', async (req, res) => {
  const { id, nombre, numid } = req.body;
  await pool.query(
    `UPDATE pacientes
     SET nombre = '${nombre}', numid= '${numid}'
     WHERE id = '${id}'`
  );
  res.send('PACIENTE ACTUALIZADO');
});


router.delete('/borrarpaciente', async (req, res) => {
  const { id } = req.body
  const { rows } = await pool.query(`DELETE FROM pacientes WHERE id='${id}'`);
  res.send('PACIENTE BORRADO');
});


router.put('/insertarpacientes', async (req, res) => {
  const { id, nombre, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(id, nombre, numid) VALUES('${id}','${nombre}','${numid}')`
  );
  res.send('INSERTADO');
});
