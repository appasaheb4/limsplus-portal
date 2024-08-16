import React from 'react';
import {
  Tooltip,
  Icons,
  textFilter,
  sortCaret,
  customFilter,
  DateRangeFilter,
  TableBootstrap,
} from '@/library/components';
import { Confirm } from '@/library/models';
import dayjs from 'dayjs';

interface BillSummaryListProps {
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
  onReport?: (item: any) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

export const BillSummaryList = (props: BillSummaryListProps) => {
  return (
    <>
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
              dataField: 'billNo',
              text: 'Bill No',
              headerClasses: 'textHeader',
              sort: true,
              editable: false,
            },
            {
              dataField: 'billDate',
              editable: false,
              text: 'Bill Date',
              headerClasses: 'textHeadersxm',
              formatter: (cell, row) => {
                return (
                  <>
                    {row.billDate &&
                      dayjs(row.billDate || 0).format('DD-MM-YYYY HH:mm:ss')}
                  </>
                );
              },
            },
            {
              dataField: 'corporateCode',
              text: 'Corporate Code',
              headerClasses: 'textHeaderxs',
              sort: true,
              editable: false,
            },
            {
              dataField: 'corporateName',
              text: 'Corporate Name',
              sort: true,
              editable: false,
            },
            {
              dataField: 'invoiceAc',
              text: 'InvoiceAc',
              sort: true,
              editable: false,
            },
            {
              dataField: 'clientContactNo',
              text: 'Client Contact No',
              sort: true,
              editable: false,
            },
            {
              dataField: 'billingFrequency',
              text: 'Billing Frequency',
              sort: true,
              editable: false,
            },
            {
              dataField: 'billForm',
              editable: false,
              text: 'Bill Form',
              headerClasses: 'textHeadersxm',
              formatter: (cell, row) => {
                return (
                  <>
                    {row.billForm &&
                      dayjs(row.billForm || 0).format('DD-MM-YYYY HH:mm:ss')}
                  </>
                );
              },
            },
            {
              dataField: 'billTo',
              editable: false,
              text: 'Bill To',
              headerClasses: 'textHeadersxm',
              formatter: (cell, row) => {
                return (
                  <>
                    {row.billTo &&
                      dayjs(row.billTo || 0).format('DD-MM-YYYY HH:mm:ss')}
                  </>
                );
              },
            },
            {
              dataField: 'accountType',
              text: 'Account Type',
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
              dataField: 'billingOn',
              text: 'Billing On',
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
              text: 'Discount Per',
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
              dataField: 'status',
              text: 'Status',
              sort: true,
              editable: false,
            },

            {
              dataField: 'enteredBy',
              text: 'Entered By',
              sort: true,
              csvFormatter: col => (col ? col : ''),
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
            {
              dataField: 'operation',
              text: 'View Bill',
              editable: false,
              csvExport: false,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    <Tooltip tooltipText='View Bill'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => props.onReport && props.onReport(row)}
                      >
                        {Icons.getIconTag(Icons.Iconai.AiOutlineFilePdf)}
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
          isDelete={props.isDelete}
          isEditModify={props.isUpdate}
          isExport={props.isExport}
          isSelectRow={false}
          fileName='Bill Summary'
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
};
