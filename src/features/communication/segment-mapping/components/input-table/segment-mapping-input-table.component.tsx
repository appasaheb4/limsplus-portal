import React, {useState} from 'react';
import {Form, Icons, Tooltip} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {TableBootstrap} from './TableBootstrap';

interface SegmentMappingInputTableProps {
  data: any;
  extraData?: any;
  onDelete?: (index: number) => void;
  onUpdateItems?: (item: any, id) => void;
  onDuplicate?: (item: any) => void;
}

export const SegmentMappingInputTable = observer(
  ({
    data,
    extraData,
    onDelete,
    onUpdateItems,
    onDuplicate,
  }: SegmentMappingInputTableProps) => {
    const {segmentMappingStore} = useStores();
    const [collection, setCollection] = useState([]);
    const [collectionDetails, setCollectionDetails] = useState<{
      limsTables: string;
      schema: Array<string>;
      documentType: Array<string>;
    }>({limsTables: '', schema: [], documentType: []});
    const [segment, setSegment] = useState('');

    const getCollection = () => {
      segmentMappingStore.segmentMappingService
        .getCollectionList()
        .then(res => {
          if (res.getCollectionList.success) {
            setCollection(res.getCollectionList.list);
          } else {
            alert('Please try again.Technical issue fetching tables');
          }
        });
    };

    return (
      <div style={{position: 'relative'}}>
        <TableBootstrap
          id='index'
          data={data}
          columns={[
            {
              dataField: 'segments',
              text: 'Segments',
              headerClasses: 'textHeaderM',
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
                      const segments = JSON.parse(e.target.value);
                      setSegment(segments.value);
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            segments: segments.value,
                            segmentOrder: segments.code,
                          },
                          row.index,
                        );
                    }}
                  >
                    <option selected>{segment || 'Select'}</option>
                    {lookupItems(extraData.lookupItems, 'SEGMENT').map(
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
              csvExport: false,
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
                      onUpdateItems && onUpdateItems({segmentOrder}, row.index);
                    }}
                    disabled={true}
                  />
                </>
              ),
            },
            {
              dataField: 'segmentRequired',
              text: 'Segment Required',
              headerClasses: 'textHeader2',
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
                        onUpdateItems &&
                          onUpdateItems({segmentRequired}, row.index);
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
              csvExport: false,
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
                      onUpdateItems && onUpdateItems({elementNo}, row.index);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'elementName',
              text: 'Element Name',
              headerClasses: 'textHeader',
              csvExport: false,
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
                      onUpdateItems && onUpdateItems({elementName}, row.index);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'elementRequired',
              text: 'Element Required',
              headerClasses: 'textHeader2',
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
                        onUpdateItems &&
                          onUpdateItems({elementRequired}, row.index);
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
              csvExport: false,
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
                      onUpdateItems &&
                        onUpdateItems(
                          {elementSequence: Number.parseInt(elementSequence)},
                          row.index,
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
              csvExport: false,
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
                      onUpdateItems &&
                        onUpdateItems({transmittedData}, row.index);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'defaultValue',
              text: 'Default Value',
              headerClasses: 'textHeader',
              csvExport: false,
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
                      onUpdateItems && onUpdateItems({defaultValue}, row.index);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'fieldArray',
              text: 'Field Array',
              headerClasses: 'textHeader',
              csvExport: false,
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
                      onUpdateItems && onUpdateItems({fieldArray}, row.index);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'repeatDelimiter',
              text: 'Repeat Delimiter',
              headerClasses: 'textHeader2',
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
                        onUpdateItems &&
                          onUpdateItems({repeatDelimiter}, row.index);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'fieldType',
              text: 'Field Type',
              headerClasses: 'textHeaderM',
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
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            fieldType,
                          },
                          row.index,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'FIELD_TYPE').map(
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
              csvExport: false,
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
                      onUpdateItems &&
                        onUpdateItems(
                          {fieldLength: Number.parseInt(fieldLength)},
                          row.index,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'requiredForLims',
              text: 'Required For Lims',
              headerClasses: 'textHeader2',
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
                        onUpdateItems &&
                          onUpdateItems({requiredForLims}, row.index);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'limsTables',
              text: 'Lims Tables',
              headerClasses: 'textHeaderM',
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
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            limsTables,
                          },
                          row.index,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {collection.map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              ),
            },
            {
              dataField: 'limsDocumentType',
              text: 'Lims Document Type',
              headerClasses: 'textHeaderM',
              events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                  if (collectionDetails.limsTables != row?.limsTables)
                    segmentMappingStore.segmentMappingService
                      .getCollectionFields({
                        input: {collection: row?.limsTables},
                      })
                      .then(res => {
                        if (res.getCollectionFields.success) {
                          setCollectionDetails({
                            limsTables: row?.limsTables,
                            schema: res.getCollectionFields.list.keys,
                            documentType:
                              res.getCollectionFields.list.documentTypes,
                          });
                        } else {
                          alert(
                            'Please try again.Technical issue fetching table fields',
                          );
                        }
                      });
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
                    value={row.limsDocumentType}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const limsDocumentType = e.target.value;
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            limsDocumentType,
                          },
                          row.index,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {collectionDetails.documentType.map(
                      (item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'limsFields',
              text: 'Lims Fields',
              headerClasses: 'textHeaderM',
              events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                  if (collectionDetails.limsTables != row?.limsTables)
                    segmentMappingStore.segmentMappingService
                      .getCollectionFields({
                        input: {collection: row?.limsTables},
                      })
                      .then(res => {
                        if (res.getCollectionFields.success) {
                          setCollectionDetails({
                            limsTables: row?.limsTables,
                            schema: res.getCollectionFields.list.keys,
                            documentType:
                              res.getCollectionFields.list.documentTypes,
                          });
                        } else {
                          alert(
                            'Please try again.Technical issue fetching table fields',
                          );
                        }
                      });
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
                    value={row.limsFields}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const limsFields = e.target.value;
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            limsFields,
                          },
                          row.index,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {collectionDetails.schema.map(
                      (item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
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
              headerClasses: 'textHeaderM',
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
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            environment,
                          },
                          row.index,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'ENVIRONMENT').map(
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
              hidden: false,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    <Tooltip tooltipText='Delete'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() => onDelete && onDelete(row.index)}
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                      </Icons.IconContext>
                    </Tooltip>
                    <Tooltip tooltipText='Duplicate'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() => onDuplicate && onDuplicate(row)}
                      >
                        {Icons.getIconTag(Icons.IconFa.FaCopy)}
                      </Icons.IconContext>
                    </Tooltip>
                  </div>
                </>
              ),
              headerClasses: 'sticky right-0  bg-gray-500 text-white',
              classes: (cell, row, rowIndex, colIndex) => {
                return 'sticky right-0 bg-gray-500';
              },
            },
          ]}
          isEditModify={true}
          isSelectRow={true}
          fileName='Segment Mapping'
        />
      </div>
    );
  },
);
