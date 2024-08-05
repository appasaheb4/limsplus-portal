import { useState, useEffect } from 'react';

interface Column {
  dataField: string;
  text: string;
}

export const useColumnManager = (initialColumns: Column[]) => {
  const [isColumnFilterVisible, setIsColumnFilterVisible] =
    useState<boolean>(false);
  const [currentColumns, setCurrentColumns] =
    useState<Column[]>(initialColumns);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    initialColumns.map(column => column.dataField),
  );
  const [columnOrder, setColumnOrder] = useState<Column[]>(initialColumns);

  const uniqueColumns = Array.from(
    new Set(initialColumns.map(col => col.dataField)),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ).map(dataField => initialColumns.find(col => col.dataField === dataField)!);

  // Ensure the `operation` column is always included if it exists
  const operationColumn = uniqueColumns.find(
    col => col.dataField === 'operation',
  );
  const initialSelectedColumns = operationColumn
    ? [...initialColumns.map(column => column.dataField), 'operation']
    : initialColumns.map(column => column.dataField);

  useEffect(() => {
    setCurrentColumns(uniqueColumns);
    setSelectedColumns(initialSelectedColumns);
    setColumnOrder(uniqueColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialColumns]);

  const handleColumnReorder = (newColumns: Column[]) => {
    const reorderedColumns = Array.from(
      new Set(newColumns.map(col => col.dataField)),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ).map(dataField => newColumns.find(col => col.dataField === dataField)!);
    // setColumnOrder(reorderedColumns);
    setCurrentColumns(reorderedColumns);
  };

  const handleColumnToggle = (newSelectedColumns: string[]) => {
    // Ensure the `operation` column is always included if it exists
    if (operationColumn && !newSelectedColumns.includes('operation')) {
      newSelectedColumns.push('operation');
    }
    setSelectedColumns(newSelectedColumns);
    setCurrentColumns(
      columnOrder.filter(column =>
        newSelectedColumns.includes(column.dataField),
      ),
    );
  };

  const filterableColumns = uniqueColumns.filter(
    column => column.dataField !== '_id',
  );

  return {
    isColumnFilterVisible,
    setIsColumnFilterVisible,
    currentColumns,
    handleColumnReorder,
    handleColumnToggle,
    filterableColumns,
    selectedColumns,
    columnOrder,
  };
};
