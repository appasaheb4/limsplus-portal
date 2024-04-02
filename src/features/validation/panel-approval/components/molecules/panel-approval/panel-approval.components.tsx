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
import _ from 'lodash';

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
  onUpdateFields?: (fields: any, id: string[]) => void;
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
  const [isAllRecordDisplay, setIsAllRecordDisplay] = useState(false);
  const [fetchIndex, setFetchIndex] = useState<number>(0);

  useEffect(() => {
    setLocalData(JSON.parse(JSON.stringify(props.data)) || []);
  }, [props.data, props.selectedId]);

  // useEffect(() => {
  //   const filterDataByHoldRecord = (data, holdRecord) => {
  //     if (holdRecord === 'Pending') {
  //       return data.filter(item => item.approvalStatus === 'Pending');
  //     } else if (holdRecord === 'Done') {
  //       return data.filter(item => item.approvalStatus === 'Done');
  //     } else {
  //       return data;
  //     }
  //   };
  //   setSelectId(props.selectedId || '');
  //   setLocalData(
  //     props.selectedId
  //       ? props.data
  //           ?.filter(item => item._id === props.selectedId)
  //           ?.map(item => ({ ...item, selectedId: props.selectedId }))
  //       : filterDataByHoldRecord(props.data, props.filterRecord),
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.selectedId, props.data, props.filterRecord]);

  // useEffect(() => {
  //   setLocalData(JSON.parse(JSON.stringify(localData)));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedRowId]);

  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrap
          id='_id'
          data={
            localData?.length > 0
              ? isAllRecordDisplay
                ? localData
                : [localData[fetchIndex]]
              : []
          }
          totalSize={localData?.length}
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
              formatter: (cell, row) => {
                return <span>{row[1][0]?.labId}</span>;
              },
            },
            {
              dataField: 'panel',
              text: 'Panel',
              sort: true,
              editable: false,
              headerClasses: 'textHeaderl',
              formatter: (cell, row) => {
                return <span>{row[1][0]?.panel}</span>;
              },
            },
            {
              dataField: 'dueDate',
              text: 'Due Date',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return row[1][0]?.dueDate
                  ? dayjs(row[1][0]?.dueDate).format('DD-MM-YYYY HH:mm:ss')
                  : '';
              },
            },
            {
              dataField: 'approvalStatus',
              text: 'Approval Status',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return <span>{row[1][0]?.approvalStatus}</span>;
              },
            },
            {
              dataField: 'comments',
              text: 'Comments',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return <span>{row[1][0]?.comments}</span>;
              },
            },
            {
              dataField: 'pLab',
              text: 'PLab',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return <span>{row[1][0]?.pLab}</span>;
              },
            },
            {
              dataField: 'department',
              text: 'Department',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return <span>{row[1][0]?.department}</span>;
              },
            },
            {
              dataField: 'approvalStatus',
              text: 'Action',
              sort: true,
              editable: false,
              formatter: (cellContent, row) => (
                <div className='flex flex-row gap-1' key={row[1][0]?._id}>
                  {props.isApproval && (
                    <>
                      <Tooltip tooltipText='Approved'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          isDisable={
                            row[1][0]?.approvalStatus == 'Hold' ? true : false
                          }
                          onClick={() => {
                            props.onUpdateFields &&
                              props.onUpdateFields(
                                {
                                  approvalStatus: 'Approved',
                                },
                                _.map(row[1], '_id'),
                              );
                            setFetchIndex(0);
                            props.onExpand && props.onExpand('');
                          }}
                        >
                          {Icons.getIconTag(Icons.Iconai.AiFillCheckCircle)}
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip
                        tooltipText={`${
                          row[1][0]?.approvalStatus == 'Hold'
                            ? 'Pending'
                            : 'Hold'
                        } `}
                      >
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() => {
                            props.onUpdateFields &&
                              props.onUpdateFields(
                                {
                                  approvalStatus:
                                    row[1][0]?.approvalStatus == 'Hold'
                                      ? 'Pending'
                                      : 'Hold',
                                },
                                _.map(row[1], '_id'),
                              );
                            setFetchIndex(0);
                          }}
                        >
                          {row[1][0]?.approvalStatus == 'Hold'
                            ? Icons.getIconTag(Icons.Iconmd.MdOutlinePending)
                            : Icons.getIconTag(Icons.Iconmd.MdBackHand)}
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip tooltipText='Recheck'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          isDisable={
                            row[1][0]?.approvalStatus == 'Hold' ? true : false
                          }
                          onClick={() => {
                            props.onRecheck &&
                              props.onRecheck(
                                row[1][0]?._id,
                                row[1][0]?.patientResultId,
                              );
                            setFetchIndex(0);
                          }}
                        >
                          <Icons.RIcon
                            nameIcon='GoIssueReopened'
                            propsIcon={{
                              color:
                                row[1][0]?.approvalStatus == 'Hold'
                                  ? '#808080'
                                  : '#ffffff',
                            }}
                          />
                        </Icons.IconContext>
                      </Tooltip>
                      <Tooltip tooltipText='Retest'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          isDisable={
                            row[1][0]?.approvalStatus == 'Hold' ? true : false
                          }
                          onClick={() => {
                            props.onRetest &&
                              props.onRetest(
                                row[1][0]?._id,
                                row[1][0]?.patientResultId,
                              );
                            setFetchIndex(0);
                          }}
                        >
                          <Icons.RIcon
                            nameIcon='TbBrandSpeedtest'
                            propsIcon={{
                              color:
                                row[1][0]?.approvalStatus == 'Hold'
                                  ? '#808080'
                                  : '#ffffff',
                            }}
                          />
                        </Icons.IconContext>
                      </Tooltip>
                    </>
                  )}
                  {selectId == row[1][0]._id ? (
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
                          props.onExpand && props.onExpand(row[1][0]);
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
            // if (item == 'Pending') setIsAllRecordDisplay(false);
            // else setIsAllRecordDisplay(true);
            props.onFilterRecord && props.onFilterRecord(item);
          }}
          // diff action to handle
          onUpdateFields={(fields: any, id: string) => {
            props.onUpdateFields && props.onUpdateFields({ ...fields }, [id]);
          }}
          onUpdateResult={(id, fields) => {
            props.onUpdateResult && props.onUpdateResult(id, fields);
          }}
          onPagination={type => {
            if (type == 'next') {
              fetchIndex < localData?.length - 1
                ? setFetchIndex(fetchIndex + 1)
                : setFetchIndex(localData?.length - 1);
            } else {
              fetchIndex != 0 && fetchIndex < localData?.length
                ? setFetchIndex(fetchIndex - 1)
                : setFetchIndex(fetchIndex);
            }
          }}
        />
      </div>
    </>
  );
};
