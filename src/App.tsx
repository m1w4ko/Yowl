import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from './pages/Home';
import Categories from './pages/Categories';
import Review from './pages/Review';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Company from './pages/Companies';
import Userpage from './pages/Userpage';
import Heading from "./components/Heading";
import Footer from "./components/Footer";
import Pswd from './components/Pswd';
import CallbackPage from './pages/auth/CallbackPage.tsx';


const Layout = () => {
  return (
    <div className="">
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <div >
      <Router>
        <Heading />
        <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/review" element={<Review />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/company/:id" element={<Company />} />
          <Route path="/account" element={<Userpage />} />
          <Route path="/auth/callback" element={<CallbackPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/reset-password" element={<Pswd />} />
        </Routes>
      </Router>

    </div>

  );
}
export default App;
