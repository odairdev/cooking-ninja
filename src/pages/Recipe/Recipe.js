import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

import './Recipe.css'

export function Recipe() {
  const { id } = useParams()
  const {data: recipe, error, pending} = useFetch(`http://localhost:3000/recipes/${id}`)

  return (
    <div className="recipe">
      {pending && <p className='loading'>Loading...</p>}
      {error && <p className='error'>Could not fetch data.</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to make.</p>
          <ul>
            {recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  )
}