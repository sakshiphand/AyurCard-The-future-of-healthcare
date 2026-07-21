import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './components/Notification';

function App() {
  return (
    <Toaster>
      <div className="App">
        <AppRoutes />
      </div>
    </Toaster>
  );
}

export default App;