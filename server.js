const express = require('express');
const { static } = express;
const app = express();
const path = require('path');

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/fishes', async(req, res, next)=> {
    try {
      res.send(await Fish.findAll({
      order: [
        [stars, 'DESC']
      ]
      }));
    }
    catch(ex){
      next(ex);
    }
  });

  app.post('/api/fishes', async(req, res, next)=> {
    try {
      res.status(201).send(await Fish.create(req.body));
    }
    catch(ex){
      next(ex);
    }
  });

  app.delete('/api/fishes/:id', async(req, res, next)=> {
    try {
        const fish = await Fish.findByPk(req.params.id);
        await fish.destroy();
      res.sendStatus(204)
    
    }
    catch(ex){
      next(ex); 
    }
  });

  app.put("/api/fishes/:id", async (req, res, next) => {
    try {
      const fish = await Fish.findByPk(req.params.id);
      await fish.update(req.body);
      res.send(fish);
    } catch (err) {
      next(err);
    }
  });


  const init = async()=> {
    try {
      await syncAndSeed();
      const port = process.env.PORT || 8000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  }
  
  const Sequelize = require('sequelize');
  const { STRING, INTEGER } = Sequelize;
  const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/omakase_db');
  
  const Fish = conn.define('fish', {
    name: STRING,
    stars: { type: INTEGER,
      validate: {
        max: 5,
        min: 1,
      },
       defaultValue: 3}
  });
  
  const syncAndSeed = async()=> {
    await conn.sync({ force: true });
  
       
  };




init();