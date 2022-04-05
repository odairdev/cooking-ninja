import { RecipeList } from "../../components/RecipeList"
import { useFetch } from "../../hooks/useFetch"

export function Home() {
  const {data, pending, error} = useFetch('http://localhost:3000/recipes')

  return (
    <div className="home">
      {pending && <p className="loading">Loading...</p>}
      {error && <p className="error">Could not fetch data.</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}