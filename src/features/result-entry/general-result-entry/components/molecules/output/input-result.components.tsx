import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {
  Form,
  Toast,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {useForm, Controller} from 'react-hook-form';
import {FormHelper} from '@/helper';
interface InputResultProps {
  row: any;
  onSelect: (item) => void;
}

export const InputResult = observer(({row, onSelect}: InputResultProps) => {
  const {
    possibleResultsStore,
    labStore,
    libraryStore,
    generalResultEntryStore,
  } = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    clearErrors,
  } = useForm();
  const [conclusionResult, setConclusionResult] = useState<Array<any>>();
  const [labList, setLabList] = useState<Array<any>>();
  const [libraryList, setLibraryList] = useState<Array<any>>();

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
      case 'L': {
        labStore.LabService.findByFields({
          input: {
            filter: {
              labType: 'R',
            },
          },
        }).then(res => {
          if (res.findByFieldsLabs.success) {
            setLabList(res.findByFieldsLabs?.data);
          } else {
            Toast.warning({
              message: `😔 ${res.findByFieldsLabs.message}`,
            });
          }
        });

        break;
      }
      case 'M': {
        libraryStore.libraryService
          .findByFields({
            input: {
              filter: {
                libraryType: 'R',
              },
            },
          })
          .then(res => {
            if (res.findByFieldsLibrarys.success) {
              setLibraryList(res.findByFieldsLibrarys?.data);
            } else {
              Toast.warning({
                message: `😔 ${res.findByFieldsLibrarys.message}`,
              });
            }
          });

        break;
      }
      // No default
    }
  }, [row]);

  return (
    <div className='relative w-full'>
      {row?.resultType === 'V' && (
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Form.Input
              label=''
              type='text'
              placeholder='Result'
              maxLength={50}
              pattern={FormHelper.patterns.decimalPatterm}
              className={
                'w-full leading-4 p-2 h-10 focus:outline-none focus:ring block shadow-sm sm:text-base border-2  rounded-md'
              }
              hasError={errors.result}
              onBlur={result => {
                onChange(result);
                onSelect({result});
              }}
            />
          )}
          name='result'
          rules={{required: false, pattern: FormHelper.patterns.decimalPatterm}}
        />
      )}
      {row.resultType === 'D' && (
        <select
          className={
            'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
          }
          onChange={e => {
            const defaultItem = JSON.parse(e.target.value);
            onSelect({
              result: defaultItem.result,
              alpha: defaultItem.possibleValue,
              abnFlag: defaultItem.abNormal,
              critical: defaultItem.critical,
            });
          }}
        >
          <option selected>Select</option>
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
            onSelect({
              result: item.code,
              abnFlag: item?.abNormal,
              critical: item?.critical,
            });
          }}
        >
          <option selected>Select</option>
          {labList?.map((item: any, index: number) => (
            <option key={index} value={JSON.stringify(item)}>
              {`${item.code} - ${item.name}`}
            </option>
          ))}
        </select>
      )}
      {row.resultType === 'F' && (
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Form.MultilineInput
              rows={2}
              label=''
              placeholder='Result'
              hasError={errors.result}
              onBlur={result => {
                onChange(result);
                onSelect({result});
              }}
            />
          )}
          name='result'
          rules={{required: false}}
        />
      )}
      {row.resultType === 'M' && (
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <AutoCompleteFilterMutiSelectMultiFieldsDisplay
              loader={false}
              placeholder='Search by code'
              data={{
                list: libraryList || [],
                selected: generalResultEntryStore.selectedItems?.library,
                displayKey: ['code', 'description'],
              }}
              hasError={errors.testName}
              onUpdate={item => {
                const items = generalResultEntryStore.selectedItems?.library;
                onSelect({
                  result: JSON.stringify(
                    _.map(items, o => _.pick(o, ['code'])),
                  ),
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
          rules={{required: false}}
          defaultValue={libraryList}
        />
      )}
    </div>
  );
});
