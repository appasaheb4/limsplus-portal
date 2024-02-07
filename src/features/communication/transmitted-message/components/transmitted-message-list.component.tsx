import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  TableBootstrap,
  sortCaret,
  textFilter,
  Tooltip,
  Icons,
} from '@/library/components';
import { Confirm } from '@/library/models';
import dayjs from 'dayjs';
import { Accordion, AccordionItem } from 'react-sanfona';
import '@/library/assets/css/accordion.css';

interface TransmittedMessageListProps {
  data: any;
  extraData: any;
  totalSize: number;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItems?: (value: any, id: string) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  getTestDetails?: (lab: string) => void;
  getAnalyteDetails?: (testCode: string) => void;
}

let labId;
let instType;
let instId;
let protocol;
let segmentMessage;
let segmentOrder;
let segmentArray;
let dateOfEntry;
let status;
let companyCode;
let environment;

export const TransmittedMessageList = observer(
  ({
    extraData,
    onUpdateItems,
    getTestDetails,
    getAnalyteDetails,
    ...props
  }: TransmittedMessageListProps) => {
    const [list, setList] = useState([]);
    const [pLabDetails, setPLabDetails] = useState<any>();
    const [selectedRowId, setSelectedRowId] = useState('');

    useEffect(() => {
      setList(JSON.parse(JSON.stringify(props.data)));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRowId, props.data]);

    return (
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrap
          id='_id'
          data={list}
          totalSize={props.totalSize}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'labId',
              text: 'Lab Id',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  labId = filter;
                },
              }),
            },
            {
              dataField: 'instType',
              text: 'Inst Type',
              headerClasses: 'textHeader',
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  instType = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'instId',
              text: 'Inst Id',
              headerClasses: 'textHeader',
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  instId = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'protocol',
              text: 'Protocol',
              headerClasses: 'textHeader',
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  protocol = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'segmentMessage',
              text: 'Segment Message',
              headerClasses: 'textHeader',
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  segmentMessage = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'segmentOrder',
              text: 'Segment Order',
              headerClasses: 'textHeader',
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  segmentOrder = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'segmentArray',
              text: 'Segment Array',
              headerClasses: 'textHeader',
              csvFormatter: (cell, row, rowIndex) =>
                `FieldNo:${row.segmentArray?.map(
                  (item: any) => item.field_no,
                )}  - Filed:${row.segmentArray?.map(
                  (item: any) => item.filed,
                )} - Value:${row.segmentArray?.map(
                  (item: any) => item.value,
                )} `,
              filter: textFilter({
                getFilter: filter => {
                  segmentArray = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              formatter: (cell, row) => {
                return (
                  <div
                    key={row._id}
                    className='flex flex-col items-center gap-4'
                  >
                    {row.segmentArray?.length > 0 && (
                      <Tooltip
                        tooltipText={
                          row._id != selectedRowId ? 'Expand' : 'Collapse'
                        }
                      >
                        <Icons.IconContext
                          color='#000000'
                          size='20'
                          onClick={() => {
                            row._id == selectedRowId
                              ? setSelectedRowId('')
                              : setSelectedRowId(row._id);
                          }}
                        >
                          {Icons.getIconTag(
                            row._id != selectedRowId
                              ? Icons.IconBi.BiExpand
                              : Icons.IconBi.BiCollapse,
                          )}
                        </Icons.IconContext>
                      </Tooltip>
                    )}
                    {selectedRowId == row._id && (
                      <Accordion>
                        {row.segmentArray?.map(item => {
                          return (
                            <AccordionItem title={`${item.filed}`}>
                              <h6>Field No: {item?.field_no}</h6>
                              <span style={{ fontSize: 12 }}>
                                Value: {item?.value}
                              </span>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    )}
                  </div>
                );
              },
            },
            {
              dataField: 'dateOfEntry',
              editable: false,
              text: 'Date Of Entry',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateOfEntry
                  ? dayjs(row.dateOfEntry || 0).format('DD-MM-YYYY HH:mm:ss')
                  : '',
              filter: textFilter({
                getFilter: filter => {
                  dateOfEntry = filter;
                },
              }),
              formatter: (cell, row) => {
                return (
                  <>
                    {dayjs(row.dateOfEntry || 0).format('DD-MM-YYYY HH:mm:ss')}
                  </>
                );
              },
            },
            {
              dataField: 'status',
              text: 'Status',
              headerClasses: 'textHeader',
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  status = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
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
                getFilter: filter => {
                  environment = filter;
                },
              }),
            },
          ]}
          isEditModify={props.isUpdate}
          isExport={props.isExport}
          isSelectRow={true}
          isDelete={props.isDelete}
          fileName='Transmitted Message'
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
            labId('');
            instType('');
            instId('');
            protocol('');
            segmentMessage('');
            segmentOrder('');
            segmentArray('');
            dateOfEntry('');
            status('');
            status('');
            environment('');
          }}
          hideExcelSheet={['_id']}
          dynamicStylingFields={[]}
        />
      </div>
    );
  },
);
