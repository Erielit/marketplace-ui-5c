import React from "react";
import { CustomLoader } from "./CustomLoader";
import { FilterComponent } from "./FilterComponent";

export const DataTableCustom = ({ columns, data, isLoading, property }) => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = data.filter(
    (item) =>
      item.description &&
      item.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const headerComponent = React.useMemo(() => {
    const clearText = () => {
      if (filterText) {
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        filterText={filterText}
        onClear={clearText}
        onFilter={(e) => setFilterText(e.target.value)}
      />
    );
  }, [filterText]);

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
  };

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      noDataComponent={"No hay registros"}
      progressPending={isLoading}
      progressComponent={<CustomLoader />}
      subHeader
      subHeaderComponent={headerComponent}
    />
  );
};
