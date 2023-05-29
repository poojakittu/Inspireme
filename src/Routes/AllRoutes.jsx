import React from "react";
import { Route, Routes } from "react-router-dom";

import Counter1 from "../Components/c1";
import Cartnew from "./Cartnew";
import Checkout from "./Checkout";
import Home from "./Home";

import Myorders from "./Myorders";
import PrivateRoute from "./PrivateRoute";
import Test from "./Email";
import Profile from "./Prodile";
import SingleProductPage from "./SingleProductPage";
import Vendor from "./Vendor";
import VendorProduct from "./VendorProduct";
import Iphone from "./IPhone";
import Mac from "./Mac";
import Ipad from "./Ipad";
import Watch from "./Wactch";
import Airpod from "./Airpod";
import Ass from "./Ass";
import TV from "./tv";
import ProductRow from "./Inspire";
import Product from "./AdminProduct";
import Newpage from "./Newpage";
import PageList1 from "./Demo";
import OrderPage from "./Orders";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/counter" element={<Counter1></Counter1>}></Route>
      <Route path="/iphone" element={<PrivateRoute><Iphone></Iphone></PrivateRoute>}></Route>
      <Route path="/ipad" element={<PrivateRoute><Ipad></Ipad></PrivateRoute>}></Route>
      <Route path="/watch" element={<PrivateRoute><Watch></Watch></PrivateRoute>}></Route>
      <Route path="/mac" element={<PrivateRoute><Mac></Mac></PrivateRoute>}></Route>
      <Route path="/airpods" element={<PrivateRoute><Airpod></Airpod></PrivateRoute>}></Route>
      <Route path="/tv" element={<PrivateRoute><TV></TV></PrivateRoute>}></Route>
      <Route path="/acc" element={<PrivateRoute><Ass></Ass></PrivateRoute>}></Route>
      <Route path="/extra" element={<PageList1></PageList1>}></Route>
      <Route path="/new/:id" element={<PrivateRoute><Newpage></Newpage></PrivateRoute>}></Route>
      
      <Route path="/cart" element={<Cartnew />}></Route>
      <Route path="/login" element={<Test />}></Route>

      <Route
        path="/profile"
        element={
          
            <Profile />
          
        }
      ></Route>
      <Route path="/orders" element={<OrderPage/>}></Route>
      <Route path="/vendor" element={<Vendor />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/inspire" element={<ProductRow />}></Route>
      <Route path="/vendorproduct/:id" element={<VendorProduct />}></Route>
      <Route path="/productAdd" element={<Product />}></Route>
      {/* <Route path="/search" element={<SearchedProduct />} query /> */}
    </Routes>
  );
};

export default AllRoutes;
