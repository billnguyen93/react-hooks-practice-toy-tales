import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(resp => resp.json())
      .then(setToys)
  }, [])

  function handleAddToy(newToy) {
    setToys([...toys, newToy])
  }

  function handleDeleteToy(toyToDelete) {
    const updatedToys = toys.filter((toy) => toy.id !== toyToDelete.id);
    setToys(updatedToys)
  }

  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) => 
    toy.id === updatedToy.id ? updatedToy : toy)
    setToys(updatedToys)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}  
      />
    </>
  );
}

export default App;
