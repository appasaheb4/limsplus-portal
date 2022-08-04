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
} from '@/library/components';
import {Confirm} from '@/library/models';
import dayjs from 'dayjs';

interface TemplateSettingsProps {
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
  onPdfPreview?: (selectedItem: any) => void;
}

let sectionSetting;
let version;
let environment;

export const TemplateSettingsList = observer((props: TemplateSettingsProps) => {
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
              dataField: 'tempCode',
              text: 'Template Code',
              headerClasses: 'textHeader',
              sort: true,
              editable: false,
            },
            {
              dataField: 'tempName',
              text: 'Template Name',
              headerClasses: 'textHeader',
              sort: true,
              editable: false,
            },
            {
              dataField: 'isToolbar',
              text: 'Show tool bar',
              sort: true,
              csvFormatter: (col, row) =>
                `${row.isToolbar ? (row.isToolbar ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      disabled={true}
                      value={row.isToolbar}
                      onChange={isToolbar => {
                        props.onUpdateItem &&
                          props.onUpdateItem(isToolbar, 'isToolbar', row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'pageSize',
              text: 'Page Size',
              sort: true,
              editable: false,
            },
            {
              dataField: 'mainBoxCSS',
              text: 'Main Box Css',
              headerClasses: 'textHeader4',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.mainBoxCSS && (
                      <Form.MultilineInput
                        label=''
                        style={{color: '#ffffff', backgroundColor: '#000000'}}
                        disabled={true}
                        value={row?.mainBoxCSS}
                      />
                    )}
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
                    <Tooltip tooltipText='Preview' position='bottom'>
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
                    <Tooltip tooltipText='Delete' position='bottom'>
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
              headerClasses: 'sticky right-0  bg-gray-500 text-white',
              classes: (cell, row, rowIndex, colIndex) => {
                return 'sticky right-0 bg-gray-500';
              },
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName='Template_Settings'
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
            sectionSetting('');
            version('');
            environment('');
          }}
        />
      </div>
    </>
  );
});
