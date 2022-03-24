import React, { useState } from "react";
import { Row } from "react-bootstrap";

export const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Producto",
      cell: (row) => <div>{row.name}</div>,
    },
  ];
  return (
    <Row>
      <Col>
        <DataTableCustom
          columns={columns}
          data={products}
          isLoading={isloading}
          property="name"
        />
      </Col>
    </Row>
  );
};
