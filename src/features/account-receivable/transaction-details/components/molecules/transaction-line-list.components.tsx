import React from 'react';
import { observer } from 'mobx-react';

import { Confirm } from '@/library/models';
import dayjs from 'dayjs';
import { TableBootstrapTranLine } from './table-bootstrap-tran-line.components';

interface TransactionLineProps {
  data: any;
  totalSize: number;
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

export const TransactionLineList = observer((props: TransactionLineProps) => {
  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrapTranLine
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
              dataField: 'headerId',
              text: 'Header Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'lineId',
              text: 'Line Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'rLab',
              text: 'RLab',
              sort: true,
              editable: false,
            },
            {
              dataField: 'pLab',
              text: 'PLab',
              sort: true,
              editable: false,
            },
            {
              dataField: 'collectionCenter',
              text: 'Collection Center',
              sort: true,
              editable: false,
            },
            {
              dataField: 'collectionCenterName',
              text: 'Collection Center Name',
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
                <span title={row.collectionCenterName}>{cellContent}</span>
              ),
            },
            {
              dataField: 'corporateCode',
              text: 'Corporate Code',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            // {
            //   dataField: 'invoiceAC',
            //   text: 'Invoice AC',
            //   sort: true,
            //   csvFormatter: col => (col ? col : ''),
            //   editable: false,
            // },
            {
              dataField: 'invoiceDate',
              text: 'Invoice Date',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
              headerClasses: 'textHeaderm',
              formatter: (cell, row) => {
                return dayjs(row.invoiceDate).format('DD-MM-YYYY HH:mm:ss');
              },
            },
            {
              dataField: 'actionDate',
              text: 'Action Date',
              sort: true,
              headerClasses: 'textHeaderm',
              csvFormatter: col => (col ? col : ''),
              editable: false,
              formatter: (cell, row) => {
                return dayjs(row.actionDate).format('DD-MM-YYYY HH:mm:ss');
              },
            },
            {
              dataField: 'receipt',
              text: 'Receipt',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'pId',
              text: 'PId',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'labId',
              text: 'LabId',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'acSub',
              text: 'AC Sub',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'department',
              text: 'Department',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'serviceType',
              text: 'Service Type',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'panelCode',
              text: 'Panel Code',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'panelName',
              text: 'Panel Name',
              sort: true,
              csvFormatter: col => (col ? col : ''),
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
                <span title={row.panelName}>{cellContent}</span>
              ),
            },
            {
              dataField: 'priceGroup',
              text: 'Price Group',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'priceList',
              text: 'Price List',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'grossAmount',
              text: 'Gross Amount',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'netAmount',
              text: 'Net Amount',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'discountAmount',
              text: 'Discount Amount',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'discountPer',
              text: 'Discount Per',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'miscellaneousCharges',
              text: 'Miscellaneous Charges',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'transaction',
              text: 'Transaction',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },

            {
              dataField: 'acClass',
              text: 'AC Class',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'accountType',
              text: 'Account Type',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'customerGroup',
              text: 'Customer Group',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'status',
              text: 'Status',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            // {
            //   text: 'Company Code',
            //   dataField: 'companyCode',
            //   sort: true,
            //   editable: false,
            // },
            // {
            //   text: 'Environment',
            //   dataField: 'environment',
            //   editable: false,
            //   sort: true,
            // },
          ]}
          isDelete={props.isDelete}
          isEditModify={props.isUpdate}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='Order Delivered'
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
          clearAllFilter={() => {}}
        />
      </div>
    </>
  );
});
