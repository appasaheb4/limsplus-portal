import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {
  NumberFilter,
  textFilter,
  customFilter,
  Form,
  Tooltip,
  Icons,
} from '@/library/components';
import {Confirm} from '@/library/models';
import dayjs from 'dayjs';

import {TableBootstrap} from './table-bootstrap.components';

interface PendingPanelApprovalListProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onUpdate?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
  onReport?: (item: any) => void;
}

export const PendingPanelApprovalList = observer(
  (props: PendingPanelApprovalListProps) => {
    const [selectedItem, setSelectedItem] = useState<any>({});
    return (
      <>
        <div style={{position: 'relative'}}>
          <TableBootstrap
            id='_id'
            data={props.data}
            totalSize={props.totalSize}
            selectedItem={selectedItem}
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
                dataField: 'collectionCenter',
                text: 'Collection Center',
                sort: true,
                editable: false,
              },
              {
                dataField: 'corporateCode',
                text: 'Corporate Code',
                sort: true,
                editable: false,
              },
              {
                dataField: 'labId',
                text: 'Lab Id',
                sort: true,
                editable: false,
              },
              {
                dataField: 'invoiceAc',
                text: 'Invoice Ac',
                sort: true,
                editable: false,
              },
              {
                dataField: 'invoiceDate',
                text: 'Invoice Date',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return dayjs(row.invoiceDate).format('YYYY-MM-DD');
                },
              },
              {
                dataField: 'actionDate',
                text: 'Action Date',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return dayjs(row.actionDate).format('YYYY-MM-DD');
                },
              },
              {
                dataField: 'registrationDate',
                text: 'Registration Date',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return dayjs(row.registrationDate).format('YYYY-MM-DD');
                },
              },
              {
                dataField: 'dueDate',
                text: 'Due Date',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return dayjs(row.dueDate).format('YYYY-MM-DD');
                },
              },
              {
                dataField: 'reportingDate',
                text: 'Reporting Date',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return dayjs(row.reportingDate).format('YYYY-MM-DD');
                },
              },
              {
                dataField: 'doctorId',
                text: 'Doctor Id',
                sort: true,
                editable: false,
              },
              {
                dataField: 'pId',
                text: 'PId',
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
                text: 'NetAmount',
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
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) => (col ? col : ''),
                editable: false,
                formatter: (cell, row) => {
                  return (
                    <>
                      <div className='flex flex-row gap-2'>
                        {row?.allMiscCharges?.map(item => (
                          <span>
                            {item?.code + ' - ' + item?.amount?.toString()}
                          </span>
                        ))}
                      </div>
                    </>
                  );
                },
              },
              {
                dataField: 'discountCharges',
                text: 'Other Charges',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return (
                    <>
                      <div className='flex flex-row gap-2'>
                        {row?.discountCharges && (
                          <span>
                            {row?.discountCharges?.code +
                              ' - ' +
                              row?.discountCharges?.amount?.toString()}
                          </span>
                        )}
                      </div>
                    </>
                  );
                },
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
                dataField: 'acClass',
                text: 'AC Class',
                sort: true,
                editable: false,
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
                dataField: 'operation',
                text: 'Report',
                editable: false,
                csvExport: false,
                hidden: !props.isDelete,
                formatter: (cellContent, row) => (
                  <>
                    <div className='flex flex-row'>
                      <Tooltip tooltipText='Generate PDF'>
                        <Icons.IconContext
                          color='#fff'
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
            clearAllFilter={() => {}}
            onClickRow={(item, index) => {
              setSelectedItem(item);
              props.onClickRow && props.onClickRow(item, index);
            }}
          />
        </div>
      </>
    );
  },
);
