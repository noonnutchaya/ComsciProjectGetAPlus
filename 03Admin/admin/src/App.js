import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ShowOrderPage from './ShowOrderPage';
import ShowAcceptPage from './ShowAcceptPage';
import ShowRejectPage from './ShowRejectPage';



function App() {
  return (
    // <div >
    //   <ShowOrderPage/>
    // </div>
    <Router>
    <Switch>
      <Route exact path='/' component={ShowOrderPage} />
      <Route path='/Order' component={ShowOrderPage}/>
      <Route path='/Accept' component={ShowAcceptPage}/>
      <Route path='/Reject' component={ShowRejectPage}/>
     </Switch>
  </Router>
  );
}

export default App;
