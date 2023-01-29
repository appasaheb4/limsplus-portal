import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  Tooltip,
  Icons,
  textFilter,
  customFilter,
  DateFilter,
  NumberFilter,
  sortCaret,
} from '@/library/components';
import dayjs from 'dayjs';
import {TableBootstrap} from './table-bootstrap.components';
import * as Material from '@mui/material';

let labId;
let externalLabId;
let employeeCode;
let visitId;
let deliveryId;
let deliveryDate;
let reportDate;
let deliveryStatus;
let reportType;
let deliveryMode;
let destination;
let comments;
let startDate;
let endDate;
let errorMsg;
let clientCode;
let clientName;
let registrationLocation;
let registrationLocationCode;
let doctorCode;
let doctorName;
let qrCode;
let pdf;
let enteredBy;
let userComments;

interface ReportDeliveryProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  isPagination?: boolean;
  onUpdate?: (selectedItem: any) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onUpdateDeliveryStatus?: () => void;
  onReport: (labId: string) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
}

export const ReportDeliveryList = observer((props: ReportDeliveryProps) => {
  const [selectedItem, setSelectedItem] = useState<any>({});
  return (
    <>
      <div style={{position: 'relative'}}>
        <TableBootstrap
          id='_id'
          data={props.data}
          totalSize={props.totalSize}
          selectedItem={selectedItem}
          isPagination={props.isPagination}
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
              dataField: 'externalLabId',
              text: 'External Lab Id',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  externalLabId = filter;
                },
              }),
            },
            {
              dataField: 'employeeCode',
              text: 'Employee Code',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  employeeCode = filter;
                },
              }),
            },
            {
              dataField: 'deliveryId',
              text: 'Delivery Id',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader3',
              filter: customFilter({
                getFilter: filter => {
                  deliveryId = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              dataField: 'deliveryDate',
              text: 'Delivery Date',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader11',
              filter: customFilter({
                getFilter: filter => {
                  deliveryDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.deliveryDate
                      ? dayjs(row.deliveryDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'reportDate',
              text: 'Report Date',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader11',
              filter: customFilter({
                getFilter: filter => {
                  reportDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.reportDate
                      ? dayjs(row.reportDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'deliveryStatus',
              text: 'Delivery Status',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  deliveryStatus = filter;
                },
              }),
            },
            {
              dataField: 'reportType',
              text: 'Report Type',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  reportType = filter;
                },
              }),
            },
            {
              dataField: 'reportPriority',
              text: 'Report Priority',
              headerClasses: 'textHeader4',
              sort: true,
              csvFormatter: (col, row) =>
                row?.reportPriority ? row.reportPriority : '',
              editable: false,
            },
            {
              dataField: 'deliveryMode',
              text: 'Delivery Mode',
              headerClasses: 'textHeader4',
              sort: true,
              csvFormatter: (col, row) =>
                row?.deliveryMode ? row.deliveryMode : '',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <div className='flex flex-row flex-wrap gap-2'>
                    {typeof row?.deliveryMode != 'string' &&
                      row?.deliveryMode?.map(item => (
                        <span className='bg-blue-800 rounded-md p-2 text-white'>
                          {item.value}
                        </span>
                      ))}
                  </div>
                );
              },
            },
            {
              dataField: 'destination',
              text: 'Destination',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  destination = filter;
                },
              }),
            },
            {
              dataField: 'comments',
              text: 'Comments',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  comments = filter;
                },
              }),
            },
            {
              dataField: 'startDate',
              text: 'Start Date',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader11',
              filter: customFilter({
                getFilter: filter => {
                  startDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.startDate
                      ? dayjs(row.startDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'endDate',
              text: 'End Date',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader11',
              filter: customFilter({
                getFilter: filter => {
                  endDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.endDate
                      ? dayjs(row.endDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'errorMsg',
              text: 'Error Msg',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  errorMsg = filter;
                },
              }),
            },
            {
              dataField: 'clientCode',
              text: 'Client Code',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  clientCode = filter;
                },
              }),
            },
            {
              dataField: 'clientName',
              text: 'Client Name',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  clientName = filter;
                },
              }),
            },
            {
              dataField: 'registrationLocation',
              text: 'Registration Location',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader8',
              filter: textFilter({
                getFilter: filter => {
                  registrationLocation = filter;
                },
              }),
            },
            {
              dataField: 'registrationLocationCode',
              text: 'Registration Location Code',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader8',
              filter: textFilter({
                getFilter: filter => {
                  registrationLocationCode = filter;
                },
              }),
            },
            {
              dataField: 'doctorCode',
              text: 'Doctor Code',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  doctorCode = filter;
                },
              }),
            },
            {
              dataField: 'doctorName',
              text: 'Doctor Name',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  doctorName = filter;
                },
              }),
            },
            {
              dataField: 'qrCode',
              text: 'Qr Code',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  qrCode = filter;
                },
              }),
            },
            {
              dataField: 'pdf',
              text: 'PDF',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  pdf = filter;
                },
              }),
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  enteredBy = filter;
                },
              }),
            },
            {
              dataField: 'userComments',
              text: 'User Comments',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader3',
              filter: textFilter({
                getFilter: filter => {
                  userComments = filter;
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
                    <Tooltip tooltipText='Cancel' position='bottom'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() =>
                          props.onUpdate &&
                          props.onUpdate({
                            type: 'cancel',
                            visitId: row?.visitId,
                            show: true,
                            id: row._id,
                            title: 'Are you sure?',
                            body: 'Cancel item',
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.IconGi.GiCancel)}
                      </Icons.IconContext>
                    </Tooltip>
                    <Tooltip tooltipText='Hold' position='bottom'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() =>
                          props.onUpdate &&
                          props.onUpdate({
                            type: 'hold',
                            visitId: row?.visitId,
                            show: true,
                            id: row._id,
                            title: 'Are you sure?',
                            body: 'Hold item',
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.Iconmd.MdBackHand)}
                      </Icons.IconContext>
                    </Tooltip>

                    <Tooltip tooltipText='Delivery Status'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() =>
                          props.onUpdate &&
                          props.onUpdate({
                            type: 'generatePdf',
                            visitId: row?.visitId,
                            show: true,
                            id: row._id,
                            title: 'Are you sure?',
                            body: 'Generate pdf status update',
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.IconTb.TbExchange)}
                      </Icons.IconContext>
                    </Tooltip>
                    <Tooltip tooltipText='Medical Report'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() =>
                          props.onReport && props.onReport(row?.labId)
                        }
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFilePdf)}
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
          fileName='Report Delivery'
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
            externalLabId('');
            employeeCode('');
            deliveryId('');
            deliveryDate();
            reportDate();
            deliveryStatus('');
            reportType('');
            deliveryMode('');
            destination('');
            comments('');
            startDate();
            endDate();
            errorMsg('');
            clientCode('');
            clientName('');
            registrationLocation('');
            registrationLocationCode('');
            doctorCode('');
            doctorName('');
            qrCode('');
            pdf('');
            enteredBy('');
            userComments('');
          }}
          onClickRow={(item, index) => {
            setSelectedItem(item);
            props.onClickRow && props.onClickRow(item, index);
          }}
          onUpdateDeliveryStatus={() => {
            props.onUpdateDeliveryStatus && props.onUpdateDeliveryStatus();
          }}
        />
      </div>
    </>
  );
});
