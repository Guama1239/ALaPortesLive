import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import NavBar from './components/navBar';
import SplashScreen from './components/Splashscreen';
import Vendors from './components/Vendors/Vendors'
import NoMatch from "./components/NoMatch/NoMatch";
import Flight from "./components/Flight"
import Cart from "./components/Cart"


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar />
<<<<<<< HEAD
            <Switch>
=======
            <Switch>         
>>>>>>> 285b38a4f3c53a9b1366550a7338a1078d863c5f
            {/* <div>
            <Vendors />
            </div> */}
            <Route exact path="/" component={SplashScreen} />
            {/* <Route component={NoMatch} /> */}
            <Route exact path="/flight" component={Flight} />
            <Route exact path="/cart" component={Cart} />
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
  }
}

export default App;
  }
}

export default App;
