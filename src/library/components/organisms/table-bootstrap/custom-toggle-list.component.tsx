import React, { useState, useEffect } from 'react';
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
      columns.slice(1, -1).forEach(column => {
        if (column.dataField !== '_id') {
          initialCheckedItems[column.dataField] = toggles[column.dataField];
        }
      });
      return initialCheckedItems;
    },
  );

  const [orderedColumns, setOrderedColumns] = useState<Column[]>(
    columns.slice(1, -1),
  );
  const dynamicActionColumn = columns[columns.length - 1]?.dataField;

  useEffect(() => {
    const anyChecked = Object.values(checkedItems).some(checked => checked);
    if (dynamicActionColumn) {
      if (anyChecked) {
        if (!checkedItems[dynamicActionColumn]) {
          setCheckedItems(prev => ({ ...prev, [dynamicActionColumn]: true }));
          onColumnToggle(dynamicActionColumn);
        }
      } else {
        if (checkedItems[dynamicActionColumn]) {
          setCheckedItems(prev => {
            const { [dynamicActionColumn]: _, ...rest } = prev;
            return rest;
          });
          onColumnToggle(dynamicActionColumn);
        }
      }
    }
  }, [checkedItems, dynamicActionColumn, onColumnToggle]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    const newCheckedItems: { [key: string]: boolean } = {};
    orderedColumns.forEach(column => {
      if (column.dataField !== '_id') {
        newCheckedItems[column.dataField] = checked;
      }
    });

    setCheckedItems(newCheckedItems);

    orderedColumns.forEach(column => {
      if (column.dataField !== '_id') {
        onColumnToggle(column.dataField);
      }
    });

    if (dynamicActionColumn) {
      if (checked) {
        setCheckedItems(prev => ({ ...prev, [dynamicActionColumn]: true }));
        onColumnToggle(dynamicActionColumn);
      } else {
        setCheckedItems(prev => {
          const { [dynamicActionColumn]: _, ...rest } = prev;
          return rest;
        });
        onColumnToggle(dynamicActionColumn);
      }
    }
  };

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems(prevState => {
      const newState = {
        ...prevState,
        [name]: checked,
      };

      const anyChecked = Object.keys(newState).some(
        key => key !== dynamicActionColumn && newState[key],
      );

      if (dynamicActionColumn) {
        if (anyChecked) {
          if (!newState[dynamicActionColumn]) {
            newState[dynamicActionColumn] = true;
            onColumnToggle(dynamicActionColumn);
          }
        } else {
          if (newState[dynamicActionColumn]) {
            delete newState[dynamicActionColumn];
            onColumnToggle(dynamicActionColumn);
          }
        }
      }

      onColumnToggle(name);
      return newState;
    });
  };

  const allChecked =
    Object.keys(checkedItems).length > 0 &&
    Object.keys(checkedItems)
      .filter(key => key !== dynamicActionColumn)
      .every(key => checkedItems[key]);

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
              {orderedColumns.map((column, index) => (
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
