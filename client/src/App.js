

import './App.css';
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
          <Routes>
          <Route path="/" element={<HomePage/>} />
        <Route path="/chats" element={<ChatPage/>} />
      </Routes>
 </div>
  );
}

export default App;
