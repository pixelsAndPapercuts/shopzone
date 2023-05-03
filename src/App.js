import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart.js";
import Checkout from "./pages/Checkout";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // return (
  //   <>
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={isLoggedIn ? <Home /> : <Navigate to="/signin" />}
  //       />

  //       <Route
  //         path="/product/:id"
  //         element={isLoggedIn ? <ProductDetail /> : <Navigate to="/signin" />}
  //       />
  //       <Route
  //         path="/cart"
  //         element={isLoggedIn ? <Cart /> : <Navigate to="/signin" />}
  //       />
  //       <Route
  //         path="/checkout"
  //         element={isLoggedIn ? <Checkout /> : <Navigate to="/signin" />}
  //       />
  //       <Route path="/signup" element={<SignUp />} />
  //       <Route
  //         path="/signin"
  //         element={!isLoggedIn ? <SignIn /> : <Navigate to="/" />}
  //       />

  //       <Route path="*" element={<Navigate to="/" />} />
  //     </Routes>
  //   </>
  // );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        {/* <Route
          path="/signin"
          element={!isLoggedIn ? <SignIn /> : <Navigate to="/" />}
        /> */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
