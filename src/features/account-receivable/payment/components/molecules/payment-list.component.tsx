import React from 'react';
import {
  textFilter,
  sortCaret,
  customFilter,
  DateRangeFilter,
  Form,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { TableBootstrap } from './table-bootstrap.components';
import dayjs from 'dayjs';

let pId;
let labId;
let registrationDate;
let invoiceDate;
let patientName;

interface PaymentListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
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

export const PaymentList = (props: PaymentListProps) => {
  return (
    <div className={`${props.isView ? 'shown' : 'hidden'}`}>
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
            dataField: 'pId',
            text: 'PId',
            sort: true,
            filter: textFilter({
              placeholder: 'PId',
              getFilter: filter => {
                pId = filter;
              },
            }),
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            headerClasses: 'textHeader',
          },
          {
            dataField: 'labId',
            text: 'Lab Id',
            sort: true,
            filter: textFilter({
              placeholder: 'LabId',
              getFilter: filter => {
                labId = filter;
              },
            }),
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            headerClasses: 'textHeader',
          },
          {
            dataField: 'customerName',
            text: 'Patient Name',
            sort: true,
            editable: false,
            headerStyle: {
              fontSize: 0,
            },
            filter: textFilter({
              placeholder: 'Patient Name',
              getFilter: filter => {
                patientName = filter;
              },
            }),
            sortCaret: (order, column) => sortCaret(order, column),
            headerClasses: 'textHeader',
          },

          {
            dataField: 'invoiceAC',
            text: 'Invoice AC',
            sort: true,
            editable: false,
            headerStyle: {
              fontSize: 0,
            },
            headerClasses: 'textHeader',
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Invoice Ac',
              getFilter: filter => {
                labId = filter;
              },
            }),
          },
          {
            dataField: 'customerName',
            text: 'Customer Name',
            sort: true,
            editable: false,
            headerClasses: 'textHeader',
            style: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: 0,
              maxWidth: '250px',
              position: 'relative',
            },
            formatter: (cellContent, row) => (
              <span title={row.customerName}>{cellContent}</span>
            ),
          },
          {
            dataField: 'actionDate',
            text: 'Action Date',
            sort: true,
            editable: false,
            headerClasses: 'textHeaderm',
            formatter: (cell, row) => {
              return (
                row.actionDate &&
                dayjs(row.actionDate).format('DD-MM-YYYY HH:MM')
              );
            },
          },
          {
            dataField: 'rLab',
            text: 'RLab',
            sort: true,
            editable: false,
          },
          {
            dataField: 'customerGroup',
            text: 'Customer Group',
            sort: true,
            editable: false,
          },
          {
            dataField: 'acClass',
            text: 'AC Class',
            sort: true,
            editable: false,
          },

          {
            dataField: 'acType',
            text: 'AC Type',
            sort: true,
            editable: false,
          },
          {
            dataField: 'discountCharges',
            text: 'Other Charges',
            sort: true,
            editable: false,
            headerClasses: 'textHeader',
            formatter: (cell, row) => {
              return <span>{row?.discountCharges}</span>;
            },
          },
          {
            dataField: 'invoiceDate',
            text: 'Invoice Date',
            sort: true,
            editable: false,
            headerStyle: {
              fontSize: 0,
            },
            headerClasses: 'textHeaderm',
            filter: customFilter({
              getFilter: filter => {
                invoiceDate = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateRangeFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return (
                row.invoiceDate &&
                dayjs(row.invoiceDate).format('DD-MM-YYYY HH:mm:ss')
              );
            },
          },
          {
            dataField: 'grossAmount',
            text: 'Gross Amount',
            sort: true,
            editable: false,
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <Form.Input
                  value={row.grossAmount}
                  onBlur={value => {
                    const grossAmount = Number.parseFloat(value) || 0;
                    let netAmount = row.netAmount || 0;
                    if (netAmount > grossAmount) {
                      netAmount = grossAmount;
                    }
                    const discountAmount = grossAmount - netAmount;
                    const discountPer = grossAmount
                      ? (discountAmount / grossAmount) * 100
                      : 0;

                    console.log({ discountPer });
                  }}
                />
              </>
            ),
          },

          {
            dataField: 'netAmount',
            text: 'Net Amount',
            sort: true,
            editable: false,
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <Form.Input
                  value={row.netAmount}
                  onBlur={value => {
                    let netAmount = Number.parseFloat(value) || 0;
                    const grossAmount = row.grossAmount || 0;
                    if (netAmount > grossAmount) {
                      netAmount = grossAmount;
                    }
                    const discountAmount = grossAmount - netAmount;
                    const discountPer = grossAmount
                      ? (discountAmount / grossAmount) * 100
                      : 0;
                    console.log({ discountPer });
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'discountAmount',
            text: 'Discount Amount',
            sort: true,
            editable: false,
          },
          {
            dataField: 'discountPer',
            text: 'Discount %',
            sort: true,
            editable: false,
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <Form.Input
                  value={row.discountPer}
                  onBlur={value => {
                    const discountPer = Number.parseFloat(value) || 0;
                    const grossAmount = row.grossAmount || 0;
                    const discountAmount = (grossAmount * discountPer) / 100;
                    const netAmount = grossAmount - discountAmount;
                    console.log({ netAmount });
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'miscellaneousCharges',
            text: 'Miscellaneous Charges',
            sort: true,
            editable: false,
          },
          {
            dataField: 'allMiscCharges',
            text: 'All Misc Charges',
            headerClasses: 'textHeader3',
            sort: true,
            csvFormatter: (col, row) => (col ? col : ''),
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <div className='flex flex-row gap-2'>
                    {row?.allMiscCharges &&
                      row?.allMiscCharges?.map((item, index) => (
                        <span key={index}>
                          {item?.code + ' - ' + item?.amount?.toString()}
                        </span>
                      ))}
                  </div>
                </>
              );
            },
          },
          {
            dataField: 'amountPayable',
            text: 'Amount Payable',
            sort: true,
            editable: false,
          },
          {
            dataField: 'receivedAmount',
            text: 'Received Amount',
            sort: true,
            editable: false,
          },
          {
            dataField: 'balance',
            text: 'Balance',
            sort: true,
            editable: false,
          },
          {
            dataField: 'modeOfPayment',
            text: 'Mode Of Payment',
            sort: true,
            editable: false,
          },

          {
            dataField: 'paymentRemark',
            text: 'Payment Remark',
            sort: true,
            editable: false,
          },
          {
            dataField: 'status',
            text: 'Status',
            sort: true,
            editable: false,
          },

          {
            dataField: 'enteredBy',
            text: 'Entered By',
            sort: true,
            editable: false,
          },
          {
            text: 'Company Code',
            dataField: 'companyCode',
            sort: true,
            editable: false,
          },
          {
            text: 'Environment',
            dataField: 'environment',
            editable: false,
            sort: true,
          },
        ]}
        isDelete={props.isDelete}
        isEditModify={props.isUpdate}
        isExport={props.isExport}
        isSelectRow={true}
        fileName='Payments'
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
          pId('');
          labId('');
          registrationDate();
          invoiceDate();
        }}
      />
    </div>
  );
};
