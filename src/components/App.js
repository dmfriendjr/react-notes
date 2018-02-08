import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './home/HomePage';
import Header from './common/Header';

class App extends React.Component {
  render() {
    return(
     <div>
       <Header/>
      <Switch>
        <Route exact path='/testing' component={Home}/>
      </Switch>
     </div> 
    );
  }
}

export default App;