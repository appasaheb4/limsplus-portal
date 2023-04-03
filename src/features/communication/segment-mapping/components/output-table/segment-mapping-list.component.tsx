import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  TableBootstrap,
  sortCaret,
  textFilter,
  Form,
  Tooltip,
  Icons,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {useStores} from '@/stores';
import {lookupItems, lookupValue} from '@/library/utils';

let instType;
let dataFlow;
let protocol;
let segments;
let segmentOrder;
let segmentRequired;
let elementNo;
let elementName;
let elementRequired;
let elementSequence;
let transmittedData;
let defaultValue;
let fieldArray;
let repeatDelimiter;
let fieldType;
let fieldLength;
let requiredForLims;
let limsTables;
let limsDocumentType;
let limsFields;
let environment;

interface SegmentMappingListProps {
  data: any;
  extraData: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFields?: (value: any, id: string) => void;
  // duplicate: (item: SegmentMapping) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

export const SegmentMappingList = observer((props: SegmentMappingListProps) => {
  const {segmentMappingStore} = useStores();
  const [collection, setCollection] = useState<any>([]);

  const getCollection = () => {
    segmentMappingStore.segmentMappingService.getCollectionList().then(res => {
      if (res.getCollectionList.success) {
        setCollection(res.getCollectionList.result);
      } else {
        alert('Please try again.Technical issue fetching tables');
      }
    });
  };

  useEffect(() => {
    collection?.length == 0 && getCollection();
    segmentMappingStore.fetchListSegmentMapping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerSortingStyle = {backgroundColor: '#c8e6c9', fontSize: 20};
  return (
    <>
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
            dataField: 'instType',
            text: 'Inst Type',
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            sort: true,
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                instType = filter;
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
                  value={row?.instType}
                  name='equipmentType'
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const instType = e.target.value;
                    props.onUpdateFields &&
                      props.onUpdateFields({instType}, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {props?.extraData?.arrInstType.map(
                    (item: any, index: number) => (
                      <option
                        key={item.instrumentType}
                        value={item.instrumentType}
                      >
                        {item.instrumentType}
                      </option>
                    ),
                  )}
                </select>
              </>
            ),
          },
          {
            dataField: 'dataFlow',
            text: 'Data Flow',
            headerClasses: 'textHeader',
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            sort: true,
            filter: textFilter({
              getFilter: filter => {
                dataFlow = filter;
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
                  name='dataFlowFrom'
                  value={row?.dataFlow}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const dataFlow = e.target.value;
                    props.onUpdateFields &&
                      props.onUpdateFields({dataFlow}, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData?.lookupItems, 'DATA__FLOW').map(
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
            dataField: 'protocol',
            text: 'Protocol',
            headerClasses: 'textHeader',
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            filter: textFilter({
              getFilter: filter => {
                protocol = filter;
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
                  name='data_type'
                  value={row?.protocol}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const protocol = e.target.value;
                    props.onUpdateFields &&
                      props.onUpdateFields({protocol}, row._id);
                  }}
                >
                  <option selected>Select</option>
                  {props?.extraData?.arrInstType.map(
                    (item: any, index: number) => (
                      <option
                        key={item.communicationProtocol}
                        value={item.communicationProtocol}
                      >
                        {item.communicationProtocol}
                      </option>
                    ),
                  )}
                </select>
              </>
            ),
          },
          {
            dataField: 'segments',
            text: 'Segments',
            headerClasses: 'textHeader',
            sort: true,
            filter: textFilter({
              getFilter: filter => {
                segments = filter;
              },
            }),
            headerStyle: {
              fontSize: 0,
            },
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
                <select
                  value={row.segments}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const segments = JSON.parse(e.target.value);
                    props.onUpdateFields &&
                      props.onUpdateFields(
                        {
                          segments: segments.value,
                          segmentOrder: segments.code,
                        },
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'SEGMENT').map(
                    (item: any, index: number) => (
                      <option key={index} value={JSON.stringify(item)}>
                        {lookupValue(item)}
                      </option>
                    ),
                  )}
                </select>
              </>
            ),
          },
          {
            dataField: 'segmentOrder',
            text: 'Segment Order',
            headerClasses: 'textHeader',

            filter: textFilter({
              getFilter: filter => {
                segmentOrder = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <Form.Input
                  placeholder={row?.segmentOrder}
                  type='text'
                  onBlur={segmentOrder => {
                    props.onUpdateFields &&
                      props.onUpdateFields({segmentOrder}, row._id);
                  }}
                  disabled={true}
                />
              </>
            ),
          },
          {
            dataField: 'segmentRequired',
            text: 'Segment Required',
            headerClasses: 'textHeaderM',
            sort: true,
            csvFormatter: (col, row) =>
              `${
                row.segmentRequired
                  ? row.segmentRequired
                    ? 'Yes'
                    : 'No'
                  : 'No'
              }`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    value={row.segmentRequired}
                    onChange={segmentRequired => {
                      props.onUpdateFields &&
                        props.onUpdateFields({segmentRequired}, row._id);
                    }}
                  />
                </>
              );
            },
          },
          {
            dataField: 'elementNo',
            text: 'Element No',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                elementNo = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <Form.Input
                  placeholder={row?.elementNo}
                  type='text'
                  onBlur={elementNo => {
                    props.onUpdateFields &&
                      props.onUpdateFields({elementNo}, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'elementName',
            text: 'Element Name',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                elementName = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <Form.Input
                  placeholder={row?.elementName}
                  type='text'
                  onBlur={elementName => {
                    props.onUpdateFields &&
                      props.onUpdateFields({elementName}, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'limsTables',
            text: 'Lims Tables',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                limsTables = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
            sortCaret: (order, column) => sortCaret(order, column),
            csvFormatter: col => (col ? col : ''),
            events: {
              onClick: (e, column, columnIndex, row, rowIndex) => {
                collection?.length == 0 && getCollection();
              },
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
                <select
                  value={row.limsTables}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const limsTables = e.target.value;
                    props.onUpdateFields &&
                      props.onUpdateFields(
                        {
                          limsTables,
                        },
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {collection.map((item: any, index: number) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </>
            ),
          },
          {
            dataField: 'limsDocumentType',
            text: 'Lims Document Type',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                limsDocumentType = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <select
                  value={row.limsDocumentType}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const limsDocumentType = e.target.value;
                    props.onUpdateFields &&
                      props.onUpdateFields(
                        {
                          limsDocumentType,
                        },
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {collection
                    .find((item: any) => item.name == row?.limsTables)
                    ?.documentType?.map((item: any, index: number) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </>
            ),
          },
          {
            dataField: 'limsFields',
            text: 'Lims Fields',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                limsFields = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <select
                  value={row.limsFields}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const limsFields = e.target.value;
                    props.onUpdateFields &&
                      props.onUpdateFields(
                        {
                          limsFields,
                        },
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {_.has(
                    collection.find(
                      (item: any) => item.name == row?.limsTables,
                    ),
                    'documentType',
                  )
                    ? collection
                        .find((item: any) => item.name == row?.limsTables)
                        ?.documentType?.find(
                          e => e.name == row?.limsDocumentType,
                        )
                        ?.fields?.map((item: any, index: number) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))
                    : collection
                        .find((item: any) => item.name == row?.limsTables)
                        .fields?.map((item: any, index: number) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                </select>
              </>
            ),
          },

          {
            dataField: 'elementRequired',
            text: 'Element Required',
            headerClasses: 'textHeaderM',
            sort: true,
            csvFormatter: (col, row) =>
              `${
                row.elementRequired
                  ? row.elementRequired
                    ? 'Yes'
                    : 'No'
                  : 'No'
              }`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    value={row.elementRequired}
                    onChange={elementRequired => {
                      props.onUpdateFields &&
                        props.onUpdateFields({elementRequired}, row._id);
                    }}
                  />
                </>
              );
            },
          },
          {
            dataField: 'elementSequence',
            text: 'Element Sequence',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                elementSequence = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <Form.Input
                  placeholder={row?.elementSequence?.toString()}
                  type='number'
                  onBlur={elementSequence => {
                    props.onUpdateFields &&
                      props.onUpdateFields(
                        {elementSequence: Number.parseInt(elementSequence)},
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'transmittedData',
            text: 'Transmitted Data',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                transmittedData = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <Form.Input
                  placeholder={row?.transmittedData}
                  type='text'
                  onBlur={transmittedData => {
                    props.onUpdateFields &&
                      props.onUpdateFields({transmittedData}, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'defaultValue',
            text: 'Default Value',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                defaultValue = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <Form.Input
                  placeholder={row?.defaultValue}
                  type='text'
                  onBlur={defaultValue => {
                    props.onUpdateFields &&
                      props.onUpdateFields({defaultValue}, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'fieldArray',
            text: 'Field Array',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                fieldArray = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <Form.Input
                  placeholder={row?.fieldArray}
                  type='text'
                  onBlur={fieldArray => {
                    props.onUpdateFields &&
                      props.onUpdateFields({fieldArray}, row._id);
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'repeatDelimiter',
            text: 'Repeat Delimiter',
            headerClasses: 'textHeaderM',
            sort: true,

            csvFormatter: (col, row) =>
              `${
                row.repeatDelimiter
                  ? row.repeatDelimiter
                    ? 'Yes'
                    : 'No'
                  : 'No'
              }`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    value={row.repeatDelimiter}
                    onChange={repeatDelimiter => {
                      props.onUpdateFields &&
                        props.onUpdateFields({repeatDelimiter}, row._id);
                    }}
                  />
                </>
              );
            },
          },
          {
            dataField: 'fieldType',
            text: 'Field Type',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                fieldType = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <select
                  value={row.fieldType}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const fieldType = e.target.value;
                    props.onUpdateFields &&
                      props.onUpdateFields(
                        {
                          fieldType,
                        },
                        row._id,
                      );
                  }}
                >
                  <option selected>Select</option>
                  {lookupItems(props.extraData.lookupItems, 'FIELD_TYPE').map(
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
            dataField: 'fieldLength',
            text: 'Field Length',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                fieldLength = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <Form.Input
                  placeholder={row?.fieldLength}
                  type='number'
                  onBlur={fieldLength => {
                    props.onUpdateFields &&
                      props.onUpdateFields(
                        {fieldLength: Number.parseInt(fieldLength)},
                        row._id,
                      );
                  }}
                />
              </>
            ),
          },
          {
            dataField: 'requiredForLims',
            text: 'Required For Lims',
            headerClasses: 'textHeaderM',
            sort: true,
            csvFormatter: (col, row) =>
              `${
                row.requiredForLims
                  ? row.requiredForLims
                    ? 'Yes'
                    : 'No'
                  : 'No'
              }`,
            editable: false,
            formatter: (cell, row) => {
              return (
                <>
                  <Form.Toggle
                    value={row.requiredForLims}
                    onChange={requiredForLims => {
                      props.onUpdateFields &&
                        props.onUpdateFields({requiredForLims}, row._id);
                    }}
                  />
                </>
              );
            },
          },

          {
            dataField: 'environment',
            text: 'Environment',
            headerClasses: 'textHeader',
            filter: textFilter({
              getFilter: filter => {
                environment = filter;
              },
            }),
            sort: true,
            headerStyle: {
              fontSize: 0,
            },
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
                <select
                  value={row.environment}
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const environment = e.target.value;
                    props.onUpdateFields &&
                      props.onUpdateFields(
                        {
                          environment,
                        },
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
            formatter: (cellContent, row) => (
              <>
                <div className='flex flex-row'>
                  <Tooltip tooltipText='Delete'>
                    <Icons.IconContext
                      color='#fff'
                      size='20'
                      onClick={() => {
                        props.onDelete &&
                          props.onDelete({
                            type: 'delete',
                            show: true,
                            id: [row._id],
                            title: 'Are you sure delete record? ',
                            body: 'Delete selected items!',
                          });
                      }}
                    >
                      {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
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
        fileName='Segment Mapping'
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
          instType('');
          dataFlow('');
          protocol('');
          segments('');
          segmentOrder('');
          segmentRequired('');
          elementNo('');
          elementName('');
          elementRequired('');
          elementSequence('');
          transmittedData('');
          defaultValue('');
          fieldArray('');
          repeatDelimiter('');
          fieldType('');
          fieldLength('');
          requiredForLims('');
          limsTables('');
          limsDocumentType('');
          limsFields('');
          environment('');
        }}
      />
    </>
  );
});
