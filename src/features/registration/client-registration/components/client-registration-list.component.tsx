import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import {
  TableBootstrap,
  textFilter,
  Form,
  Tooltip,
  Icons,
  ModalConfirm,
  Toast,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {useStores} from '@/stores';

let dataFlowFrom;
let data_type;
let equipmentType;
let segments;
let field_no;
let item_no;
let element_name;
let transmitted_data;
let field_array;
let field_length;
let field_type;
let lims_descriptions;
let lims_tables;
let lims_fields;
let notes;
let environment;

interface ClientRegistrationListProps {
  data: any;
  extraData: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  duplicate: (item: any) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

export const ClientRegistrationList = observer(
  (props: ClientRegistrationListProps) => {
    const [modalConfirm, setModalConfirm] = useState<any>();
    const {segmentMappingStore} = useStores();

    useEffect(() => {
      segmentMappingStore.fetchListSegmentMapping();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <>
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
              dataField: 'countryName',
              text: 'Country Name',
              headerClasses: 'textHeader3',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  field_no = filter;
                },
              }),
            },
            {
              dataField: 'labId',
              text: 'Lab Id',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              filter: textFilter({
                getFilter: filter => {
                  item_no = filter;
                },
              }),
            },
            {
              dataField: 'registrationDate',
              text: 'Registration Date',
              headerClasses: 'textHeader2',
            },
            {
              dataField: 'clientCode',
              text: 'Client Code',
              headerClasses: 'textHeader2',
              sort: true,
              filter: textFilter({
                getFilter: filter => {
                  element_name = filter;
                },
              }),
            },
            {
              dataField: 'clientName',
              text: 'Client Name',
              headerClasses: 'textHeader2',
              sort: true,
            },
            {
              dataField: 'patientName',
              text: 'Patient Name',
              headerClasses: 'textHeader2',
              sort: true,
            },
            {
              dataField: 'age',
              text: 'Age',
              headerClasses: 'textHeader2',
              sort: true,
              filter: textFilter({
                getFilter: filter => {
                  field_length = filter;
                },
              }),
            },
            {
              dataField: 'ageUnits',
              text: 'Age Units',
              headerClasses: 'textHeader2',
              sort: true,
            },
            {
              dataField: 'sex',
              text: 'Sex',
              headerClasses: 'textHeader2',
              editable: false,
            },
            {
              dataField: 'testName',
              text: 'Test Name',
              headerClasses: 'textHeader2',
              editable: false,
            },
            {
              dataField: 'testCode',
              text: 'Test Code',
              headerClasses: 'textHeader2',
              sort: true,
            },
            {
              dataField: 'sample',
              text: 'Sample',
              headerClasses: 'textHeader2',
              sort: true,
            },
            {
              dataField: 'dueDate',
              text: 'Due Date',
              headerClasses: 'textHeader2',
              sort: true,
            },
            {
              dataField: 'reportDate',
              text: 'Report Date',
              headerClasses: 'textHeader2',
            },
            {
              dataField: 'status',
              text: 'Status',
              headerClasses: 'textHeader2',
              sort: true,
            },
            {
              dataField: 'pdfReport',
              text: 'Pdf Report',
              headerClasses: 'textHeader3',
              csvExport: false,
              csvFormatter: (cell, row, rowIndex) =>
                `${row.attachments !== undefined ? row.attachments : ''}`,
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
                        color='#fff'
                        size='20'
                        onClick={() => {
                          segmentMappingStore.updateSelectedItem([]);
                          segmentMappingStore.updateSelectedItem([row]);
                          if (segmentMappingStore.selectedItems) {
                            if (segmentMappingStore.selectedItems.length > 0) {
                              setModalConfirm({
                                type: 'delete',
                                show: true,
                                title: 'Are you sure delete recoard? ',
                                body: 'Delete selected items!',
                              });
                            }
                          } else {
                            alert('Please select any item.');
                          }
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
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName='Data Mapping'
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
            equipmentType('');
            dataFlowFrom('');
            data_type('');
            segments('');
            field_no('');
            item_no('');
            element_name('');
            transmitted_data('');
            field_array('');
            field_length('');
            field_type('');
            lims_descriptions('');
            lims_tables('');
            lims_fields('');
            notes('');
            environment('');
          }}
        />
      </>
    );
  },
);
