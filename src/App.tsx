import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import './themes/common.css';
import './themes/ui.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:path" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;