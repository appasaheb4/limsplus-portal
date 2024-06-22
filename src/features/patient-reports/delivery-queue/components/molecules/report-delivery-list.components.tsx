import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Tooltip,
  Icons,
  textFilter,
  customFilter,
  DateRangeFilter,
  NumberFilter,
  sortCaret,
} from '@/library/components';
import dayjs from 'dayjs';
import { TableBootstrapReport } from './table-bootstrap-report.components';
import { GrDocumentLocked } from "react-icons/gr";

let labId;
let name;
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
let companyCode;
let environment;

interface ReportDeliveryProps {
  data: any;
  totalSize: number;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  isGenerateReport?: boolean;
  isHold?: boolean;
  isCancel?: boolean;
  isReport?: boolean;
  isEmail?: boolean;
  selectedId?: string;
  isPagination?: boolean;
  onUpdate?: (selectedItem: any) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onUpdateDeliveryStatus?: () => void;
  onPagination?: (type: string) => void;
  onReport: (items: any) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
  onExpand?: (items: any) => void;
  holdRecord?: any;
  onFindDeliveryStatus?: (item: string) => void;
}

export const ReportDeliveryList = observer((props: ReportDeliveryProps) => {
  const [selectId, setSelectId] = useState('');
  const [localData, setLocalData] = useState(props.data);

  const filterDataByHoldRecord = (data, holdRecord) => {
    switch (holdRecord) {
      case 'Hold': {
        return data.filter(item => item?.deliveryStatus === 'Hold');
      }
      case 'Pending': {
        return data.filter(item => item?.deliveryStatus === 'Pending');
      }
      case 'Done': {
        return data.filter(item => item?.deliveryStatus === 'Done');
      }
      default: {
        return data;
      }
    }
  };
  useEffect(() => {
    setSelectId(props.selectedId || '');
    setLocalData(
      props.selectedId
        ? props.data
            ?.filter(item => item._id === props.selectedId)
            ?.map(item => ({ ...item, selectedId: props.selectedId }))
        : filterDataByHoldRecord(props.data, props.holdRecord),
    );
  }, [props.selectedId, props.data, props.holdRecord]);

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrapReport
          id='_id'
          data={localData}
          totalSize={props.totalSize}
          isPagination={props.isPagination}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'deliveryId',
              text: 'Delivery Id',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderxxs',
            },
            {
              dataField: 'labId',
              text: 'Lab Id',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderm',
            },
            {
              dataField: 'name',
              text: 'Name',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              style: {
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '250px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row.name}>{cellContent}</span>
              ),
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Name',
                getFilter: filter => {
                  name = filter;
                },
              }),
            },

            {
              dataField: 'deliveryDate',
              text: 'Delivery Date',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeaderm',
              filter: customFilter({
                getFilter: filter => {
                  deliveryDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
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
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeaderm',
              filter: customFilter({
                getFilter: filter => {
                  reportDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
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
              editable: false,
            },
            {
              dataField: 'reportType',
              text: 'Report Type',
              sort: true,
              editable: false,
            },
            {
              dataField: 'reportPriority',
              text: 'Report Priority',
              // headerClasses: 'textHeader',
              sort: true,
              csvFormatter: (col, row) =>
                row?.reportPriority ? row.reportPriority : '',
              editable: false,
            },
            {
              dataField: 'deliveryMode',
              text: 'Delivery Mode',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: (col, row) =>
                row?.deliveryMode ? row.deliveryMode : '',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <div className='flex flex-row flex-wrap gap-1'>
                    {row?.deliveryMode?.map((item, index) => (
                      <span
                        key={index}
                        className='bg-blue-800 rounded-md p-2 text-white'
                      >
                        {item.code}
                      </span>
                    ))}
                  </div>
                );
              },
            },
            {
              dataField: 'clientCode',
              text: 'Client Code - Name',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Client Code - Name',
                getFilter: filter => {
                  clientCode = filter;
                },
              }),
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '250px',
                position: 'relative',
              },
              formatter: (cellContent, row) => {
                return (
                  <span title={`${row.clientCode} - ${row.clientName}`}>
                    {cellContent} - {row.clientName}
                  </span>
                );
              },
            },
            {
              dataField: 'registrationLocationCode',
              text: 'Registration Location Code - Name',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Registration Location Code - Name',
                getFilter: filter => {
                  registrationLocationCode = filter;
                },
              }),
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '250px',
                position: 'relative',
              },
              formatter: (cellContent, row) => {
                return (
                  <span
                    title={`${row.registrationLocationCode} - ${row.registrationLocation}`}
                  >
                    {cellContent} - {row.registrationLocation}
                  </span>
                );
              },
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Doctor Code',
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Doctor Name',
                getFilter: filter => {
                  doctorName = filter;
                },
              }),
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Destination',
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Comments',
                getFilter: filter => {
                  comments = filter;
                },
              }),
            },
            {
              dataField: 'startDate',
              text: 'Start Date',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeaderm',
              filter: customFilter({
                getFilter: filter => {
                  startDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
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
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              headerClasses: 'textHeaderm',
              filter: customFilter({
                getFilter: filter => {
                  endDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Error Msg',
                getFilter: filter => {
                  errorMsg = filter;
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Qr Code',
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'PDF',
                getFilter: filter => {
                  pdf = filter;
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'External Lab Id',
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Employee Code',
                getFilter: filter => {
                  employeeCode = filter;
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'User Comments',
                getFilter: filter => {
                  userComments = filter;
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
              headerClasses: 'textHeader',
              filter: textFilter({
                placeholder: 'Entered By',
                getFilter: filter => {
                  enteredBy = filter;
                },
              }),
            },

            {
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader',
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
                    {props.isGenerateReport && (
                      <Tooltip tooltipText='Generate Report'>
                        <Icons.IconContext
                          color={
                            row?.deliveryStatus !== 'Done' &&
                            row?.deliveryStatus !== 'Cancel' &&
                            row?.deliveryStatus !== 'Hold'
                              ? '#ffffff'
                              : '#5A5A5A'
                          }
                          size='20'
                          onClick={() => {
                            if (
                              row?.deliveryStatus !== 'Done' &&
                              row?.deliveryStatus !== 'Cancel' &&
                              row?.deliveryStatus !== 'Hold'
                            ) {
                              props.onUpdate &&
                                props.onUpdate({
                                  type: 'Done',
                                  visitId: row?.visitId,
                                  show: true,
                                  id: row._id,
                                  title: 'Are you sure?',
                                  body: 'Generate pdf status update',
                                });
                            }
                          }}
                        >
                          {Icons.getIconTag(Icons.IconTb.TbExchange)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}
                    {props.isHold && (
                      <Tooltip
                        tooltipText={`${
                          row?.deliveryStatus === 'Hold' ? 'Pending' : 'Hold'
                        }`}
                        position='bottom'
                      >
                        <Icons.IconContext
                          color={
                            row?.deliveryStatus !== 'Cancel'
                              ? '#ffffff'
                              : '#5A5A5A'
                          }
                          size='20'
                          onClick={() => {
                            if (row?.deliveryStatus !== 'Cancel') {
                              props.onUpdate &&
                                props.onUpdate({
                                  type:
                                    row?.deliveryStatus === 'Hold'
                                      ? 'Pending'
                                      : 'Hold',
                                  visitId: row?.visitId,
                                  show: true,
                                  id: row._id,
                                  title: 'Are you sure?',
                                  body: 'Delivery status update',
                                });
                            }
                          }}
                        >
                          {Icons.getIconTag(Icons.Iconmd.MdBackHand)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}
                    {props.isCancel && (
                      <Tooltip tooltipText='Cancel' position='bottom'>
                        <Icons.IconContext
                          color={
                            row?.deliveryStatus !== 'Hold' &&
                            row?.deliveryStatus !== 'Cancel'
                              ? '#ffffff'
                              : '#5A5A5A'
                          }
                          size='20'
                          onClick={() => {
                            if (
                              row?.deliveryStatus !== 'Hold' &&
                              row?.deliveryStatus !== 'Cancel'
                            ) {
                              props.onUpdate &&
                                props.onUpdate({
                                  type: 'Cancel',
                                  visitId: row?.visitId,
                                  show: true,
                                  id: row._id,
                                  title: 'Are you sure?',
                                  body: 'Cancel item',
                                });
                            }
                          }}
                        >
                          {Icons.getIconTag(Icons.IconGi.GiCancel)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}
                    {props.isReport && (
                      <Tooltip tooltipText='Report'>
                        <Icons.IconContext
                          color={
                            row?.deliveryStatus == 'Done' &&
                            row?.deliveryStatus !== 'Hold'
                              ? '#ffffff'
                              : '#5A5A5A'
                          }
                          size='20'
                          onClick={() => {
                            if (
                              row?.deliveryStatus == 'Done' &&
                              row?.deliveryStatus !== 'Hold'
                            )
                              props.onReport && props.onReport(row);
                          }}
                        >
                          {Icons.getIconTag(Icons.IconBs.BsFilePdf)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}
                    <Tooltip tooltipText='Reopen'>
                      <GrDocumentLocked size='20' color='#ffffff' />
                    </Tooltip>
                    {selectId === row._id ? (
                      <Tooltip tooltipText='Expand'>
                        <Icons.IconContext
                          color='#ffffff'
                          size='20'
                          onClick={() => {
                            props.onExpand && props.onExpand('');
                          }}
                        >
                          {Icons.getIconTag(Icons.Iconai.AiFillMinusCircle)}
                        </Icons.IconContext>
                      </Tooltip>
                    ) : (
                      <Tooltip tooltipText='Expand'>
                        <Icons.IconContext
                          color='#ffffff'
                          size='20'
                          onClick={() => {
                            props.onExpand && props.onExpand(row);
                          }}
                        >
                          {Icons.getIconTag(Icons.Iconai.AiFillPlusCircle)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}
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
          isDelete={props.isDelete}
          isEditModify={props.isUpdate}
          isExport={props.isExport}
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
            name('');
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
            companyCode('');
            environment('');
          }}
          onUpdateDeliveryStatus={() => {
            props.onUpdateDeliveryStatus && props.onUpdateDeliveryStatus();
          }}
          onPagination={type => {
            props.onPagination && props.onPagination(type);
          }}
          onFindDeliveryStatus={item => {
            props.onFindDeliveryStatus && props.onFindDeliveryStatus(item);
          }}
        />
      </div>
    </>
  );
});
