import React from "react";
import "../style/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Singers from "./Singers";
import Spotify from "./Spotify";
import Billboard from "./Billboard";
import Underrated from "./Underrated";
import ByGenres from "./ByGenres";
import ByStream from "./ByStream";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/home" render={() => <Home />} />
            <Route path="/singers" render={() => <Singers />} />

            <Route path="/spotify_exclusive" render={() => <Spotify />} />

            <Route path="/billboard_exclusive" render={() => <Billboard />} />

            <Route path="/hidden_gems" render={() => <Underrated />} />
            <Route path="/bygenre" render={() => <ByGenres />} />
            <Route path="/bystreams" render={() => <ByStream />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
