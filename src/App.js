import React from 'react';
import BeerTable from './components/BeerTable';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Beer App</h1>
        <BeerTable />
      </div>
    </Provider>
  );
}

export default App;
