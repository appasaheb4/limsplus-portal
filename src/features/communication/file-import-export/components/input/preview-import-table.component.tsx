import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import _ from 'lodash';
import {Buttons, Icons} from '@/library/components';
interface PreviewImportTableProps {
  data?: any;
  onUpload: (list: any) => void;
}

export const PreviewImportTable = ({
  data,
  onUpload,
}: PreviewImportTableProps) => {
  const [keys, setKeys] = useState<Array<any>>([]);
  let arrKeys: any = [];
  data.map(function (item) {
    const localKeys: any = [];
    for (const [key, value] of Object.entries(item as any)) {
      localKeys.push(key);
    }
    arrKeys.push(...localKeys);
  });
  arrKeys = _.uniq(arrKeys);
  arrKeys = _.remove(arrKeys, item => {
    return item != 'elementSequence';
  });
  const finalOutput: any = [];
  data.map(function (item) {
    const list: any = [];
    arrKeys.map(key => {
      list.push({field: key, value: item[key]});
    });
    finalOutput.push(list);
  });

  return (
    <>
      <div className='flex flex-wrap  overflow-scroll'>
        <Table striped bordered>
          <thead>
            <tr>
              {arrKeys?.map(item => (
                <th className='text-white'>{item}</th>
              ))}
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className='flex items-center justify-center mt-2'>
        <Buttons.Button
          size='medium'
          type='solid'
          onClick={() => onUpload(finalOutput)}
        >
          <Icons.EvaIcon icon='plus-circle-outline' />
          {'Upload'}
        </Buttons.Button>
      </div>
    </>
  );
};
