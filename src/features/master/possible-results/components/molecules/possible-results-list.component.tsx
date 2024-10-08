import React, { useState } from 'react';
import dayjs from 'dayjs';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  TableBootstrap,
  Tooltip,
  Icons,
  Form,
  List,
  Buttons,
  Svg,
  NumberFilter,
  DateRangeFilter,
  textFilter,
  customFilter,
  sortCaret,
  ModalDateTime,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { AutoCompleteFilterSingleSelectAnalyteCode } from '../index';
import { AutoCompleteCompanyList } from '@/core-components';
import { Table } from 'reactstrap';
let analyteCode;
let analyteName;
let conclusionResult;
let defaultConclusion;
let environment;
let enteredBy;
let dateCreation;
let dateActive;
let dateExpire;
let status;
let version;
let companyCode;
interface PossibleResultsListProps {
  data: Array<any>;
  totalSize: number;
  extraData: any;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  isVersionUpgrade?: boolean;
  isDuplicate?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  updatePossibleResults?: (values: any) => void;
  onVersionUpgrade?: (item: any) => void;
  onDuplicate?: (item: any) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onApproval: (record: any) => void;
  onUpdateFileds?: (fields: any, id: string) => void;
  onSingleDirectUpdateField?: (
    value: any,
    dataField: string,
    id: string,
  ) => void;
  onUpdatePossibleResult?: (row: any, id: string) => void;
}

