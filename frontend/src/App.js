import './App.css';
import Landing from "./components/Landing";
import Results from "./components/Results";
import Review from "./components/Review";
import { Route, Switch, withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">

    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route path='/search' component={Results}/>
      <Route path='/review' component={Review}/>
    </Switch>
      
      
    </div>
  );
}

export default withRouter(App);
