import React from 'react';
import { observer } from 'mobx-react';
import {
  Tooltip,
  Icons,
  textFilter,
  sortCaret,
  customFilter,
  DateRangeFilter,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { TableBootstrap } from './table-bootstrap.components';
import dayjs from 'dayjs';

interface ReceiptListProps {
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

let patientName;
let invoiceAc;
let labId;
let invoiceDate;

export const ReceiptList = observer((props: ReceiptListProps) => {
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
              dataField: 'headerId',
              text: 'Header Id',
              sort: true,
              editable: false,
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
              dataField: 'invoiceAc',
              text: 'Invoice Ac',
              sort: true,
              headerClasses: 'textHeader',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Invoice Ac',
                getFilter: filter => {
                  invoiceAc = filter;
                },
              }),
              editable: false,
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
            },
            {
              dataField: 'netAmount',
              text: 'Net Amount',
              sort: true,
              editable: false,
            },
            {
              dataField: 'discount',
              text: 'Discount',
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
              text: 'Report',
              editable: false,
              csvExport: false,
              // hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    <Tooltip tooltipText='Generate PDF'>
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
          isSelectRow={true}
          fileName='Receipt'
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
            patientName('');
            invoiceAc('');
            labId('');
            invoiceDate();
          }}
        />
      </div>
    </>
  );
});
