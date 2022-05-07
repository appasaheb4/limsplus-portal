/* eslint-disable */
import React from 'react';
import {observer} from 'mobx-react';
import {
  NumberFilter,
  Icons,
  Tooltip,
  customFilter,
  textFilter,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {PatientOrderExpand} from './patient-order-expand';

// import { NumberFilter } from "@/library/components/Organisms"

interface PatientOrderListProps {
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
let visitId;
let orderId;
let panelCode;
export const PatientOrderList = observer((props: PatientOrderListProps) => {
  const editorCell = (row: any) => {
    return row.status !== 'I' ? true : false;
  };
  return (
    <>
      <div style={{position: 'relative'}}>
        <PatientOrderExpand
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
              // csvFormatter: (cell, row,rowIndex) => (
              //   <>
              //     <span>appa{cell}</span>
              //     <span>{JSON.stringify(row)}</span>
              //     {row.packageList.map((item) => (
              //       <span>{item.panelCode}</span>
              //     ))}
              //   </>
              // ),
              filterRenderer: (onFilter, column) => (
                <NumberFilter onFilter={onFilter} column={column} />
              ),
            },
            {
              dataField: 'visitId',
              text: 'Visit Id',
              headerClasses: 'textHeader4 z-10',
              sort: true,
              filter: customFilter({
                getFilter: filter => {
                  visitId = filter;
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
            {
              dataField: 'panelCode',
              text: 'Panel Code',
              headerClasses: 'textHeader4 z-10',
              sort: true,
              csvFormatter: (cell, row, rowIndex) =>
                `${row.panelCode.map(item => item.panelCode)}`,
              filter: textFilter({
                getFilter: filter => {
                  panelCode = filter;
                },
              }),
              formatter: (cellContent, row) => (
                <>
                  <ul style={{listStyle: 'inside'}}>
                    {row.panelCode.map((item, index) => (
                      <li key={index}>{item.panelCode}</li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              dataField: 'packageList',
              text: 'packageList',
              csvExport: false,
              hidden: true,
            },
            {
              dataField: 'opration',
              text: 'Action',
              headerClasses: 'z-10',
              csvExport: false,
              hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    <Tooltip tooltipText='Delete'>
                      <Icons.IconContext
                        color='#000'
                        size='20'
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: 'delete',
                            show: true,
                            id: [row._id],
                            title: 'Are you sure?',
                            body: `Delete item`,
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                      </Icons.IconContext>
                    </Tooltip>
                  </div>
                </>
              ),
            },
          ]}
          isEditModify={false}
          isSelectRow={true}
          fileName='PatientOrder'
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
            visitId('');
            orderId('');
            panelCode('');
          }}
        />
      </div>
    </>
  );
});
