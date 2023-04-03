import React, {useState} from 'react';
import {observer} from 'mobx-react';


import {Confirm} from '@/library/models';
import dayjs from 'dayjs';

import {TableBootstrap} from './table-bootstrap.components';

interface PendingPanelApprovalListProps {
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

export const PendingPanelApprovalList = observer(
  (props: PendingPanelApprovalListProps) => {
    const [selectedItem, setSelectedItem] = useState<any>({});
    return (
      <>
        <div style={{position: 'relative'}}>
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
                dataField: 'labId',
                text: 'Lab Id',
                sort: true,
                editable: false,
              },
              {
                dataField: 'sampleId',
                text: 'Sample Id',
                sort: true,
                editable: false,
              },
              {
                dataField: 'sampleType',
                text: 'Sample Type',
                sort: true,
                editable: false,
              },
              {
                dataField: 'containerId',
                text: 'Container Id',
                sort: true,
                editable: false,
              },
              {
                dataField: 'panel',
                text: 'Panel',
                sort: true,
                editable: false,
                headerClasses: 'textHeaderl',
              },
              {
                dataField: 'dueDate',
                text: 'Due Date',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return row?.dueDate
                    ? dayjs(row.dueDate).format('YYYY-MM-DD')
                    : '';
                },
              },
              {
                dataField: 'status',
                text: 'Status',
                sort: true,
                editable: false,
              },
              {
                dataField: 'comments',
                text: 'Comments',
                sort: true,
                editable: false,
              },
              {
                dataField: 'pLab',
                text: 'PLab',
                sort: true,
                editable: false,
              },
              {
                dataField: 'department',
                text: 'Department',
                sort: true,
                editable: false,
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
