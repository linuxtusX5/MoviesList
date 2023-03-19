import React, {useState} from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import AddReview from './components/add-review';
import Movieslist from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';

import { Navbar, Nav } from 'react-bootstrap';
const App = () => {
  const [user, setUser] = useState(null)

  async function login(user = null){
    setUser(user)
  }
  async function Logout(){
    setUser(null)
  }
  return (
  <div>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to={"/movies"}>Movie</Link>
          </Nav.Link>
          <Nav.Link>
            {user?(
              <a onClick={Logout}>Logout User</a>
            ) : (
              <Link to={"/login"}>Login</Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Switch>
      <Route exact path={["/", "/movies"]} component={Movieslist}>
      </Route>
      <Route path="/movies/:id/review" render={(props)=>
      <AddReview {...props} user={user} />
      }>
      </Route>
      <Route path="/movies/:id/" render={(props)=>
      <Movie {...props} user={user} />
      }>
      </Route>
      <Route path="/login" render={(props)=>
      <Login {...props} login={login} />
      }>
      </Route>
    </Switch>
  </div>
  )
}

export default App;
