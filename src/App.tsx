import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import TV from "./Routes/TV";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={["/", "/movies/:movieId"]} exact>
          <Home />
        </Route>
        <Route path={["/tv", "/tv/:tvId"]}>
          <TV />
        </Route>
        <Route path={"/search"}>
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
