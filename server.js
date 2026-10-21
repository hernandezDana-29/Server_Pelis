import express from 'express'; 

const server = express();
server.use(express.json());

server.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3000;


let peliculas = [
  { id: 1, Titulo: "Inception", Desccripcion: 'Una película de ciencia ficción dirigida por Christopher Nolan', votos: 0 }, 
  { id: 2, Titulo: "Orgullo y prejuicio", Desccripcion: 'Una pelicula de romance y drama basada en un libro', votos: 100 },
  { id: 3, Titulo: "Transformers 1", Desccripcion: 'Pelicua de ciencia ficcion y suspenso', votos: 90 },
  { id: 4, Titulo: "Frozen", Desccripcion: 'Pelicula infantil y drama sobre la vida de dos princesas', votos: 60 },
  { id: 5, Titulo: "A todos los chicos de los que me enamore", Desccripcion: 'Una película de romance adolescente sobre una chica que le escribe una carta a cada chico del que se enamoro', votos: 100 },
  { id: 6, Titulo: "Hoppers", Desccripcion: 'Pelicula infantil que narra como una chica trata de salvar un bosque ante la urbanizacion', votos: 0 },
];

server.get('/', (req, res) => {
  res.send('API votación pelis funcionando');
});

server.get('/hola', (req, res) => {
  res.json([{ Mensaje: 'Encontrado' }]);
});


server.get('/peliculas', (req, res) => {
  res.status(200).json(peliculas);
});


server.post('/vote/:id', (req, res) => {
  const id = Number(req.params.id);
  const peliculaEncontrada = peliculas.find(p => p.id === id);

  if (!peliculaEncontrada) {
    return res.status(404).json({ message: 'La película no existe' });
  }

  peliculaEncontrada.votos += 1; 

  return res.status(200).json({ message: "Voto registrado correctamente." });
});


server.get('/peliculas/:id', (req, res) => {
  const id = Number(req.params.id);
  const peli = peliculas.find((a) => a.id === id);

  if (!peli) {
    return res.status(404).json({ mensaje: `No existe la pelicula con id ${req.params.id}` });
  }

  res.status(200).json({
    id: peli.id,
    title: peli.Titulo,
    description: peli.Desccripcion,
    votes: peli.votos
  });
});


server.get('/resultado', (req, res) => {
  const peliculasOrdenadas = [...peliculas].sort((a, b) => b.votos - a.votos);
  res.status(200).json(peliculasOrdenadas);
});


server.post('/peliculas', (req, res) => {
  const { Titulo, Desccripcion } = req.body;

  if (!Titulo || !Desccripcion) {
    return res.status(400).json({ mensaje: 'El título y la descripción son obligatorios.' });
  }

  const nuevaPelicula = {
    id: peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1,
    Titulo,
    Desccripcion,
    votos: 0
  };

  peliculas.push(nuevaPelicula);
  res.status(201).json({ mensaje: 'Película creada con éxito', pelicula: nuevaPelicula });
});


server.put('/peliculas/:id', (req, res) => {
  const id = Number(req.params.id);
  const { Titulo, Desccripcion } = req.body;

  const pelicula = peliculas.find(p => p.id === id);

  if (!pelicula) {
    return res.status(404).json({ mensaje: 'No existe la película que deseas modificar.' });
  }

  if (Titulo) pelicula.Titulo = Titulo;
  if (Desccripcion) pelicula.Desccripcion = Desccripcion;

  res.status(200).json({ mensaje: 'Película actualizada con éxito', pelicula });
});


server.delete('/peliculas/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = peliculas.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'No existe la película que deseas eliminar.' });
  }

  if (peliculas[index].votos > 0) {
    return res.status(400).json({ 
      mensaje: 'No se puede eliminar la película porque ya tiene votos registrados.' 
    });
  }

  const peliculaEliminada = peliculas.splice(index, 1);
  res.status(200).json({ 
    mensaje: 'Película eliminada correctamente.', 
    pelicula: peliculaEliminada[0] 
  });
});


server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});