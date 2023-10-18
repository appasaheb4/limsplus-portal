import React from 'react';
import {
  TableBootstrap,
  textFilter,
  Tooltip,
  Icons,
  sortCaret,
} from '@/library/components';
import { Confirm } from '@/library/models';
import 'react-accessible-accordion/dist/fancy-example.css';

let documents;
let pId;
let labId;
let rLab;
let sampleId;
let pLab;
let department;
let panelCode;
let testCode;
let analyteCode;
let event;
let eventOn;
let oldValue;
let newValue;
let eventDa;
let eventBy;
let comments;

interface EventLogsListProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

export const EventLogsList = (props: EventLogsListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
    <div style={{ position: 'relative' }}>
      <TableBootstrap
        id='_id'
        data={props.data}
        totalSize={props.totalSize}
        columns={[
          {
            dataField: '_id',
            text: 'Id',
            hidden: true,
            csvExport: false,
          },
          {
            dataField: 'documents',
            text: 'Documents',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                documents = filter;
              },
            }),
          },
          {
            dataField: 'operation',
            text: 'Action',
            editable: false,
            csvExport: false,
            hidden: !props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <div className='flex flex-row'>
                  <Tooltip tooltipText='Delete'>
                    <Icons.IconContext
                      color='#fff'
                      size='20'
                      onClick={() =>
                        props.onDelete &&
                        props.onDelete({
                          type: 'Delete',
                          show: true,
                          id: [row._id],
                          title: 'Are you sure?',
                          body: 'Delete item',
                        })
                      }
                    >
                      {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                    </Icons.IconContext>
                  </Tooltip>
                </div>
              </>
            ),
            headerClasses: 'sticky right-0  bg-gray-500 text-white z-50',
            classes: (cell, row, rowIndex, colIndex) => {
              return 'sticky right-0 bg-gray-500';
            },
            style: (cell, row, rowIndex, colIndex) => {
              return {
                zIndex: props.data?.length - rowIndex,
              };
            },
          },
        ]}
        isEditModify={props.isEditModify}
        isSelectRow={true}
        fileName='Event Logs'
        onSelectedRow={rows => {
          props.onSelectedRow &&
            props.onSelectedRow(rows.map((item: any) => item._id));
        }}
        onUpdateItem={(value: any, dataField: string, id: string) => {
          props.onUpdateItem && props.onUpdateItem(value, dataField, id);
        }}
        onPageSizeChange={(page, size) => {
          props.onPageSizeChange && props.onPageSizeChange(page, size);
        }}
        onFilter={(type, filter, page, size) => {
          props.onFilter && props.onFilter(type, filter, page, size);
        }}
        clearAllFilter={() => {
          documents('');
          pId('');
          labId('');
          rLab('');
          sampleId('');
          pLab('');
          department('');
          panelCode('');
          testCode('');
          analyteCode('');
          event('');
          eventOn('');
          oldValue('');
          newValue('');
          eventDa('');
          eventBy('');
          comments('');
        }}
        hideExcelSheet={['_id', 'operation']}
        dynamicStylingFields={['country', 'state', 'district', 'environment']}
      />
    </div>
  );
};
