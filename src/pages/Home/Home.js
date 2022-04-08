import { RecipeList } from "../../components/RecipeList"
import { useState, useEffect } from 'react'
import { projectFirestore } from "../../firebase/config"

export function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  console.log(process.env.API_KEY)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').onSnapshot(snapshot => {
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
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()
  }, [])

  return (
    <div className="home">
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">Could not fetch data.</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}