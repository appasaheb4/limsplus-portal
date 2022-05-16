/* eslint-disable */
import React from 'react';
import {observer} from 'mobx-react';
import {NumberFilter, Form, customFilter} from '@/library/components';
import {Confirm} from '@/library/models';
import TableBootstrap from './table-bootstrap.component';

// import { NumberFilter } from "@/library/components/Organisms"

interface PatientSampleProps {
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

let labId;
export const PatientSampleList = observer((props: PatientSampleProps) => {
  const editorCell = (row: any) => {
    return false; //row.status !== "I" ? true : false
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
              dataField: 'labId',
              text: 'Lab Id',
              headerClasses: 'textHeader3',
              sort: true,
              filter: customFilter({
                getFilter: filter => {
                  labId = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: 'specimenId',
              text: 'Specimen Id',
              headerClasses: 'textHeader4',
              sort: true,
              filter: customFilter({
                getFilter: filter => {
                  labId = filter;
                },
              }),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
              editable: false,
            },
            {
              dataField: 'labLit',
              text: 'Lab Lit',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'outSourceLab',
              text: 'Out Source Lab',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'outSourceStatus',
              text: 'Out Source Status',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'containerId',
              text: 'Container Id',
              headerClasses: 'textHeader3',
              sort: true,
              editable: false,
            },
            {
              dataField: 'sampleType',
              text: 'Sample Type',
              headerClasses: 'textHeader3',
              sort: true,
              editable: false,
            },
            {
              dataField: 'testList',
              text: 'Test List',
              headerClasses: 'textHeader3',
              sort: true,
              editable: false,
            },
            {
              dataField: 'departmentList',
              text: 'Department List',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'receivedDate',
              text: 'Received Date',
              headerClasses: 'textHeader3',
              sort: true,
              editable: false,
            },
            {
              dataField: 'collectionDate',
              text: 'Collection Date',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'methodCollection',
              text: 'Method Collection',
              headerClasses: 'textHeader6',
              sort: true,
              editable: false,
            },
            {
              dataField: 'dateCollection',
              text: 'Date Collection',
              headerClasses: 'textHeader6',
              sort: true,
              editable: false,
            },
            {
              dataField: 'primaryContainer',
              text: 'Primary Container',
              headerClasses: 'textHeader6',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.primaryContainer}
                      onChange={primaryContainer => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            primaryContainer,
                            'primaryContainer',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'aliquot',
              text: 'Aliquot',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.aliquot}
                      onChange={aliquot => {
                        props.onUpdateItem &&
                          props.onUpdateItem(aliquot, 'aliquot', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'uniqueContainer',
              text: 'Unique Container',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.uniqueContainer}
                      onChange={uniqueContainer => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            uniqueContainer,
                            'uniqueContainer',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'labSpecific',
              text: 'Lab Specific',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.labSpecific}
                      onChange={labSpecific => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            labSpecific,
                            'labSpecific',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'departmentSpecific',
              text: 'Department Specific',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.departmentSpecific}
                      onChange={departmentSpecific => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            departmentSpecific,
                            'departmentSpecific',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'sharedSample',
              text: 'Shared Sample',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.sharedSample}
                      onChange={sharedSample => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            sharedSample,
                            'sharedSample',
                            row._id,
                          );
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'labelInstructions',
              text: 'Label Instructions',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'status',
              text: 'Status',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
            {
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName='PatientSample'
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
            labId('');
          }}
        />
      </div>
    </>
  );
});
