const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

let app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {

  let { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {

  const { title, url, techs } = request.body;
  let { id } = request.params;

  let repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex < 0){
    return response.status(400).json({message:"repository not found"})

  }

   id = repositories[repoIndex].id;

  let repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories[repoIndex] = repository
  return response.json( repositories[repoIndex])
});

app.delete("/repositories/:id", (request, response) => {
  
  const {id} = request.params;

  let repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex <0){
    return response.status(400).json({message: "repository not found"})
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).json(repositories[repoIndex])
});

app.post("/repositories/:id/like", (request, response) => {
  
  const {id} = request.params;
  const{url} = request.url;

  const repoIndex = repositories.findIndex(repo => repo.id == id)

  if(repoIndex< 0 ){
    return response.status(400).json({message: "repository not found"})
  }

  repositories[repoIndex].likes += 1;

  return response.json(repositories[repoIndex])
});

module.exports = app;
