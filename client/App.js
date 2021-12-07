import React from 'react';
import AllProducts from './components/AllProducts';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <AllProducts />
      <Routes />
    </div>
  );
};

export default App;
