import React from 'react';
import { observer } from 'mobx-react';
import {
  NumberFilter,
  customFilter,
  Form,
  sortCaret,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { PatientTestExpandPanel } from './patient-test-expand-panel.component';
import dayjs from 'dayjs';

interface PatientTestListProps {
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
let labid;
let orderId;
let testId;
let panelCode;
let companyCode;
export const PatientTestList = observer((props: PatientTestListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
    <>
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <PatientTestExpandPanel
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
              // headerClasses: 'textHeader4 z-10',
              sort: true,
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              // filter: customFilter({
              //   getFilter: filter => {
              //     labid = filter;
              //   },
              // }),
              // filterRenderer: (onFilter, column) => (
              //   <NumberFilter onFilter={onFilter} column={column} />
              // ),
            },
            {
              dataField: 'orderId',
              text: 'Order Id',
              // headerClasses: 'textHeader4 z-10',
              sort: true,
              // filter: customFilter({
              //   getFilter: filter => {
              //     orderId = filter;
              //   },
              // }),
              // headerStyle: {
              //   fontSize: 0,
              // },
              // sortCaret: (order, column) => sortCaret(order, column),
              // filterRenderer: (onFilter, column) => (
              //   <NumberFilter onFilter={onFilter} column={column} />
              // ),
            },
            {
              dataField: 'panelCode',
              text: 'Panel Code',
              formatter: (cellContent, row) => {
                const maxLength = 5;
                const displayTestName =
                  row.panelCode.length > maxLength
                    ? row.panelCode.slice(0, Math.max(0, maxLength)) + '...'
                    : row.panelCode;
                return (
                  <div className='flex flex-row'>
                    <span title={row.panelCode}>{`${displayTestName}`}</span>
                  </div>
                );
              },
            },
            {
              dataField: 'panelName',
              text: 'Panel Name',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '190px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row.panelName}>{cellContent}</span>
              ),
              headerClasses: 'textHeaderl',
            },
            {
              dataField: 'testCode',
              text: 'Test Code',
            },
            {
              dataField: 'testName',
              text: 'Test Name',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                maxWidth: '190px',
                position: 'relative',
              },
              formatter: (cellContent, row) => (
                <span title={row.testName}>{cellContent}</span>
              ),
              headerClasses: 'textHeaderl',
            },
            {
              dataField: 'confidential',
              text: 'Confidential',
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle value={row.confidential} disabled={true} />
                  </>
                );
              },
            },
            {
              dataField: 'urgent',
              text: 'Urgent',
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle value={row.urgent} disabled={true} />
                  </>
                );
              },
            },
            {
              dataField: 'cretical',
              text: 'Cretical',
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle value={row.cretical} disabled={true} />
                  </>
                );
              },
            },
            {
              dataField: 'abnFlag',
              text: 'Abn Flag',
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle value={row?.abnFlag} disabled={true} />
                  </>
                );
              },
            },
            {
              dataField: 'resultDate',
              text: 'Result Date',
              editable: false,
              headerClasses: 'textHeaderl',
              formatter: (cell, row) => {
                return (
                  <>
                    {row.resultDate
                      ? dayjs(row?.resultDate).format('DD-MM-YYYY HH:mm:ss')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'sampleCode',
              text: 'Sample Code',
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
            },
            {
              dataField: 'specimenId',
              text: 'Specimen Id',
            },
            {
              dataField: 'collContainerCode',
              text: 'Coll Container Code',
            },
            {
              dataField: 'collContainerName',
              text: 'Coll Container Name',
            },
            {
              dataField: 'rLab',
              text: 'RLab',
            },

            {
              dataField: 'pLab',
              text: 'PLab',
            },
            {
              dataField: 'status',
              text: 'Status',
            },
            {
              dataField: 'department',
              text: 'Department',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.department}</span>
                  </>
                );
              },
            },

            {
              dataField: 'section',
              text: 'Section',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.section?.code}</span>
                  </>
                );
              },
            },
            {
              dataField: 'methodCode',
              text: 'Method Code',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.methodCode}</span>
                  </>
                );
              },
            },
            {
              dataField: 'methodName',
              text: 'Method Name',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.methodName}</span>
                  </>
                );
              },
            },
            {
              dataField: 'validationLevel',
              text: 'Validation Level',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.validationLevel}</span>
                  </>
                );
              },
            },
            {
              dataField: 'resultOrder',
              text: 'Result Order',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.resultOrder}</span>
                  </>
                );
              },
            },
            {
              dataField: 'reportOrder',
              text: 'Report Order',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row?.reportOrder}</span>
                  </>
                );
              },
            },
            {
              dataField: 'prefix',
              text: 'Prefix',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.prefix}</span>
                  </>
                );
              },
            },

            {
              dataField: 'sufix',
              text: 'Sufix',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.sufix}</span>
                  </>
                );
              },
            },
            {
              dataField: 'deleverySchedule',
              text: 'Delevery Schedule',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.deleverySchedule}</span>
                  </>
                );
              },
            },

            {
              dataField: 'holdingDays',
              text: 'Holding Days',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.holdingDays}</span>
                  </>
                );
              },
            },
            {
              dataField: 'tat',
              text: 'Tat',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.tat}</span>
                  </>
                );
              },
            },
            {
              dataField: 'workListCode',
              text: 'Work List Code',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.workListCode}</span>
                  </>
                );
              },
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              // headerClasses: 'textHeader1',
              sort: true,
              // sortCaret: (order, column) => sortCaret(order, column),
              // csvFormatter: (col, row) => (row.enteredBy ? row.enteredBy : ''),
              formatter: (cell, row) => {
                return <span>{row.enteredBy}</span>;
              },
              editable: false,
            },
            {
              dataField: 'version',
              text: 'Version',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.version}</span>
                  </>
                );
              },
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              editable: false,
              // headerClasses: 'textHeader2',
            },
            {
              dataField: 'environment',
              text: 'Environment',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.environment}</span>
                  </>
                );
              },
            },
          ]}
          isDelete={props.isDelete}
          // isEditModify={props.isUpdate}
          isEditModify={false}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='PatientTest'
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
            labid('');
            testId('');
            orderId('');
            panelCode('');
          }}
        />
      </div>
    </>
  );
});
