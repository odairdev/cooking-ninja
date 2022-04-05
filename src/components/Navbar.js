import { Link } from "react-router-dom";
import { SearchBar } from '../components/SearchBar'
import './Navbar.css'


export function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <Link to={'/'} className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <SearchBar />
        <Link to={'/create'}>
          Create Recipe
        </Link>
        
      </nav>
    </div>
  )
}