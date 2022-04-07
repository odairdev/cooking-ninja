import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from './pages/Home/Home'
import { Create } from "./pages/Create/Create";
import { Search } from './pages/Search/Search'

import "./App.css";
import { Recipe } from "./pages/Recipe/Recipe";
import { NavBar } from "./components/Navbar";
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider>
        <NavBar />
        <Switch>
          <Route path={'/'} exact>
            <Home />
          </Route>
          <Route path={'/create'}>
            <Create />
          </Route>
          <Route path={'/search'}>
            <Search />
          </Route>
          <Route path={'/recipe/:id'}>
            <Recipe />
          </Route>
        </Switch>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
