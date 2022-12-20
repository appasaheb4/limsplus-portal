import React from 'react';
import dayjs from 'dayjs';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Form,
  Icons,
  Toast,
} from '@/library/components';
import {lookupItems, getDefaultLookupItem, lookupValue} from '@/library/utils';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {TableBootstrap} from './TableBootstrap';
import {FormHelper} from '@/helper';

interface SegmentMappingInputTableProps {
  data: any;
  extraData?: any;
  onDelete?: (id: string) => void;
  onUpdateItems?: (item: any, id) => void;
}

export const SegmentMappingInputTable = observer(
  ({
    data,
    extraData,
    onDelete,
    onUpdateItems,
  }: SegmentMappingInputTableProps) => {
    const {
      masterAnalyteStore,
      loading,
      departmentStore,
      interfaceManagerStore,
      labStore,
      refernceRangesStore,
    } = useStores();

    const duplicateCombination = () => {
      const {refRangesInputList} = refernceRangesStore.referenceRanges;
      const arr: any = _.map(refRangesInputList, o =>
        _.pick(o, [
          'analyteCode',
          'species',
          'sex',
          'rangeSetOn',
          'rangeType',
          'ageFrom',
          'ageTo',
          'ageUnit',
          'environment',
        ]),
      );
      const set = new Set(arr.map(JSON.stringify));
      const hasDuplicates = set.size < arr.length;
      if (hasDuplicates) {
        Toast.warning({
          message: '😔 Duplicate record found!',
        });
      }
      refernceRangesStore.updateExistsRecord(hasDuplicates);
    };

    return (
      <div style={{position: 'relative'}}>
        <TableBootstrap
          id='index'
          data={data}
          columns={[
            {
              dataField: 'segments',
              text: 'Segments',
              headerClasses: 'textHeaderM',
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <select
                    value={row.segments}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const segments = e.target.value;
                      onUpdateItems &&
                        onUpdateItems(
                          {
                            segments,
                          },
                          row.index,
                        );
                    }}
                  >
                    <option selected>Select</option>
                    {lookupItems(extraData.lookupItems, 'SEGMENT').map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ),
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: 'segmentOrder',
              text: 'Segment Order',
              headerClasses: 'textHeader',
              csvExport: false,
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex,
              ) => (
                <>
                  <Form.Input
                    placeholder={row?.segmentOrder}
                    type='text'
                    onBlur={segmentOrder => {
                      onUpdateItems && onUpdateItems({segmentOrder}, row.index);
                    }}
                  />
                </>
              ),
            },
            {
              dataField: 'segmentRequired',
              text: 'Segment Required',
              headerClasses: 'textHeader2',
              sort: true,
              csvFormatter: (col, row) =>
                `${
                  row.segmentRequired
                    ? row.segmentRequired
                      ? 'Yes'
                      : 'No'
                    : 'No'
                }`,
              editable: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <Form.Toggle
                      value={row.segmentRequired}
                      onChange={segmentRequired => {
                        onUpdateItems &&
                          onUpdateItems({segmentRequired}, row.index);
                      }}
                    />
                  </>
                );
              },
            },
            {
              dataField: 'opration',
              text: 'Action',
              editable: false,
              csvExport: false,
              hidden: false,
              formatter: (cellContent, row) => (
                <>
                  <div className='flex flex-row'>
                    <Icons.IconContext
                      color='#fff'
                      size='20'
                      onClick={() => onDelete && onDelete(row._id)}
                    >
                      {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                    </Icons.IconContext>
                  </div>
                </>
              ),
              headerClasses: 'sticky right-0  bg-gray-500 text-white',
              classes: (cell, row, rowIndex, colIndex) => {
                return 'sticky right-0 bg-gray-500';
              },
            },
          ]}
          isEditModify={true}
          isSelectRow={true}
          fileName='Segment Mapping'
        />
      </div>
    );
  },
);
