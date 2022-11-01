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
import {resizeFile, compressString} from '@/library/utils';

interface TemplatePatientResultProps {
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

export const TemplatePatientResultList = observer(
  (props: TemplatePatientResultProps) => {
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
                dataField: 'reportTemplateType',
                text: 'Report Template Type',
                headerClasses: 'textHeader',
                sort: true,
                editable: false,
              },
              {
                dataField: 'pageBranding',
                text: 'Page Branding',
                headerClasses: 'textHeader',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return <>{row?.pageBranding?.tempCode}</>;
                },
              },
              {
                dataField: 'templateCode',
                text: 'Template code',
                headerClasses: 'textHeader',
                sort: true,
                editable: false,
              },
              {
                dataField: 'templateTitle',
                text: 'Template title',
                headerClasses: 'textHeader',
                sort: true,
                editable: false,
              },
              {
                dataField: 'endOfPage',
                text: 'End Of Page',
                headerClasses: 'textHeader',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return (
                    <>
                      {row?.endOfPage?.map(item => (
                        <p>{` ${item?.details}`}</p>
                      ))}
                    </>
                  );
                },
              },
              {
                dataField: 'endOfReport',
                text: 'End Of Report',
                headerClasses: 'textHeader',
                sort: true,
                editable: false,
                formatter: (cell, row) => {
                  return (
                    <>
                      {row?.endOfReport?.map(item => (
                        <p>{` ${item?.details}`}</p>
                      ))}
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
            fileName='Template_Settings'
            onSelectedRow={rows => {
              props.onSelectedRow &&
                props.onSelectedRow(rows.map((item: any) => item._id));
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
