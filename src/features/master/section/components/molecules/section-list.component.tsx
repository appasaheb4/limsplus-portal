import React from 'react';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  TableBootstrap,
  textFilter,
  Icons,
  Tooltip,
  Form,
  sortCaret,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {AutoCompleteFilterSingleSelectDepartment} from '../index';
import {useForm, Controller} from 'react-hook-form';
import {FormHelper} from '@/helper';
let departmentCode;
let code;
let name;
let shortName;
let sectionInCharge;
let mobileNo;
let contactNo;
let fyiLine;
let workLine;
let status;
let environment;

interface SectionListProps {
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

export const SectionList = (props: SectionListProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
    <div style={{position: 'relative'}}>
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
            dataField: 'departmentCode',
            text: 'Department Code',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                departmentCode = filter;
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
                <AutoCompleteFilterSingleSelectDepartment
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
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                code = filter;
              },
            }),
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
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                name = filter;
              },
            }),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            style: {textTransform: 'uppercase'},
            editorStyle: {textTransform: 'uppercase'},
          },
          {
            dataField: 'sectionInCharge',
            text: 'Section In Charge',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                sectionInCharge = filter;
              },
            }),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          },
          {
            dataField: 'mobileNo',
            text: 'Mobie No',
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
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      type='number'
                      placeholder={
                        errors.mobieNo ? 'Please Enter mobile no' : 'Mobile No'
                      }
                      pattern={FormHelper.patterns.mobileNo}
                      defaultValue={row?.mobileNo}
                      hasError={!!errors.mobieNo}
                      onChange={mobileNo => {
                        onChange(mobileNo);
                      }}
                      onBlur={mobileNo => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            mobileNo,
                            column.dataField,
                            row._id,
                          );
                      }}
                    />
                  )}
                  name='mobieNo'
                  rules={{
                    required: false,
                    pattern: FormHelper.patterns.mobileNo,
                  }}
                  defaultValue=''
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
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      type='number'
                      placeholder={
                        errors.contactNo
                          ? 'Please Enter contactNo'
                          : 'Contact No'
                      }
                      hasError={!!errors.contactNo}
                      pattern={FormHelper.patterns.mobileNo}
                      defaultValue={row?.contactNo}
                      onChange={contactNo => {
                        onChange(contactNo);
                      }}
                      onBlur={contactNo => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            contactNo,
                            column.dataField,
                            row._id,
                          );
                      }}
                    />
                  )}
                  name='contactNo'
                  rules={{
                    required: false,
                    pattern: FormHelper.patterns.mobileNo,
                  }}
                  defaultValue=''
                />
              </>
            ),
          },
          {
            dataField: 'fyiLine',
            text: 'Fyi Line',
            headerClasses: 'textHeader3',
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
            headerClasses: 'textHeader3',
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
            headerClasses: 'textHeader1',
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
                <select
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const status = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(status, column.dataField, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'STATUS').map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ),
                  )}
                </select>
              </>
            ),
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
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            filter: textFilter({
              getFilter: filter => {
                environment = filter;
              },
            }),
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
                  value={row.environment}
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                  }
                  onChange={e => {
                    const environment = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        environment,
                        column.dataField,
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'ENVIRONMENT').map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ),
                  )}
                </select>
              </>
            ),
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
                        propsIcon={{size: 24, color: '#ffffff'}}
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
        fileName='Section'
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
          departmentCode('');
          code('');
          name('');
          shortName('');
          sectionInCharge('');
          mobileNo('');
          contactNo('');
          fyiLine('');
          workLine('');
          status('');
          environment('');
        }}
        dynamicStylingFields={[
          'departmentCode',
          'code',
          'name',
          'status',
          'environment',
        ]}
        hideExcelSheet={['_id', 'opration']}
      />
    </div>
  );
};
