import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Admin from './Pages/Admin/Admin';
import Home from './Pages/Home/Home';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/admin' component={Admin} />
      </Switch>
    </>
  );
}

export default App;
