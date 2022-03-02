import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Web3Provider } from "contexts/Web3Context"
import { useContext } from 'react';
import Home from 'pages/Home/index';
import AppNavbar from 'components/AppNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "components/Footer";
import ICO from "pages/ICO/index";
import NewProposal from "pages/NewProposal/index";
import AllProposals from "pages/AllProposals/index";
import Team from "pages/Team/index";
import FAQ from "pages/FAQ/index";
import HomeNavbar from "components/HomeNavbar";

function App() {
  return (
    <>
      <Router>

        <Web3Provider>
          <ToastContainer />
          <Routes>
            <Route path="/app/*" element={<AppNavbar />} />
            <Route path="/*" element={<HomeNavbar />} />
          </Routes>
          <Routes>
            <Route path="/app/proposals/new" element={<NewProposal />} />
            <Route path="/app/proposals" element={<AllProposals />} />
            <Route path="/app/ico" element={<ICO />} />
            <Route path="/app/*" element={<ICO />} />
            <Route path="/team" element={<Team />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Web3Provider>
      </Router>
    </>
  );
}

export default App;
