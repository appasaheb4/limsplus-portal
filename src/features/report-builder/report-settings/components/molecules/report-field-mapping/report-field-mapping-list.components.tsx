import React from 'react';
import {observer} from 'mobx-react';
import {TableBootstrap, Tooltip, Icons} from '@/library/components';
import {Confirm} from '@/library/models';

interface ReportFieldMappingProps {
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

export const ReportFieldMappingList = observer(
  (props: ReportFieldMappingProps) => {
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
                text: 'Temp Code',
                headerClasses: 'textHeader',
                sort: true,
                editable: false,
              },
              {
                dataField: 'section.tempCode',
                text: 'Section',
                // filter: textFilter({
                //   getFilter: filter => {
                //     sectionSetting = filter;
                //   },
                // }),
                sort: true,
                editable: false,
              },
              {
                dataField: 'sectionStyle',
                text: 'Section Style',
                // filter: textFilter({
                //   getFilter: filter => {
                //     sectionSetting = filter;
                //   },
                // }),
                sort: true,
                editable: false,
              },
              {
                dataField: 'tableName.subTableName',
                text: 'Table Name',
                // filter: textFilter({
                //   getFilter: filter => {
                //     sectionSetting = filter;
                //   },
                // }),
                sort: true,
                editable: false,
              },
              {
                dataField: 'fieldName',
                text: 'Field Name',
                // filter: textFilter({
                //   getFilter: filter => {
                //     sectionSetting = filter;
                //   },
                // }),
                sort: true,
                editable: false,
              },
              {
                dataField: 'startFromLine',
                text: 'Start From Line',
                // filter: textFilter({
                //   getFilter: filter => {
                //     sectionSetting = filter;
                //   },
                // }),
                sort: true,
                editable: false,
              },
              {
                dataField: 'startFromColumn',
                text: 'Start From Column',
                // filter: textFilter({
                //   getFilter: filter => {
                //     sectionSetting = filter;
                //   },
                // }),
                sort: true,
                editable: false,
              },
              {
                dataField: 'fieldLength',
                text: 'Field Length',
                // filter: textFilter({
                //   getFilter: filter => {
                //     sectionSetting = filter;
                //   },
                // }),
                sort: true,
                editable: false,
              },
              {
                dataField: 'fontId.fontId',
                text: 'Font Id',
                // filter: textFilter({
                //   getFilter: filter => {
                //     sectionSetting = filter;
                //   },
                // }),
                sort: true,
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
            fileName='Page_Settings'
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
  },
);
