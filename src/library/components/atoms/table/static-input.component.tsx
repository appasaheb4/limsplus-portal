import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';

interface StaticInputTableProps {
  data: any;
}

export const StaticInputTable = ({data}: StaticInputTableProps) => {
  const [arrKeys, setArrKeys] = useState<Array<string>>([]);

  const loadAsync = async list => {
    list.map(function (item) {
      const localKeys: any = [];
      for (const [key, value] of Object.entries(item as any)) {
        localKeys.push(key);
      }
      setArrKeys(localKeys);
    });
  };

  useEffect(() => {
    loadAsync(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-4'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-white uppercase '>
          <tr>
            {arrKeys.map(item => (
              <th scope='col' className='p-2'>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(item => (
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
              {arrKeys.map(key => (
                <td className='p-2'>
                  {typeof item[key] === 'boolean'
                    ? item[key]
                      ? 'Yes'
                      : 'No'
                    : typeof item[key] === 'object'
                    ? dayjs(item[key]).format('YYYY-MM-DD')
                    : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
