
import './App.css';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Form from './Components/Form';

function App() {
  return (
    <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Form/>}/>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
