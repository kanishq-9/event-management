import './css/app.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import EventRegistration from './page/EventRegistration';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<EventRegistration />} />
        <Route path="*" element={<Navigate to="/login" replace/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
