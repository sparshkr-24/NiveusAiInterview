import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import your Redux store
import NiveousHomePage from './pages/NiveusHomePage';
import NiveousInterviewTabsPage from './pages/NiveusInterviewTabsPage';
import Header from './ui/Header';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
          <Switch>
            <Route path="/" exact component={NiveousHomePage} />
            <Route path="/:slug" component={NiveousInterviewTabsPage} />
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
