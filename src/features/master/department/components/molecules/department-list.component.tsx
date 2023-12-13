import React from 'react';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  TableBootstrap,
  textFilter,
  Form,
  Icons,
  Tooltip,
  sortCaret,
  Toast,
} from '@/library/components';
import { Confirm } from '@/library/models';
import {
  AutoCompleteFilterSingleSelectLabs,
  AutoCompleteFilterSingleSelectHod,
  AutoCompleteAuthorizedSignatory,
} from '../index';
import { useForm, Controller } from 'react-hook-form';
import { FormHelper } from '@/helper';
import { AutoCompleteCompanyList } from '@/core-components';
let lab;
let code;
let name;
let shortName;
let hod;
let reportOrder;
let mobileNo;
let contactNo;
let openingTime;
let closingTime;
let fyiLine;
let workLine;
let status;
let environment;
let companyCode;

interface DepartmentListProps {
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
  onApproval: (record: any) => void;
}

const dynamicStylingFields = [
  'lab',
  'code',
  'name',
  'description',
  'status',
  'environment',
];
const hideExcelSheet = ['_id', 'opration'];

export const DepartmentList = (props: DepartmentListProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
    <div style={{ position: 'relative' }}>
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
            dataField: 'lab',
            text: 'Lab',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              getFilter: filter => {
                lab = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <AutoCompleteFilterSingleSelectLabs
                  onSelect={item => {
                    props.onUpdateItem &&
                      props.onUpdateItem(item.code, column.dataField, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'code',
            text: 'Code',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              getFilter: filter => {
                code = filter;
              },
            }),
            style: { textTransform: 'uppercase' },
            editable: false,
          },
          {
            dataField: 'name',
            text: 'Name',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              getFilter: filter => {
                name = filter;
              },
            }),
            style: { textTransform: 'uppercase' },
            editable: false,
          },
          {
            dataField: 'shortName',
            text: 'Short Name',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                shortName = filter;
              },
            }),
            style: { textTransform: 'uppercase' },
            editorStyle: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: 'hod',
            text: 'HOD',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                hod = filter;
              },
            }),
            style: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <AutoCompleteFilterSingleSelectHod
                  onSelect={item => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        item.fullName,
                        column.dataField,
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'authorizedSignatory',
            text: 'Authorized Signatory',
            headerClasses: 'textHeader2',
            // sort: true,
            // headerStyle: {
            //   fontSize: 0,
            // },
            // sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            formatter: (cell, row) => {
              return (
                <>
                  {row?.authorizedSignatory?.map(item => (
                    <h4>{item}</h4>
                  ))}
                </>
              );
            },
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <AutoCompleteAuthorizedSignatory
                  selectedItems={row?.authorizedSignatory}
                  onSelect={item => {
                    props.onUpdateItem &&
                      props.onUpdateItem(item, column.dataField, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'reportOrder',
            text: 'Report Order',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                reportOrder = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Form.Input
                      placeholder={
                        errors.reportOrder
                          ? 'Please enter report order'
                          : 'Report Order'
                      }
                      type='number'
                      hasError={!!errors.reportOrder}
                      defaultValue={row?.reportOrder}
                      onChange={reportOrder => {
                        onChange(reportOrder);
                      }}
                      onBlur={reportOrder => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            Number.parseFloat(reportOrder),
                            'reportOrder',
                            row._id,
                          );
                      }}
                    />
                  )}
                  name='reportOrder'
                  rules={{
                    required: false,
                  }}
                  defaultValue=''
                />
              </>
            ),
          },
          {
            dataField: 'mobileNo',
            text: 'Mobile No',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                mobileNo = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                  placeholder={row.mobileNo}
                  defaultValue={row.mobileNo}
                  type='number'
                  onBlur={mobileNo => {
                    if (mobileNo === '') {
                      // Handle the case when the input is empty
                      props.onUpdateItem &&
                        props.onUpdateItem(mobileNo, column.dataField, row._id);
                    } else if (
                      FormHelper.isMobileNoValid(String(mobileNo)) &&
                      mobileNo?.length === 10
                    ) {
                      props.onUpdateItem &&
                        props.onUpdateItem(mobileNo, column.dataField, row._id);
                    } else {
                      Toast.error({
                        message: 'Please Enter a Valid 10-Digit Mobile Number',
                      });
                    }
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'contactNo',
            text: 'Contact No',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                contactNo = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
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
                  placeholder={row.contactNo}
                  defaultValue={row.contactNo}
                  type='number'
                  onBlur={contactNo => {
                    if (contactNo === '') {
                      // Handle the case when the input is empty
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          contactNo,
                          column.dataField,
                          row._id,
                        );
                    } else if (
                      FormHelper.isMobileNoValid(String(contactNo)) &&
                      contactNo?.length === 10
                    ) {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          contactNo,
                          column.dataField,
                          row._id,
                        );
                    } else {
                      Toast.error({
                        message: 'Please Enter a Valid 10-Digit Contact Number',
                      });
                    }
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'autoRelease',
            text: 'Auto Release',
            sort: true,
            csvFormatter: (col, row) =>
              `${row.autoRelease ? (row.autoRelease ? 'Yes' : 'No') : 'No'}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.autoRelease}
                    onChange={autoRelease => {
                      props.onUpdateItem &&
                        props.onUpdateItem(autoRelease, 'autoRelease', row._id);
                    }}
                  />
                </>
              );
            },
          },

          {
            dataField: 'requireReceveInLab',
            text: 'Require Receve In Lab',
            sort: true,
            csvFormatter: (col, row) =>
              `${
                row.requireReceveInLab
                  ? row.requireReceveInLab
                    ? 'Yes'
                    : 'No'
                  : 'No'
              }`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.requireReceveInLab}
                    onChange={requireReceveInLab => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          requireReceveInLab,
                          'requireReceveInLab',
                          row._id,
                        );
                    }}
                  />
                </>
              );
            },
          },
          {
            dataField: 'requireScainIn',
            text: 'Require Scain In',
            sort: true,
            csvFormatter: (col, row) =>
              `${
                row.requireScainIn ? (row.requireScainIn ? 'Yes' : 'No') : 'No'
              }`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.requireScainIn}
                    onChange={requireScainIn => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          requireScainIn,
                          'requireScainIn',
                          row._id,
                        );
                    }}
                  />
                </>
              );
            },
          },
          {
            dataField: 'routingDept',
            text: 'Routing Dept',
            sort: true,
            csvFormatter: (col, row) =>
              `${row.routingDept ? (row.routingDept ? 'Yes' : 'No') : 'No'}`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    disabled={!editorCell(row)}
                    value={row.routingDept}
                    onChange={routingDept => {
                      props.onUpdateItem &&
                        props.onUpdateItem(routingDept, 'routingDept', row._id);
                    }}
                  />
                </>
              );
            },
          },
          {
            dataField: 'openingTime',
            text: 'Opening Time',
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                openingTime = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: 'closingTime',
            text: 'Closing Time',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                closingTime = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: 'fyiLine',
            text: 'Fyi Line',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                fyiLine = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: 'workLine',
            text: 'Work Line',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                workLine = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },

          {
            dataField: 'status',
            text: 'Status',
            headerClasses: 'textHeader2',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                status = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) =>
              row.status == 'D' || row.status == 'I' ? false : true,
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <select
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const status = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(status, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'STATUS')
                    .filter(item => item.code != 'D')
                    .map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ))}
                </select>
              </>
            ),
          },
          {
            text: 'Company Code',
            dataField: 'companyCode',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: false,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                companyCode = filter;
              },
            }),
            headerClasses: 'textHeader2',
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
            headerClasses: 'textHeader3',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                environment = filter;
              },
            }),
            editable: false,
            // editorRenderer: (
            //   editorProps,
            //   value,
            //   row,
            //   column,
            //   rowIndex,
            //   columnIndex,
            // ) => (
            //   <>
            //     <select
            //       value={row.environment}
            //       className={
            //         'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
            //       }
            //       onChange={e => {
            //         const environment = e.target.value;
            //         props.onUpdateItem &&
            //           props.onUpdateItem(
            //             environment,
            //             column.dataField,
            //             row._id,
            //           );
            //       }}
            //     >
            //       <option selected>Select</option>
            //       {lookupItems(props.extraData.lookupItems, 'ENVIRONMENT').map(
            //         (item: any, index: number) => (
            //           <option key={index} value={item.code}>
            //             {lookupValue(item)}
            //           </option>
            //         ),
            //       )}
            //     </select>
            //   </>
            // ),
          },
          {
            dataField: 'opration',
            text: 'Action',
            editable: false,
            csvExport: false,
            hidden: !props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <div className='flex flex-row'>
                  <Tooltip tooltipText='Delete'>
                    <Icons.IconContext
                      color='#fff'
                      size='20'
                      onClick={() =>
                        props.onDelete &&
                        props.onDelete({
                          type: 'Delete',
                          show: true,
                          id: [row._id],
                          title: 'Are you sure?',
                          body: 'Delete item',
                        })
                      }
                    >
                      {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                    </Icons.IconContext>
                  </Tooltip>
                  {row.status == 'D' && (
                    <Tooltip tooltipText='Approval'>
                      <Icons.RIcon
                        nameIcon='AiOutlineCheckCircle'
                        propsIcon={{ size: 24, color: '#ffffff' }}
                        onClick={() => props.onApproval(row)}
                      />
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
        isEditModify={props.isEditModify}
        isSelectRow={true}
        fileName='Department'
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
          lab('');
          code('');
          name('');
          shortName('');
          hod('');
          reportOrder('');
          mobileNo('');
          contactNo('');
          openingTime('');
          closingTime('');
          fyiLine('');
          workLine('');
          status('');
          environment('');
          companyCode('');
        }}
        dynamicStylingFields={dynamicStylingFields}
        hideExcelSheet={hideExcelSheet}
      />
    </div>
  );
};
