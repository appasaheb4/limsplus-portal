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

interface PageBrandingProps {
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

export const PageBrandingList = observer((props: PageBrandingProps) => {
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
              sort: true,
              editable: false,
            },
            {
              dataField: 'isHeader',
              text: 'Header Visible',
              csvFormatter: (col, row) =>
                `${row.isHeader ? (row.isHeader ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.isHeader}
                      onChange={isHeader => {
                        props.onUpdateItem &&
                          props.onUpdateItem({isHeader}, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'header.title',
              text: 'Header Title',
              sort: true,
              editable: false,
            },
            {
              dataField: 'header.titleCSS',
              text: 'Header Title CSS',
              sort: true,
              editable: false,
            },
            {
              dataField: 'header.logo',
              text: 'Header Logo',
              sort: true,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.header?.logo}
                      alt='logo'
                      className='object-fill h-35 w-40 rounded-md'
                    />
                  </>
                );
              },
            },
            {
              dataField: 'header.logoCSS',
              text: 'Header Logo CSS',
              sort: true,
              editable: false,
            },
            {
              dataField: 'header.mainBoxCSS',
              text: 'Header Main Box CSS',
              sort: true,
              editable: false,
            },
            {
              dataField: 'isSubHeader',
              text: 'Sub Header Visible',
              csvFormatter: (col, row) =>
                `${row.isSubHeader ? (row.isSubHeader ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.isSubHeader}
                      onChange={isSubHeader => {
                        props.onUpdateItem &&
                          props.onUpdateItem({isSubHeader}, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'subHeader.title',
              text: 'Sub Header Title',
              sort: true,
              editable: false,
            },
            {
              dataField: 'subHeader.titleCSS',
              text: 'Sub Header Title CSS',
              sort: true,
              editable: false,
            },
            {
              dataField: 'subHeader.subTitle',
              text: 'Sub Header Sub Title',
              sort: true,
              editable: false,
            },
            {
              dataField: 'subHeader.subTitleCSS',
              text: 'Sub Header Sub Title CSS',
              sort: true,
              editable: false,
            },
            {
              dataField: 'subHeader.mainBoxCSS',
              text: 'Sub Header Main Box CSS',
              sort: true,
              editable: false,
            },
            {
              dataField: 'isFooter',
              text: 'Footer Visible',
              csvFormatter: (col, row) =>
                `${row.isFooter ? (row.isFooter ? 'Yes' : 'No') : 'No'}`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.isFooter}
                      onChange={isFooter => {
                        props.onUpdateItem &&
                          props.onUpdateItem({isFooter}, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'footer.title',
              text: 'Footer Title',
              sort: true,
              editable: false,
            },
            {
              dataField: 'footer.titleCSS',
              text: 'Footer Title CSS',
              sort: true,
              editable: false,
            },
            {
              dataField: 'footer.subTitle',
              text: 'Footer Sub Title',
              sort: true,
              editable: false,
            },
            {
              dataField: 'footer.subTitleCSS',
              text: 'Footer Sub Title CSS',
              sort: true,
              editable: false,
            },
            {
              dataField: 'footer.mainBoxCSS',
              text: 'Footer Main Box CSS',
              sort: true,
              editable: false,
            },
            {
              dataField: 'isPdfPageNumber',
              text: 'Page Number Visible',
              csvFormatter: (col, row) =>
                `${
                  row.isPdfPageNumber
                    ? row.isPdfPageNumber
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.isPdfPageNumber}
                      onChange={isPdfPageNumber => {
                        props.onUpdateItem &&
                          props.onUpdateItem({isPdfPageNumber}, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'pageNumber.pageNumberCSS',
              text: 'Page Number CSS',
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
