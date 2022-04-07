import { RecipeList } from "../../components/RecipeList"
import { useState, useEffect } from 'react'
import { projectFirestore } from "../../firebase/config"

export function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    projectFirestore.collection('recipes').get().then(snapshot => {
      if(snapshot.empty) {
        setError('No recipes to load.')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()})
        })
        setData(results)
        setIsPending(false)
      }
    }).catch(err => {
      setError(err.message)
    })
  }, [])

  return (
    <div className="home">
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">Could not fetch data.</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}