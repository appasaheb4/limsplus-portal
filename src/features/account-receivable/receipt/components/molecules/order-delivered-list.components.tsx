import React from 'react';
import {observer} from 'mobx-react';
import {
  NumberFilter,
  textFilter,
  customFilter,
  Form,
  Tooltip,
  Icons,
} from '@/library/components';
import {Confirm} from '@/library/models';
import dayjs from 'dayjs';
import {TableBootstrap} from './table-bootstrap.components';

interface OrderDeliveredProps {
  data: any;
  totalSize: number;
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

export const OrderDeliveredList = observer((props: OrderDeliveredProps) => {
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
              dataField: 'deliveryId',
              text: 'Delivery Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'labId',
              text: 'Lab Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'orderId',
              text: 'Order Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'panelCode',
              text: 'Panel Code',
              sort: true,
              editable: false,
            },
            {
              dataField: 'panelName',
              text: 'Panel Name',
              sort: true,
              editable: false,
            },
            {
              dataField: 'testCode',
              text: 'Test Code',
              sort: true,
              editable: false,
            },
            {
              dataField: 'testName',
              text: 'Test Name',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'analyteCode',
              text: 'Analyte Code',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'analyteName',
              text: 'Analyte Name',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'rep',
              text: 'Rep',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'delivered',
              text: 'Delivered',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.delivered ? (row.delivered ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle disabled={true} value={row.delivered} />
                  </>
                );
              },
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName='Order Delivered'
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
        />
      </div>
    </>
  );
});
