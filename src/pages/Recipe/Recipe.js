import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'

import './Recipe.css'
import { projectFirestore } from '../../firebase/config'

export function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    projectFirestore.collection('recipes').doc(id).get().then(doc => {
      if(doc.exists) {
        setIsPending(false)
        setData(doc.data())
      } else {
        setIsPending(false)
        setError('Could not find the recipe.')
      }
    })
  }, [id])

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
    </div>
  )
}