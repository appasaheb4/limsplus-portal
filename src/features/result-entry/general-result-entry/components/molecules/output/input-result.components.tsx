import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Form,
  Toast,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
  Tooltip,
  Icons,
} from '@/library/components';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { useForm, Controller } from 'react-hook-form';
import { FormHelper } from '@/helper';
import { ModalDocxContent } from '@/core-components';
import { FaWordpressSimple } from 'react-icons/fa';

interface InputResultProps {
  row: any;
  rowIndex?: number;
  onSelect: (item) => void;
}

export const InputResult = observer(
  ({ row, rowIndex = 1, onSelect }: InputResultProps) => {
    const {
      possibleResultsStore,
      labStore,
      libraryStore,
      generalResultEntryStore,
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
    } = useForm();
    const [conclusionResult, setConclusionResult] = useState<Array<any>>();
    const [libraryList, setLibraryList] = useState<Array<any>>();
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
              //  else {
              //   Toast.warning({
              //     message: `😔 ${res.findByFieldsLibrarys.message}`,
              //   });
              // }
            });
          break;
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row]);

    return (
      <div className='relative w-full'>
        {row?.resultType === 'V' && (
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <Form.Input
                label=''
                type='text'
                placeholder={row?.result || 'Result'}
                maxLength={50}
                name={`field-${rowIndex}`}
                pattern={FormHelper.patterns.decimalPatterm}
                className={
                  'w-full leading-4 p-2 h-10 focus:outline-none focus:ring block shadow-sm border-2  rounded-md text-black'
                }
                hasError={!!errors.result}
                onBlur={result => {
                  if (result) {
                    onChange(
                      Number.parseFloat(result).toFixed(row?.picture || 0),
                    );
                    onSelect({
                      result: Number.parseFloat(result).toFixed(
                        row?.picture || 0,
                      ),
                      numeric: result,
                    });
                  }
                }}
              />
            )}
            name='result'
            rules={{
              required: false,
              pattern: FormHelper.patterns.decimalPatterm,
            }}
          />
        )}
        {row.resultType === 'D' && (
          <select
            className={
              'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
            }
            onChange={e => {
              const defaultItem = JSON.parse(e.target.value);
              if (defaultItem)
                onSelect({
                  result: defaultItem.possibleValue,
                  alpha: defaultItem.result,
                  abnFlag: defaultItem.abNormal,
                  critical: defaultItem.critical,
                });
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
        )}
        {row.resultType === 'L' && (
          <select
            className={
              'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
            }
            onChange={e => {
              const item = JSON.parse(e.target.value);
              if (item)
                onSelect({
                  result: item.libraryCode + ' - ' + item.description,
                  alpha: item?.libraryCode,
                  abnFlag: item?.abNormal || false,
                  critical: item?.critical || false,
                });
            }}
          >
            <option>Select</option>
            {libraryList?.map((item: any, index: number) => (
              <option key={index} value={JSON.stringify(item)}>
                {`${item.libraryCode} - ${item.description}`}
              </option>
            ))}
          </select>
        )}
        {row.resultType === 'F' && (
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <Form.MultilineInput
                rows={2}
                label=''
                placeholder={row?.result}
                hasError={!!errors.result}
                onBlur={result => {
                  onChange(result);
                  if (result)
                    onSelect({
                      result,
                      alpha: `F - ${row._id}`,
                    });
                }}
              />
            )}
            name='result'
            rules={{ required: false }}
          />
        )}
        {row.resultType === 'M' && (
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                loader={false}
                placeholder='Search by code'
                data={{
                  list: libraryList || [],
                  selected: generalResultEntryStore.selectedItems?.library,
                  displayKey: ['code', 'description'],
                }}
                hasError={!!errors.testName}
                onUpdate={item => {
                  const items = generalResultEntryStore.selectedItems?.library;
                  if (items)
                    onSelect({
                      result: JSON.stringify(
                        _.map(items, o => _.pick(o, ['code'])),
                      ),
                      alpha: `M - ${row._id}`,
                    });
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
                  onChange(new Date());
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
            )}
            name='result'
            rules={{ required: false }}
            defaultValue={libraryList}
          />
        )}
        {(row?.resultType === 'FR' || row?.resultType == 'BO') && (
          <Form.InputFile
            label='File'
            placeholder={'File'}
            accept='application/pdf'
            onChange={e => {
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
        {row?.resultType === 'W' && (
          <>
            <Tooltip tooltipText='Expand library detail'>
              <FaWordpressSimple
                size={'30'}
                onClick={() => {
                  setModalDocxContent({
                    visible: true,
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
                onSelect({
                  result: details,
                  alpha: `W - ${row._id}`,
                });
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