export const PossibleResultsList = (props: PossibleResultsListProps) => {
  const [modalDetails, setModalDetails] = useState<any>();
  const [selectedRowId, setSelectedRowId] = useState('');
  const [widthRefBox, setWidthRefBox] = useState('150px');
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(todayDate.getDate() + 1);
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
            dataField: 'analyteCode',
            text: 'Analyte Code',
            filter: textFilter({
              placeholder: 'Analyte Code',
              getFilter: filter => {
                analyteCode = filter;
              },
            }),
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            style: { textTransform: 'uppercase' },
            editorStyle: { textTransform: 'uppercase' },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            editorRenderer: (
              editorProps,
              value,
              row,
              column,
              rowIndex,
              columnIndex,
            ) => (
              <>
                <AutoCompleteFilterSingleSelectAnalyteCode
                  onSelect={item => {
                    props.onUpdateFileds &&
                      props.onUpdateFileds(
                        {
                          analyteCode: item.analyteCode,
                          analyteName: item.analyteName,
                        },
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'analyteName',
            text: 'Analyte Name',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Analyte Name',
              getFilter: filter => {
                analyteName = filter;
              },
            }),
            editable: false,
          },
          {
            dataField: 'conclusionResult',
            text: 'Conclusion Result',
            headerClasses: 'textHeader4',
            style: { width: widthRefBox },
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (cell, row, rowIndex) =>
              `Result:${row.conclusionResult.map(
                item => item.result,
              )} - PossibleValue: ${row.conclusionResult.map(
                item => item.possibleValue,
              )} - Ab Normal: ${row.conclusionResult.map(item =>
                item.abNormal ? (item.abNormal ? 'Yes' : 'No') : 'No',
              )},Critical: ${row.conclusionResult.map(item =>
                item.critical ? (item.critical ? 'Yes' : 'No') : 'No',
              )}`,
            filter: textFilter({
              getFilter: filter => {
                conclusionResult = filter;
              },
            }),
            editable: false,
            formatter: (cellContent, row) => (
              <>
                {row.conclusionResult?.length > 0 && (
                  <>
                    <Tooltip
                      tooltipText={
                        row._id != selectedRowId ? 'Expand' : 'Collapse'
                      }
                    >
                      <Icons.IconContext
                        color='#000000'
                        size='20'
                        onClick={() => {
                          if (row._id === selectedRowId) {
                            setSelectedRowId('');
                            setWidthRefBox('150px');
                          } else {
                            setSelectedRowId(row._id);
                            setWidthRefBox('800px');
                          }
                        }}
                      >
                        {Icons.getIconTag(
                          row._id != selectedRowId
                            ? Icons.IconBi.BiExpand
                            : Icons.IconBi.BiCollapse,
                        )}
                      </Icons.IconContext>
                    </Tooltip>
                  </>
                )}
                {selectedRowId == row._id && (
                  <>
                    <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                      <Table striped bordered>
                        <thead>
                          <tr className='p-0 text-xs'>
                            <th className='text-white' style={{ minWidth: 70 }}>
                              Result
                            </th>
                            <th className='text-white' style={{ minWidth: 70 }}>
                              PossibleValue
                            </th>
                            <th className='text-white' style={{ minWidth: 50 }}>
                              Abnormal
                            </th>
                            <th className='text-white' style={{ minWidth: 50 }}>
                              Critical
                            </th>
                          </tr>
                        </thead>
                        <tbody className='text-xs'>
                          {row?.conclusionResult?.map((item, index) => {
                            return (
                              <>
                                <tr key={index}>
                                  <td>{item.result}</td>
                                  <td>{item.possibleValue}</td>
                                  <td>
                                    <Form.Toggle
                                      value={item.abNormal}
                                      disabled={true}
                                    />
                                  </td>
                                  <td>
                                    <Form.Toggle
                                      value={item.critical}
                                      disabled={true}
                                    />
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </>
                )}
              </>
            ),
          },
          {
            dataField: 'defaultConclusion',
            text: 'Defualt Conclusion',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (cell, row, rowIndex) =>
              `Result:${
                row.defaultConclusion && row.defaultConclusion.result
              } - PossibleValue: ${
                row.defaultConclusion && row.defaultConclusion.possibleValue
              } - Ab Normal: ${
                row.defaultConclusion && row.defaultConclusion.abNormal
              },Critical: ${
                row.defaultConclusion && row.defaultConclusion.critical
              }`,
            filter: textFilter({
              placeholder: 'Defualt Conclusion',
              getFilter: filter => {
                defaultConclusion = filter;
              },
            }),
            formatter: (cellContent, row) => (
              <>
                <Table striped bordered>
                  <thead>
                    <tr className='p-0 text-xs'>
                      <th className='text-white' style={{ minWidth: 70 }}>
                        Result
                      </th>
                      <th className='text-white' style={{ minWidth: 70 }}>
                        PossibleValue
                      </th>
                      <th className='text-white' style={{ minWidth: 50 }}>
                        Abnormal
                      </th>
                      <th className='text-white' style={{ minWidth: 50 }}>
                        Critical
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-xs'>
                    <>
                      <tr>
                        <td>{row.defaultConclusion.result}</td>
                        <td>{row.defaultConclusion.possibleValue}</td>
                        <td>
                          <Form.Toggle
                            value={row?.defaultConclusion?.abNormal}
                            disabled={true}
                          />
                        </td>
                        <td>
                          <Form.Toggle
                            value={row?.defaultConclusion?.critical}
                            disabled={true}
                          />
                        </td>
                      </tr>
                    </>
                  </tbody>
                </Table>
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
                <select
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                  }
                  onChange={e => {
                    if (e.target.value === 'removeItem') {
                      return (
                        props.onUpdateItem &&
                        props.onUpdateItem(null, 'defaultConclusion', row._id)
                      );
                    }
                    let defaultItem = JSON.parse(e.target.value);
                    defaultItem = {
                      result: defaultItem.result,
                      possibleValue: defaultItem.possibleValue,
                      abNormal: defaultItem.abNormal,
                      critical: defaultItem.critical,
                    };

                    props.onUpdateItem &&
                      props.onUpdateItem(
                        defaultItem,
                        'defaultConclusion',
                        row._id,
                      );
                  }}
                >
                  <option>Select</option>
                  <option value='removeItem'>Remove Item</option>
                  {row.conclusionResult.map((item: any, index: number) => (
                    <option key={index} value={JSON.stringify(item)}>
                      {`Result: ${item.result} ,
                        PossibleValue: ${item.possibleValue} ,
                        Ab Normal: ${
                          item.abNormal ? (item.abNormal ? 'Yes' : 'No') : 'No'
                        } ,
                        Critical: ${
                          item.critical ? (item.critical ? 'Yes' : 'No') : 'No'
                        }`}
                    </option>
                  ))}
                </select>
              </>
            ),
          },

          {
            dataField: 'enteredBy',
            editable: false,
            text: 'Entered By',
            headerClasses: 'textHeader4',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              placeholder: 'Entered By',
              getFilter: filter => {
                enteredBy = filter;
              },
            }),
          },
          {
            dataField: 'dateCreation',
            editable: false,
            text: 'Date Creation',
            headerClasses: 'textHeader',
            // sort: true,
            headerStyle: {
              fontSize: 0,
            },
            // sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateCreation
                ? dayjs(row.dateCreation).format('DD-MM-YYYY HH:mm:ss')
                : '',
            filter: customFilter({
              getFilter: filter => {
                dateCreation = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateRangeFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return (
                <>{dayjs(row.dateCreation).format('DD-MM-YYYY HH:mm:ss')}</>
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
                <Form.InputDateTime
                  value={new Date(row.dateCreation)}
                  onFocusRemove={dateCreation => {
                    props.onUpdateItem &&
                      props.onUpdateItem(
                        dateCreation,
                        column.dataField,
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'dateActive',
            editable: false,
            text: 'Date Active',
            headerClasses: 'textHeader',
            // sort: true,
            headerStyle: {
              fontSize: 0,
            },
            // sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateActive
                ? dayjs(row.dateActive).format('DD-MM-YYYY HH:mm:ss')
                : '',
            filter: customFilter({
              getFilter: filter => {
                dateActive = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateRangeFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateActive).format('DD-MM-YYYY HH:mm:ss')}</>;
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
                <Form.InputDateTime
                  value={new Date(row.dateActive)}
                  onFocusRemove={dateActive => {
                    props.onUpdateItem &&
                      props.onUpdateItem(dateActive, column.dataField, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'dateExpire',
            editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            text: 'Date Expiry',
            headerClasses: 'textHeader',
            // sort: true,
            headerStyle: {
              fontSize: 0,
            },
            // sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: (col, row) =>
              row.dateExpire
                ? dayjs(row.dateExpire).format('DD-MM-YYYY HH:mm:ss')
                : '',
            // filter: dateFilter({
            //   comparators: [
            //     Comparator.EQ,
            //     Comparator.GE,
            //     Comparator.LT,
            //   ],
            //   dateStyle: { marginLeft: "2px" },
            //   defaultValue: {
            //     comparator: Comparator.EQ,
            //   },
            //   style: { display: "inline" },
            // }),
            filter: customFilter({
              getFilter: filter => {
                dateExpire = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <DateRangeFilter onFilter={onFilter} column={column} />
            ),
            formatter: (cell, row) => {
              return <>{dayjs(row.dateExpire).format('DD-MM-YYYY HH:mm:ss')}</>;
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
                  {...{
                    visible: true,
                    use12Hours: false,
                    data: row.dateExpire,
                    isSingleDatePicker: true,
                    isDateTimePicker: false,
                  }}
                  minDate={nextDay}
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
            dataField: 'version',
            editable: false,
            text: 'Version',
            headerClasses: 'textHeader5',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: customFilter({
              getFilter: filter => {
                version = filter;
              },
            }),
            filterRenderer: (onFilter, column) => (
              <NumberFilter onFilter={onFilter} column={column} />
            ),
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
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
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
            headerClasses: 'textHeader4',
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
                <div className='flex flex-row gap-2'>
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

                  {row.status === 'A' && (
                    <>
                      {props.isVersionUpgrade && (
                        <Tooltip tooltipText='Version Upgrade'>
                          <Icons.IconContext
                            color='#ffffff'
                            size='20'
                            onClick={() =>
                              props.onVersionUpgrade &&
                              props.onVersionUpgrade(row)
                            }
                          >
                            {Icons.getIconTag(Icons.Iconvsc.VscVersions)}
                          </Icons.IconContext>
                        </Tooltip>
                      )}
                      {props.isDuplicate && (
                        <Tooltip tooltipText='Duplicate'>
                          <Icons.IconContext
                            color='#ffffff'
                            size='20'
                            onClick={() =>
                              props.onDuplicate && props.onDuplicate(row)
                            }
                          >
                            {Icons.getIconTag(Icons.Iconio5.IoDuplicateOutline)}
                          </Icons.IconContext>
                        </Tooltip>
                      )}
                    </>
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
                  {row.status !== 'I' && (
                    <Tooltip tooltipText='Edit'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() =>
                          props.onUpdatePossibleResult &&
                          props.onUpdatePossibleResult(row, row._id)
                        }
                      >
                        {Icons.getIconTag(Icons.IconBi.BiEdit)}
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
        fileName='PossibleResult'
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
          analyteCode('');
          analyteName('');
          conclusionResult('');
          defaultConclusion('');
          environment('');
          enteredBy('');
          dateCreation('');
          dateActive('');
          dateExpire('');
          companyCode('');
          status('');
          version('');
        }}
        dynamicStylingFields={['analyteCode', 'environment', 'status']}
        hideExcelSheet={['_id', 'opration']}
      />
    </div>
  );
};
