import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { RecipeList } from '../../components/RecipeList'

import './Search.css'

export function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  const {data: recipes, error, pending} = useFetch('http://localhost:3000/recipes?q=' + query)

  return (
    <div className="search">
      {pending && <p className='loading'>Loading...</p>}
      {error && <p className='error'>Could not fetch recipes.</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  )
}