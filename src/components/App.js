import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './home/HomePage';
import Header from './common/Header';
import Note from './note/Note';

class App extends React.Component {
  render() {
    return(
     <div className="container-responsive h-100">
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/note" component={Note}/>
      </Switch>
     </div> 
    );
  }
}

export default App;