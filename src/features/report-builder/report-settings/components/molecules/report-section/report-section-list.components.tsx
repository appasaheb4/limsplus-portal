import React from 'react';
import {observer} from 'mobx-react';
import {textFilter, Form} from '@/library/components';
import {Confirm} from '@/library/models';
import TableBootstrap from './table-bootstrap.component';
import dayjs from 'dayjs';

interface ReportSectionListProps {
  data: any;
  totalSize: number;
  extraData: any;
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

let section;

export const ReportSectionList = observer((props: ReportSectionListProps) => {
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
              dataField: 'srNo',
              text: 'Sr No',
              headerClasses: 'textHeader',
              sort: true,
              editable: false,
            },
            {
              dataField: 'section',
              text: 'Section',
              headerClasses: 'textHeader4',
              filter: textFilter({
                getFilter: filter => {
                  section = filter;
                },
              }),
              sort: true,
              editable: false,
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName='Report_Section'
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
            section('');
          }}
        />
      </div>
    </>
  );
});
