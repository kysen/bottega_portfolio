import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";

const App = (props) => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")
  Icons();
  useEffect(() => {
    checkLoginStatus();
  }, [])



  const handleSuccessfulLogin = () => {
    setLoggedInStatus("LOGGED_IN")
  }
  const handleUnsuccessfulLogin = () => {
    setLoggedInStatus("NOT_LOGGED_IN")
  }
  const handleSuccessfulLogout = () => {
    setLoggedInStatus("NOT_LOGGED_IN")
  }

  const checkLoginStatus = () => {
    return axios
      .get("https://api.devcamp.space/logged_in", {
        withCredentials: true
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const logInStatus = loggedInStatus;

        if (loggedIn && logInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && logInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN")
        } else if (!loggedIn && logInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN")
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }




  const authorizedPages = () => {
    return [
      <Route
        key="portfolio-manager"
        path="/portfolio-manager"
        component={PortfolioManager}
      />
    ];
  }


  return (
    <div className="container">
      <Router>
        <div>
          <NavigationContainer
            loggedInStatus={loggedInStatus}
            handleSuccessfulLogout={handleSuccessfulLogout}
          />

          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              path="/auth"
              render={props => (
                <Auth
                  {...props}
                  handleSuccessfulLogin={handleSuccessfulLogin}
                  handleUnsuccessfulLogin={handleUnsuccessfulLogin}
                />
              )}
            />

            <Route path="/about-me" component={About} />
            <Route path="/contact" component={Contact} />

            <Route
              path="/blog"
              render={props => (
                <Blog {...props} loggedInStatus={loggedInStatus} />
              )}
            />

            <Route
              path="/b/:slug"
              render={props => (
                <BlogDetail
                  {...props}
                  loggedInStatus={loggedInStatus}
                />
              )}
            />

            {loggedInStatus === "LOGGED_IN"
              ? authorizedPages()
              : null}
            <Route
              exact
              path="/portfolio/:slug"
              component={PortfolioDetail}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );

}

export default App