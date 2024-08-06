import { useEffect, useState } from "react"
import NewPlantForm from "./NewPlantForm"
import PlantList from "./PlantList"
import Search from "./Search"

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetch("/plants")
      .then((r) => r.json())
      .then((plantsArray) => {
        setPlants(plantsArray)
      })
  }, [])

  function handleAddPlant(newPlant) {
    const updatedPlantsArray = [...plants, newPlant]
    setPlants(updatedPlantsArray)
  }

  function handleDeletePlant(id) {
    const updatedPlantsArray = plants.filter((plant) => plant.id !== id)
    setPlants(updatedPlantsArray)
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlantsArray = plants.map((plant) => {
      return plant.id === updatedPlant.id ? updatedPlant : plant
    })
    setPlants(updatedPlantsArray)
  }

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={displayedPlants} onDeletePlant={handleDeletePlant} onUpdatePlant={handleUpdatePlant} />
    </main>
  )
}

export default PlantPage
