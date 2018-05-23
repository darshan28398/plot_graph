import React, { Component } from 'react';
import d3 from "d3";
import functionPlot from 'function-plot';

window.d3 = d3;

class Graph extends Component {
  constructor(props){
    super(props);
    this.state = {
      equation: '',
      boundaries: [-6,6],
      errorMessage: ''
    };
  }
  
  graphFunction = () => {
    if(this.state.equation) {
      try {
        functionPlot({
          target: '#quadratic-with-options',
          width: 400,
          height: 400,
          disableZoom: true,
          xAxis: {
            label: 'x - axis',
            domain: this.state.boundaries
          },
          yAxis: {
            label: 'y - axis'
          },
          data: [{
            fn: this.state.equation
          }]
        });
      }
      catch (e) {
        this.setState({
          errorMessage: 'Invalid input values'
        })
      }
    }
  };
  
  handleEquationChange = (event) => {
    const equation = event.target.value;
    if(equation) {
      this.setState({
        equation: equation,
        errorMessage: ''
      });
    }
  };
  
  handleBoundaryChange = (event) => {
    const boundaries = event.target.value;
    if(boundaries) {
      console.log(event.target.value);
      console.log(JSON.parse(event.target.value));
      this.setState({
        boundaries: boundaries,
        errorMessage: ''
      });
    }
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    const equation = event.target.elements.equation.value;
    const boundaries = event.target.elements.boundaries.value;
    if(equation) {
      this.setState({
        equation: equation,
        errorMessage: ''
      });
    }
    if(boundaries) {
      this.setState({
        boundaries: boundaries,
        errorMessage: ''
      });
    }
    this.graphFunction();
  };
  
  render() {
    return(
      <div>
        <h2 className="App-title">Graph</h2>
        { this.state.errorMessage && <p className="text-danger">{ this.state.errorMessage }</p>}
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="equation" className="question" onChange={this.handleEquationChange} required/>
          <label htmlFor="equation"><span>Equation...sin(x)</span></label>
          <input type="text" name="boundaries" className="question" onChange={this.handleBoundaryChange}/>
          <label htmlFor="boundaries"><span>Boundaries...[-6,6]</span></label>
          <button className="btn btn-outline-dark m-3">Draw</button>
        </form>
      </div>
    );
  }
}

export default Graph;