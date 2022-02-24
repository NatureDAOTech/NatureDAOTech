import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Web3Provider } from "contexts/Web3Context"
import { useContext } from 'react';
import Home from 'pages/Home/index';
import Navbar from 'components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "components/Footer";
import ICO from "pages/ICO/index";
import NewProposal from "pages/NewProposal/index";
import AllProposals from "pages/AllProposals/index";

function App() {
  return (
    <>
      <Router>

        <Web3Provider>
          <ToastContainer />

          <Navbar />
          <Routes>
            <Route path="/proposal/new" element={<NewProposal />} />
            <Route path="/proposals" element={<AllProposals />} />
            <Route path="/" element={<ICO />} />
            <Route path="/" element={<ICO />} />
          </Routes>
          <Footer />
        </Web3Provider>
      </Router>
    </>
  );
}

export default App;
