import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { Form } from '@/library/components';
import { properties as propertiesObj } from './css-properties';
interface CSSMultilineProps {
  onClick(item): void;
}
const mapToArray = (arr: any) => {
  const res: any = [];
  arr.forEach(function (obj, index) {
    const key = Object.keys(obj)[0];
    const value = key;
    res.push([value, obj[key]]);
  });
  return res;
};
const data = mapToArray(propertiesObj);
export const CSSMultiline = ({ onClick }: CSSMultilineProps) => {
  const [value, setValue] = useState('');
  const [properties, setProperties] = useState<Array<any>>([]);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  useEffect(() => {
    console.log({ data });

    setProperties(data);
  }, []);
  const valueRef = useRef('');
  const useOutsideAlerter = ref => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsListOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const list: Array<any> = [];
  const filter = (css: string) => {
    let matchString: any = css?.split(';');
    matchString = matchString[matchString?.length - 1];
    matchString = matchString?.split(':')[0];
    matchString = matchString?.split("'")[0];
    if (css?.length == 0) return setProperties(data);
    else {
      data?.map(item => {
        const innerItem: Array<any> = [];
        const isItems = item[0]?.startsWith(matchString);
        if (isItems) innerItem.push(item[0]);
        if (innerItem?.length > 0) list.push([item[0], item[1]]);
      });
      setProperties(list);
    }
  };

  const onKeyUp = e => {
    setIsListOpen(true);
  };

  return (
    <div ref={wrapperRef}>
      <Form.MultilineInput
        label='Main Box CSS'
        style={{ color: '#ffffff', backgroundColor: '#000000' }}
        placeholder={"Like fontSize: 12,backgroundColor:'#000000'"}
        value={value}
        onKeyUp={onKeyUp}
        onChange={css => {
          setValue(css);
          filter(css);
        }}
      />
      {isListOpen && (
        <div style={{ marginTop: -10 }}>
          <ul className='flex flex-col max-h-40 bg-black  m-2 text-white  overflow-y-scroll  '>
            {properties?.map((item, index) => (
              <li key={index} className='flex flex-col gap-4 p-2'>
                <span className='underline'>{item[0]}</span>
                {item[1]?.map(prop => (
                  <li
                    className='flex -mt-2 px-2 h-8 bg-slate-800  rounded-md items-center cursor-pointer'
                    onClick={() => {
                      let existsString: any = value?.split(';');
                      if (value.includes(';')) {
                        existsString = existsString.map(item => {
                          if (item?.includes(':')) return item;
                        });
                        if (prop != 'number')
                          existsString.push(`${item[0]}:'${prop}';`);
                        else existsString.push(`${item[0]}:20;`);
                        setValue(existsString.join(';').replaceAll(';;', ';'));
                      } else {
                        if (prop != 'number') setValue(`${item[0]}:'${prop}';`);
                        else existsString.push(`${item[0]}:20;`);
                      }
                      filter(existsString.join(''));
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
      )}
    </div>
  );
};
