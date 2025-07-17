import { useState } from 'react'
import './App.css'
import { render, screen } from '@testing-library/react'


import ErrorBoundary from './components/ErrorBoundary';
import BugList from './components/buglist';

function App() {
  return (
    <div className="container">
      <h1>Bug Tracker</h1>
      <ErrorBoundary>
        <BugList />
      </ErrorBoundary>
    </div>
  );
}

export default App;