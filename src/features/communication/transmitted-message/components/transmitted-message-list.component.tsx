import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  TableBootstrap,
  sortCaret,
  textFilter,
  Form,
  Tooltip,
  Icons,
} from '@/library/components';
import {Confirm} from '@/library/models';

interface TransmittedMessageListProps {
  data: any;
  extraData: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItems?: (value: any, id: string) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  getTestDetails?: (lab: string) => void;
  getAnalyteDetails?: (testCode: string) => void;
}

let instType;
let instId;
let protocol;
let segmentMessage;
let segmentOrder;
let segmentArray;
let status;

export const TransmittedMessageList = observer(
  ({
    extraData,
    onUpdateItems,
    getTestDetails,
    getAnalyteDetails,
    ...props
  }: TransmittedMessageListProps) => {
    const [pLabDetails, setPLabDetails] = useState<any>();

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
              dataField: 'instType',
              text: 'Inst Type',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  instType = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'instId',
              text: 'Inst Id',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  instId = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'protocol',
              text: 'Protocol',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  protocol = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'segmentMessage',
              text: 'Segment Message',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  segmentMessage = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'segmentOrder',
              text: 'Segment Order',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  segmentOrder = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
            {
              dataField: 'segmentArray',
              text: 'Segment Array',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  segmentArray = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
              formatter: (cell, row) => {
                return (
                  <>
                    {row.segmentArray?.map((item, index) => (
                      <>
                        <h6>{item[1]?.filed}</h6>
                        <h6>{item[1]?.field_no}</h6>
                        <h6>{item[1]?.value}</h6>
                      </>
                    ))}
                  </>
                );
              },
            },
            {
              dataField: 'status',
              text: 'Status',
              headerClasses: 'textHeader',
              filter: textFilter({
                getFilter: filter => {
                  status = filter;
                },
              }),
              sort: true,
              headerStyle: {
                fontSize: 0,
              },
              sortCaret: (order, column) => sortCaret(order, column),
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={false}
          isDelete={props.isDelete}
          fileName='Transmitted Message'
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
            instType('');
            instId('');
            protocol('');
            segmentMessage('');
            segmentOrder('');
            segmentArray('');
            status('');
          }}
        />
      </>
    );
  },
);
