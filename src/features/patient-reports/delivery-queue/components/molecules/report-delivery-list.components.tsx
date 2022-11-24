import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {Tooltip, Icons} from '@/library/components';
import dayjs from 'dayjs';
import {TableBootstrap} from './table-bootstrap.components';

interface ReportDeliveryProps {
  data: any;
  totalSize: number;
  isDelete?: boolean;
  isEditModify?: boolean;
  onUpdate?: (selectedItem: any) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onUpdateDeliveryStatus?: () => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
  onClickRow?: (item: any, index: number) => void;
}

export const ReportDeliveryList = observer((props: ReportDeliveryProps) => {
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
              dataField: 'externalLabId',
              text: 'External Lab Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'employeeCode',
              text: 'Employee Code',
              sort: true,
              editable: false,
            },
            {
              dataField: 'deliveryId',
              text: 'Delivery Id',
              sort: true,
              editable: false,
            },
            {
              dataField: 'deliveryDate',
              text: 'Delivery Date',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row.deliveryDate
                      ? dayjs(row.deliveryDate).format('YYYY-MM-DD')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'reportDate',
              text: 'Report Date',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row.reportDate
                      ? dayjs(row.reportDate).format('YYYY-MM-DD')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'deliveryStatus',
              text: 'Delivery Status',
              sort: true,
              editable: false,
            },
            {
              dataField: 'reportType',
              text: 'Report Type',
              sort: true,
              editable: false,
            },
            {
              dataField: 'deliveryMode',
              text: 'Delivery Mode',
              sort: true,
              editable: false,
            },
            {
              dataField: 'destination',
              text: 'Destination',
              sort: true,
              editable: false,
            },
            {
              dataField: 'comments',
              text: 'Comments',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'startDate',
              text: 'Start Date',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row.startDate
                      ? dayjs(row.startDate).format('YYYY-MM-DD')
                      : ''}
                  </>
                );
              },
            },
            {
              dataField: 'endDate',
              text: 'End Date',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row.endDate ? dayjs(row.endDate).format('YYYY-MM-DD') : ''}
                  </>
                );
              },
            },
            {
              dataField: 'errorMsg',
              text: 'Error Msg',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'clientCode',
              text: 'Client Code',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'clientName',
              text: 'Client Name',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'registrationLocation',
              text: 'Registration Location',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'registrationLocationCode',
              text: 'Registration Location Code',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'doctorCode',
              text: 'Doctor Code',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'doctorName',
              text: 'Doctor Name',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'qrCode',
              text: 'Qr Code',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'pdf',
              text: 'PDF',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'enteredBy',
              text: 'Entered By',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
            },
            {
              dataField: 'userComments',
              text: 'User Comments',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
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
                    <Tooltip tooltipText='Cancel' position='bottom'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() =>
                          props.onUpdate &&
                          props.onUpdate({
                            type: 'cancel',
                            visitId: row?.visitId,
                            show: true,
                            id: row._id,
                            title: 'Are you sure?',
                            body: 'Cancel item',
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.IconGi.GiCancel)}
                      </Icons.IconContext>
                    </Tooltip>
                    <Tooltip tooltipText='Hold' position='bottom'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() =>
                          props.onUpdate &&
                          props.onUpdate({
                            type: 'hold',
                            visitId: row?.visitId,
                            show: true,
                            id: row._id,
                            title: 'Are you sure?',
                            body: 'Hold item',
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.Iconmd.MdBackHand)}
                      </Icons.IconContext>
                    </Tooltip>
                    <Tooltip tooltipText='Delivery Status'>
                      <Icons.IconContext
                        color='#ffffff'
                        size='20'
                        onClick={() =>
                          props.onUpdate &&
                          props.onUpdate({
                            type: 'generatePdf',
                            visitId: row?.visitId,
                            show: true,
                            id: row._id,
                            title: 'Are you sure?',
                            body: 'Generate pdf status update',
                          })
                        }
                      >
                        {Icons.getIconTag(Icons.IconTb.TbExchange)}
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
          fileName='Report Delivery'
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
          onUpdateDeliveryStatus={() => {
            props.onUpdateDeliveryStatus && props.onUpdateDeliveryStatus();
          }}
        />
      </div>
    </>
  );
});
