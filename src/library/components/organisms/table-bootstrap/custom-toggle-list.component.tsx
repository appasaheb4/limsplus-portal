import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

interface Column {
  dataField: string;
  text: string;
}

interface CustomToggleListProps {
  columns: Column[];
  onColumnToggle: (dataField: string) => void;
  toggles: { [key: string]: boolean };
}

const CustomToggleList: React.FC<CustomToggleListProps> = ({
  columns,
  onColumnToggle,
  toggles,
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    () => {
      const initialCheckedItems: { [key: string]: boolean } = {};
      columns.forEach(column => {
        if (column.dataField !== '_id') {
          initialCheckedItems[column.dataField] = false; // Ensure none are selected initially
        }
      });
      return initialCheckedItems;
    },
  );

  const [orderedColumns, setOrderedColumns] = useState<Column[]>(columns);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedItems: { [key: string]: boolean } = {};
    orderedColumns.forEach(column => {
      if (column.dataField !== '_id') {
        newCheckedItems[column.dataField] = event.target.checked;
      }
    });

    setCheckedItems(newCheckedItems);
    orderedColumns.forEach(column => {
      if (column.dataField !== '_id') {
        onColumnToggle(column.dataField);
      }
    });
  };

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems(prevState => ({
      ...prevState,
      [name]: checked,
    }));
    onColumnToggle(name);
  };

  const allChecked =
    Object.values(checkedItems).length > 0 &&
    Object.values(checkedItems).every(Boolean);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedColumns = Array.from(orderedColumns);
    const [removed] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, removed);

    setOrderedColumns(reorderedColumns);
  };

  return (
    <div className='p-4'>
      <h3 className='font-semibold'>Columns</h3>
      <label className='flex items-center'>
        <input
          type='checkbox'
          name='selectAll'
          checked={allChecked}
          onChange={handleSelectAll}
          className='form-checkbox'
        />
        <span className='ml-2'>Select All</span>
      </label>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='columns'>
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='ml-4'
            >
              {orderedColumns
                .filter(column => column.dataField !== '_id')
                .map((column, index) => (
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
                        className='mt-2 flex items-center'
                      >
                        <input
                          type='checkbox'
                          name={column.dataField}
                          checked={!!checkedItems[column.dataField]}
                          onChange={handleItemChange}
                          className='form-checkbox'
                        />
                        <span className='ml-2'>{column.text}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CustomToggleList;
