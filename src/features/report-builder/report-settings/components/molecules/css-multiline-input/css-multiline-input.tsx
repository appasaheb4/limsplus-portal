import React, { useEffect, useState } from 'react';
import { Form } from '@/library/components';
const cssProperties = require('./css-properties.json');
interface CSSMultilineProps {
  onClick(item): void;
}

const data = Object.keys(cssProperties).map(key => [key, cssProperties[key]]);
export const CSSMultiline = ({ onClick }: CSSMultilineProps) => {
  const [value, setValue] = useState('');
  const [properties, setProperties] = useState<Array<any>>([]);
  useEffect(() => {
    setProperties(data);
  }, []);

  const list: Array<any> = [];
  const filter = (css: string) => {
    if (css?.length == 0) return setProperties(data);
    else {
      console.log({ css });
      data?.map(item => {
        const innerItem: Array<any> = [];
        item[1]?.find(prop => {
          const isItems = prop.startsWith(css);
          if (isItems) innerItem.push(prop);
        });
        if (innerItem?.length > 0) list.push([item[0], innerItem]);
      });
      setProperties(list);
    }
  };

  return (
    <>
      <Form.MultilineInput
        label='Main Box CSS'
        style={{ color: '#ffffff', backgroundColor: '#000000' }}
        placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
        value={value}
        onChange={css => {
          setValue(css);
          filter(css);
        }}
      />
      <div style={{ marginTop: -8 }}>
        <ul className='flex flex-col max-h-40 bg-slate-500  text-white  overflow-y-scroll  '>
          {properties?.map((item, index) => (
            <li key={index} className='flex flex-col gap-4 p-2 bg-blue-600'>
              <span className='underline'>{item[0]}</span>
              {item[1]?.map(prop => (
                <li
                  className='flex -mt-2 px-2 h-8 bg-slate-800  rounded-md items-center cursor-pointer'
                  onClick={() => {
                    setValue(value.concat(`${prop}:`));
                  }}
                >
                  {' '}
                  {prop}{' '}
                </li>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
