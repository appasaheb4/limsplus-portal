/* eslint-disable */
import _ from 'lodash';
export function flatten<T>(array: T[][]) {
  return ([] as T[]).concat(...array);
}
``;
export function unique<T>(array: T[]) {
  return Array.from<T>(new Set(array));
}

export const uniqArrayByKeepFirst = (a, key) => {
  const seen = new Set();
  return a.filter(item => {
    const k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
};

export const findArrayKeyArrayWise = (
  arrMain: Array<any>,
  arrKeys: Array<any>,
): Array<any> => {
  const arrFinal: Array<any> = [];
  arrKeys.filter(item => {
    arrFinal.push(
      arrMain.find(mainItem => {
        return mainItem.serviceType === item;
      }),
    );
  });
  return arrFinal;
};

export const lookupItems = (arrLookup, key): Array<any> => {
  const result =
    arrLookup?.find(item => {
      return item?.fieldName === key;
    }) &&
    arrLookup?.find(item => {
      return item?.fieldName === key;
    })?.arrValue;
  return result || [];
};

export const getDefaultLookupItem = (arrLookup, key): string => {
  const result =
    arrLookup.find(item => {
      return item.fieldName === key;
    }) &&
    arrLookup.find(item => {
      return item.fieldName === key;
    }).defaultItem[0]?.code;
  return result;
};

export const getDefaultLookupItems = (arrLookup, key) => {
  const result =
    arrLookup.find(item => {
      return item.fieldName === key;
    }) &&
    arrLookup.find(item => {
      return item.fieldName === key;
    }).defaultItem;
  return result;
};

export const lookupCodeValue = (item: any): string => {
  return `${
    _.isEqual(item.value?.toUpperCase(), item.code?.toUpperCase())
      ? item.code
      : item.code
  }`;
};

export const lookupValue = (item: any): string => {
  return `${
    _.isEqual(item.value?.toUpperCase(), item.code?.toUpperCase())
      ? item.value
      : item.value
  }`;
};

export const findArrayItems = (arr, key, value): any => {
  const result = arr.find(item => {
    return item[key] === value;
  });
  return result || [];
};
