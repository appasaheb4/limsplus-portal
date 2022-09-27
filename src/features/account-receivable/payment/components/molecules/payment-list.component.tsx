import React from 'react';
import {lookupItems, lookupValue} from '@/library/utils';
import {textFilter, Tooltip, Icons} from '@/library/components';
import {Confirm} from '@/library/models';
import {TableBootstrap} from './table-bootstrap.components';

let pId;
let labId;

interface PaymentListProps {
  data: any;
  totalSize: number;
  extraData: any;
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

export const PaymentList = (props: PaymentListProps) => {
  return (
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
            getFilter: filter => {
              pId = filter;
            },
          }),
          editable: false,
          headerClasses: 'textHeader3',
        },
        {
          dataField: 'labId',
          text: 'Lab Id',
          sort: true,
          filter: textFilter({
            getFilter: filter => {
              labId = filter;
            },
          }),
          editable: false,
          headerClasses: 'textHeader3',
        },
        {
          dataField: 'rLab',
          text: 'RLab',
          sort: true,
          editable: false,
        },
        {
          dataField: 'invoiceAC',
          text: 'Invoice AC',
          sort: true,
          editable: false,
        },
        {
          dataField: 'customerName',
          text: 'Customer Name',
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
          text: 'Discount Charges',
          sort: true,
          editable: false,
        },
        {
          dataField: 'invoiceDate',
          text: 'Invoice Date',
          sort: true,
          editable: false,
        },
        {
          dataField: 'grossAmount',
          text: 'Gross Amount',
          sort: true,
          editable: false,
        },

        {
          dataField: 'netAmount',
          text: 'Net Amount',
          sort: true,
          editable: false,
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
                  {row?.allMiscCharges?.map(item => (
                    <span>{item?.code + ' - ' + item?.amount?.toString()}</span>
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
      ]}
      isEditModify={props.isEditModify}
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
      }}
    />
  );
};
