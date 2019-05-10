import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
//import EditForm from './components/EditForm';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  add = (e, i) => {
    e.preventDefault();
    axios
      .post('http://localhost:3333/smurfs', i)
    .then(res => {
      this.setState({ smurfs: res.data })
      this.props.history.push('/');
    })
    .catch(error => {
      console.log(error)
    })
  }

  delete = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
    .then(res => {
      this.setState({ smurfs: res.data })
    })
    .catch(error => {
      console.log(error);
    })
  }

  edit = (e, i) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3333/smurfs/${i.id}`, i)
    .then(res => {
      this.setState({ smurfs: res.data })
    })
    .catch(error => {
      console.log(error);
    })
    this.props.history.push('/')
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
    .then(res => this.setState({ smurfs: res.data }))
    .catch(error => console.log(error))
  }
  render() {
    return (
    <div className="App">
      <ul className="navbar">
        <li>
          <NavLink exact to="/" activeClassName="activeNavButton">
          View the Smurfs
          </NavLink>
        </li>
        <li>
          <NavLink to="/smurf-form" activeClassName="activeNavButton">
          Add a new Smurf
          </NavLink>
        </li>
      </ul>
      <Route exact
          path="/smurf-form"
          render= {props => (
            <SmurfForm
              {...props}
              add={this.add}
            />
          )}
        />
        <Route exact
          path="/"
          render= {props => (
            <Smurfs
              {...props}
              delete={this.delete}
              smurfs={this.state.smurfs}
            />
          )}
        />
      </div>
    );
    
  }
}

export default App;
