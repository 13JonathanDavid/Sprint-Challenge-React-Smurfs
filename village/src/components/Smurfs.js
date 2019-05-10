import React, { Component } from 'react';

import Smurf from './Smurf';

class Smurfs extends Component {
  deleteSmurf(e,id){
    e.preventDefault();
    this.props.delete(e,id);
    }
  render() {
    return (
      <div className="Smurfs">
        <h1>Smurf Village</h1>
        <ul>
          {this.props.smurfs.map(smurf => {
            return (
              <div>
              <Smurf
                name={smurf.name}
                id={smurf.id}
                age={smurf.age}
                height={smurf.height}
                key={smurf.id}
              />
              <button onClick={(e)=>this.deleteSmurf(e,smurf.id)}>X</button></div>
            );
          })}
        </ul>
      </div>
    );
  }
}

Smurf.defaultProps = {
 smurfs: [],
};

export default Smurfs;
