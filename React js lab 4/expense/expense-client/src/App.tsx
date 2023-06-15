import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import ExpenseTracker from './component/ExpenseTracker';
import ShowList from './component/ShowList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/add' element={<ExpenseTracker onClose={()=>{}} onTrue={()=>{}}/>}></Route>
          <Route path='/' element={<ShowList/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
