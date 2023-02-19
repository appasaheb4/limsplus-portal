import React from 'react';
import {observer} from 'mobx-react';
import {
  NumberFilter,
  textFilter,
  customFilter,
  Form,
  TableBootstrap,
  Tooltip,
  Icons,
  Buttons,
  Svg,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {resizeFile, compressString} from '@/library/utils';
interface ReportBodyListProps {
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

export const ReportBodyList = observer((props: ReportBodyListProps) => {
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
              dataField: 'reportCode',
              text: 'Report Code',
              sort: true,
              editable: false,
            },
            {
              dataField: 'reportName',
              text: 'Report Name',
              sort: true,
              editable: false,
            },
            {
              dataField: 'general',
              text: 'General',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <span>
                      {row?.general ? JSON.stringify(row?.general) : ''}
                    </span>
                  </>
                );
              },
            },
            {
              dataField: 'panel',
              text: 'Panel',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row?.panel ? JSON.stringify(row?.panel) : ''}</span>
                  </>
                );
              },
            },
            {
              dataField: 'test',
              text: 'Test',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <span>{row?.test ? JSON.stringify(row?.test) : ''}</span>
                  </>
                );
              },
            },
            {
              dataField: 'analyte',
              text: 'Analyte',
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <span>
                      {row?.analyte ? JSON.stringify(row?.analyte) : ''}
                    </span>
                  </>
                );
              },
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
                    <Tooltip tooltipText='Preview'>
                      <Icons.IconContext
                        color='#fff'
                        size='20'
                        onClick={() =>
                          props.onPdfPreview && props.onPdfPreview(row)
                        }
                      >
                        {Icons.getIconTag(Icons.IconIm.ImFilePdf)}
                      </Icons.IconContext>
                    </Tooltip>
                    <Tooltip tooltipText='Delete'>
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
          fileName='Page Branding'
          onSelectedRow={rows => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id));
          }}
          // onUpdateItem={(value: any, dataField: string, id: string) => {
          //   props.onUpdateItem &&
          //     props.onUpdateItem({'header.title': value}, id);
          // }}
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size);
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size);
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
});
