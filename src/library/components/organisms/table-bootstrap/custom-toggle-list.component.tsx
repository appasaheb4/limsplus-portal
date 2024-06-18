import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ColumnFilterProps {
  columns: Array<{ dataField: string; text: string }>;
  onClose: () => void;
  onColumnReorder: (
    newColumns: Array<{ dataField: string; text: string }>,
  ) => void;
  onColumnToggle: (selectedColumns: Array<string>) => void;
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({
  columns,
  onClose,
  onColumnReorder,
  onColumnToggle,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.map(column => column.dataField),
  );
  const [columnOrder, setColumnOrder] = useState(columns);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    onColumnToggle(selectedColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColumns]);

  useEffect(() => {
    onColumnReorder(columnOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnOrder]);

  const handleToggle = (column: string) => {
    setSelectedColumns(prev =>
      prev.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column],
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedColumns(filteredColumns.map(column => column.dataField));
    } else {
      setSelectedColumns([]);
    }
  };

  const onDragEnd = result => {
    if (!result.destination) return;
    const reorderedColumns = Array.from(columnOrder);
    const [removed] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, removed);
    setColumnOrder(reorderedColumns);
  };

  const filteredColumns = columnOrder.filter(
    column =>
      column.dataField !== '_id' &&
      column.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const allSelected =
    filteredColumns.length > 0 &&
    filteredColumns.every(column => selectedColumns.includes(column.dataField));

  return (
    <div
      className='bg-white border rounded p-4 shadow-md absolute z-50'
      style={{ width: '300px', maxHeight: '400px', overflowY: 'auto' }}
    >
      <input
        type='text'
        placeholder='Search columns...'
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className='mb-4 p-2 border rounded w-full'
      />
      <div className='mb-4'>
        <label className='flex items-center'>
          <input
            type='checkbox'
            checked={allSelected}
            onChange={handleSelectAll}
            className='form-checkbox'
          />
          <span className='ml-2'>Select All</span>
        </label>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='columns'>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {filteredColumns.map((column, index) => (
                <Draggable
                  key={column.dataField}
                  draggableId={column.dataField}
                  index={index}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='mb-2'
                    >
                      <label className='flex items-center'>
                        <input
                          type='checkbox'
                          checked={selectedColumns.includes(column.dataField)}
                          onChange={() => handleToggle(column.dataField)}
                          className='form-checkbox'
                        />
                        <span className='ml-2'>{column.text}</span>
                      </label>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={onClose}
        className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'
      >
        Close
      </button>
    </div>
  );
};

export default ColumnFilter;
