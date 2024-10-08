import React from 'react';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  TableBootstrap,
  textFilter,
  List,
  Tooltip,
  Icons,
  Buttons,
  sortCaret,
  Grid,
  Form,
  Svg,
} from '@/library/components';
import { Confirm } from '@/library/models';
import 'react-accessible-accordion/dist/fancy-example.css';
import { AutoCompleteCompanyList } from '@/core-components';
import _ from 'lodash';

let country;
let state;
let district;
let city;
let area;
let postalCode;
let sbu;
let zone;
let environment;
let status;
let companyCode;

interface AdminstrativeDivListProps {
  data: any;
  totalSize: number;
  extraData: any;
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
  onApproval: (record: any) => void;
}

export const AdminstrativeDivList = (props: AdminstrativeDivListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
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
            dataField: 'country',
            text: 'Country',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            editorStyle: { textTransform: 'uppercase' },
            style: { textTransform: 'uppercase' },
            filter: textFilter({
              placeholder: 'Country',
              getFilter: filter => {
                country = filter;
              },
            }),
          },
          {
            dataField: 'state',
            text: 'State',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            csvFormatter: col => (col ? col : ''),
            editorStyle: { textTransform: 'uppercase' },
            style: { textTransform: 'uppercase' },
            filter: textFilter({
              placeholder: 'State',
              getFilter: filter => {
                state = filter;
              },
            }),
          },
          {
            dataField: 'district',
            text: 'District',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            editorStyle: { textTransform: 'uppercase' },
            style: { textTransform: 'uppercase' },
            filter: textFilter({
              placeholder: 'District',
              getFilter: filter => {
                district = filter;
              },
            }),
          },
          {
            dataField: 'city',
            text: 'City',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            editorStyle: { textTransform: 'uppercase' },
            style: { textTransform: 'uppercase' },
            filter: textFilter({
              placeholder: 'City',
              getFilter: filter => {
                city = filter;
              },
            }),
          },
          {
            dataField: 'area',
            text: 'Area',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            editorStyle: { textTransform: 'uppercase' },
            style: { textTransform: 'uppercase' },
            filter: textFilter({
              placeholder: 'Area',
              getFilter: filter => {
                area = filter;
              },
            }),
          },
          {
            dataField: 'postalCode',
            text: 'Postcode',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Postcode',
              getFilter: filter => {
                postalCode = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <>
                <List space={2} direction='row' justify='center'>
                  {row.postalCode.map((item, index) => (
                    <div className='mb-2' key={index}>
                      <Buttons.Button
                        size='medium'
                        type='solid'
                        onClick={() => {}}
                      >
                        {`${item}`}
                      </Buttons.Button>
                    </div>
                  ))}
                </List>
              </>
            ),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <Form.InputWrapper>
                  <Grid cols={2}>
                    <Form.Input
                      placeholder='Postal code'
                      // value={row.postalCode}
                      onChange={postalCode => {
                        props.extraData.updateLocalInput({
                          ...props.extraData.localInput,
                          postalCode,
                        });
                      }}
                    />
                    <div className='mt-1'>
                      <Buttons.Button
                        size='medium'
                        type='solid'
                        onClick={() => {
                          const postCode =
                            props.extraData.localInput?.postalCode;

                          let postalCode = row?.postalCode || [];
                          if (postCode === undefined)
                            return alert('Please enter all values.');
                          if (postCode !== undefined) {
                            postalCode !== undefined
                              ? postalCode.push(postCode)
                              : (postalCode = [postCode]);
                            // postalCode = _.map(postalCode, o =>
                            //   _.pick(o, ['postalCode']),
                            // );
                            props.onUpdateItem &&
                              props.onUpdateItem(
                                postalCode,
                                'postalCode',
                                row._id,
                              );
                            props.extraData.updateLocalInput({
                              postalCode: '',
                            });
                          }
                        }}
                      >
                        <Icons.EvaIcon icon='plus-circle-outline' />
                        {'Add'}
                      </Buttons.Button>
                    </div>
                    <div className='clearfix'></div>
                  </Grid>
                  <br />
                  <List space={2} direction='row' justify='center'>
                    <div>
                      {row.postalCode?.map((item, index) => (
                        <div className='mb-2' key={index}>
                          <Buttons.Button
                            size='medium'
                            type='solid'
                            icon={Svg.Remove}
                            onClick={() => {
                              const firstArr =
                                row?.postalCode?.slice(0, index) || [];
                              const secondArr =
                                row?.postalCode?.slice(index + 1) || [];
                              const finalArray = [...firstArr, ...secondArr];
                              props.extraData.updateAdministrativeDiv({
                                ...props.extraData.administrativeDiv,
                                postalCode: finalArray,
                              });

                              props.onUpdateItem &&
                                props.onUpdateItem(
                                  finalArray,
                                  'postalCode',
                                  row._id,
                                );
                            }}
                          >
                            {`${item}`}
                          </Buttons.Button>
                        </div>
                      ))}
                    </div>
                  </List>
                </Form.InputWrapper>
              </>
            ),
          },
          {
            dataField: 'sbu',
            text: 'SBU',
            headerClasses: 'textHeader',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'SBU',
              getFilter: filter => {
                sbu = filter;
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
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 
                       rounded-md`}
                  onChange={e => {
                    const sbu = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(sbu, column.dataField, row._id);
                  }}
                >
                  <option>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'SBU').map(
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
            dataField: 'zone',
            text: 'Zone',
            headerClasses: 'textHeader1',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Zone',
              getFilter: filter => {
                zone = filter;
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
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                  }
                  onChange={e => {
                    const zone = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(zone, column.dataField, row._id);
                  }}
                >
                  <option>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'ZONE').map(
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
            dataField: 'status',
            text: 'Status',
            sort: true,
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            filter: textFilter({
              placeholder: 'Status',
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
                  value={row.status}
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                  }
                  onChange={e => {
                    const status = e.target.value;
                    props.onUpdateItem &&
                      props.onUpdateItem(status, column.dataField, row._id);
                  }}
                >
                  <option>Select</option>
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
              placeholder: 'Company Code',
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
            editable: false,
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Environment',
              getFilter: filter => {
                environment = filter;
              },
            }),
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
            //      <option>Select</option>
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
            dataField: 'operation',
            text: 'Action',
            editable: false,
            csvExport: false,
            // hidden: !props.isDelete,
            formatter: (cellContent, row) => (
              <>
                <div className='flex flex-row'>
                  {props.isDelete && (
                    <Tooltip tooltipText='Delete'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: 'Delete',
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
        isDelete={props.isDelete}
        isEditModify={props.isUpdate}
        isExport={props.isExport}
        isSelectRow={true}
        fileName='AdminstrativeDivisions'
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
          country('');
          state('');
          district('');
          city('');
          area('');
          postalCode('');
          sbu('');
          zone('');
          companyCode('');
          environment('');
        }}
        hideExcelSheet={['_id', 'opration']}
        dynamicStylingFields={['country', 'state', 'district', 'environment']}
      />
    </div>
  );
};
