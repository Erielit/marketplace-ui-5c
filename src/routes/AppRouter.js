import React, { useContext } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { AuthContext } from "../components/auth/authContext";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CategoryScreen } from "../components/category/CategoryScreen";
import { SubcategoryScreen } from "../components/subcategory/SubcategoryScreen";
import img from "../assets/img/marketplace.png";
import { ProductHome } from "../components/home/ProductHome";
import { ContactScreen } from "../components/contact/ContactScreen";
import { PublicNavbar } from "../shared/components/PublicNavbar";

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
                <Navbar bg="dark" variant="dark">
                  <Container fluid>
                    <Navbar.Brand href="#">
                      <Image src={img} style={{ width: 20, height: "auto" }} />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                      <Link to={"/"} className="nav-link">
                        Categorías
                      </Link>
                      <Link to={"/subcategory"} className="nav-link">
                        Subcategorías
                      </Link>
                    </Nav>
                  </Container>
                </Navbar>
                <Container>
                  <Routes>
                    <Route
                      path="/subcategory"
                      element={<SubcategoryScreen />}
                    />
                    <Route path={"/home"} element={<CategoryScreen />} />
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
