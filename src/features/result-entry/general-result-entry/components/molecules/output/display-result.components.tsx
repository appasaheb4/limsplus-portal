import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import {
  Form,
  Tooltip,
  Icons,
  Toast,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import { observer } from 'mobx-react';
import { FormHelper } from '@/helper';
import { useStores } from '@/stores';

import { useForm } from 'react-hook-form';
import { ModalDocxContent } from '@/core-components';
import { FaWordpressSimple } from 'react-icons/fa';
interface DisplayResultProps {
  row: any;
  rowIndex: number;
  rowData: string[];
  onSelect?: (item) => void;
}

export const DisplayResult = observer(
  ({ row, rowIndex, rowData, onSelect }: DisplayResultProps) => {
    const {
      patientResultStore,
      possibleResultsStore,
      libraryStore,
      generalResultEntryStore,
    } = useStores();
    const { control } = useForm();
    const [conclusionResult, setConclusionResult] = useState<Array<any>>();
    const [libraryList, setLibraryList] = useState<Array<any>>();
    const [isOpen, setIsOpen] = useState(false);
    const [modalDocxContent, setModalDocxContent] = useState<any>({
      visible: false,
    });

    useEffect(() => {
      switch (row?.resultType) {
        case 'D': {
          possibleResultsStore.possibleResultsService
            .findByFields({
              input: {
                filter: {
                  analyteCode: row?.analyteCode,
                },
              },
            })
            .then(res => {
              if (res.findByFieldsPossibleResult.success) {
                setConclusionResult(
                  res.findByFieldsPossibleResult?.data[0]?.conclusionResult,
                );
              } else {
                Toast.warning({
                  message: `😔 ${res.findByFieldsPossibleResult.message}`,
                });
              }
            });
          break;
        }
        case 'L':
        case 'M': {
          libraryStore.libraryService
            .findByFields({
              input: {
                filter: {
                  libraryType: 'Alpha',
                  groups: 'Results',
                  lab: row?.pLab,
                  department: row?.departement,
                },
              },
            })
            .then(res => {
              if (res.findByFieldsLibrarys.success) {
                setLibraryList(res.findByFieldsLibrarys?.data);
              }
            });
          break;
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row]);

    return (
      <div className='relative w-full '>
        {row?.resultType == 'V' ? (
          !row?.result ? (
            <Form.Input1
              key={row?._id}
              label=''
              name={`field-${rowIndex}`}
              isAutoFocus={
                (
                  patientResultStore?.patientResultListNotAutoUpdate?.filter(
                    (item: any) => {
                      return item?.resultType == 'V' && item.panelStatus == 'P';
                    },
                  )[0] as any
                )?._id == row?._id
                  ? true
                  : false
              }
              type='text'
              disabled={row?.calculationFlag}
              placeholder='Result'
              defaultValue={row?.result}
              maxLength={50}
              pattern={FormHelper.patterns.decimalPatterm}
              className='w-full leading-4 p-2  focus:outline-none focus:ring block shadow-sm sm:text-base border-2 rounded-md'
              onKeyDown={e => {
                switch (e.key) {
                  case 'Enter':
                  case 'ArrowDown':
                  case 'Tab': {
                    e.preventDefault(); // Prevent default tabbing behavior to manually handle focus
                    let nextIndex = rowIndex + 1;

                    // Find the next field that actually exists
                    while (nextIndex < rowData?.length) {
                      const nextField: any = document.querySelector(
                        `[name=field-${nextIndex}]`,
                      );
                      if (nextField) {
                        nextField.focus();
                        break;
                      }
                      nextIndex++;
                    }

                    break;
                  }
                  case 'ArrowUp': {
                    e.preventDefault();
                    let previousIndex = rowIndex - 1;

                    // Find the previous field that actually exists
                    while (previousIndex >= 0) {
                      const previousField: any = document.querySelector(
                        `[name=field-${previousIndex}]`,
                      );
                      if (previousField) {
                        previousField.focus();
                        break;
                      }
                      previousIndex--;
                    }

                    break;
                  }
                  // No default
                }
              }}
              onBlur={e => {
                const result = e.target.value;
                if (result) {
                  onSelect &&
                    onSelect({
                      result: Number.parseFloat(result).toFixed(
                        row?.picture || 0,
                      ),
                      numeric: result,
                    });
                }
              }}
            />
          ) : (
            <span>{row?.result?.toString()}</span>
          )
        ) : null}

        {row.resultType === 'D' ? (
          !row?.result ? (
            <>
              <select
                name={`field-${row.index}`}
                className={
                  'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                }
                onChange={e => {
                  // const [fieldName, fieldIndex] = e.target.name.split('-');
                  // const fieldIntIndex = Number.parseInt(fieldIndex, 10);
                  // const nextfield: any = document.querySelector(
                  //   `[name=field-${fieldIntIndex + 1}]`,
                  // );
                  // if (nextfield !== null) {
                  //   nextfield.focus();
                  // }
                  const defaultItem = JSON.parse(e.target.value);
                  if (defaultItem) {
                    onSelect &&
                      onSelect({
                        result: defaultItem.possibleValue,
                        alpha: defaultItem.result,
                        abnFlag: defaultItem.abNormal,
                        critical: defaultItem.critical,
                      });
                  }
                }}
              >
                <option>Select</option>
                {conclusionResult?.map((item: any, index: number) => (
                  <option key={index} value={JSON.stringify(item)}>
                    {`Result: ${item.result} ,
               PossibleValue: ${item.possibleValue} ,
               Ab Normal: ${
                 item.abNormal ? (item.abNormal ? 'Yes' : 'No') : 'No'
               } ,
               Critical: ${
                 item.critical ? (item.critical ? 'Yes' : 'No') : 'No'
               }`}
                  </option>
                ))}
              </select>

              {/* <Tooltip
                tooltipText={row._id != selectedRowId ? 'Expand' : 'Collapse'}
              >
                <Icons.IconContext
                  color='#000000'
                  size='20'
                  onClick={() => {
                    if (row._id === selectedRowId) {
                      setSelectedRowId('');
                    } else {
                      setSelectedRowId(row._id);
                    }
                  }}
                >
                  {Icons.getIconTag(
                    row._id != selectedRowId
                      ? Icons.IconBi.BiExpand
                      : Icons.IconBi.BiCollapse,
                  )}
                </Icons.IconContext>
              </Tooltip>
              {selectedRowId == row._id ? (
                <>
                  <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                    <Table striped bordered>
                      <thead>
                        <tr className='p-0 text-xs'>
                          <th className='text-white' style={{ minWidth: 70 }}>
                            Result
                          </th>
                          <th className='text-white' style={{ minWidth: 70 }}>
                            PossibleValue
                          </th>
                          <th className='text-white' style={{ minWidth: 50 }}>
                            Ab Normal
                          </th>
                          <th className='text-white' style={{ minWidth: 50 }}>
                            Critical
                          </th>
                          <th className='text-white sticky right-0 z-10'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className='text-xs'>
                        {conclusionResult?.map((item, index) => {
                          return (
                            <>
                              <tr>
                                <td>{item.result}</td>
                                <td>{item.possibleValue}</td>
                                <td>
                                  {item.abNormal
                                    ? item.abNormal
                                      ? 'Yes'
                                      : 'No'
                                    : 'No'}
                                </td>
                                <td>
                                  {item.critical
                                    ? item.critical
                                      ? 'Yes'
                                      : 'No'
                                    : 'No'}
                                </td>
                                <td>
                                  <FiArrowRightCircle
                                    size={20}
                                    onClick={() => {
                                      const selectedValue =
                                        JSON.stringify(item);
                                      const defaultItem =
                                        JSON.parse(selectedValue);
                                      onSelect?.({
                                        result: defaultItem.possibleValue,
                                        alpha: defaultItem.result,
                                        abnFlag: defaultItem.abNormal,
                                        critical: defaultItem.critical,
                                      });
                                    }}
                                  />
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div> */}
            </>
          ) : (
            <span>
              {row?.result?.split('\n').map((str, index) => (
                <p key={index}>{str}</p>
              ))}
            </span>
          )
        ) : null}

        {row.resultType === 'L' ? (
          !row?.result ? (
            <select
              name={`field-${row.index}`}
              className={
                'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
              }
              onChange={e => {
                // const [fieldName, fieldIndex] = e.target.name.split('-');
                // const fieldIntIndex = Number.parseInt(fieldIndex, 10);
                // const nextfield: any = document.querySelector(
                //   `[name=field-${fieldIntIndex + 1}]`,
                // );
                // if (nextfield !== null) {
                //   nextfield.focus();
                // }
                const item = JSON.parse(e.target.value);
                if (item) {
                  onSelect &&
                    onSelect({
                      result: item.libraryCode + ' - ' + item.description,
                      alpha: item?.libraryCode,
                      abnFlag: item?.abNormal || false,
                      critical: item?.critical || false,
                    });
                }
              }}
            >
              <option>Select</option>
              {libraryList?.map((item: any, index: number) => (
                <option key={index} value={JSON.stringify(item)}>
                  {`${item.libraryCode} - ${item.description}`}
                </option>
              ))}
            </select>
          ) : (
            <span>
              {row?.result?.split('\n').map((str, index) => (
                <p key={index}>{str}</p>
              ))}
            </span>
          )
        ) : null}

        {row.resultType === 'F' ? (
          !row?.result ? (
            <Form.MultilineInput1
              name={`field-${row.index}`}
              rows={2}
              label=''
              placeholder='Result'
              defaultValue={row?.result}
              onKeyDown={e => {
                switch (e.key) {
                  case 'Enter':
                  case 'ArrowDown':
                  case 'Tab': {
                    e.preventDefault(); // Prevent default tabbing behavior to manually handle focus
                    let nextIndex = rowIndex + 1;

                    // Find the next field that actually exists
                    while (nextIndex < rowData?.length) {
                      const nextField: any = document.querySelector(
                        `[name=field-${nextIndex}]`,
                      );
                      if (nextField) {
                        nextField.focus();
                        break;
                      }
                      nextIndex++;
                    }

                    break;
                  }
                  case 'ArrowUp': {
                    e.preventDefault();
                    let previousIndex = rowIndex - 1;

                    // Find the previous field that actually exists
                    while (previousIndex >= 0) {
                      const previousField: any = document.querySelector(
                        `[name=field-${previousIndex}]`,
                      );
                      if (previousField) {
                        previousField.focus();
                        break;
                      }
                      previousIndex--;
                    }

                    break;
                  }
                  // No default
                }
              }}
              onBlur={e => {
                // const [fieldName, fieldIndex] = e.target.name.split('-');
                // const fieldIntIndex = Number.parseInt(fieldIndex, 10);
                // const nextfield: any = document.querySelector(
                //   `[name=field-${fieldIntIndex + 1}]`,
                // );
                // if (nextfield !== null) {
                //   nextfield.focus();
                // }
                const result = e.target.value;
                if (result) {
                  onSelect &&
                    onSelect({
                      result,
                      alpha: `F - ${row._id}`,
                    });
                }
              }}
            />
          ) : (
            <span>{row?.result}</span>
          )
        ) : null}

        {row.resultType === 'M' ? (
          !row?.result ? (
            <AutoCompleteFilterMutiSelectMultiFieldsDisplay
              loader={false}
              name={`field-${row.index}`}
              placeholder='Search by code'
              data={{
                list: libraryList || [],
                selected: generalResultEntryStore.selectedItems?.library,
                displayKey: ['code', 'description'],
              }}
              onUpdate={item => {
                const items = generalResultEntryStore.selectedItems?.library;
                if (items) {
                  onSelect &&
                    onSelect({
                      result: JSON.stringify(
                        _.map(items, o => _.pick(o, ['code'])),
                      ),
                      alpha: `M - ${row._id}`,
                    });
                }
              }}
              onBlur={e => {
                // const [fieldName, fieldIndex] = e.target.name.split('-');
                // const fieldIntIndex = Number.parseInt(fieldIndex, 10);
                // const nextfield: any = document.querySelector(
                //   `[name=field-${fieldIntIndex + 1}]`,
                // );
                // if (nextfield !== null) {
                //   nextfield.focus();
                // }
              }}
              onFilter={(value: string) => {
                // masterPanelStore.masterPanelService.filterByFields({
                //   input: {
                //     filter: {
                //       fields: ['panelCode', 'panelName'],
                //       srText: value,
                //     },
                //     page: 0,
                //     limit: 10,
                //   },
                // });
              }}
              onSelect={item => {
                let library = generalResultEntryStore.selectedItems?.library;
                if (!item.selected) {
                  if (library && library.length > 0) {
                    library.push(item);
                  } else library = [item];
                } else {
                  library = library?.filter(items => {
                    return items._id !== item._id;
                  });
                }
                generalResultEntryStore.updateSelectedItems({
                  ...generalResultEntryStore.selectedItems,
                  library,
                });
              }}
            />
          ) : (
            <ul>
              {row?.result
                ? JSON.parse(row?.result)?.map((item: any, index: number) => (
                    <li key={index}>{item?.code}</li>
                  ))
                : null}
            </ul>
          )
        ) : null}

        {(row?.resultType == 'FR' || row?.resultType == 'BO') &&
          !row.result && (
            <Form.InputFile
              label='File'
              name={`field-${row.index}`}
              placeholder={'File'}
              accept={row?.resultType == 'BO' ? '.pdf' : '.png,.jpg'}
              onChange={e => {
                // const [fieldName, fieldIndex] = e.target.name.split('-');
                // const fieldIntIndex = Number.parseInt(fieldIndex, 10);
                // const nextfield: any = document.querySelector(
                //   `[name=field-${fieldIntIndex + 1}]`,
                // );
                // if (nextfield !== null) {
                //   nextfield.focus();
                // }
                const file = e.target.files[0];
                if (file) {
                  onSelect &&
                    onSelect({
                      file,
                    });
                }
              }}
            />
          )}
        {(row?.resultType == 'FR' || row?.resultType == 'BO') &&
          row?.result && (
            <div className='flex'>
              <Tooltip tooltipText='Report'>
                <Icons.IconContext
                  size='20'
                  color='#000000'
                  onClick={() => {
                    window.open(row?.result, '_black');
                  }}
                >
                  {Icons.getIconTag(Icons.IconBs.BsFilePdf)}
                </Icons.IconContext>
                <span className='w-12'>
                  {typeof row?.result == 'string' &&
                    row?.result
                      ?.split('/')
                      .pop()
                      .slice(11, row?.result?.split('/').pop()?.length)}
                </span>
              </Tooltip>
            </div>
          )}
        {row?.resultType === 'W' && (
          <>
            <Tooltip tooltipText='Expand result'>
              <FaWordpressSimple
                size={'30'}
                onClick={() => {
                  setModalDocxContent({
                    visible: true,
                    testName: row?.testName,
                    details: row?.result,
                    department: row?.departement,
                    isEditable: row?.panelStatus == 'P' ? true : false,
                    isLibraryImport: row?.panelStatus == 'P' ? true : false,
                    _id: row?._id,
                  });
                }}
              />
            </Tooltip>
            <ModalDocxContent
              {...modalDocxContent}
              onUpdate={details => {
                setModalDocxContent({ visible: false });
                if (row?.finishResult == 'P') {
                  onSelect &&
                    onSelect({
                      result: details,
                      alpha: `W - ${row._id}`,
                    });
                } else {
                  Toast.error({
                    message: '😌 Sorry already updated and finished result.',
                    timer: 2000,
                  });
                }
              }}
              onClose={() => {
                setModalDocxContent({ visible: false });
              }}
            />
          </>
        )}
      </div>
    );
  },
);
