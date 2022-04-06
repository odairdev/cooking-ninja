import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from './pages/Home/Home'
import { Create } from "./pages/Create/Create";
import { Search } from './pages/Search/Search'

import "./App.css";
import { Recipe } from "./pages/Recipe/Recipe";
import { NavBar } from "./components/Navbar";
import { ThemeSelector } from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <NavBar />
        <ThemeSelector />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
