import React, {useEffect, useState} from 'react';
import {Form, Tooltip, Icons} from '@/library/components';
import dayjs from 'dayjs';

import {TableBootstrap} from './table-bootstrap.components';

interface ResultListProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  selectedId?: string;
  selectedItems?: any;
  onSelectedRow?: (selectedItem: any, type: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
  onExpand?: (items: any) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
  onReport?: (item: any) => void;
}

export const ResultList = (props: ResultListProps) => {
  const [selectId, setSelectId] = useState('');
  const [localData, setLocalData] = useState(props.data);

  useEffect(() => {
    setSelectId(props.selectedId || '');
    setLocalData(
      props.selectedId
        ? props.data.map(item => {
            return {...item, selectedId: props.selectedId};
          })
        : props.data,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedId, props.data]);

  return (
    <>
      <div style={{position: 'relative'}}>
        <TableBootstrap
          id='_id'
          data={localData}
          totalSize={props.totalSize}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'test',
              text: 'Test',
              sort: true,
              editable: false,
              headerClasses: 'textHeader',
            },
            {
              dataField: 'analyte',
              text: 'Analyte',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderl',
            },
            {
              dataField: 'result',
              text: 'Result',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderl',
            },
            {
              dataField: 'final',
              text: 'Final',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderl',
            },
            {
              dataField: 'abnFlag',
              text: 'Abn Flag',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle disabled={true} value={row.abnFlag} />
                  </>
                );
              },
            },
            {
              dataField: 'critical',
              text: 'Critical',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle disabled={true} value={row.critical} />
                  </>
                );
              },
            },
            {
              dataField: 'units',
              text: 'Units',
              sort: true,
              editable: false,
            },
            {
              dataField: 'refRanges',
              text: 'Ref Ranges',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <span>
                    {row.refRanges ? JSON.stringify(row.refRanges) : ''}
                  </span>
                );
              },
            },
            {
              dataField: 'remarks',
              text: 'Remarks',
              sort: true,
              editable: false,
            },
            {
              dataField: 'deltaFlag',
              text: 'Delta Flag',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle disabled={true} value={row.deltaFlag} />
                  </>
                );
              },
            },
            {
              dataField: 'deltaValue',
              text: 'Delta Value',
              sort: true,
              editable: false,
            },
            {
              dataField: 'resultStatus',
              text: 'resultStatus',
              sort: true,
              editable: false,
            },
            {
              dataField: 'testStatus',
              text: 'Test Status',
              sort: true,
              editable: false,
            },
            {
              dataField: 'approvalDate',
              text: 'Approval Date',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return row.approvalDate
                  ? dayjs(row.approvalDate).format('YYYY-MM-DD')
                  : '';
              },
            },
            {
              dataField: 'autoRelease',
              text: 'Auto Release',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle disabled={true} value={row.autoRelease} />
                  </>
                );
              },
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'approvalStatus',
              text: 'Operation',
              sort: true,
              editable: true,
              formatter: (cellContent, row) => (
                <div className='flex flex-row gap-1'>
                  <Tooltip tooltipText='Approved'>
                    <Icons.IconContext
                      color='#fff'
                      size='20'
                      onClick={() => {
                        props.onUpdateFields &&
                          props.onUpdateFields(
                            {approvalStatus: 'Approved'},
                            row._id,
                          );
                      }}
                    >
                      {Icons.getIconTag(Icons.Iconai.AiFillCheckCircle)}
                    </Icons.IconContext>
                  </Tooltip>
                  <Tooltip tooltipText='Rejected'>
                    <Icons.IconContext
                      color='#fff'
                      size='20'
                      onClick={() => {
                        props.onUpdateFields &&
                          props.onUpdateFields(
                            {approvalStatus: 'Rejected'},
                            row._id,
                          );
                      }}
                    >
                      {Icons.getIconTag(Icons.Iconai.AiFillCloseCircle)}
                    </Icons.IconContext>
                  </Tooltip>
                  {selectId == row._id ? (
                    <Tooltip tooltipText='Expand'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() => {
                          props.onExpand && props.onExpand('');
                        }}
                      >
                        {Icons.getIconTag(Icons.Iconai.AiFillMinusCircle)}
                      </Icons.IconContext>
                    </Tooltip>
                  ) : (
                    <Tooltip tooltipText='Expand'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() => {
                          props.onExpand && props.onExpand(row);
                        }}
                      >
                        {Icons.getIconTag(Icons.Iconai.AiFillPlusCircle)}
                      </Icons.IconContext>
                    </Tooltip>
                  )}
                </div>
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
          fileName='Report Panel Approval'
          onSelectedRow={(rows, type) => {
            props.onSelectedRow && props.onSelectedRow(rows, type);
          }}
        />
      </div>
    </>
  );
};
