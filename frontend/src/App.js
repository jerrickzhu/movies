import './App.css';
import Landing from "./components/Landing";
import Results from "./components/Results";
import { Route, Switch, withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">

    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route path='/search' component={Results}/>
    </Switch>
      
      
    </div>
  );
}

export default withRouter(App);
