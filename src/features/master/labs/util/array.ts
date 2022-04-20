/* eslint-disable */
import _ from 'lodash';
export const stateList = (arr, countryName): any => {
  const result = arr.filter(item => {
    return item.country === countryName;
  });
  if (result) return _.uniq(_.map(result, 'state'));
};

export const districtList = (arr, countryName, stateName): any => {
  const result = arr.filter(item => {
    return item.country === countryName && item.state === stateName;
  });
  if (result) return _.uniq(_.map(result, 'district'));
};

export const cityList = (arr, countryName, stateName, districtName): any => {
  const result = arr.filter(item => {
    return (
      item.country === countryName &&
      item.state === stateName &&
      item.district === districtName
    );
  });
  if (result) return _.uniq(_.map(result, 'city'));
};

export const areaList = (
  arr,
  countryName,
  stateName,
  districtName,
  cityName,
): any => {
  const result = arr.filter(item => {
    return (
      item.country === countryName &&
      item.state === stateName &&
      item.district === districtName &&
      item.city === cityName
    );
  });
  if (result) return _.uniq(_.map(result, 'area'));
};

export const postCodeList = (
  arr,
  countryName,
  stateName,
  districtName,
  cityName,
  areaName,
): any => {
  const result = arr.filter(item => {
    return (
      item.country === countryName &&
      item.state === stateName &&
      item.district === districtName &&
      item.city === cityName &&
      item.area === areaName
    );
  });
  if (result && result.length > 0) return result[0].postalCode;
  return [];
};
