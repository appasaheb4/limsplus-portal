import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  TableBootstrap,
  sortCaret,
  textFilter,
  Tooltip,
  Icons,
  Form,
  customFilter,
  DateFilter,
  NumberFilter,
  ModalDateTime,
} from '@/library/components';
import { lookupItems, lookupValue } from '@/library/utils';
import { MultiSelect } from '@/core-components';

let code;
let name;
let description;
let moduleInfo;
let lab;
let department;
let allowedUser;
let admin;
let password;
let postalCode;
let country;
let state;
let district;
let city;
let area;
let address;
let mobileNo;
let contactNo;
let email;
let web;
let webPortal;
let registeredOffice;
let corporateOffice;
let customerCare;
let gst;
let sacCode;
let cinNo;
let companyLogo;
let fyiLine;
let workLine;
let dateCreation;
let dateActive;
let dateExpire;
let enteredBy;
let version;
let status;
let supportPlan;
let environment;

interface CompanyListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: any) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateImage?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onApproval: (record: any) => void;
  onSingleDirectUpdateField?: (
    value: any,
    dataField: string,
    id: string,
  ) => void;
  onVersionUpgrade?: (item: any) => void;
}
const dynamicStylingFields = ['title', 'environment'];
const hideExcelSheet = ['_id', 'image', 'operation'];

