import React from 'react';
import {observer} from 'mobx-react';
import {
  Type,
  TableBootstrap,
  Tooltip,
  Icons,
} from '@/library/components';
import {ReportBodyComponents} from './report-body.components';
import {EndOfPageComponents} from './end-of-page.components';
import {EndOfReportComponents} from './end-of-report.components';
import {Confirm} from '@/library/models';

interface TemplatePatientResultProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (fields: any, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onPdfPreview?: (selectedItem: any) => void;
}

let sectionSetting;
let version;
let environment;

export const TemplatePatientResultList = observer(
  (props: TemplatePatientResultProps) => {
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
                dataField: 'reportTemplateType',
                text: 'Report Template Type',
                headerClasses: 'textHeader',
                sort: true,
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
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  border-gray-300 rounded-md'
                      }
                      onChange={e => {
                        const reportTemplateType = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem({reportTemplateType}, row._id);
                      }}
                    >
                      <option selected>Select</option>
                      {['Lab Wise', 'Client Wise', 'Doctor Wise'].map(
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
                dataField: 'reportBody',
                text: 'Report Body',
                headerClasses: 'textHeader',
                sort: true,
                formatter: (cell, row) => {
                  return <>{row?.reportBody?.reportCode}</>;
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
                    <ReportBodyComponents
                      onSelect={item => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {
                              reportBody: {
                                _id: item?._id,
                                reportCode: item?.reportCode,
                                reportName: item?.reportName,
                              },
                            },
                            row._id,
                          );
                      }}
                    />
                  </>
                ),
              },
              {
                dataField: 'templateCode',
                text: 'Template code',
                headerClasses: 'textHeader',
                sort: true,
              },
              {
                dataField: 'templateTitle',
                text: 'Template title',
                headerClasses: 'textHeader',
                sort: true,
                editor: {
                  type: Type.TEXTAREA,
                },
              },
              {
                dataField: 'endOfPage',
                text: 'End Of Page',
                headerClasses: 'textHeader',
                sort: true,
                formatter: (cell, row) => {
                  return (
                    <>
                      {row?.endOfPage?.map(item => (
                        <p>{` ${item?.details}`}</p>
                      ))}
                    </>
                  );
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
                    <EndOfPageComponents
                      onSelect={item => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {
                              endOfPage: item,
                            },
                            row._id,
                          );
                      }}
                    />
                  </>
                ),
              },
              {
                dataField: 'endOfReport',
                text: 'End Of Report',
                headerClasses: 'textHeader',
                sort: true,
                formatter: (cell, row) => {
                  return (
                    <>
                      {row?.endOfReport?.map(item => (
                        <p>{` ${item?.details}`}</p>
                      ))}
                    </>
                  );
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
                    <EndOfReportComponents
                      onSelect={item => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {
                              endOfReport: item,
                            },
                            row._id,
                          );
                      }}
                    />
                  </>
                ),
              },
              {
                dataField: 'operation',
                text: 'Action',
                editable: false,
                csvExport: false,
                hidden: !props.isDelete,
                formatter: (cellContent, row) => (
                  <>
                    <div className='flex flex-row'>
                      <Tooltip tooltipText='Delete' position='bottom'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() =>
                            props.onDelete &&
                            props.onDelete({
                              type: 'delete',
                              show: true,
                              id: [row._id],
                              title: 'Are you sure?',
                              body: 'Delete item',
                            })
                          }
                        >
                          {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                        </Icons.IconContext>
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
            isEditModify={props.isEditModify}
            isSelectRow={true}
            fileName='Template Patient Result'
            onSelectedRow={rows => {
              props.onSelectedRow &&
                props.onSelectedRow(rows.map((item: any) => item._id));
            }}
            onPageSizeChange={(page, size) => {
              props.onPageSizeChange && props.onPageSizeChange(page, size);
            }}
            onFilter={(type, filter, page, size) => {
              props.onFilter && props.onFilter(type, filter, page, size);
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              props.onUpdateItem &&
                props.onUpdateItem({[dataField]: value}, id);
            }}
            clearAllFilter={() => {
              sectionSetting('');
              version('');
              environment('');
            }}
          />
        </div>
      </>
    );
  },
);
