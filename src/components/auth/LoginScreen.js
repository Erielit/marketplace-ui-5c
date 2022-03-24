import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import axios from "../../shared/plugins/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Col, Container, Figure, Form, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import img from "../../assets/img/marketplace.png";
import Alert from "../../shared/plugins/alert";

export const LoginScreen = () => {
  const navigation = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("Ingresar su usuario")
        .min(3, "Mínimo tres caracteres"),
      password: yup
        .string()
        .required("Ingresar su contraseña")
        .min(3, "Mínimo tres caracteres"),
    }),
    onSubmit: (values) => {
      axios({
        url: "/auth/login",
        method: "POST",
        data: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.error) {
            const action = {
              type: "LOGIN",
              payload: response.data,
            };
            dispatch(action);
            navigation("/products", { replace: true });
          }
        })
        .catch((error) => {
          Alert.fire({
            title: "Verifique los datos",
            text: "Usuario y/o contraseña incorrectos",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        });
    },
  });

  const handleReturn = () => {
    navigation("/");
  };

  useEffect(() => {
    document.title = "MT | Login";
  }, []);

  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col className="col-xl-10">
            <div className="card rounded-3 text-black">
              <Row className="g-0">
                <Col className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <Figure>
                        <Figure.Image
                          src={img}
                          width={125}
                          height={110}
                          alt="Marketplace"
                        />
                      </Figure>
                      <h4 className="mt-1 mb-5 pb-1">Marketplace</h4>
                    </div>
                    <Form onSubmit={formik.handleSubmit}>
                      <Form.Group className="form-outline mb-4">
                        <Form.Label htmlFor="username">
                          Usuario o correo electrónico
                        </Form.Label>
                        <Form.Control
                          name="username"
                          id="username"
                          placeholder="miguelmoreno"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                        />
                      </Form.Group>
                      <Form.Group className="form-outline mb-4">
                        <Form.Label htmlFor="password">Contraseña</Form.Label>
                        <Form.Control
                          name="password"
                          id="password"
                          type="password"
                          placeholder="*********"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                        />
                      </Form.Group>
                      <Form.Group className="form-outline mb-4">
                        <div className="text-end pt-1 pb-1">
                          <a href="#!" className="text-muted">
                            ¿Olvidaste tu contraseña?
                          </a>
                        </div>
                      </Form.Group>
                      <Form.Group className="form-outline mb-4">
                        <div className="text-center pt-1 pb-1">
                          <Button
                            variant="secondary"
                            className="btn-hover gradient-custom-2"
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                          >
                            <FeatherIcon icon="log-in" />
                            &nbsp; Iniciar sesión
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>
                    <Form.Group className="text-center">
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={handleReturn}
                      >
                        <FeatherIcon icon="corner-down-left" /> Regresar
                      </Button>
                    </Form.Group>
                  </div>
                </Col>
                <Col className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Marketplace | Aplicaciones Web</h4>
                    <p className="small mb-0">
                      ewoiruofjsgowrmtmrtootiemgopjnasdjfniwpr
                      ugjwtnpinfpdknvpijtwngij
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
