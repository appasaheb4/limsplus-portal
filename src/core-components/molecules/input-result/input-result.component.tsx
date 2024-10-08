import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Form,
  Toast,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { useForm, Controller } from 'react-hook-form';
import { FormHelper } from '@/helper';

interface InputResultProps {
  label?: string;
  row: any;
  onSelect: (item) => void;
  onError: (error: string) => void;
}

export const InputResult = observer(
  ({ label = '', row, onSelect, onError }: InputResultProps) => {
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
    const [labList, setLabList] = useState<Array<any>>();
    const [libraryList, setLibraryList] = useState<Array<any>>();

    useEffect(() => {
      switch (row?.resultType) {
        case 'D': {
          if (!row?.analyteCode) return onError('Please enter analyte code');
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
                Toast.error({
                  message: '😔 Possible result records not founds',
                });
              }
            });
          break;
        }
        case 'L':
        case 'M': {
          if (!row?.pLab && !row.departement)
            return onError('Please enter lab and department');
          libraryStore.libraryService
            .findByFields({
              input: {
                filter: {
                  libraryType: 'R',
                  lab: row?.pLab,
                  department: row?.departement,
                },
              },
            })
            .then(res => {
              if (res.findByFieldsLibrarys.success) {
                setLibraryList(res.findByFieldsLibrarys?.data);
              } else {
                Toast.error({
                  message: '😔 Library records not founds',
                });
              }
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
                label={label}
                type='number'
                placeholder={row?.result || label}
                maxLength={50}
                pattern={FormHelper.patterns.decimalPatterm}
                className={
                  'w-full leading-4 p-2 h-10 focus:outline-none focus:ring block shadow-sm sm:text-base border-2  rounded-md'
                }
                hasError={!!errors.result}
                onBlur={result => {
                  onChange(
                    Number.parseFloat(result).toFixed(row?.picture || 0),
                  );
                  onSelect({
                    result: Number.parseFloat(result).toFixed(
                      row?.picture || 0,
                    ),
                    numeric: result,
                  });
                  if (!row?.picture)
                    return onError('Please enter picture value');
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
          <Form.InputWrapper label={label}>
            <select
              className={
                'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
              }
              onChange={e => {
                const defaultItem = JSON.parse(e.target.value);
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
          </Form.InputWrapper>
        )}
        {row.resultType === 'L' && (
          <Form.InputWrapper label={label}>
            <select
              className={
                'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
              }
              onChange={e => {
                const item = JSON.parse(e.target.value);
                onSelect({
                  result: item.description,
                  alpha: item?.code,
                  abnFlag: item?.abNormal || false,
                  critical: item?.critical || false,
                });
              }}
            >
              <option>Select</option>
              {libraryList?.map((item: any, index: number) => (
                <option key={index} value={JSON.stringify(item)}>
                  {`${item.code} - ${item.description}`}
                </option>
              ))}
            </select>
          </Form.InputWrapper>
        )}
        {row.resultType === 'F' && (
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <Form.MultilineInput
                rows={2}
                label={label}
                placeholder={row?.result || label}
                hasError={!!errors.result}
                onBlur={result => {
                  onChange(result);
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
              <Form.InputWrapper label={label}>
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
                    const items =
                      generalResultEntryStore.selectedItems?.library;
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
                    let library =
                      generalResultEntryStore.selectedItems?.library;
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
              </Form.InputWrapper>
            )}
            name='result'
            rules={{ required: false }}
            defaultValue={libraryList}
          />
        )}
      </div>
    );
  },
);
