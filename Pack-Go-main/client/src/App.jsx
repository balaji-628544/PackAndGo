import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import TopDestinations from './pages/TopDestinations';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Navbar from './pages/Navbar';
import Login from './components/Auth/Login';
import PaymentPage from "./components/PaymentPage"; // Create this page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import all package detail pages dynamically
import GoldenTriangleIndia from './pages/PackageDetails/GoldenTriangleIndia';
import GoldenTriangleAmritsar from './pages/PackageDetails/GoldenTriangleAmritsar';
import SrinagarLeh from './pages/PackageDetails/SrinagarLeh';
import ChardhamYatra from './pages/PackageDetails/ChardhaYatra';
import DarjeelingGangtok from './pages/PackageDetails/DarjeelingGangtok';
import GarhwalKumaon from './pages/PackageDetails/Garhwalkumaon';
import GoldenTriangleGoa from './pages/PackageDetails/GoldenTriangleGoa';
import Himachal from './pages/PackageDetails/Himachal';
import Karnataka from './pages/PackageDetails/Karnataka';
import Kerala from './pages/PackageDetails/KeralaTrip';
import LadakhTrip from './pages/PackageDetails/LadakTrip';
import Orissa from './pages/PackageDetails/Orrisa';
import GoldenTriangleVaranasi from './pages/PackageDetails/GoldenTriangleVaranasi';
import Rajasthan from './pages/PackageDetails/Rajasthan';
import GoldenTriangleShimla from './pages/PackageDetails/GoldenTriangleShimla';
import AssamSundarbans from './pages/PackageDetails/AssamSundarbans';

//importing Hillstations
import HillStations from './components/HillStations';

import Araku from './components/Places/Araku';
import Darjeeling from './components/Places/Darjeeling';
import Ladak from './components/Places/Ladak';
import Manali from './components/Places/Manali';
import Munnar from './components/Places/Munnar';
import Ooty from './components/Places/Ooty';


//Importing Costal regions
import CostalRegions from './components/CosatlRegions';

import Pondicherry from "./components/Places/Pondicherry";
import Goa from "./components/Places/Goa";
import Visakhapatnam from "./components/Places/Visakhapatnam";
import Kanyakumari from "./components/Places/Kanyakumari";
import Andaman from "./components/Places/Andaman";
import Lakshadweep from "./components/Places/Lakshadweep";


//Importing Spiritual Destinations
import SpiritualDestinations from './components/SpiritualDestinations';

import Tirupati from "./components/Places/Tirupati";
import Puri from "./components/Places/Puri";
import Rameshwaram from "./components/Places/Rameshwaram";
import Dwaraka from "./components/Places/Dwaraka";
import GoldenTemple from "./components/Places/GoldenTemple";
import Badrinath from "./components/Places/Badrinath";

import RannofKutch from './components/Places/RannofKutch';
import Srinagar from './components/Places/Srinagar';



const App = () => {
  return (
   <>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* ✅ Both '/' and '/home' should go to the Home page */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate replace to="/" />} />

        {/* Other static routes */}
        <Route path="/topdestinations" element={<TopDestinations />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* ✅ Dynamic Routing for Package Detail Pages */}
        <Route path="/packagedetails/golden-triangle-india" element={<GoldenTriangleIndia />} />
        <Route path="/packagedetails/golden-triangle-amritsar" element={<GoldenTriangleAmritsar />} />
        <Route path="/packagedetails/srinagar-leh" element={<SrinagarLeh />} />
        <Route path="/packagedetails/chardham-yatra" element={<ChardhamYatra />} />
        <Route path="/packagedetails/darjeeling-gangtok" element={<DarjeelingGangtok />} />
        <Route path="/packagedetails/garhwalkumaon" element={<GarhwalKumaon />} />
        <Route path="/packagedetails/golden-triangle-goa" element={<GoldenTriangleGoa />} />
        <Route path="/packagedetails/himachal" element={<Himachal />} />
        <Route path="/packagedetails/karnataka" element={<Karnataka />} />
        <Route path="/packagedetails/kerala" element={<Kerala />} />
        <Route path="/packagedetails/ladaktrip" element={<LadakhTrip />} />
        <Route path="/packagedetails/orrisa" element={<Orissa />} />
        <Route path="/packagedetails/golden-triangle-varanasi" element={<GoldenTriangleVaranasi />} />
        <Route path="/packagedetails/rajasthan" element={<Rajasthan />} />
        <Route path="/packagedetails/golden-triangle-shimla" element={<GoldenTriangleShimla />} />
        <Route path="/packagedetails/assam-sundarbans" element={<AssamSundarbans />} />



        {/* Hillstations */}
        <Route path="/categories/hillstations" element={<HillStations />} />

        {/* Places */}
        <Route path="/araku" element={<Araku />} />
        <Route path="/darjeeling" element={<Darjeeling />} />
        <Route path="/ladak" element={<Ladak />} />
        <Route path="/manali" element={<Manali />} />
        <Route path="/munnar" element={<Munnar />} />
        <Route path="/ooty" element={<Ooty />} />

        {/* Costal regions */}
        <Route path="/categories/costalregions" element={<CostalRegions />} />

        <Route path="/pondicherry" element={<Pondicherry />} />
        <Route path="/goa" element={<Goa />} />
        <Route path="/visakhapatnam" element={<Visakhapatnam />} />
        <Route path="/kanyakumari" element={<Kanyakumari />} />
        <Route path="/andaman" element={<Andaman />} />
        <Route path="/lakshadweep" element={<Lakshadweep />} />


        {/* Spritual Destinations */}
        <Route path="/categories/spritualdestinations" element={<SpiritualDestinations />} />


        <Route path="/tirupati" element={<Tirupati />} />
        <Route path="/puri" element={<Puri />} />
        <Route path="/rameshwaram" element={<Rameshwaram />} />
        <Route path="/dwaraka" element={<Dwaraka />} />
        <Route path="/goldenTemple" element={<GoldenTemple />} />
        <Route path="/badrinath" element={<Badrinath />} />


        <Route path="/rann-of-kutch" element={<RannofKutch />} />
        <Route path="/srinagar" element={<Srinagar />} />
       
      </Routes>
    </>
    
  );
};

export default App;