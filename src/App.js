import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Dogs from './components/Dogs';
import AddDog from './components/AddDog';
import Home from './components/Home';
import useToken from './useToken';

function App() {
  const { token, setToken, getUser } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <div>
        <h1>
          Hello, {getUser().firstName}
        </h1>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/dogs">
            <Dogs />
          </Route>
          <Route path="/adddog">
            <AddDog />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
