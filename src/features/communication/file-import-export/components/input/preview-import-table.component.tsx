import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import _ from 'lodash';
interface PreviewImportTableProps {
  data?: any;
}

export const PreviewImportTable = ({data}: PreviewImportTableProps) => {
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
  console.log({data, arrKeys});
  data.map(function (item) {
    const records = {};
    arrKeys.map(key => {
      Object.assign(records, {[key]: item[key]});
    });
    console.log({records});
  });

  return (
    <Table striped bordered>
      <thead>
        <tr className='p-0 text-xs'>
          {arrKeys?.map(item => (
            <th className='text-white'>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody className='text-xs'>
        {data?.map(item => (
          <tr>
            <td>
              <span></span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
