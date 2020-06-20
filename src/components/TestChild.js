import React, {Component} from 'react';

class TestChild extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
      return (
          <h1>{this.props.example}</h1>
      )
  }
}

export default TestChild;