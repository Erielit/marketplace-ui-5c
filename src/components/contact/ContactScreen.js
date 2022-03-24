import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import FeatherIcon from "feather-icons-react";
import "../../assets/css/main.css";
import "../../assets/css/util.css";
import img from "../../assets/img/river.jpg";
import Alert, {
  titleConfirmacion,
  titleError,
  titleExito,
  msjConfirmacion,
  msjError,
  msjExito,
} from "../../shared/plugins/alert";
import axios from "../../shared/plugins/axios";

export const ContactScreen = () => {
  const bg = {
    backgroundImage: `url(${img})`,
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      comments: "",
    },
    validationSchema: yup.object().shape({
      fullname: yup.string().required("Campo obligatorio"),
      email: yup
        .string()
        .email("Ingresar correo electrónico válido")
        .required("Campo obligatorio"),
      comments: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: (values) => {
      Alert.fire({
        title: titleConfirmacion,
        text: msjConfirmacion,
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "",
        showCancelButton: true,
        reverseButtons: true,
        backdrop: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: !Alert.isLoading,
        preConfirm: () => {
          return axios({
            url: "/contact/",
            method: "POST",
            data: JSON.stringify(values),
          })
            .then((response) => {
              if (!response.error) {
                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "",
                }).then((result) => {
                  if (result.isConfirmed) {
                    formik.resetForm();
                  }
                });
              }
              return response;
            })
            .catch((error) => {
              Alert.fire({
                title: titleError,
                text: msjError,
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "",
              }).then((result) => {
                if (result.isConfirmed) {
                  formik.resetForm();
                }
              });
            });
        },
      });
    },
  });

  return (
    <div className="mt-5">
      <div className="container-contact100">
        <div className="wrap-contact100">
          <Form onSubmit={formik.handleSubmit} className="contact100-form">
            <Form.Group className="mb-4">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                placeholder="Mike Moreno"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
              />
              {formik.errors.fullname ? (
                <span className="error-text">{formik.errors.fullname}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                placeholder="mikemoreno@utez.edu.mx"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <span className="error-text">{formik.errors.email}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Comentarios</Form.Label>
              <Form.Control
                as={"textarea"}
                rows={3}
                placeholder="Comentarios extras"
                name="comments"
                value={formik.values.comments}
                onChange={formik.handleChange}
              />
              {formik.errors.comments ? (
                <span className="error-text">{formik.errors.comments}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4">
              <Row>
                <Col className="text-end">
                  <Button variant="outline-info" type="submit">
                    <FeatherIcon icon="send" />
                    &nbsp; Enviar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
          <div className="contact100-more flex-col-c-m" style={bg}>
            <div className="flex-w size1 p-b-47">
              <div className="txt1 p-r-25">
                <span className="lnr lnr-map-marker"></span>
              </div>
              <div className="flex-col size2">
                <span className="txt1 p-b-20">Dirección</span>
                <span className="txt2">
                  Av. Universidad Tecnológica 1, Palo Escrito, 62765 Emiliano
                  Zapata, Mor., México.
                </span>
              </div>
            </div>
            <div className="flex-w size1 p-b-47">
              <div className="txt1 p-r-25">
                <span className="lnr lnr-phone-handset"></span>
              </div>
              <div className="flex-col size2">
                <span className="txt1 p-b-20">Teléfono</span>
                <span className="txt2">+52 7773681165</span>
              </div>
            </div>
            <div className="flex-w size1 p-b-47">
              <div className="txt1 p-r-25">
                <span className="lnr lnr-envelop"></span>
              </div>
              <div className="flex-col size2">
                <span className="txt1 p-b-20">Correo electrónico</span>
                <span className="txt2">utez@utez.edu.mx</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
