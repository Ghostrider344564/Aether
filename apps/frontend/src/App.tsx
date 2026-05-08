import React, { useState, useEffect } from 'react';
import WorkflowCanvas from './components/WorkflowCanvas';
import AuthPage from './components/AuthPage';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  if (!token) {
    return <AuthPage onLogin={(t) => setToken(t)} />;
  }

  return (
    <div className="App">
      <WorkflowCanvas />
    </div>
  );
}

export default App;
