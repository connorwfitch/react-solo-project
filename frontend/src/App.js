// External modules
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

// Internal modules
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash";
import NewStory from "./components/StoryComponents/NewStory";
import Stories from "./components/StoryComponents/Stories";
import LoginPage from "./components/LoginFormModal/LoginPage";
import SignupPage from "./components/SignupFormModal/SignupPage";
import StoryDetail from "./components/StoryComponents/StoryDetail";

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
        <Route exact path='/stories/:storyId'>
          <StoryDetail />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>
        <Route>
          <h1>Not Found.</h1>
        </Route>
      </Switch>}
    </>
  );
}

export default App;