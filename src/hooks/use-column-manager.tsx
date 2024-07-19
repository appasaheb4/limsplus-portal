import { useState, useEffect } from 'react';

type Column = {
  dataField: string;
  text: string;
};

export const useColumnManager = (initialColumns: Column[]) => {
  const [isColumnFilterVisible, setIsColumnFilterVisible] =
    useState<boolean>(false);
  const [currentColumns, setCurrentColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(initialColumns);

  useEffect(() => {
    const selectedColumns = columnOrder.filter(col =>
      currentColumns.some(c => c.dataField === col.dataField),
    );
    setCurrentColumns(
      selectedColumns.length > 0
        ? [...selectedColumns, initialColumns[initialColumns.length - 1]]
        : [],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnOrder]);

  const handleColumnReorder = (newColumns: Column[]) => {
    setColumnOrder(newColumns);
  };

  const handleColumnToggle = (selectedColumns: string[]) => {
    const newColumns = columnOrder.filter(column =>
      selectedColumns.includes(column.dataField),
    );
    setCurrentColumns(
      newColumns.length > 0
        ? [...newColumns, initialColumns[initialColumns.length - 1]]
        : [],
    );
  };

  // Filter out the "Action" and "Id" columns for the ColumnFilter component
  const filterableColumns = initialColumns.filter(
    column =>
      column.dataField !==
        initialColumns[initialColumns.length - 1].dataField &&
      column.dataField !== '_id',
  );

  return {
    isColumnFilterVisible,
    setIsColumnFilterVisible,
    currentColumns,
    handleColumnReorder,
    handleColumnToggle,
    filterableColumns,
  };
};
