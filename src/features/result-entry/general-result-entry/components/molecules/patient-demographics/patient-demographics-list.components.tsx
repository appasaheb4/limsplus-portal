import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Form } from '@/library/components';
import { Confirm } from '@/library/models';
import dayjs from 'dayjs';

import { TableBootstrap } from './table-bootstrap.components';

interface PatientDemographicsListProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onUpdate?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
  onReport?: (item: any) => void;
}

export const PatientDemographicsList = observer(
  (props: PatientDemographicsListProps) => {
    const [selectedItem, setSelectedItem] = useState<any>({});
    return (
      <>
        <div style={{ position: 'relative' }}>
          <TableBootstrap
            id='_id'
            data={props.data}
            totalSize={props.totalSize}
            selectedItem={selectedItem}
            columns={[
              {
                dataField: '_id',
                text: 'Id',
                hidden: true,
                csvExport: false,
              },
              {
                dataField: 'pId',
                text: 'Pid',
                sort: true,
                editable: false,
              },
              {
                dataField: 'name',
                text: 'Name',
                sort: true,
                editable: false,
                headerClasses: 'textHeaderm',
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minWidth: 0,
                  maxWidth: '130px',
                  position: 'relative',
                },
                formatter: (cellContent, row) => (
                  <span title={row.name}>{cellContent}</span>
                ),
              },
              {
                dataField: 'age',
                text: 'Age',
                sort: true,
                editable: false,
              },
              {
                dataField: 'sex',
                text: 'Sex',
                sort: true,
                editable: false,
              },
              {
                dataField: 'dob',
                text: 'DOB',
                sort: true,
                editable: false,
                headerClasses: 'textHeaderm',
                formatter: (cell, row) => {
                  return row.dob && dayjs(row.dob).format('DD-MM-YYYY');
                },
              },
              {
                dataField: 'patientMobileNo',
                text: 'patientMobileNo',
                sort: true,
                editable: false,
              },
              {
                dataField: 'doctorId',
                text: 'Doctor Id',
                sort: true,
                editable: false,
              },
              {
                dataField: 'doctorMobileNo',
                text: 'Doctor Mobile No',
                sort: true,
                editable: false,
              },
              {
                dataField: 'registrationLocation',
                text: 'Registration Location',
                sort: true,
                editable: false,
                headerClasses: 'textHeaderl',
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minWidth: 0,
                  maxWidth: '190px',
                  position: 'relative',
                },
                formatter: (cellContent, row) => {
                  return (
                    <span title={row.registrationLocation}>{cellContent}</span>
                  );
                },
              },
              {
                dataField: 'contactNo',
                text: 'Contact Number',
                sort: true,
                editable: false,
              },
              {
                dataField: 'history',
                text: 'History',
                sort: true,
                csvFormatter: (col, row) =>
                  `${row.history ? (row.history ? 'Yes' : 'No') : 'No'}`,
                editable: false,
                formatter: (cell, row) => {
                  return (
                    <>
                      {' '}
                      <Form.Toggle disabled={true} value={row.history} />
                    </>
                  );
                },
              },
              {
                text: 'Company Code',
                dataField: 'companyCode',
                sort: true,
                editable: false,
              },
              {
                text: 'Environment',
                dataField: 'environment',
                editable: false,
                sort: true,
              },
            ]}
            isEditModify={props.isEditModify}
            isSelectRow={true}
            fileName='Pending Panel Approval'
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
            clearAllFilter={() => {}}
            onClickRow={(item, index) => {
              setSelectedItem(item);
              props.onClickRow && props.onClickRow(item, index);
            }}
          />
        </div>
      </>
    );
  },
);
