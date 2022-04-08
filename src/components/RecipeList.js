import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { projectFirestore } from '../firebase/config'

import './RecipeList.css'
import deleteIcon from '../assets/delete-icon.svg'


export function RecipeList({ recipes }) {
  const { color, mode } = useTheme()

  if(recipes.length === 0) {
    return <div className='error'>No recipes to load...</div>
  }

  const handleDelete = (id) => {
    projectFirestore.collection('recipes').doc(id).delete()
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div className={`card ${mode}`} key={recipe.id}>
          <h3 style={{color: color}}>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link style={{color: color}} to={`/recipe/${recipe.id}`}>Cook This</Link>
          <img alt='Delete icon' src={deleteIcon} className="delete" onClick={() => handleDelete(recipe.id)} />
        </div>
      ))}
    </div>
  )
}