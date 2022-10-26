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

interface GeneralSettingsProps {
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

let sectionSetting;
let version;
let environment;

export const GeneralSettingsList = observer((props: GeneralSettingsProps) => {
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
              dataField: 'reportSection.section',
              text: 'Section',
              headerClasses: 'textHeader4',
              // filter: textFilter({
              //   getFilter: filter => {
              //     sectionSetting = filter;
              //   },
              // }),
              sort: true,
              editable: false,
            },
            {
              dataField: 'sectionSetting.tempCode',
              text: 'Section Id',
              headerClasses: 'textHeader4',
              // filter: textFilter({
              //   getFilter: filter => {
              //     sectionSetting = filter;
              //   },
              // }),
              sort: true,
              editable: false,
            },
            {
              dataField: 'pageSetting.tempCode',
              text: 'Page Id',
              headerClasses: 'textHeader4',
              // filter: textFilter({
              //   getFilter: filter => {
              //     sectionSetting = filter;
              //   },
              // }),
              sort: true,
              editable: false,
            },
            {
              dataField: 'version',
              text: 'Version',
              headerClasses: 'textHeader5',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
              // filter: customFilter({
              //   getFilter: filter => {
              //     version = filter;
              //   },
              // }),
              // filterRenderer: (onFilter, column) => (
              //   <NumberFilter onFilter={onFilter} column={column} />
              // ),
            },
            {
              dataField: 'environment',
              text: 'Environment',
              headerClasses: 'textHeader5',
              sort: true,
              csvFormatter: col => (col ? col : ''),
              editable: false,
              // filter: textFilter({
              //   getFilter: filter => {
              //     environment = filter;
              //   },
              // }),
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
                    <Tooltip tooltipText='Delete' position='top'>
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
          fileName='General_Settings'
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
