import React from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../../shared/plugins/axios";
import Alert, {
  msjConfirmacion,
  msjError,
  msjExito,
  titleConfirmacion,
  titleError,
  titleExito,
} from "../../../shared/plugins/alert";

export const CategoryForm = ({ isOpen, setCategories, onClose }) => {
  const formik = useFormik({
    initialValues: {
      description: "",
      status: {
        id: 1,
        description: "Activo",
      },
    },
    validationSchema: yup.object().shape({
      description: yup
        .string()
        .required("Campo obligatorio")
        .min(3, "Mínimo tres caracteres"),
    }),
    onSubmit: (values) => {
      console.log(values);
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
            url: "/category/",
            method: "POST",
            data: JSON.stringify(values),
          })
            .then((response) => {
              if (!response.error) {
                setCategories((categories) => [...categories, response.data]);
                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClose();
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
                  handleClose();
                }
              });
            });
        },
      });
    },
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="text-bold">Descripción</Form.Label>
            <Form.Control
              name="description"
              placeholder="Gaming"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Row>
              <Col className="text-end">
                <Button variant="danger" onClick={handleClose} className="me-3">
                  <FeatherIcon icon={"x"} />
                  &nbsp; Cerrar
                </Button>
                <Button variant="success" type="submit">
                  <FeatherIcon icon={"check"} />
                  &nbsp; Registrar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
