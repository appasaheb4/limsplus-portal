import React, { useEffect, useState } from 'react';
import {
  Form,
  Tooltip,
  Icons,
  NumberFilter,
  sortCaret,
  customFilter,
} from '@/library/components';
import dayjs from 'dayjs';

import { TableBootstrap } from './table-bootstrap.components';
import { RefRanges } from '../result/ref-ranges.component';
import { InputResult } from '../../../../../result-entry/general-result-entry/components/molecules/output/input-result.components';

import {
  getResultStatus,
  getTestStatus,
  getAbnFlag,
  getCretical,
} from '../../../../../result-entry/general-result-entry/utils';

interface PanelApprovalListProps {
  data: any;
  totalSize: number;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  isApproval?: boolean;
  selectedId?: string;
  selectedItems?: any;
  filterRecord?: string;
  onSelectedRow?: (selectedItem: any, type: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
  onUpdateResult?: (fields: any, id: string) => void;
  onExpand?: (items: any) => void;
  onRecheck?: (id: string, patientResultId: string) => void;
  onRetest?: (id: string, patientResultId: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
  onReport?: (item: any) => void;
  onFilterRecord?: (item: any) => void;
}

let labId;

export const PanelApprovalList = (props: PanelApprovalListProps) => {
  const [selectId, setSelectId] = useState('');
  const [localData, setLocalData] = useState(props.data);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [widthRefBox, setWidthRefBox] = useState('20px');
  const [widthConculsionBox, setWidthConculsionBox] = useState('20px');
  const [conclusionId, setWidthConculsionId] = useState('');

  useEffect(() => {
    const filterDataByHoldRecord = (data, holdRecord) => {
      if (holdRecord === 'Pending') {
        return data.filter(item => item.approvalStatus === 'Pending');
      } else if (holdRecord === 'Done') {
        return data.filter(item => item.approvalStatus === 'Done');
      } else {
        return data;
      }
    };
    setSelectId(props.selectedId || '');
    setLocalData(
      props.selectedId
        ? props.data
            ?.filter(item => item._id === props.selectedId)
            ?.map(item => ({ ...item, selectedId: props.selectedId }))
        : filterDataByHoldRecord(props.data, props.filterRecord),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedId, props.data, props.filterRecord]);

  useEffect(() => {
    setLocalData(JSON.parse(JSON.stringify(localData)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowId]);

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
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
              dataField: 'labId',
              text: 'Lab Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'sampleId',
              text: 'Sample Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'panel',
              text: 'Panel',
              sort: true,
              editable: false,
              formatter: (cellContent, row) => {
                const maxLength = 8;
                const displayTestName =
                  row.panel.length > maxLength
                    ? row.panel.slice(0, Math.max(0, maxLength)) + '...'
                    : row.panel;
                return (
                  <div className='flex flex-row'>
                    <span title={row.panel}>{`${displayTestName}`}</span>
                  </div>
                );
              },
            },
            {
              dataField: 'dueDate',
              text: 'Due Date',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return row?.dueDate
                  ? dayjs(row.dueDate).format('DD-MM-YYYY HH:mm:ss')
                  : '';
              },
            },

            {
              dataField: 'status',
              text: 'Status',
              sort: true,
              editable: false,
            },
            {
              dataField: 'sampleType',
              text: 'Sample Type',
              sort: true,
              editable: false,
            },
            {
              dataField: 'containerId',
              text: 'Container Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'comments',
              text: 'Comments',
              sort: true,
              editable: false,
            },
            {
              dataField: 'pLab',
              text: 'PLab',
              sort: true,
              editable: false,
            },
            {
              dataField: 'department',
              text: 'Department',
              sort: true,
              editable: false,
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              sort: true,
              editable: false,
            },
            {
              text: 'Environment',
              dataField: 'environment',
              editable: false,
              sort: true,
            },

            {
              dataField: 'approvalStatus',
              text: 'Action',
              sort: true,
              editable: false,
              formatter: (cellContent, row) => (
                <div className='flex flex-row gap-1' key={row?._id}>
                  {props.isApproval && (
                    <>
                      <Tooltip tooltipText='Approved'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() => {
                            props.onUpdateFields &&
                              props.onUpdateFields(
                                { approvalStatus: 'Approved' },
                                row._id,
                              );
                            props.onExpand && props.onExpand('');
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
                                { approvalStatus: 'Rejected' },
                                row._id,
                              );
                          }}
                        >
                          {Icons.getIconTag(Icons.Iconai.AiFillCloseCircle)}
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip tooltipText='Recheck'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() => {
                            props.onRecheck &&
                              props.onRecheck(row?._id, row?.patientResultId);
                          }}
                        >
                          <Icons.RIcon
                            nameIcon='GoIssueReopened'
                            propsIcon={{ color: '#ffffff' }}
                          />
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip tooltipText='Retest'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() => {
                            props.onRetest &&
                              props.onRetest(row?._id, row?.patientResultId);
                          }}
                        >
                          <Icons.RIcon
                            nameIcon='VscIssueReopened'
                            propsIcon={{ color: '#ffffff' }}
                          />
                        </Icons.IconContext>
                      </Tooltip>
                    </>
                  )}
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
          isDelete={props.isDelete}
          isEditModify={props.isUpdate}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='Report Panel Approval'
          onSelectedRow={(rows, type) => {
            props.onSelectedRow && props.onSelectedRow(rows, type);
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size);
          }}
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size);
          }}
          clearAllFilter={() => {
            labId('');
          }}
          onFilterRecord={item => {
            props.onFilterRecord && props.onFilterRecord(item);
          }}
        />
      </div>
    </>
  );
};
