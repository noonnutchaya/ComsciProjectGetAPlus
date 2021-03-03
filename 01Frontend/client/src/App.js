
import './App.css';
import TestCallAPI from './TestCallAPI';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './page/Homepage'
import Welcome from './page/Welcome'
import A4 from './type/A4'
import Poster from './type/Poster'
import Card from './type/Card'
import Envelope from './type/Envelope'
import Flayer from './type/Flayer'
import FourPages from './type/FourPages'
import Order from './Order/Order'
import Finish from './Finish/Finish'
import Status from './status/Status'


function App() {
  return (
  
      // <div> <Welcome/></div>
    <Router>
    <Switch>
      {/* <Route exact path='/' component={Order} />
      <Route path='/welcome' component={Welcome}/> */}
      <Route exact path='/' component={HomePage} />
      <Route path='/welcome' component={Welcome}/>
      <Route path='/a4' component={A4}/>
      <Route path='/poster' component={Poster}/>
      <Route path='/card' component={Card}/>
      <Route path='/envelope' component={Envelope}/>
      <Route path='/flayer' component={Flayer}/>
      <Route path='/4pages' component={FourPages}/>
      <Route path='/Finish' component={Finish}/>
      <Route path='/Status' component={Status}/>
     </Switch>
  </Router>
  );
}

export default App;
