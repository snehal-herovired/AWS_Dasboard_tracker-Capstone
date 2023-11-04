import "./App.css";
import HomePage from "./Components/Pages/HomePage";
import Dashboard from "./Components/Pages/Dashboard";
import NoPage from './Components/Pages/NoPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie] = useCookies(['user']);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
           
              <Route path='/' element={<HomePage cookies={cookies} setCookie={setCookie} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NoPage/>} />
           
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
