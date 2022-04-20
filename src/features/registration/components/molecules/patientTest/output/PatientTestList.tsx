/* eslint-disable */
import React from 'react';
import {observer} from 'mobx-react';
import {NumberFilter, customFilter, Form} from '@/library/components';
import {Confirm} from '@/library/models';
import {PatientTestExpandPanel} from './PatientTestExpandPanel';

// import { NumberFilter } from "@/library/components/Organisms"

interface PatientTestListProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
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
export const PatientTestList = observer((props: PatientTestListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
    <>
      <div style={{position: 'relative'}}>
        <PatientTestExpandPanel
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
              dataField: 'labId',
              text: 'Lab Id',
              headerClasses: 'textHeader4 z-10',
              sort: true,
              filter: customFilter({
                getFilter: filter => {
                  labid = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              dataField: 'orderId',
              text: 'Order Id',
              headerClasses: 'textHeader4 z-10',
              sort: true,
              filter: customFilter({
                getFilter: filter => {
                  orderId = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            // {
            //   dataField: "panelCode",
            //   text: "Panel Code",
            //   headerClasses: "textHeader4 z-10",
            //   sort: true,
            //   csvFormatter: (cell, row, rowIndex) =>
            //     `${row.panelCode.map((item) => item.panelCode)}`,
            //   filter: textFilter({
            //     getFilter: (filter) => {
            //       panelCode = filter
            //     },
            //   }),
            //   formatter: (cellContent, row) => (
            //     <>
            //       <ul style={{ listStyle: "inside" }}>
            //         {row.panelCodes.map((item, index) => (
            //           <li key={index}>{item.panelCode}</li>
            //         ))}
            //       </ul>
            //     </>
            //   ),
            // },
            {
              dataField: 'panelCode',
              text: 'Panel Code',
            },
            {
              dataField: 'panelName',
              text: 'Panel Name',
            },
            {
              dataField: 'testCode',
              text: 'Test Code',
            },
            {
              dataField: 'testName',
              text: 'Test Name',
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
              dataField: 'sampleCode',
              text: 'Sample Code',
            },
            {
              dataField: 'sampleType',
              text: 'Sample Type',
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
                    <span>{row.extraData?.section.code}</span>
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
              dataField: 'environment',
              text: 'Environment',
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row.extraData?.environment}</span>
                  </>
                );
              },
            },
          ]}
          isEditModify={false}
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
