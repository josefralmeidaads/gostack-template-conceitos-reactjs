import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const loadRepositories = async() => {
      const response = await api.get('/repositories');
      console.log(response.data);
      setRepositories(response.data);
    }
    loadRepositories();
  }, [])

  const handleAddRepository = async() => {
    const response = await api.post('/repositories', {
      title: "Front-End ReactJS",
	    url: "https://github.com/rocketseat-education/gostack-template-conceitos-nodejs.git",
	    techs: ["Node.js", "Javascript", "Java"]
    })
    setRepositories([...repositories, response.data]);
  }

  const handleRemoveRepository = async(id) => {
      await api.delete(`/repositories/${id}`);
      const atualizado = repositories.filter( repo => repo.id !== id);
      setRepositories(atualizado);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repo => (
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
