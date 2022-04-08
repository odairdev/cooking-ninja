import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { projectFirestore } from "../../firebase/config"

import './Create.css'

export function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState('')
  const [newIngredientError, setNewIngredientError] = useState(false)
  const newIngredientRef = useRef(null)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes'
    }

    try {
      await projectFirestore.collection('recipes').add(doc)
      history.push('/')
    } catch(err) {
      console.log(err)
    }
  }

  const handleAddNewIngredient = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if(ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => {
        return [...prevIngredients, ing]
      })
      setNewIngredientError(false)
    } else {
      setNewIngredientError(true)
    }
    setNewIngredient('')
    newIngredientRef.current.focus()
  }

  return (
    <div className="create">
      <h2 className='page-title'>Add a new Recipe</h2>
      <form onSubmit={handleSubmit}>
      <label>
        <span>Recipe Title</span>
        <input type="text" onChange={e => setTitle(e.target.value)} value={title} required/>
      </label>
      <label>
        <span>Ingredients</span>
        <div className="ingredients">
          <input type="text" onChange={e => setNewIngredient(e.target.value)} value={newIngredient} ref={newIngredientRef}/>
          <button className='btn' onClick={handleAddNewIngredient}>Add</button>
        </div>
        {newIngredientError && <p className='ing-error'>Ingredient already added.</p>}
        <p>Ingredients: {ingredients.map(ing => <em key={ing}>{ing}, </em>)}</p>
      </label>
      <label>
        <span>Cooking Method</span>
        <textarea onChange={e => setMethod(e.target.value)} value={method} />
      </label>
      <label>
        <span>Cooking Time</span>
        <input type="number"  onChange={e => setCookingTime(e.target.value)} value={cookingTime}/>
      </label>

      <button className='btn'>Submit</button>
    </form>
    </div>
  )
}