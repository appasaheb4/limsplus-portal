/* eslint-disable no-case-declarations */
export const getStatus = (
  status: string,
  type: string,
  result: number,
  lo: number,
  hi: number,
) => {
  if (status === 'resultStatus' && type === 'V') {
    if (result >= lo && result <= hi) return 'N';
    else if (result < lo) return 'L';
    else if (result > hi) return 'H';
    return 'N';
  } else if (status === 'testStatus' && type === 'V') {
    if (result >= lo && result <= hi) return 'N';
    else if (result < lo) return 'A';
    else if (result > hi) return 'A';
    return 'N';
  }
  return 'N';
};

export const getResultStatus = (type: string, row: any) => {
  switch (type) {
    case 'V':
      if (!row?.loNor && !row?.hiNor) return 'N';
      const numberResult = Number.parseFloat(row?.result);
      const numberLo = Number.parseFloat(row?.loNor || 0);
      const numberHi = Number.parseFloat(row?.hiNor || 0);
      return getStatus('resultStatus', type, numberResult, numberLo, numberHi);
      break;
    default:
      return row?.abnFlag ? 'A' : 'N';
      break;
  }
};

export const getTestStatus = (type: string, row: any) => {
  switch (type) {
    case 'V':
      if (!row?.loNor && !row?.hiNor) return 'N';
      // eslint-disable-next-line no-case-declarations
      const numberResult = Number.parseFloat(row?.result);
      const numberLo = Number.parseFloat(row?.loNor || 0);
      const numberHi = Number.parseFloat(row?.hiNor || 0);
      return getStatus('testStatus', type, numberResult, numberLo, numberHi);
      break;
    default:
      if (!row?.loNor && !row?.hiNor) return 'A';
      return row?.abnFlag ? 'A' : 'N';
      break;
  }
};

export const getAbnFlag = (type: string, row: any) => {
  switch (type) {
    case 'V':
      return getResultStatus(row.resultType, row) === 'L' ||
        getResultStatus(row.resultType, row) === 'H'
        ? true
        : false;
      break;
    default:
      return row?.abnFlag;
      break;
  }
};

export const getCretical = (type: string, row: any) => {
  switch (type) {
    case 'V':
      const numberResult = Number.parseFloat(row?.result);
      const numberLo = Number.parseFloat(
        row?.refRangesList?.find(item => item.rangeType === 'C')?.low,
      );
      const numberHi = Number.parseFloat(
        row?.refRangesList?.find(item => item.rangeType === 'C')?.high,
      );
      if (!numberLo && !numberHi) return false;
      if (numberResult >= numberLo && numberResult <= numberHi) return false;
      return true;
      break;
    default:
      return row?.critical;
      break;
  }
};
