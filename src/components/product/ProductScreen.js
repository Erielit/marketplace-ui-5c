import React, { useState, useEffect } from "react";
import { Row, Col, Badge, Card } from "react-bootstrap";
import { ButtonCircle } from "../../shared/components/ButtonCircle";
import axios from "../../shared/plugins/axios";
import Alert, {
  titleConfirmacion,
  titleError,
  titleExito,
  msjConfirmacion,
  msjError,
  msjExito,
} from "../../shared/plugins/alert";
import { DataTableCustom } from "../../shared/components/DataTableCustom";

export const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [isCreating, setisCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Producto",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Marca",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.subcategory?.category?.description,
      sortable: true,
    },
    {
      name: "Subategoría",
      selector: (row) => row.subcategory?.description,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status?.description,
      sortable: true,
      cell: (row) => (
        <>
          {row.status?.description === "Activo" ? (
            <Badge pill bg="success">
              Activo
            </Badge>
          ) : (
            <Badge pill bg="danger">
              Inactivo
            </Badge>
          )}
        </>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <ButtonCircle
            type={"btn btn-circle me-1 btn-info"}
            icon="search"
            onClickFunct={() => {}}
            size={18}
          />
          <ButtonCircle
            type={"btn btn-circle me-1 btn-warning"}
            icon="edit"
            onClickFunct={() => {}}
            size={18}
          />
          <ButtonCircle
            type={
              "btn btn-circle me-1" +
              (row.status.description === "Activo"
                ? " btn-danger"
                : " btn-success")
            }
            icon={
              row.status.description === "Activo" ? "trash-2" : "check-circle"
            }
            onClickFunct={() => {
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
                  let status =
                    row.status.description === "Activo"
                      ? { id: 2, description: "Inactivo" }
                      : { id: 1, description: "Activo" };
                  let productSaved = { ...row, status: status };
                  return axios({
                    url: "/subcategory/",
                    method: "PUT",
                    data: JSON.stringify(productSaved),
                  })
                    .then((response) => {
                      if (!response.error) {
                        setProducts([
                          productSaved,
                          ...products.filter(
                            (product) => product.id !== productSaved.id
                          ),
                        ]);
                        Alert.fire({
                          title: titleExito,
                          text: msjExito,
                          icon: "success",
                          confirmButtonText: "Aceptar",
                          confirmButtonColor: "",
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
                      });
                    });
                },
              });
            }}
            size={18}
          />
        </>
      ),
    },
  ];

  const getProducts = () => {
    axios({ url: "/product/", method: "GET" })
      .then((response) => {
        setProducts(response.data);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsloading(true);
    getProducts();
  }, []);

  return (
    <Card className="mt-5">
      <Card.Header as="h5">
        <Row>
          <Col>Productos</Col>
          <Col className="text-end">
            <ButtonCircle
              type={"btn btn-circle btn-success"}
              icon="plus"
              size={24}
              onClickFunct={() => {}}
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <DataTableCustom
          columns={columns}
          data={products}
          isLoading={isloading}
          property="name"
        />
      </Card.Body>
    </Card>
  );
};
