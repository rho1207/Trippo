/* eslint-disable import/no-webpack-loader-syntax */
import "./App.css";
import { useEffect } from 'react'
import ItineraryPage from "components/itineraryPage/ItineraryPage";
import Navbar from "./components/navBar/Navbar";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import WelcomePage from "components/welcomePage/WelcomePage";
import { setUser } from 'app/reducers/userSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ItinerariesView from "components/itinerariesView/ItinerariesView";

// Mapbox issue fix: https://github.com/mapbox/mapbox-gl-js/issues/10173#issuecomment-750489778
// @ts-ignore
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

function App() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`/api/v1/auth/current/user`, {
      method: "GET",
      credentials: 'include'
    })
    .then(status => status.json())
    .then(user => {
      console.log(user)
      if (user) {
        dispatch(setUser({isLoggedIn: true, ...user}));
      } else {
        dispatch(setUser({isLoggedIn: false}));
        history.push("/");
      }
    });
  },[dispatch, history])
  return (
    <>
    <Snackbar transitionDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={(user && !user.isLoggedIn) || user === null}>
        <Alert severity="error">
           Please sign up or log in to start creating itineraries
        </Alert>
    </Snackbar>
      <Navbar />
      <Switch>
        <Route exact path="/itinerary/:id" component={() => <ItineraryPage />} />
        <Route exact path="/" component={() => <WelcomePage />} />
        <Route exact path="/home" component={() => <ItinerariesView />} />
      </Switch>
    </>
  );
}

export default App;
