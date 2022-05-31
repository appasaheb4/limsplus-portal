import React from 'react';
import dayjs from 'dayjs';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  NumberFilter,
  DateFilter,
  TableBootstrap,
  textFilter,
  Icons,
  Tooltip,
  customFilter,
  Form,
  Buttons,
} from '@/library/components';
import {InputResult} from './input-result.components';

let analyteCode;
let analyteName;
let department;
let species;
let sex;
let rangeSetOn;
let equipmentType;
let lab;
let rangType;
let age;
let ageUnit;
let low;
let high;
let alpha;
let enteredBy;
let status;
let environment;
let dateCreation;
let dateActive;
let dateExpire;
let version;
let deltaRangTeType;
let deltaInterval;
let intervalUnit;

interface GeneralResultEntryListProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onUpdateValue: (item: any, id: string) => void;
  onSaveFields: (fileds: any, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

export const GeneralResultEntryList = (props: GeneralResultEntryListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
    <>
      <div style={{position: 'relative'}}>
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
              dataField: 'result',
              text: 'Result',
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
                  <InputResult
                    resultType={row.resultType}
                    onSelect={result => {
                      props.onUpdateValue({result}, row._id);
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
                        // props.onUpdateItem &&
                        //   props.onUpdateItem(method, 'method', row._id);
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
                return <>{dayjs(row.resultDate).format('YYYY-MM-DD')}</>;
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
                      disabled={true}
                      value={row.abnFlag}
                      onChange={abnFlag => {
                        // props.onUpdateItem &&
                        //   props.onUpdateItem(method, 'method', row._id);
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
                      disabled={true}
                      value={row.critical}
                      onChange={critical => {
                        // props.onUpdateItem &&
                        //   props.onUpdateItem(method, 'method', row._id);
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
                        // props.onUpdateItem &&
                        //   props.onUpdateItem(method, 'method', row._id);
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
              editable: false,
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
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    {row.testStatus === 'P' && row.resultStatus === 'P' && (
                      <>
                        <Buttons.Button
                          size='small'
                          type='outline'
                          buttonClass='text-white'
                          onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            props.onSaveFields &&
                              props.onSaveFields(row, row._id);
                          }}
                        >
                          {'Save'}
                        </Buttons.Button>
                      </>
                    )}
                  </div>
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
          clearAllFilter={() => {
            analyteCode('');
            analyteName('');
            department('');
            species('');
            sex('');
            rangeSetOn('');
            equipmentType('');
            lab('');
            rangType('');
            age('');
            ageUnit('');
            low('');
            high('');
            alpha('');
            enteredBy('');
            status('');
            environment('');
            dateCreation();
            dateActive();
            dateExpire();
            version('');
            deltaRangTeType('');
            deltaInterval('');
            intervalUnit('');
          }}
        />
      </div>
    </>
  );
};
