import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Auth setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
<Auth />