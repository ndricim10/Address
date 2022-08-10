import HomePage from "./Components/HomePage";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import SingleAddress from "./Components/SingleAddress";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>

          <Route
            path="/"
            element={
              // <Layout>
              <HomePage
              />
            }
          />

          <Route
            path="/address/:id"
            element={
              // <Layout>
              <SingleAddress
              />
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
