import React, { useState } from 'react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import {
  NumberFilter,
  Form,
  customFilter,
  sortCaret,
  Tooltip,
  Icons,
} from '@/library/components';
import { Confirm } from '@/library/models';
import TableBootstrap from './table-bootstrap.component';
import { TiFlowChildren } from 'react-icons/ti';

interface PatientSampleProps {
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
}

let labId;
export const PatientSampleList = observer((props: PatientSampleProps) => {
  const [widthConculsionBox, setWidthConculsionBox] = useState('20px');
  const [selectedRowId, setSelectedRowId] = useState('');

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrap
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
              headerClasses: 'textHeaderl',
              sort: true,
              // filter: customFilter({
              //   getFilter: filter => {
              //     labId = filter;
              //   },
              // }),
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              // filterRenderer: (onFilter, column) => (
              //   <NumberFilter onFilter={onFilter} column={column} />
              // ),
              editable: false,
            },
            {
              dataField: 'specimenId',
              text: 'Specimen Id',
              // headerClasses: 'textHeader4',
              sort: true,
              // filter: customFilter({
              //   getFilter: filter => {
              //     labId = filter;
              //   },
              // }),
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              // filterRenderer: (onFilter, column) => (
              //   <NumberFilter onFilter={onFilter} column={column} />
              // ),
              editable: false,
            },
            {
              dataField: 'comment',
              text: 'Comment',
              editable: false,
              style: { width: widthConculsionBox },
              formatter: (cell, row) => {
                return (
                  <div className='flex flex-col'>
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
                            setWidthConculsionBox('30px');
                          } else {
                            setSelectedRowId(row._id);
                            setWidthConculsionBox('200px');
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

                    {row._id === selectedRowId && (
                      <div style={{ width: widthConculsionBox }}>
                        <Form.MultilineInput
                          rows={3}
                          placeholder='Comment'
                          className='text-black'
                          onBlur={conclusion => {}}
                          defaultValue={row?.comment}
                        />
                      </div>
                    )}
                  </div>
                );
              },
            },
            {
              dataField: 'labLit',
              text: 'Lab List',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'outSourceLab',
              text: 'Out Source Lab',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'outSourceStatus',
              text: 'Out Source Status',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'containerId',
              text: 'Container Name',
              // headerClasses: 'textHeader3',
              sort: true,
              editable: false,
            },
            {
              dataField: 'sampleType',
              text: 'Sample Type',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '190px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row.sampleType}>{cellContent}</span>
              ),
              headerClasses: 'textHeaderl',
              sort: true,
              editable: false,
            },
            {
              dataField: 'testList',
              text: 'Test List',
              // headerClasses: 'textHeader3',
              sort: true,
              editable: false,
            },
            {
              dataField: 'departmentList',
              text: 'Department List',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'receivedDate',
              text: 'Received Date',
              headerClasses: 'textHeaderl',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row.receivedDate
                      ? dayjs(row?.receivedDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'collectionDate',
              text: 'Collection Date',
              headerClasses: 'textHeaderl',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row.collectionDate
                      ? dayjs(row?.collectionDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'methodCollection',
              text: 'Method Collection',
              // headerClasses: 'textHeader6',
              sort: true,
              editable: false,
            },

            {
              dataField: 'primaryContainer',
              text: 'Primary Container',
              // headerClasses: 'textHeader6',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.primaryContainer}
                      onChange={primaryContainer => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            primaryContainer,
                            'primaryContainer',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'aliquot',
              text: 'Aliquot',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.aliquot}
                      onChange={aliquot => {
                        props.onUpdateItem &&
                          props.onUpdateItem(aliquot, 'aliquot', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'uniqueContainer',
              text: 'Unique Container',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.uniqueContainer}
                      onChange={uniqueContainer => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            uniqueContainer,
                            'uniqueContainer',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'labSpecific',
              text: 'Lab Specific',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.labSpecific}
                      onChange={labSpecific => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            labSpecific,
                            'labSpecific',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'departmentSpecific',
              text: 'Department Specific',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.departmentSpecific}
                      onChange={departmentSpecific => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            departmentSpecific,
                            'departmentSpecific',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'sharedSample',
              text: 'Shared Sample',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.sharedSample}
                      onChange={sharedSample => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            sharedSample,
                            'sharedSample',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'labelInstructions',
              text: 'Label Instructions',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'externalSampleId',
              text: 'External Sample Id',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'status',
              text: 'Status',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              sort: true,
              editable: false,
              // headerClasses: 'textHeader2',
            },
            {
              dataField: 'environment',
              text: 'Environment',
              // headerClasses: 'textHeader4',
              sort: true,
              editable: false,
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
                    <Tooltip tooltipText='Traceability'>
                      <TiFlowChildren color='#ffffff' size='20' />
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
          // isEditModify={props.isUpdate}
          isEditModify={false}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='PatientSample'
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
            labId('');
          }}
        />
      </div>
    </>
  );
});
