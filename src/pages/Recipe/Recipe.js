import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

import './Recipe.css'

export function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot(doc => {
      if(doc.exists) {
        setIsPending(false)
        setData(doc.data())
      } else {
        setIsPending(false)
        setError('Could not find the recipe.')
      }
    }, err => {
      console.log(err.message)
    })

    return () => unsub()
  }, [id])

  const handleUpdate = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Update function working'
    })
  }

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <p className='loading'>Loading...</p>}
      {error && <p className='error'>Could not fetch data.</p>}
      {data && (
        <>
          <h2 className={`page-title ${mode}`}>{data.title}</h2>
          <p>Takes {data.cookingTime} to make.</p>
          <ul>
            {data.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
          </ul>
          <p className="method">{data.method}</p>
        </>
      )}
      <button className="btn" onClick={handleUpdate}>Update Recipe</button>
    </div>
  )
}