import React from 'react';
import { observer } from 'mobx-react';
import {
  Form,
  TableBootstrap,
  Tooltip,
  Icons,
  Buttons,
  Svg,
} from '@/library/components';
import { Confirm } from '@/library/models';

interface PageLayoutProps {
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
  setIsInputView: any;
  isInputView: boolean;
}

let sectionSetting;
let version;
let environment;
let companyCode;

export const PageLayoutList = observer((props: PageLayoutProps) => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <TableBootstrap
          id='_id'
          data={props.data}
          totalSize={props.totalSize}
          isHideForm={props.isInputView}
          setHideForm={props.setIsInputView}
          columns={[
            {
              dataField: '_id',
              text: 'Id',
              hidden: true,
              csvExport: false,
            },
            {
              dataField: 'tempCode',
              text: 'Layout Code',
              headerClasses: 'textHeader',
              sort: true,
              editable: false,
              editorStyle: { textTransform: 'uppercase' },
              style: {
                textTransform: 'uppercase',
              },
            },
            {
              dataField: 'tempName',
              text: 'Layout Name',
              headerClasses: 'textHeader',
              sort: true,
              editable: false,
              editorStyle: { textTransform: 'uppercase' },
              style: {
                textTransform: 'uppercase',
              },
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
                      value={row.isToolbar}
                      onChange={isToolbar => {
                        props.onUpdateItem &&
                          props.onUpdateItem({ isToolbar }, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'isBackgroundImage',
              text: 'Background Image Visible',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.isBackgroundImage
                    ? row.isBackgroundImage
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.isBackgroundImage}
                      onChange={isBackgroundImage => {
                        props.onUpdateItem &&
                          props.onUpdateItem({ isBackgroundImage }, row._id);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'backgroundImage',
              text: 'Background Image',
              sort: true,
              formatter: (cell, row) => {
                return (
                  <>
                    {row?.backgroundImage && (
                      <img
                        src={row?.backgroundImage}
                        alt='logo'
                        className='object-fill h-35 w-40 rounded-md'
                      />
                    )}
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
                <div className='flex flex-col justify-center items-center gap-2'>
                  <Form.InputFile
                    placeholder='File'
                    onChange={async e => {
                      const backgroundImage = e.target.files[0];
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          {
                            backgroundImage,
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
                            backgroundImage: null,
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
              dataField: 'pageSize',
              text: 'Page Size',
              sort: true,
              formatter: (cell, row) => {
                return (
                  <>
                    <select
                      value={row?.pageSize}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 border-gray-300
                       rounded-md`}
                      onChange={e => {
                        const pageSize = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem({ pageSize }, row._id);
                      }}
                    >
                      <option>Select</option>
                      {[
                        '4A0',
                        '2A0',
                        'A0',
                        'A1',
                        'A2',
                        'A3',
                        'A4',
                        'A5',
                        'A6',
                        'A7',
                        'A8',
                        'A9',
                        'A10',
                        'B0',
                        'B1',
                        'B2',
                        'B3',
                        'B4',
                        'B5',
                        'B6',
                        'B7',
                        'B8',
                        'B9',
                        'B10',
                        'C0',
                        'C1',
                        'C2',
                        'C3',
                        'C4',
                        'C5',
                        'C6',
                        'C7',
                        'C8',
                        'C9',
                        'C10',
                        'RA0',
                        'RA1',
                        'RA2',
                        'RA3',
                        'RA4',
                        'SRA0',
                        'SRA1',
                        'SRA2',
                        'SRA3',
                        'SRA4',
                        'EXECUTIVE',
                        'FOLIO',
                        'LEGAL',
                        'LETTER',
                        'TABLOID',
                        'ID1',
                      ].map((item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </>
                );
              },
            },
            {
              dataField: 'mainBoxCSS',
              text: 'Main Box Css',
              headerClasses: 'textHeader4',
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
                  <Form.MultilineInput
                    label=''
                    style={{ color: '#ffffff', backgroundColor: '#000000' }}
                    placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
                    onBlur={mainBoxCSS => {
                      props.onUpdateItem &&
                        props.onUpdateItem({ mainBoxCSS }, row._id);
                    }}
                    defaultValue={row?.mainBoxCSS}
                  />
                </>
              ),
            },
            {
              text: 'Company Code',
              dataField: 'companyCode',
              sort: true,
              editable: false,
              csvFormatter: col => (col ? col : ''),
              headerClasses: 'textHeader2',
            },
            {
              text: 'Environment',
              dataField: 'environment',
              editable: false,
              headerClasses: 'textHeader2',
            },
            {
              dataField: 'operation',
              text: 'Action',
              editable: false,
              csvExport: false,
              // hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    <Tooltip tooltipText='Preview' position='bottom'>
                      <Icons.IconContext
                        color='#ffffff'
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
                        color='#ffffff'
                        size='20'
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: 'delete',
                            show: true,
                            id: [row._id],
                            title: 'Are you sure?',
                            body: 'Do you want to delete this record?',
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
          dynamicStylingFields={['tempName', 'tempCode']}
          hideExcelSheet={['_id', 'operation', 'backgroundImage']}
        />
      </div>
    </>
  );
});
