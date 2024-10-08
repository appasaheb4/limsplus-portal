import React, { useState } from 'react';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  NumberFilter,
  DateRangeFilter,
  textFilter,
  customFilter,
  TableBootstrap,
  Form,
  Icons,
  Tooltip,
  sortCaret,
  ModalDateTime,
} from '@/library/components';
import { Confirm } from '@/library/models';
import dayjs from 'dayjs';
import {
  AutoCompletePriceList,
  AutoCompleteFilterSingleSelectPanelCode,
  AutoCompleteFilterSingleSelectPanelName,
} from '../index';
import { toJS } from 'mobx';

let panelCode;
let panelName;
let priceList;
let priceGroup;
let description;
let price;
let minSp;
let maxSp;
let maxDiscount;
let enteredBy;
let status;
let environment;
let dateCreation;
let dateActive;
let dateExpire;
let version;
let companyCode;

interface PriceListProps {
  data: any;
  extraData: any;
  totalSize: number;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  isVersionUpgrade?: boolean;
  isDuplicate?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFileds?: (fileds: any, id: string) => void;
  onVersionUpgrade?: (item: any) => void;
  onDuplicate?: (item: any) => void;
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
}

export const PriceListList = (props: PriceListProps) => {
  const [modalDetails, setModalDetails] = useState<any>();
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };

  const getPriceList = (priceList, priceGroup) => {
    const list = priceList.filter(item => {
      if (item.code.slice(0, 3) === priceGroup?.slice(0, 3)) {
        return item;
      }
    });
    return list || [];
  };

  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(todayDate.getDate() + 1);

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
              dataField: 'priceGroup',
              text: 'Price Group',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Price Group',
                getFilter: filter => {
                  priceGroup = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                    value={row.priceGroup}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2'
                    onChange={e => {
                      const priceGroup = e.target.value as string;
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            priceGroup: priceGroup,
                            priceList: '',
                            description: '',
                          },
                          row._id,
                        );
                    }}
                  >
                    <option>Select</option>
                    {lookupItems(
                      props.extraData.lookupItems,
                      'PRICE_GROUP',
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {lookupValue(item)}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'priceList',
              text: 'Price List',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Price List',
                getFilter: filter => {
                  priceList = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row?.priceGroup === 'CSP' ? (
                    <AutoCompletePriceList
                      onSelect={item => {
                        props.onUpdateFileds &&
                          props.onUpdateFileds(
                            {
                              priceList: item.invoiceAc?.toString(),
                              description: item.corporateName,
                            },
                            row._id,
                          );
                      }}
                    />
                  ) : (
                    <select
                      value={row?.priceList}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                      }
                      onChange={e => {
                        const priceList: any = JSON.parse(e.target.value);
                        props.onUpdateFileds &&
                          props.onUpdateFileds(
                            {
                              priceList: priceList?.code,
                              description: priceList?.value,
                            },
                            row._id,
                          );
                      }}
                    >
                      <option>Select</option>
                      {getPriceList(
                        lookupItems(
                          toJS(props.extraData.lookupItems),
                          'PRICE_LIST',
                        ),
                        row?.priceGroup,
                      )?.map((item: any, index: number) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              ),
            },
            {
              dataField: 'description',
              text: 'Description',
              headerClasses: 'textHeader',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              style: {
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '250px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row.description}>{cellContent}</span>
              ),
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Description',
                getFilter: (filter: any) => {
                  description = filter;
                },
              }),
              editable: false,
            },

            {
              dataField: 'panelCode',
              text: 'Panel Code',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Panel Code',
                getFilter: filter => {
                  panelCode = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectPanelCode
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            panelCode: item.panelCode,
                            panelName: item.panelName,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'panelName',
              text: 'Panel Name',
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Panel Name',
                getFilter: filter => {
                  panelName = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteFilterSingleSelectPanelName
                    onSelect={item => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            panelCode: item.panelCode,
                            panelName: item.panelName,
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },

            {
              dataField: 'price',
              text: 'Price',
              headerClasses: 'textHeader4',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  price = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                    type='number'
                    placeholder={row.price}
                    onBlur={price => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            price: Number.parseFloat(price),
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'minSp',
              text: 'Min Sp',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  minSp = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                    type='number'
                    placeholder={row.minSp}
                    onBlur={minSp => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            minSp: Number.parseFloat(minSp),
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'maxSp',
              text: 'Max Sp',
              headerClasses: 'textHeader6',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: customFilter({
                getFilter: filter => {
                  maxSp = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                    type='number'
                    placeholder={row.maxSp}
                    onBlur={maxSp => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            maxSp: Number.parseFloat(maxSp),
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'maxDis',
              text: 'Max Discount',
              headerClasses: 'textHeader6',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Max Discount',
                getFilter: filter => {
                  maxDiscount = filter;
                },
              }),
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
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
                    type='number'
                    placeholder={row.maxDis}
                    onBlur={maxDis => {
                      props.onUpdateFileds &&
                        props.onUpdateFileds(
                          {
                            maxDis: Number.parseFloat(maxDis),
                          },
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'fixedPrice',
              text: 'Fixed Price',
              sort: true,
              csvFormatter: (col, row) =>
                row.fixedPrice ? (row.fixedPrice ? 'Yes' : 'No') : 'No',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.fixedPrice}
                      onChange={fixedPrice => {
                        props.onUpdateItem &&
                          props.onUpdateItem(fixedPrice, 'fixedPrice', row._id);
                      }}
                    />
                  </>
                );
              },
            },

            {
              dataField: 'enteredBy',
              editable: false,
              text: 'Entered By',
              headerClasses: 'textHeader1',
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
                  ? dayjs(row.dateCreation || 0).format('DD-MM-YYYY HH:mm:ss')
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
                  <>
                    {dayjs(row.dateCreation || 0).format('DD-MM-YYYY HH:mm:ss')}
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
                  ? dayjs(row.dateActive || 0).format('DD-MM-YYYY HH:mm:ss')
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
                return (
                  <>
                    {dayjs(row.dateActive || 0).format('DD-MM-YYYY HH:mm:ss')}
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
                  <Form.InputDateTime
                    value={new Date(row.dateActive)}
                    onFocusRemove={dateActive => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          dateActive,
                          column.dataField,
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'dateExpire',
              editable: (content, row, rowIndex, columnIndex) =>
                editorCell(row),
              text: 'Date Expiry',
              headerClasses: 'textHeader',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (col, row) =>
                row.dateExpire
                  ? dayjs(row.dateExpire || 0).format('DD-MM-YYYY HH:mm:ss')
                  : '',
              filter: customFilter({
                getFilter: filter => {
                  dateExpire = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {dayjs(row.dateExpire || 0).format('DD-MM-YYYY HH:mm:ss')}
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
              headerClasses: 'textHeader1',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Environment',
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
              //       className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
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
              //       {lookupItems(
              //         props.extraData.lookupItems,
              //         'ENVIRONMENT',
              //       ).map((item: any, index: number) => (
              //         <option key={index} value={item.code}>
              //           {lookupValue(item)}
              //         </option>
              //       ))}
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

                    {row.status === 'A' && (
                      <>
                        {props.isVersionUpgrade && (
                          <Tooltip
                            className='ml-2'
                            tooltipText='Version Upgrade'
                          >
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
                          <Tooltip className='ml-2' tooltipText='Duplicate'>
                            <Icons.IconContext
                              color='#ffffff'
                              size='20'
                              onClick={() =>
                                props.onDuplicate && props.onDuplicate(row)
                              }
                            >
                              {Icons.getIconTag(
                                Icons.Iconio5.IoDuplicateOutline,
                              )}
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
          fileName='PriceList'
          onSelectedRow={rows => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id));
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id);
          }}
          onPageSizeChange={(page, limit) => {
            props.onPageSizeChange && props.onPageSizeChange(page, limit);
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size);
          }}
          clearAllFilter={() => {
            panelCode('');
            panelName('');
            priceList('');
            priceGroup('');
            price('');
            minSp('');
            maxSp('');
            maxDiscount('');
            description('');
            enteredBy('');
            status('');
            environment('');
            dateCreation();
            dateActive();
            dateExpire();
            version('');
            companyCode('');
          }}
          dynamicStylingFields={[
            'priceGroup',
            'priceList',
            'panelCode',
            'price',
            'status',
            'environment',
          ]}
          hideExcelSheet={['_id', 'opration']}
        />
      </div>
    </>
  );
};
