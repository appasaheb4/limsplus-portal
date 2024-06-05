import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Tooltip, Icons } from '@/library/components';
import { Confirm } from '@/library/models';
import dayjs from 'dayjs';

import { TableBootstrapTranHeader } from './table-bootstrap-tran-header.components';

interface TransactionHeaderProps {
  data: any;
  totalSize: number;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  selectId?: string;
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
  onExpand?: (item: any) => void;
  onReport?: (item: any) => void;
}
const selectedItem = {};
export const TransactionHeaderList = observer(
  (props: TransactionHeaderProps) => {
    const [selectedItem, setSelectedItem] = useState<any>({});
    const [selectId, setSelectId] = useState('');
    const [localData, setLocalData] = useState(props.data);

    useEffect(() => {
      setSelectId(props.selectId || '');
      setLocalData(
        props.selectId
          ? props.data
              ?.filter(item => item._id === props.selectId)
              ?.map(item => ({ ...item, selectedId: props.selectId }))
          : props.data,
      );
    }, [props.selectId, props.data]);

    return (
      <>
        <div className={`${props.isView ? 'shown' : 'hidden'}`}>
          <TableBootstrapTranHeader
            id='_id'
            data={localData}
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
                headerClasses: 'textHeaderm',
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
                headerClasses: 'textHeaderm',
                formatter: (cell, row) => {
                  return (
                    row.invoiceDate &&
                    dayjs(row.invoiceDate).format('DD-MM-YYYY HH:mm:ss')
                  );
                },
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
                    dayjs(row.actionDate).format('DD-MM-YYYY HH:mm:ss')
                  );
                },
              },
              {
                dataField: 'registrationDate',
                text: 'Registration Date',
                sort: true,
                headerClasses: 'textHeaderm',
                editable: false,
                formatter: (cell, row) => {
                  return (
                    row.registrationDate &&
                    dayjs(row.registrationDate).format('DD-MM-YYYY HH:mm:ss')
                  );
                },
              },
              {
                dataField: 'dueDate',
                text: 'Due Date',
                sort: true,
                headerClasses: 'textHeaderm',
                editable: false,
                formatter: (cell, row) => {
                  return (
                    row.dueDate &&
                    dayjs(row.dueDate).format('DD-MM-YYYY HH:mm:ss')
                  );
                },
              },
              {
                dataField: 'reportingDate',
                text: 'Reporting Date',
                sort: true,
                editable: false,
                headerClasses: 'textHeaderm',
                formatter: (cell, row) => {
                  return (
                    row.reportingDate &&
                    dayjs(row.reportingDate).format('DD-MM-YYYY HH:mm:ss')
                  );
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
                        {row?.allMiscCharges?.map((item, index) => (
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

                      {selectId === row._id ? (
                        <Tooltip tooltipText='close'>
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
            clearAllFilter={() => {}}
            onClickRow={item => {
              // setSelectedItem(item);
              // props.onClickRow && props.onClickRow(item);
            }}
          />
        </div>
      </>
    );
  },
);
