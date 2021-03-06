import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ShowOrderPage from './ShowOrderPage';
import ShowRejectPage from './ShowRejectPage';
import ShowPaymentPage from './ShowPaymentPage';
import ShowDoingPage from './ShowDoingPage';
import ShowDonePage from './ShowDonePage';
import ShowFinishPage from './ShowFinishPage';

function App() {
  return (
    // <div >
    //   <ShowOrderPage/>
    // </div>
    <Router>
    <Switch>
      <Route exact path='/' component={ShowOrderPage} />
      <Route path='/Order' component={ShowOrderPage}/>
      <Route path='/Payment' component={ShowPaymentPage}/>
      <Route path='/Doing' component={ShowDoingPage}/>
      <Route path='/Finish' component={ShowFinishPage}/>
      <Route path='/Done' component={ShowDonePage}/>
      <Route path='/Reject' component={ShowRejectPage}/>
     </Switch>
  </Router>
  );
}

export default App;
