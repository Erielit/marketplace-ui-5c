import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import axios from "../../../shared/plugins/axios";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = () => {
    axios({ url: "/category/", method: "GET" })
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getCategories();
  }, []);

  const columns = [
    {
      name: "#",
      cell: (row, index) => <span>{index + 1}</span>,
    },
    {
      name: "Decripción",
      cell: (row) => <span>{row.description}</span>,
    },
    {
      name: "Estado",
      cell: (row) =>
        row.status.description === "Activo" ? (
          <Badge pill bg="success">
            {row.status.description}
          </Badge>
        ) : (
          <Badge pill bg="danger">
            {row.status.description}
          </Badge>
        ),
    },
  ];

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col>Categorías</Col>
            <Col className="text-end">
              <Button variant="success" size="sm">
                <FeatherIcon icon="plus" />
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <DataTable columns={columns} data={categories} />
        </Card.Body>
      </Card>
    </>
  );
};
