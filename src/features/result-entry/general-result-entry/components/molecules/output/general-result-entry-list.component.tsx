/* eslint-disable no-case-declarations */
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import {Form, Buttons} from '@/library/components';
import {InputResult} from './input-result.components';
import {DisplayResult} from './display-result.components';

import {GeneralResultEntryExpand} from './general-result-entry-expand.component';

interface GeneralResultEntryListProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onUpdateValue: (item: any, id: string) => void;
  onSaveFields: (fileds: any, id: string, type: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

export const GeneralResultEntryList = (props: GeneralResultEntryListProps) => {
  const [data, setData] = useState<any>([]);
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };

  const getStatus = (
    status: string,
    type: string,
    result: number,
    lo: number,
    hi: number,
  ) => {
    if (status === 'resultStatus' && type === 'V') {
      if (result >= lo && result <= hi) return 'N';
      else if (result < lo) return 'L';
      else if (result > hi) return 'H';
      return 'N';
    } else if (status === 'testStatus' && type === 'V') {
      if (result >= lo && result <= hi) return 'N';
      else if (result < lo) return 'A';
      else if (result > hi) return 'A';
      return 'N';
    }
    return 'N';
  };

  const getResultStatus = (type: string, row: any) => {
    switch (type) {
      case 'V':
        if (!row?.loNor && !row?.hiNor) return 'N';
        const numberResult = Number.parseFloat(row?.result);
        const numberLo = Number.parseFloat(row?.loNor || 0);
        const numberHi = Number.parseFloat(row?.hiNor || 0);
        return getStatus(
          'resultStatus',
          type,
          numberResult,
          numberLo,
          numberHi,
        );
        break;
      default:
        return row?.abnFlag ? 'A' : 'N';
        break;
    }
  };

  const getTestStatus = (type: string, row: any) => {
    switch (type) {
      case 'V':
        if (!row?.loNor && !row?.hiNor) return 'N';
        // eslint-disable-next-line no-case-declarations
        const numberResult = Number.parseFloat(row?.result);
        const numberLo = Number.parseFloat(row?.loNor || 0);
        const numberHi = Number.parseFloat(row?.hiNor || 0);
        return getStatus('testStatus', type, numberResult, numberLo, numberHi);
        break;
      default:
        if (!row?.loNor && !row?.hiNor) return 'A';
        return row?.abnFlag ? 'A' : 'N';
        break;
    }
  };

  const getAbnFlag = (type: string, row: any) => {
    switch (type) {
      case 'V':
        return getResultStatus(row.resultType, row) === 'L' ||
          getResultStatus(row.resultType, row) === 'H'
          ? true
          : false;
        break;
      default:
        return row?.abnFlag;
        break;
    }
  };

  const getCretical = (type: string, row: any) => {
    switch (type) {
      case 'V':
        const numberResult = Number.parseFloat(row?.result);
        const numberLo = Number.parseFloat(
          row?.refRangesList?.find(item => item.rangeType === 'C')?.low,
        );
        const numberHi = Number.parseFloat(
          row?.refRangesList?.find(item => item.rangeType === 'C')?.high,
        );
        if (!numberLo && !numberHi) return false;
        if (numberResult >= numberLo && numberResult <= numberHi) return false;
        return true;
        break;
      default:
        return row?.critical;
        break;
    }
  };

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <>
      <div style={{position: 'relative'}}>
        <GeneralResultEntryExpand
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
              dataField: 'result',
              text: 'Result',
              headerClasses: 'textHeader',
              formatter: (cellContent, row) => (
                <>
                  <DisplayResult row={row} />
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
                  <InputResult
                    row={row}
                    onSelect={async result => {
                      await props.onUpdateValue(result, row._id);
                      const rows = {...row, ...result};
                      if (_.isEmpty(row?.result)) {
                        props.onSaveFields(
                          {
                            ...rows,
                            resultStatus: getResultStatus(
                              rows.resultType,
                              rows,
                            ),
                            testStatus: getTestStatus(rows.resultType, rows),
                            abnFlag: getAbnFlag(rows.resultType, rows),
                            critical: getCretical(rows.resultType, rows),
                            ...result,
                          },
                          rows._id,
                          'directSave',
                        );
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'labId',
              text: 'Lab Id',
              editable: false,
            },
            {
              dataField: 'panelCode',
              text: 'Panel Code',
              editable: false,
            },
            {
              dataField: 'testCode',
              text: 'Test Code - Name',
              editable: false,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    {`${row.testCode} - ${row.testName}`}
                  </div>
                </>
              ),
            },
            {
              dataField: 'analyteCode',
              text: 'Analyte Code - Name',
              editable: false,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    {`${row.analyteCode} - ${row.analyteName}`}
                  </div>
                </>
              ),
            },
            {
              dataField: 'resultType',
              text: 'Result Type',
              editable: false,
            },
            {
              dataField: 'reportable',
              text: 'Reportable',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.reportable}
                      onChange={reportable => {
                        props.onUpdateValue({reportable}, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'units',
              text: 'Units',
              editable: false,
            },
            {
              dataField: 'resultDate',
              text: 'Result Date',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>{dayjs(row.resultDate).format('YYYY-MM-DD HH:mm:ss')}</>
                );
              },
            },
            {
              dataField: 'abnFlag',
              text: 'Abn Flag',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={
                        row.resultType === 'F' || row.resultType === 'M'
                          ? false
                          : true
                      }
                      value={row.abnFlag}
                      onChange={abnFlag => {
                        props.onUpdateValue({abnFlag}, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'critical',
              text: 'Critical',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={
                        row.resultType === 'F' || row.resultType === 'M'
                          ? false
                          : true
                      }
                      value={row.critical}
                      onChange={critical => {
                        props.onUpdateValue({critical}, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'showRanges',
              text: 'Show Ranges',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={!editorCell(row)}
                      value={row.showRanges}
                      onChange={showRanges => {
                        props.onUpdateValue({showRanges}, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'sex',
              text: 'Sex',
              editable: false,
            },
            {
              dataField: 'age',
              text: 'Age',
              editable: false,
            },
            {
              dataField: 'ageUnit',
              text: 'Age Unit',
              editable: false,
            },
            {
              dataField: 'species',
              text: 'Species',
              editable: false,
            },
            {
              dataField: 'loNor',
              text: 'Lo Nor',
              editable: false,
            },
            {
              dataField: 'hiNor',
              text: 'Hi Nor',
              editable: false,
            },
            {
              dataField: 'conclusion',
              text: 'Conclusion',
              headerClasses: 'textHeader',
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
                    placeholder='Conclusion'
                    onBlur={conclusion => {
                      props.onUpdateValue({conclusion}, row._id);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'testStatus',
              text: 'Test Status',
              editable: false,
            },
            {
              dataField: 'resultStatus',
              text: 'Result Status',
              editable: false,
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              editable: false,
              formatter: (cell, row) => {
                return <>{row.extraData?.enteredBy}</>;
              },
            },
            {
              dataField: 'opration',
              text: 'Action',
              editable: false,
              csvExport: false,
              hidden: !props.isDelete,
              formatter: (cell, row, rowIndex, formatExtraData) => (
                <>
                  {!_.isEmpty(row?.result) && (
                    <div className='flex flex-row'>
                      <>
                        <Buttons.Button
                          size='small'
                          type='outline'
                          buttonClass='text-white'
                          disabled={!row?.flagUpdate}
                          onClick={() => {
                            if (!row?.result)
                              return alert('Please enter result value ');
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            props.onSaveFields &&
                              props.onSaveFields(
                                {
                                  ...row,
                                  resultStatus: getResultStatus(
                                    row.resultType,
                                    row,
                                  ),
                                  testStatus: getTestStatus(
                                    row.resultType,
                                    row,
                                  ),
                                  abnFlag: getAbnFlag(row.resultType, row),
                                  critical: getCretical(row.resultType, row),
                                },
                                row._id,
                                'save',
                              );
                          }}
                        >
                          {'Update'}
                        </Buttons.Button>
                      </>
                    </div>
                  )}
                </>
              ),
              headerClasses: 'sticky right-0  bg-gray-500 text-white',
              classes: (cell, row, rowIndex, colIndex) => {
                return 'sticky right-0 bg-gray-500';
              },
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName='General Result Entry'
          onPageSizeChange={(page, limit) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            props.onPageSizeChange && props.onPageSizeChange(page, limit);
          }}
          onFilter={(type, filter, page, size) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            props.onFilter && props.onFilter(type, filter, page, size);
          }}
          clearAllFilter={() => {}}
        />
      </div>
    </>
  );
};
