import React from 'react';
import _ from 'lodash';
import {
  TableBootstrap,
  textFilter,
  Tooltip,
  Icons,
  sortCaret,
  NumberFilter,
  customFilter,
  DateRangeFilter,
} from '@/library/components';
import { Confirm } from '@/library/models';
import 'react-accessible-accordion/dist/fancy-example.css';
import dayjs from 'dayjs';

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
let deleteValue;
let eventDate;
let eventBy;
let comments;
let companyCode;
let environment;

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
              placeholder: 'Documents',
              getFilter: filter => {
                documents = filter;
              },
            }),
            formatter: (cell, row) => {
              return <span>{_.startCase(_.camelCase(row?.documents))}</span>;
            },
          },
          {
            dataField: 'pId',
            text: 'PId',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: customFilter({
              getFilter: filter => {
                pId = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
          },
          {
            dataField: 'labId',
            text: 'Lab Id',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: customFilter({
              getFilter: filter => {
                labId = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
          },
          {
            dataField: 'rLab',
            text: 'RLab',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'RLab',
              getFilter: filter => {
                rLab = filter;
              },
            }),
          },
          {
            dataField: 'sampleId',
            text: 'Sample Id',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Sample Id',
              getFilter: filter => {
                sampleId = filter;
              },
            }),
          },
          {
            dataField: 'pLab',
            text: 'PLab',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'PLab',
              getFilter: filter => {
                pLab = filter;
              },
            }),
          },
          {
            dataField: 'department',
            text: 'Department',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Department',
              getFilter: filter => {
                department = filter;
              },
            }),
          },
          {
            dataField: 'panelCode',
            text: 'Panel Code',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Panel Code',
              getFilter: filter => {
                panelCode = filter;
              },
            }),
          },
          {
            dataField: 'testCode',
            text: 'Test Code',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Test Code',
              getFilter: filter => {
                testCode = filter;
              },
            }),
          },
          {
            dataField: 'analyteCode',
            text: 'Analyte Code',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Analyte Code',
              getFilter: filter => {
                analyteCode = filter;
              },
            }),
          },
          {
            dataField: 'event',
            text: 'Event',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Event',
              getFilter: filter => {
                event = filter;
              },
            }),
          },
          {
            dataField: 'eventOn',
            text: 'Event On',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Event On',
              getFilter: filter => {
                eventOn = filter;
              },
            }),
          },
          {
            dataField: 'oldValue',
            text: 'Old Value',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Old Value',
              getFilter: filter => {
                oldValue = filter;
              },
            }),
          },
          {
            dataField: 'newValue',
            text: 'New Value',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'New Value',
              getFilter: filter => {
                newValue = filter;
              },
            }),
          },
          {
            dataField: 'deleteValue',
            text: 'Delete Value',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Delete Value',
              getFilter: filter => {
                deleteValue = filter;
              },
            }),
          },
          {
            dataField: 'eventDate',
            text: 'Event Date',
            headerClasses: 'textHeader1',
            // sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            // sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                eventDate = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateRangeFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return (
                <span>
                  {dayjs(row?.eventDate).format('DD-MM-YYYY HH-mm-ss')}
                </span>
              );
            },
          },
          {
            dataField: 'eventBy',
            text: 'Event By',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Event By',
              getFilter: filter => {
                eventBy = filter;
              },
            }),
          },
          {
            dataField: 'comments',
            text: 'Comments',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Comments',
              getFilter: filter => {
                comments = filter;
              },
            }),
          },
          {
            text: 'Company Code',
            dataField: 'companyCode',
            sort: true,
            editable: false,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Company Code',
              getFilter: filter => {
                companyCode = filter;
              },
            }),
            headerClasses: 'textHeader2',
          },
          {
            dataField: 'environment',
            text: 'Environment',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Environment',
              getFilter: filter => {
                environment = filter;
              },
            }),
          },
          {
            dataField: 'operation',
            text: 'Action',
            editable: false,
            csvExport: false,
            // hidden: !props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <div className='flex flex-row'>
                  <Tooltip tooltipText='Delete'>
                    <Icons.IconContext
                      color='#ffffff'
                      size='20'
                      onClick={() =>
                        props.onDelete &&
                        props.onDelete({
                          type: 'Delete',
                          show: true,
                          id: [row._id],
                          title: 'Are you sure?',
                          body: 'Do you want to delete this record?',
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
          deleteValue('');
          eventDate('');
          eventBy('');
          comments('');
          companyCode('');
          environment('');
        }}
        hideExcelSheet={['_id', 'operation']}
        dynamicStylingFields={['country', 'state', 'district', 'environment']}
      />
    </div>
  );
};
