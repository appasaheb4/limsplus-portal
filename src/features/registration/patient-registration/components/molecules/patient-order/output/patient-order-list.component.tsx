import React from 'react';
import { observer } from 'mobx-react';
import {
  NumberFilter,
  Icons,
  Tooltip,
  customFilter,
  textFilter,
  sortCaret,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { PatientOrderExpand } from './patient-order-expand.component';
import { TiFlowChildren } from 'react-icons/ti';
import { MdPayment } from 'react-icons/md';

interface PatientOrderListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onAddPanels?: (item: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onBarcode?: (item: any) => void;
  onPayment?: (item: any) => void;
  onReceipt?: (item: any) => void;
}

let labid;
let visitId;
let orderId;
let panelCode;
let companyCode;
let environment;

export const PatientOrderList = observer((props: PatientOrderListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <PatientOrderExpand
          id='_id'
          data={props.data}
          totalSize={props.totalSize}
          isPagination={false}
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
              headerClasses: 'textHeader',
              sort: true,
              editable: false,
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              // filter: customFilter({
              //   getFilter: filter => {
              //     labid = filter;
              //   },
              // }),
              // filterRenderer: (onFilter, column) => (
              //   <NumberFilter onFilter={onFilter} column={column} />
              // ),
            },
            {
              dataField: 'visitId',
              text: 'Visit Id',
              editable: false,
              // headerClasses: 'textHeader4 z-10',
              sort: true,
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              // filter: customFilter({
              //   getFilter: filter => {
              //     visitId = filter;
              //   },
              // }),
              // filterRenderer: (onFilter, column) => (
              //   <NumberFilter onFilter={onFilter} column={column} />
              // ),
            },
            {
              dataField: 'orderId',
              text: 'Order Id',
              // headerClasses: 'textHeader4 z-10',
              sort: true,
              editable: false,
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              // filter: customFilter({
              //   getFilter: filter => {
              //     orderId = filter;
              //   },
              // }),
              // filterRenderer: (onFilter, column) => (
              //   <NumberFilter onFilter={onFilter} column={column} />
              // ),
            },
            {
              dataField: 'panelCode',
              text: 'Panel Code',
              editable: false,
              // headerClasses: 'textHeader4 z-10',
              sort: true,
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              // csvFormatter: (cell, row, rowIndex) =>
              //   `${row.panelCode.map(item => item.panelCode)}`,
              // filter: textFilter({
              //   getFilter: filter => {
              //     panelCode = filter;
              //   },
              // }),
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: 'inside' }}>
                    {row.panelCode.map((item, index) => (
                      <li key={index}>{item.panelCode}</li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              // headerClasses: 'textHeader1',
              sort: true,
              // sortCaret: (order, column) => sortCaret(order, column),
              // csvFormatter: (col, row) => (row.enteredBy ? row.enteredBy : ''),
              formatter: (cell, row) => {
                return <span>{row.enteredBy}</span>;
              },
              editable: false,
            },
            {
              dataField: 'packageList',
              text: 'packageList',
              csvExport: false,
              hidden: true,
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              sort: true,
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              csvFormatter: col => (col ? col : ''),
              // filter: textFilter({
              //   getFilter: filter => {
              //     companyCode = filter;
              //   },
              // }),
              // headerClasses: 'textHeader2',
              // editorRenderer: (
              //   editorProps,
              //   value,
              //   row,
              //   column,
              //   rowIndex,
              //   columnIndex,
              // ) => (
              //   <>
              //     <AutoCompleteCompanyList
              //       isLabel={false}
              //       hasError={false}
              //       onSelect={companyCode => {
              //         props.onUpdateItem &&
              //           props.onUpdateItem(
              //             companyCode,
              //             column.dataField,
              //             row._id,
              //           );
              //       }}
              //     />
              //   </>
              // ),
            },
            {
              dataField: 'environment',
              text: 'Environment',
              // headerClasses: 'textHeader2',
              sort: true,
              // headerStyle: {
              //   fontSize: 0,
              // },
              editable: false,
              // sortCaret: (order, column) => sortCaret(order, column),
              // csvFormatter: col => (col ? col : ''),
              // filter: textFilter({
              //   getFilter: filter => {
              //     environment = filter;
              //   },
              // }),
            },
            {
              dataField: 'operation',
              text: 'Action',
              csvExport: false,
              editable: false,
              // hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row gap-2' key={row?._id}>
                    {row?.isApproval == false && (
                      <Tooltip tooltipText='Add/Remove Panel'>
                        <Icons.IconContext
                          color='#ffffff'
                          size='22'
                          onClick={() =>
                            props.onAddPanels && props.onAddPanels(row)
                          }
                        >
                          <Icons.RIcon
                            nameIcon='VscIssueReopened'
                            propsIcon={{ color: '#ffffff' }}
                          />
                        </Icons.IconContext>
                      </Tooltip>
                    )}
                    {props.isDelete && (
                      <Tooltip tooltipText='Delete'>
                        <Icons.IconContext
                          color='#ffffff'
                          size='20'
                          onClick={() =>
                            props.onDelete &&
                            props.onDelete({
                              type: 'delete',
                              show: true,
                              id: [row._id],
                              title: 'Are you sure?',
                              body: 'Do you want to delete this record?',
                            })
                          }
                        >
                          {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                        </Icons.IconContext>
                      </Tooltip>
                    )}

                    <Tooltip tooltipText='Barcode'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => props.onBarcode && props.onBarcode(row)}
                      >
                        {Icons.getIconTag(Icons.Iconai.AiOutlineBarcode)}
                      </Icons.IconContext>
                    </Tooltip>
                    <Tooltip tooltipText='Traceability'>
                      <TiFlowChildren color='#ffffff' size='20' />
                    </Tooltip>

                    <Tooltip tooltipText='Payment'>
                      <Icons.RIcon
                        nameIcon='MdPayment'
                        propsIcon={{ size: 20, color: '#ffffff' }}
                        onClick={() => {
                          props.onPayment && props.onPayment(row);
                        }}
                      />
                    </Tooltip>
                    <Tooltip tooltipText='Receipt'>
                      <Icons.RIcon
                        nameIcon='AiOutlineFilePdf'
                        propsIcon={{ size: 20, color: '#ffffff' }}
                        onClick={() => {
                          props.onReceipt && props.onReceipt(row);
                        }}
                      />
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
          fileName='PatientOrder'
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
            labid('');
            visitId('');
            orderId('');
            panelCode('');
            companyCode('');
            environment('');
          }}
        />
      </div>
    </>
  );
});
