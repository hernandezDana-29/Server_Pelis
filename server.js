import express from 'express'; 

const server = express();
server.use(express.json());

server.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
  res.send('API votación pelis funcionando');
});

server.get('/hola', (req, res) => {
  res.json([{ Mensaje: 'Encontrado' }]);
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

server.get('/hola', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([{ Mensaje: 'Encontrado' }]));

});

 server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const peliculas = [
  { id: 1, Titulo: "Inception", Desccripcion: 'Una película de ciencia ficción dirigida por Christopher Nolan', votos: 0 }, 
  { id: 2, Titulo: "Orgullo y prejuicio", Desccripcion: 'Una pelicula de romance y drama basada en un libro', votos: 100 },
  { id: 3, Titulo: "Transformers 1", Desccripcion: 'Pelicua de ciencia ficcion y suspenso', votos: 90 },
  { id: 4, Titulo: "Frozen", Desccripcion: 'Pelicula infantil y drama sobre la vida de dos princesas', votos: 60 },
  { id: 5, Titulo: "A todos los chicos de los que me enamore", Desccripcion: 'Una película de romance adolescente sobre una chica que le escribe una carta a cada chico del que se enamoro', votos: 100 },
  { id: 6, Titulo: "Hoppers", Desccripcion: 'Pelicula infantil que narra como una chica trata de salvar un bosque ante la urbanizacion', votos: 99 },

];

server.get('/peliculas', (req, res) => {
  res.json(peliculas);
});

