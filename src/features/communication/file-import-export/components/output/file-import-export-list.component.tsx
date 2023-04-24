import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {Table} from 'react-bootstrap';
import {Buttons, Icons} from '@/library/components';

interface FileImportExportListProps {
  data: any;
  totalSize: number;
  onSend: (record: any) => void;
  onDelete: (ids: [string]) => void;
  onPagination: (type: string) => void;
}

export const FileImportExportList = observer(
  ({
    data,
    totalSize,
    onSend,
    onDelete,
    onPagination,
  }: FileImportExportListProps) => {
    const finalOutput: any = [];
    let arrKeys: any = [];
    data?.map(item => {
      const list: any[] = [];
      item.records?.filter((e: any) => {
        list.push(e);
        arrKeys.push(e.field);
      });
      finalOutput.push({_id: item._id, ...list});
    });
    arrKeys = _.uniq(arrKeys);

    return (
      <>
        <div className='flex flex-wrap  overflow-scroll'>
          <Table striped bordered>
            <thead>
              <tr>
                {arrKeys?.map(item => (
                  <th className='text-white'>{item}</th>
                ))}
                <th className='text-white'>Action</th>
              </tr>
            </thead>
            <tbody>
              {finalOutput?.map((item, index) => (
                <tr>
                  {arrKeys?.map((keys, keysIndex) => (
                    <td>
                      <span>{item[keysIndex].value}</span>
                    </td>
                  ))}
                  <td className='flex flex-row gap-2'>
                    <Buttons.Button
                      size='medium'
                      type='outline'
                      onClick={() => onDelete([item._id])}
                    >
                      <Icons.EvaIcon icon='trash-2-outline' color='#000000' />
                      {'Delete'}
                    </Buttons.Button>
                    <Buttons.Button
                      size='medium'
                      type='solid'
                      onClick={() => onSend(item)}
                    >
                      <Icons.EvaIcon icon='upload-outline' />
                      {'Send'}
                    </Buttons.Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className='flex items-center gap-2 mt-2'>
          <span>Total Records: {totalSize}</span>
          <Icons.IconContext
            color='#fff'
            size='25'
            style={{
              backgroundColor: '#808080',
              width: 32,
              height: 32,
              borderRadius: 16,
              align: 'center',
              padding: 4,
            }}
            onClick={async () => {
              onPagination && onPagination('next');
            }}
          >
            <Icons.IconBi.BiSkipNext />
          </Icons.IconContext>
          <Icons.IconContext
            color='#fff'
            size='25'
            style={{
              backgroundColor: '#808080',
              width: 32,
              height: 32,
              borderRadius: 16,
              align: 'center',
              padding: 4,
            }}
            onClick={async () => {
              onPagination && onPagination('prev');
            }}
          >
            <Icons.IconBi.BiSkipPrevious />
          </Icons.IconContext>
        </div>
      </>
    );
  },
);
