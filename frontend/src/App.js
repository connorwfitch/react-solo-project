// External modules
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

// Internal modules
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import NewStory from "./components/NewStory";
import Stories from "./components/Stories";
import LoginPage from "./components/LoginFormModal/LoginPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && 
      <Switch>
        <Route exact path='/'>
          <Splash />
        </Route>
        <Route exact path='/stories'>
          <Stories />
        </Route>
        <Route exact path='/stories/new'>
          <NewStory />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route>
          <h1>Not Found.</h1>
        </Route>
      </Switch>}
    </>
  );
}

export default App;