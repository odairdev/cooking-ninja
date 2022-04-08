import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import './RecipeList.css'

export function RecipeList({ recipes }) {
  const { color, mode } = useTheme()

  if(recipes.length === 0) {
    return <div className='error'>No recipes to load...</div>
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div className={`card ${mode}`} key={recipe.id}>
          <h3 style={{color: color}}>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link style={{color: color}} to={`/recipe/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  )
}