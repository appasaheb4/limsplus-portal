import React from 'react';
import {observer} from 'mobx-react';
import {
  Form,
  TableBootstrap,
  Tooltip,
  Icons,
  Buttons,
  Svg,
} from '@/library/components';
import {AutoCompleteLayoutCode} from '../../';
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
              dataField: 'layoutCode',
              text: 'Layout Code',
              headerClasses: 'textHeader',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <AutoCompleteLayoutCode
                    hasError={false}
                    onSelect={item => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          {layoutCode: item.tempCode},
                          row._id,
                        );
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'tempCode',
              text: 'Branding Code',
              sort: true,
              editable: false,
            },
            {
              dataField: 'brandingTitle',
              text: 'Branding Title',
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
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row?.header?.title && (
                    <Form.MultilineInput
                      label=''
                      className='w-40'
                      onBlur={title => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {header: {...row?.header, title}},
                            row._id,
                          );
                      }}
                      defaultValue={row.header?.title}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'header.titleCSS',
              text: 'Header Title CSS',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row?.header?.titleCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={titleCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {header: {...row?.header, titleCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row?.header.titleCSS}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'header.logo',
              text: 'Header Logo',
              sort: true,
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
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <div className='flex flex-col items-center gap gap-2'>
                  <Form.InputFile
                    label='File'
                    placeholder='File'
                    onChange={async e => {
                      const logo = e.target.files[0];
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          {
                            header: {
                              ...row.header,
                              logo,
                            },
                          },
                          row._id,
                        );
                    }}
                  />
                  <Buttons.Button
                    size='small'
                    type='outline'
                    icon={Svg.Remove}
                    onClick={() => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          {
                            header: {
                              ...row.header,
                              logo: null,
                            },
                          },
                          row._id,
                        );
                    }}
                  >
                    Remove Image
                  </Buttons.Button>
                </div>
              ),
            },
            {
              dataField: 'header.logoCSS',
              text: 'Header Logo CSS',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row?.header?.logoCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={logoCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {header: {...row?.header, logoCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row.header?.logoCSS}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'header.backgroundImage',
              text: 'Header Background Image',
              sort: true,
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.header?.backgroundImage}
                      alt='backgroundImage'
                      className='object-fill h-35 w-40 rounded-md'
                    />
                  </>
                );
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <div className='flex flex-col items-center gap gap-2'>
                  <Form.InputFile
                    label='File'
                    placeholder='File'
                    onChange={async e => {
                      const backgroundImage = e.target.files[0];
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          {
                            header: {
                              ...row.header,
                              backgroundImage,
                            },
                          },
                          row._id,
                        );
                    }}
                  />
                  <Buttons.Button
                    size='small'
                    type='outline'
                    icon={Svg.Remove}
                    onClick={() => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          {
                            header: {
                              ...row.header,
                              backgroundImage: null,
                            },
                          },
                          row._id,
                        );
                    }}
                  >
                    Remove Image
                  </Buttons.Button>
                </div>
              ),
            },
            {
              dataField: 'header.mainBoxCSS',
              text: 'Header Main Box CSS',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row?.header?.mainBoxCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={mainBoxCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {header: {...row?.header, mainBoxCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row.header?.mainBoxCSS}
                    />
                  )}
                </>
              ),
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
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row?.subHeader?.title && (
                    <Form.MultilineInput
                      label=''
                      className='w-40'
                      onBlur={title => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {subHeader: {...row?.subHeader, title}},
                            row._id,
                          );
                      }}
                      defaultValue={row?.subHeader?.title}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'subHeader.titleCSS',
              text: 'Sub Header Title CSS',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row?.subHeader?.titleCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={titleCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {subHeader: {...row?.subHeader, titleCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row?.subHeader?.titleCSS}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'subHeader.subTitle',
              text: 'Sub Header Sub Title',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row.subHeader?.subTitle && (
                    <Form.MultilineInput
                      label=''
                      className='w-40'
                      onBlur={subTitle => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {subHeader: {...row?.subHeader, subTitle}},
                            row._id,
                          );
                      }}
                      defaultValue={row.subHeader?.subTitle}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'subHeader.subTitleCSS',
              text: 'Sub Header Sub Title CSS',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row.subHeader?.subTitleCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={subTitleCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {subHeader: {...row?.subHeader, subTitleCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row?.subHeader?.subTitleCSS}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'subHeader.mainBoxCSS',
              text: 'Sub Header Main Box CSS',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row.subHeader?.mainBoxCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={mainBoxCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {subHeader: {...row?.subHeader, mainBoxCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row?.subHeader?.mainBoxCSS}
                    />
                  )}
                </>
              ),
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
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row.footer?.title && (
                    <Form.MultilineInput
                      label=''
                      className='w-40'
                      onBlur={title => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {footer: {...row?.footer, title}},
                            row._id,
                          );
                      }}
                      defaultValue={row.footer?.title}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'footer.titleCSS',
              text: 'Footer Title CSS',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row.footer?.titleCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={titleCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {footer: {...row?.footer, titleCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row.footer?.titleCSS}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'footer.subTitle',
              text: 'Footer Sub Title',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row.footer?.subTitle && (
                    <Form.MultilineInput
                      label=''
                      className='w-40'
                      onBlur={subTitle => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {footer: {...row?.footer, subTitle}},
                            row._id,
                          );
                      }}
                      defaultValue={row.footer?.subTitle}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'footer.subTitleCSS',
              text: 'Footer Sub Title CSS',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row.footer?.subTitleCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={subTitleCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {footer: {...row?.footer, subTitleCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row.footer?.subTitleCSS}
                    />
                  )}
                </>
              ),
            },
            {
              dataField: 'footer.backgroundImage',
              text: 'Footer Background Image',
              sort: true,
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.footer?.backgroundImage}
                      alt='backgroundImage'
                      className='object-fill h-35 w-40 rounded-md'
                    />
                  </>
                );
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <div className='flex flex-col items-center gap gap-2'>
                  <Form.InputFile
                    label='File'
                    placeholder='File'
                    onChange={async e => {
                      const backgroundImage = e.target.files[0];
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          {
                            footer: {
                              ...row.footer,
                              backgroundImage,
                            },
                          },
                          row._id,
                        );
                    }}
                  />
                  <Buttons.Button
                    size='small'
                    type='outline'
                    icon={Svg.Remove}
                    onClick={() => {
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          {
                            footer: {
                              ...row.footer,
                              backgroundImage: null,
                            },
                          },
                          row._id,
                        );
                    }}
                  >
                    Remove Image
                  </Buttons.Button>
                </div>
              ),
            },
            {
              dataField: 'footer.mainBoxCSS',
              text: 'Footer Main Box CSS',
              sort: true,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row.footer?.mainBoxCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={mainBoxCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {footer: {...row?.footer, mainBoxCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row.footer?.mainBoxCSS}
                    />
                  )}
                </>
              ),
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
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  {row.pageNumber?.pageNumberCSS && (
                    <Form.MultilineInput
                      label=''
                      style={{color: '#ffffff', backgroundColor: '#000000'}}
                      onBlur={pageNumberCSS => {
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            {pageNumber: {...row?.pageNumber, pageNumberCSS}},
                            row._id,
                          );
                      }}
                      defaultValue={row.pageNumber?.pageNumberCSS}
                    />
                  )}
                </>
              ),
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
          dynamicStylingFields={['layoutCode', 'tempCode', 'brandingTitle']}
          hideExcelSheet={[
            '_id',
            'operation',
            'header.logo',
            'header.backgroundImage',
            'footer.backgroundImage',
          ]}
        />
      </div>
    </>
  );
});
