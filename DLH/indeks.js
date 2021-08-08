//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//konfigurasi koneksi
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dlh_kotacimahi'
  });

//koneksi ke database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

  //set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));

//route untuk homepage
app.get('/',(req, res) => {
    let sql = "SELECT * FROM input_bpe";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.render('bpe_view',{
        results: results
      });
    });
  });

//route untuk insert data
app.post('/save',(req, res) => {
  let data = {nama_sungai: req.body.nama_sungai, titik_pantau: req.body.titik_pantau, periode_pemantauan: req.body.periode_pemantauan, koordinat: req.body.koordinat, waktu_sampling: req.body.waktu_sampling, konsentrasi_bod: req.body.konsentrasi_bod, debit_air: req.body.debit_air, beban_pencemar: req.body.beban_pencemar};
  let sql = "INSERT INTO input_bpe SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route untuk update data
app.post('/update',(req, res) => {
  let sql = "UPDATE input_bpe SET nama_sungai='"+req.body.nama_sungai+"', titik_pantau='"+req.body.titik_pantau+"', periode_pemantauan='"+req.body.periode_pemantauan+"', koordinat='"+req.body.koordinat+"', waktu_sampling='"+req.body.waktu_sampling+"', konsentrasi_bod='"+req.body.konsentrasi_bod+"', debit_air='"+req.body.debit_air+"', beban_pencemar='"+req.body.beban_pencemar+"' WHERE id_bpe="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route untuk delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM input_bpe WHERE id_bpe="+req.body.id_bpe+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

  //server listening
app.listen(8080, () => {
    console.log('Server is running at port 8080');
  });