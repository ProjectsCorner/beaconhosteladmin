//react router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Home from "./Routes/home";
import NewHostel from "./Routes/NewProduct";
import Hostels from "./Routes/products";
import Hostel from "./Routes/product";
import NotFound from "../Components/NotFound/404";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="hostels" element={<Hostels />} />
        <Route path="new-hostel" element={<NewHostel />} />
        <Route path="/hostel/:id" element={<Hostel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
