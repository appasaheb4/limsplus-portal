import React, { useState } from 'react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import _ from 'lodash';
import {
  TableBootstrap,
  textFilter,
  DateRangeFilter,
  customFilter,
  Form,
  Tooltip,
  Icons,
  NumberFilter,
  ModalImportFile,
  sortCaret,
  ModalDateTime,
} from '@/library/components';
import { Confirm } from '@/library/models';
import { lookupItems, lookupValue } from '@/library/utils';
import { SocialIcon } from 'react-social-icons';

let countryName;
let labId;
let registrationDate;
let clientCode;
let clientName;
let patientName;
let age;
let ageUnits;
let sex;
let testName;
let testCode;
let sample;
let dueDate;
let reportDate;
let companyCode;
let environment;

interface ClientRegistrationListProps {
  data: any;
  extraData: any;
  totalSize: number;
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  isExport?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFields?: (fields: any, id: string) => void;
  onPdfFileUpload?: (file: any, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onSingleFieldUpdate?: (id: string, fields: any) => void;
  hideAddSegmentMapping: boolean;
  setHideAddSegmentMapping: any;
}

export const ClientRegistrationList = observer(
  (props: ClientRegistrationListProps) => {
    const [modalImportFile, setModalImportFile] = useState({});
    const [modalDetails, setModalDetails] = useState<any>();
    const sharePdfLink = async (type: string, link: string) => {
      window.open(type + link, '_blank');
    };

    function getExt(filename) {
      const ext = filename.split('.').pop();
      if (ext == filename) return '';
      return ext;
    }

    return (
      <div className={`${props.isView ? 'shown' : 'hidden'}`}>
        <TableBootstrap
          id='_id'
          data={props.data}
          totalSize={props.totalSize}
          isHideForm={props.hideAddSegmentMapping}
          setHideForm={props.setHideAddSegmentMapping}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'countryName',
              text: 'Country Name',
              headerClasses: 'textHeader3',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  countryName = filter;
                },
              }),
            },
            {
              dataField: 'labId',
              text: 'Lab ID',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  labId = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
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
                  <Form.Input
                    placeholder={row.labId}
                    type='number'
                    onBlur={labId => {
                      if (row.labId != labId)
                        props.onUpdateFields &&
                          props.onUpdateFields(
                            { labId: Number.parseFloat(labId) },
                            row._id,
                          );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'registrationDate',
              text: 'Registration Date',
              headerClasses: 'textHeader',
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row?.registrationDate !== undefined
                    ? dayjs(row?.registrationDate)
                        .format('DD-MM-YYYY HH:mm:ss')
                        .toString()
                    : ''
                } - `,
              filter: customFilter({
                getFilter: filter => {
                  registrationDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>
                    {dayjs(row.registrationDate).format('DD-MM-YYYY HH:mm:ss')}
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
                  <ModalDateTime
                    {...{
                      visible: true,
                      use12Hours: false,
                      data: row.registrationDate,
                      isSingleDatePicker: true,
                      isDateTimePicker: false,
                    }}
                    onUpdate={registrationDate => {
                      setModalDetails({ visible: false });
                      props.onSingleFieldUpdate &&
                        props.onSingleFieldUpdate(row._id, {
                          registrationDate,
                        });
                    }}
                    onClose={() => {
                      setModalDetails({
                        visible: false,
                      });
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'clientCode',
              text: 'Client Code',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                getFilter: filter => {
                  clientCode = filter;
                },
              }),
            },
            {
              dataField: 'clientName',
              text: 'Client Name',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                getFilter: filter => {
                  clientName = filter;
                },
              }),
            },
            {
              dataField: 'patientName',
              text: 'Patient Name',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                getFilter: filter => {
                  patientName = filter;
                },
              }),
            },
            {
              dataField: 'age',
              text: 'Age',
              headerClasses: 'textHeader5',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                getFilter: filter => {
                  age = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
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
                  <Form.Input
                    placeholder={row.age}
                    type='number'
                    onBlur={age => {
                      if (row.age != age)
                        props.onUpdateFields &&
                          props.onUpdateFields(
                            { age: Number.parseFloat(age) },
                            row._id,
                          );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'ageUnits',
              text: 'Age Units',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                getFilter: filter => {
                  ageUnits = filter;
                },
              }),
            },
            {
              dataField: 'sex',
              text: 'Sex',
              headerClasses: 'textHeader2',
              editable: false,
              headerStyle: {
                fontSize: 0,
              },
              filter: textFilter({
                getFilter: filter => {
                  sex = filter;
                },
              }),
            },
            {
              dataField: 'testName',
              text: 'Test Name',
              headerClasses: 'textHeader2',
              editable: false,
              headerStyle: {
                fontSize: 0,
              },
              filter: textFilter({
                placeholder: 'Test Name',
                getFilter: filter => {
                  testName = filter;
                },
              }),
            },
            {
              dataField: 'testCode',
              text: 'Test Code',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                placeholder: 'Test Code',
                getFilter: filter => {
                  testCode = filter;
                },
              }),
            },
            {
              dataField: 'sample',
              text: 'Sample',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              filter: textFilter({
                getFilter: filter => {
                  sample = filter;
                },
              }),
            },
            {
              dataField: 'dueDate',
              text: 'Due Date',
              headerClasses: 'textHeader',
              // sort: true,
              headerStyle: {
                fontSize: 0,
              },
              // sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row.dueDate !== undefined
                    ? dayjs(row.dueDate)
                        .format('DD-MM-YYYY HH:mm:ss')
                        .toString()
                    : ''
                } - `,
              filter: customFilter({
                getFilter: filter => {
                  dueDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return <>{dayjs(row.dueDate).format('DD-MM-YYYY HH:mm:ss')}</>;
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
                  <ModalDateTime
                    {...{
                      visible: true,
                      use12Hours: false,
                      data: row.dueDate,
                      isSingleDatePicker: true,
                      isDateTimePicker: false,
                    }}
                    onUpdate={dueDate => {
                      setModalDetails({ visible: false });
                      props.onSingleFieldUpdate &&
                        props.onSingleFieldUpdate(row._id, {
                          dueDate,
                        });
                    }}
                    onClose={() => {
                      setModalDetails({
                        visible: false,
                      });
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'reportDate',
              text: 'Report Date',
              headerClasses: 'textHeader',
              headerStyle: {
                fontSize: 0,
              },
              csvFormatter: (cell, row, rowIndex) =>
                `${
                  row.reportDate !== undefined
                    ? dayjs(row.reportDate)
                        .format('DD-MM-YYYY HH:mm:ss')
                        .toString()
                    : ''
                } - `,
              filter: customFilter({
                getFilter: filter => {
                  reportDate = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <DateRangeFilter onFilter={onFilter} column={column} />
              ),
              formatter: (cell, row) => {
                return (
                  <>{dayjs(row.reportDate).format('DD-MM-YYYY HH:mm:ss')}</>
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
                  <ModalDateTime
                    {...{
                      visible: true,
                      use12Hours: false,
                      data: row.reportDate,
                      isSingleDatePicker: true,
                      isDateTimePicker: false,
                    }}
                    onUpdate={reportDate => {
                      setModalDetails({ visible: false });
                      props.onSingleFieldUpdate &&
                        props.onSingleFieldUpdate(row._id, {
                          reportDate,
                        });
                    }}
                    onClose={() => {
                      setModalDetails({
                        visible: false,
                      });
                    }}
                  />
                </>
              ),
            },

            {
              dataField: 'status',
              text: 'Status',
              headerClasses: 'textHeader2',
              sortCaret: (order, column) => sortCaret(order, column),
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
                    value={row?.status}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const status = e.target.value;
                      props.onUpdateFields &&
                        props.onUpdateFields({ status }, row._id);
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(props.extraData.lookupItems, 'STATUS').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'pdfReport',
              text: 'PDF Report',
              headerClasses: 'textHeader3',
              csvFormatter: (cell, row, rowIndex) =>
                `${row.pdfReport !== undefined ? row.pdfReport : ''}`,
              formatter: (cell, row) => {
                return (
                  <>
                    {row.pdfReport && !_.isEmpty(getExt(row.pdfReport)) && (
                      <div className='flex flex-row gap-2'>
                        <Tooltip tooltipText='View'>
                          <Icons.IconContext
                            color='#ffffff'
                            size='25'
                            style={{
                              backgroundColor: '#00FF00',
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              align: 'center',
                              padding: 4,
                            }}
                            onClick={async () => {
                              window.open(row?.pdfReport, '_blank');
                            }}
                          >
                            {Icons.getIconTag(Icons.IconGr.GrView)}
                          </Icons.IconContext>
                        </Tooltip>

                        <SocialIcon
                          network='email'
                          style={{ height: 32, width: 32 }}
                          onClick={async () => {
                            sharePdfLink(
                              'mailto:?subject=Pdf%20Report&body= ',
                              row.pdfReport,
                            );
                          }}
                        />
                        <SocialIcon
                          network='whatsapp'
                          style={{ height: 32, width: 32 }}
                          onClick={() => {
                            sharePdfLink(
                              'https://api.whatsapp.com/send?text=Pdf%20report%20link:',
                              row.pdfReport,
                            );
                          }}
                        />
                      </div>
                    )}
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
                  <ModalImportFile
                    accept='.pdf'
                    {...{
                      show: true,
                      title: 'Upload pdf file!',
                      btnLabel: 'Upload',
                    }}
                    click={(pdfReport: any) => {
                      setModalImportFile({ show: false });
                      props.onPdfFileUpload &&
                        props.onPdfFileUpload({ pdfReport }, row._id);
                    }}
                    close={() => {
                      setModalImportFile({ show: false });
                    }}
                  />
                </>
              ),
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              editable: false,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Company Code',
                getFilter: filter => {
                  companyCode = filter;
                },
              }),
              headerClasses: 'textHeader2',
              // editorRenderer: (
              //   editorProps,
              //   value,
              //   row,
              //   column,
              //   rowIndex,
              //   columnIndex,
              // ) => (
              //   <>
              //     <AutoCompleteCompanyList
              //       isLabel={false}
              //       hasError={false}
              //       onSelect={companyCode => {
              //         props.onUpdateItem &&
              //           props.onUpdateItem(
              //             companyCode,
              //             column.dataField,
              //             row._id,
              //           );
              //       }}
              //     />
              //   </>
              // ),
            },
            {
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader2',
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              editable: false,
              sortCaret: (order, column) => sortCaret(order, column),
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                placeholder: 'Environment',
                getFilter: filter => {
                  environment = filter;
                },
              }),
              // editorRenderer: (
              //   editorProps,
              //   value,
              //   row,
              //   column,
              //   rowIndex,
              //   columnIndex,
              // ) => (
              //   <>
              //     <select
              //       value={row.environment}
              //       className='leading-4 p-2 focus:ring-indigo-500 ocus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 rounded-md'
              //       onChange={e => {
              //         const environment = e.target.value;
              //         props.onUpdateItem &&
              //           props.onUpdateItem(environment, column.dataField, row._id);
              //       }}
              //     >
              //       <option selected>Select</option>
              //       {lookupItems(props.extraData.lookupItems, 'ENVIRONMENT').map(
              //         (item: any, index: number) => (
              //           <option key={index} value={item.code}>
              //             {lookupValue(item)}
              //           </option>
              //         ),
              //       )}
              //     </select>
              //   </>
              // ),
            },
            {
              dataField: 'operation',
              text: 'Action',
              editable: false,
              csvExport: false,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    <Tooltip tooltipText='Delete'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() => {
                          props.onDelete &&
                            props.onDelete({
                              type: 'delete',
                              show: true,
                              id: [row._id],
                              title: 'Are you sure?',
                              body: 'Do you want to delete selected record?',
                            });
                        }}
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
          isDelete={props.isDelete}
          isEditModify={props.isUpdate}
          isExport={props.isExport}
          isSelectRow={true}
          fileName='Client Registration'
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
            countryName('');
            labId('');
            registrationDate('');
            clientCode('');
            clientName('');
            patientName('');
            age('');
            ageUnits('');
            sex('');
            testName('');
            testCode('');
            sample('');
            dueDate('');
            reportDate('');
            companyCode('');
            environment('');
          }}
          dynamicStylingFields={[]}
          hideExcelSheet={['operation', '_id', 'pdfReport']}
        />
        <ModalImportFile
          accept='.pdf'
          {...modalImportFile}
          click={(file: any) => {
            setModalImportFile({ show: false });
            console.log({ file });
          }}
          close={() => {
            setModalImportFile({ show: false });
          }}
        />
      </div>
    );
  },
);
