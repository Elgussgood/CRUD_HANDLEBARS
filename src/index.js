const app =require('./app');

app.listen(app.get('port'));
console.log('Servidor en:', app.get('port'))