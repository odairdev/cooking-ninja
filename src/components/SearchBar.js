import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SearchBar.css'

export function SearchBar() {
  const [term, setTerm] = useState('')
  const history = useHistory()

  const handleSearch = () => {
    history.push('/search?q=' + term)
  }

  return (
    <div className="searchbar">
      <input type="text" onChange={e => setTerm(e.target.value)} value={term}/>
      <button className='btn' onClick={handleSearch}>Search</button>
    </div>
  )
}