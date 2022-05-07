/* eslint-disable */
import React from 'react';
import {observer} from 'mobx-react';
// import * as LibraryComponents from "@/library/components"
import {Confirm} from '@/library/models';
import {ExpandPatientTestPanelCode} from './ExpandPatientTestPanelCode';

// import { NumberFilter } from "@/library/components/Organisms"

interface PanelListTableProps {
  data: any;
  totalSize: number;
  extraData?: any;
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
let labid;
let visitId;
let orderId;
let panelCode;
export const PanelListTable = observer((props: PanelListTableProps) => {
  return (
    <>
      <div style={{position: 'relative'}}>
        <ExpandPatientTestPanelCode
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
              dataField: 'panelCode',
              text: 'Panel Code',
              headerClasses: 'textHeader4 z-10',
            },
            {
              dataField: 'panelName',
              text: 'Panel Name',
              headerClasses: 'textHeader4 z-10',
            },
          ]}
          isEditModify={false}
          isSelectRow={true}
          fileName='Panel List'
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
            labid('');
            visitId('');
            orderId('');
            panelCode('');
          }}
        />
      </div>
    </>
  );
});
