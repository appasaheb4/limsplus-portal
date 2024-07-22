import { useState, useEffect } from 'react';

interface Column {
  dataField: string;
  text: string;
}

export const useColumnManager = (columns: Column[]) => {
  const [isColumnFilterVisible, setIsColumnFilterVisible] =
    useState<boolean>(false);
  const [currentColumns, setCurrentColumns] = useState<Column[]>(columns);

  const uniqueColumns = Array.from(
    new Set(columns.map(col => col.dataField)),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ).map(dataField => columns.find(col => col.dataField === dataField)!);

  useEffect(() => {
    setCurrentColumns(uniqueColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  const handleColumnReorder = (newColumns: Column[]) => {
    const reorderedColumns = Array.from(
      new Set(newColumns.map(col => col.dataField)),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ).map(dataField => newColumns.find(col => col.dataField === dataField)!);
    setCurrentColumns(reorderedColumns);
  };

  const handleColumnToggle = (selectedColumns: string[]) => {
    const toggledColumns = uniqueColumns.filter(column =>
      selectedColumns.includes(column.dataField),
    );

    const actionColumn = uniqueColumns.find(
      column => column.dataField === 'operation',
    );
    if (
      selectedColumns.includes('operation') &&
      actionColumn &&
      !toggledColumns.some(column => column.dataField === 'operation')
    ) {
      toggledColumns.push(actionColumn);
    }

    setCurrentColumns(toggledColumns);
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
  };
};
