import React, { useContext } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { AuthContext } from "../components/auth/authContext";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CategoryScreen } from "../components/category/CategoryScreen";
import { SubcategoryScreen } from "../components/subcategory/SubcategoryScreen";
import { ProductHome } from "../components/home/ProductHome";
import { ContactScreen } from "../components/contact/ContactScreen";
import { PublicNavbar } from "../shared/components/PublicNavbar";
import { PrivateNavBar } from "../shared/components/PrivateNavBar";
import { ProductScreen } from "../components/product/ProductScreen";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="*"
          element={
            user.logged ? (
              <>
                <PrivateNavBar />
                <Container>
                  <Routes>
                    <Route
                      path="/subcategory"
                      element={<SubcategoryScreen />}
                    />
                    <Route path={"/home"} element={<CategoryScreen />} />
                    <Route path="/products" element={<ProductScreen />} />
                    <Route path={"/"} element={<CategoryScreen />} />
                    <Route path="*" element={<div>Error 404</div>} />
                  </Routes>
                </Container>
              </>
            ) : (
              <>
                <PublicNavbar />
                <Container>
                  <Routes>
                    <Route path="/products" element={<ProductHome />} />
                    <Route path="/contact" element={<ContactScreen />} />
                    <Route path={"/home"} element={<ProductHome />} />
                    <Route path={"/"} element={<ProductHome />} />
                    <Route path="*" element={<div>Error 404</div>} />
                  </Routes>
                </Container>
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
};
