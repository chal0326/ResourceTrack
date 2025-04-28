import React from 'react';
import { DataProvider } from './context/DataContext';
import Layout from './components/layout/Layout';

function App() {
  return (
    <DataProvider>
      <Layout />
    </DataProvider>
  );
}

export default App;