import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store, { loadFishes} from './store';
import { HashRouter as RoutyRoute, Route} from 'react-router-dom';
import fishes from './Fishes';
import Nav from './Nav';


class _App extends Component{
  componentDidMount(){
    this.props.bootstrap();
  }

  render(){
    return (
        <RoutyRoute>
      <div>
        <Route component={ Nav } />
        <Route component={ fishes } path='/'exact />
        
      </div>
      </RoutyRoute>
    );
  }
}

const App = connect(
 ({ fishes }) => ({ fishes }),
  (dispatch)=> {
    return {
      bootstrap: ()=> 
        dispatch(loadFishes())
      }; 
    }
)(_App);


render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));