export const CompanyList = (props: CompanyListProps) => {
  const [modalDetails, setModalDetails] = useState<any>();
  const editorCell = (row: any) => {
    return row?.status !== 'I' ? true : false;
  };
  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(todayDate.getDate() + 1);
  return (
    <TableBootstrap
      id='_id'
      data={props?.data}
      totalSize={props?.totalSize}
      columns={[
        {
          dataField: '_id',
          text: 'Id',
          hidden: true,
          csvExport: false,
        },
        {
          dataField: 'code',
          text: 'Code',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: false,
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              code = filter;
            },
          }),
        },
        {
          dataField: 'name',
          text: 'Name',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: false,
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              name = filter;
            },
          }),
        },
        {
          dataField: 'description',
          text: 'Description',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              description = filter;
            },
          }),
        },
        {
          dataField: 'module',
          text: 'Module',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: false,
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              moduleInfo = filter;
            },
          }),
          formatter: (cellContent, row) => (
            <>
              <ul style={{ listStyle: 'inside' }}>
                {row?.module?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          ),
        },
        {
          dataField: 'lab',
          text: 'Lab',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: false,
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              lab = filter;
            },
          }),
        },
        {
          dataField: 'department',
          text: 'Department',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              department = filter;
            },
          }),
        },
        {
          dataField: 'allowedUser',
          text: 'Allowed User',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          editable: false,
          csvFormatter: col => (col ? col : ''),
          filter: customFilter({
            getFilter: filter => {
              allowedUser = filter;
            },
          }),
          filterRenderer: (onFilter, column) => (
            <NumberFilter onFilter={onFilter} column={column} />
          ),
          headerClasses: 'textHeader7',
        },
        {
          dataField: 'admin',
          text: 'Admin',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              admin = filter;
            },
          }),
        },
        {
          dataField: 'password',
          text: 'Password',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              password = filter;
            },
          }),
        },
        {
          dataField: 'postalCode',
          text: 'Postal Code',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: customFilter({
            getFilter: filter => {
              postalCode = filter;
            },
          }),
          filterRenderer: (onFilter, column) => (
            <NumberFilter onFilter={onFilter} column={column} />
          ),
        },
        {
          dataField: 'country',
          text: 'Country',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              country = filter;
            },
          }),
        },
        {
          dataField: 'state',
          text: 'State',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              state = filter;
            },
          }),
        },
        {
          dataField: 'district',
          text: 'District',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              district = filter;
            },
          }),
        },
        {
          dataField: 'city',
          text: 'City',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              city = filter;
            },
          }),
        },
        {
          dataField: 'area',
          text: 'Area',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              area = filter;
            },
          }),
        },
        {
          dataField: 'address',
          text: 'Address',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              address = filter;
            },
          }),
        },
        {
          dataField: 'mobileNo',
          text: 'Mobile No',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              mobileNo = filter;
            },
          }),
        },
        {
          dataField: 'contactNo',
          text: 'Contact No',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              contactNo = filter;
            },
          }),
        },
        {
          dataField: 'email',
          text: 'Email',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            defaultValue: '',
            getFilter: filter => {
              email = filter;
            },
          }),
        },
        {
          dataField: 'web',
          text: 'Web',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              web = filter;
            },
          }),
        },
        {
          dataField: 'webPortal',
          text: 'Web Portal',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              webPortal = filter;
            },
          }),
        },
        {
          dataField: 'registeredOffice',
          text: 'Registered Office',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              registeredOffice = filter;
            },
          }),
        },
        {
          dataField: 'corporateOffice',
          text: 'Corporate Office',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              corporateOffice = filter;
            },
          }),
        },
        {
          dataField: 'customerCare',
          text: 'Customer Care',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              customerCare = filter;
            },
          }),
        },
        {
          dataField: 'gst',
          text: 'GST',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              gst = filter;
            },
          }),
        },
        {
          dataField: 'sacCode',
          text: 'SAC Code',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              sacCode = filter;
            },
          }),
        },
        {
          dataField: 'cinNo',
          text: 'CIN No',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              cinNo = filter;
            },
          }),
        },

        {
          dataField: 'companyLogo',
          text: 'Company Logo',
          csvExport: false,
          headerClasses: 'textHeader',
          // editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          editable: false,
          formatter: (cell, row) => {
            return (
              <>
                <img
                  src={row?.companyLogo}
                  alt={row?.code || row?._id}
                  className='object-fill h-35 w-40 rounded-md'
                />
              </>
            );
          },
        },
        {
          dataField: 'fyiLine',
          text: 'FYI Line',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              fyiLine = filter;
            },
          }),
        },
        {
          dataField: 'workLine',
          text: 'Work Line',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              workLine = filter;
            },
          }),
        },
        {
          dataField: 'dateCreation',
          editable: false,
          text: 'Date Creation',
          headerClasses: 'textHeader11',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: (col, row) =>
            row?.dateCreation
              ? dayjs(row?.dateCreation)?.format('DD-MM-YYYY HH:mm:ss')
              : '',
          filter: customFilter({
            getFilter: filter => {
              dateCreation = filter;
            },
          }),
          filterRenderer: (onFilter, column) => (
            <DateFilter onFilter={onFilter} column={column} />
          ),
          formatter: (cell, row) => {
            return (
              <>{dayjs(row?.dateCreation)?.format('DD-MM-YYYY HH:mm:ss')}</>
            );
          },
        },
        {
          dataField: 'dateActive',
          editable: false,
          text: 'Date Active',
          headerClasses: 'textHeader11',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: (col, row) =>
            row?.dateActive
              ? dayjs(row?.dateActive)?.format('DD-MM-YYYY HH:mm:ss')
              : '',
          filter: customFilter({
            getFilter: filter => {
              dateActive = filter;
            },
          }),
          filterRenderer: (onFilter, column) => (
            <DateFilter onFilter={onFilter} column={column} />
          ),
          formatter: (cell, row) => {
            return <>{dayjs(row?.dateActive)?.format('DD-MM-YYYY HH:mm:ss')}</>;
          },
        },
        {
          dataField: 'dateExpire',
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          text: 'Date Expiry',
          headerClasses: 'textHeader11',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          csvFormatter: (col, row) =>
            row?.dateExpire
              ? dayjs(row?.dateExpire)?.format('DD-MM-YYYY HH:mm:ss')
              : '',
          filter: customFilter({
            getFilter: filter => {
              dateExpire = filter;
            },
          }),
          filterRenderer: (onFilter, column) => (
            <DateFilter onFilter={onFilter} column={column} />
          ),
          formatter: (cell, row) => {
            return <>{dayjs(row?.dateExpire)?.format('DD-MM-YYYY HH:mm:ss')}</>;
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
              <ModalDateTime
                minDate={nextDay}
                visible={true}
                use12Hours={false}
                data={row?.dateExpire}
                isSingleDatePicker={true}
                isDateTimePicker={false}
                onUpdate={dateExpire => {
                  setModalDetails({ visible: false });
                  props.onSingleDirectUpdateField &&
                    props.onSingleDirectUpdateField(
                      dateExpire,
                      column.dataField,
                      row._id,
                    );
                }}
                onClose={() => {
                  setModalDetails({
                    visible: false,
                  });
                }}
              />
            </>
          ),
        },
        {
          dataField: 'enteredBy',
          text: 'Entered By',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: false,
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              enteredBy = filter;
            },
          }),
        },
        {
          dataField: 'version',
          text: 'Version',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) => editorCell(row),
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              version = filter;
            },
          }),
        },
        {
          dataField: 'supportPlan',
          text: 'Support Plan',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              supportPlan = filter;
            },
          }),
          editable: false,
        },
        {
          dataField: 'status',
          text: 'Status',
          sort: true,
          headerClasses: 'textHeader',
          headerStyle: {
            fontSize: 0,
          },
          sortCaret: (order, column) => sortCaret(order, column),
          filter: textFilter({
            getFilter: filter => {
              status = filter;
            },
          }),
          editable: (content, row, rowIndex, columnIndex) =>
            row?.status == 'D' || row?.status == 'I' ? false : true,
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
                value={row?.status}
                className={
                  'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                }
                onChange={e => {
                  const status = e.target.value;
                  props.onUpdateItem &&
                    props.onUpdateItem(status, column.dataField, row?._id);
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
          dataField: 'environment',
          text: 'Environment',
          headerClasses: 'textHeader',
          sort: true,
          headerStyle: {
            fontSize: 0,
          },
          editable: (content, row, rowIndex, columnIndex) =>
            row?.status == 'D' || row?.status == 'I' ? false : true,
          sortCaret: (order, column) => sortCaret(order, column),
          formatter: (cell, row) => {
            return <>{row?.environment?.join(',')}</>;
          },
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
              <MultiSelect
                options={lookupItems(
                  props.extraData.lookupItems,
                  'ENVIRONMENT',
                ).map(item => item.code)}
                selectedItems={row?.environment}
                onSelect={environment => {
                  console.log({ environment });

                  props.onUpdateItem &&
                    props.onUpdateItem(environment, column.dataField, row?._id);
                }}
              />
            </>
          ),
        },
        {
          dataField: 'operation',
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
                        id: [row?._id],
                        title: 'Are you sure?',
                        body: 'Delete item',
                      })
                    }
                  >
                    {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                  </Icons.IconContext>
                </Tooltip>
                {row.status === 'A' && (
                  <>
                    <Tooltip tooltipText='Version Upgrade'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() =>
                          props.onVersionUpgrade && props.onVersionUpgrade(row)
                        }
                      >
                        {Icons.getIconTag(Icons.Iconvsc.VscVersions)}
                      </Icons.IconContext>
                    </Tooltip>
                  </>
                )}
                {/* {row?.status == 'D' && (
                  <Tooltip tooltipText='Approval'>
                    <Icons.RIcon
                      nameIcon='AiOutlineCheckCircle'
                      propsIcon={{ size: 24, color: '#ffffff' }}
                      onClick={() => props.onApproval(row)}
                    />
                  </Tooltip>
                )} */}
              </div>
            </>
          ),
          headerClasses: 'sticky right-0  bg-gray-500 text-white z-50',
          classes: (cell, row, rowIndex, colIndex) => {
            return 'sticky right-0 bg-gray-500 ';
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
      fileName='Company'
      onSelectedRow={rows => {
        props.onSelectedRow &&
          props.onSelectedRow(rows.map((item: any) => item._id));
      }}
      onUpdateItem={(value: any, dataField: string, id: string) => {
        console.log({ value });

        props.onUpdateItem && props.onUpdateItem(value, dataField, id);
      }}
      onPageSizeChange={(page, size) => {
        props.onPageSizeChange && props.onPageSizeChange(page, size);
      }}
      onFilter={(type, filter, page, size) => {
        props.onFilter && props.onFilter(type, filter, page, size);
      }}
      clearAllFilter={() => {
        code('');
        name('');
        description('');
        moduleInfo('');
        admin('');
        password('');
        postalCode('');
        country('');
        state('');
        district('');
        city('');
        area('');
        address('');
        mobileNo('');
        contactNo('');
        email('');
        web('');
        webPortal('');
        registeredOffice('');
        corporateOffice('');
        customerCare('');
        gst('');
        sacCode('');
        cinNo('');
        companyLogo('');
        fyiLine('');
        workLine('');
        dateCreation('');
        dateActive('');
        dateExpire('');
        enteredBy('');
        version('');
        status('');
        environment('');
      }}
      dynamicStylingFields={dynamicStylingFields}
      hideExcelSheet={hideExcelSheet}
    />
  );
};
