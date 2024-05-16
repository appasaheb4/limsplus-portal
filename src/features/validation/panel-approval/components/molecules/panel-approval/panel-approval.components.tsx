import React, { useEffect, useState } from 'react';
import {
  Form,
  Tooltip,
  Icons,
  NumberFilter,
  sortCaret,
  customFilter,
  textFilter,
} from '@/library/components';
import dayjs from 'dayjs';
import _ from 'lodash';
import { GiUpgrade } from 'react-icons/gi';
import { TableBootstrap } from './table-bootstrap.components';
import { useStores } from '@/stores';
import { CiNoWaitingSign } from 'react-icons/ci';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

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
  enteredBy?: string;
  onSelectedRow?: (selectedItem: any, type: string) => void;
  onUpdateFields?: (fields: any, id: string[]) => void;
  onUpdateResult?: (fields: any, id: string, patientResultId: string) => void;
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
let pLab;
let patientName;
let department;

export const PanelApprovalList = (props: PanelApprovalListProps) => {
  const { loginStore } = useStores();
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
              headerClasses: 'textHeader',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '250px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row[1][0]?.panel}>{row[1][0]?.panel}</span>
              ),
            },
            {
              dataField: 'name',
              text: 'Patient Name',
              sort: true,
              editable: false,
              headerStyle: {
                fontSize: 0,
              },
              headerClasses: 'textHeader',
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Patient Name',
                getFilter: filter => {
                  patientName = filter;
                },
              }),
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '250px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row[1][0].name}>{row[1][0].name}</span>
              ),
            },

            {
              dataField: 'department',
              text: 'Department',
              sort: true,
              editable: false,
              headerClasses: 'textHeader',
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Department',
                getFilter: filter => {
                  department = filter;
                },
              }),
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '250px',
                position: 'relative',
              },
              formatter: (cell, row) => {
                return <span title={row[1][0]?.department}>{cell}</span>;
              },
            },
            {
              dataField: 'pLab',
              text: 'PLab',
              sort: true,
              editable: false,
              headerClasses: 'textHeader',
              // headerStyle: {
              //   fontSize: 0,
              // },
              sortCaret: (order, column) => sortCaret(order, column),
              // filter: textFilter({
              //   placeholder: 'Plab',
              //   getFilter: filter => {
              //     pLab = filter;
              //   },
              // }),
              formatter: (cell, row) => {
                return <span>{row[1][0]?.pLab}</span>;
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
              text: 'Action',
              sort: true,
              editable: false,

              formatter: (cellContent, row) => (
                <div className='flex flex-row gap-1' key={row[1][0]?._id}>
                  {props?.isApproval &&
                  row[1][0]?.isResultUpdate &&
                  props?.enteredBy == row[1][0]?.enteredBy ? (
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
                            ? 'Unhold'
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
                            ? Icons.getIconTag(Icons.IconsCi.CiNoWaitingSign)
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
                  ) : (
                    <span className='text-white'>Still result not update</span>
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
                  <Tooltip tooltipText='Upgrade Validation Level'>
                    <UncontrolledDropdown>
                      <DropdownToggle tag='a'>
                        <Icons.RIcon
                          nameIcon='RxUpdate'
                          propsIcon={{ size: 20, color: '#ffffff' }}
                        />
                      </DropdownToggle>
                      <DropdownMenu right>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                          .filter(
                            item => item > loginStore.login.validationLevel,
                          )
                          .map((item: any, index: number) => (
                            <DropdownItem
                              onClick={() => {
                                props.onUpdateFields &&
                                  props.onUpdateFields(
                                    {
                                      validationLevel: Number.parseInt(item),
                                    },
                                    [row[1][0]._id],
                                  );
                              }}
                            >
                              {item}
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    {/* <select
                      value={row[1][0].validationLevel}
                      disabled={!row[1][0]?.isResultUpdate}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-10 shadow-sm sm:text-base border-2  rounded-md'
                      }
                      style={{ color: '#000000', backgroundColor: '#ffffff' }}
                      onChange={e => {
                        const validationLevel: any = e.target.value;
                        props.onUpdateFields &&
                          props.onUpdateFields(
                            {
                              validationLevel: Number.parseInt(validationLevel),
                            },
                            [row[1][0]._id],
                          );
                      }}
                    >
                      <option selected style={{ color: '#000000' }}>
                        Select
                      </option>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                        .filter(item => item > loginStore.login.validationLevel)
                        .map((item: any, index: number) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </select> */}
                  </Tooltip>
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
          onUpdateResult={(fields, id, patientResultId) => {
            props.onUpdateResult &&
              props.onUpdateResult(fields, id, patientResultId);
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
          onFilterByFields={(condition: any) => {
            console.log({ localData, condition });
          }}
        />
      </div>
    </>
  );
};
