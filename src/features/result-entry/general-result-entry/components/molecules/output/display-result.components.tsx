import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {
  Form,
  Tooltip,
  Icons,
  Toast,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import {observer} from 'mobx-react';
import {FormHelper} from '@/helper';
import {useStores} from '@/stores';
import {useForm} from 'react-hook-form';
interface DisplayResultProps {
  row: any;
  onSelect?: (item) => void;
}

export const DisplayResult = observer(({row, onSelect}: DisplayResultProps) => {
  const {
    patientResultStore,
    possibleResultsStore,
    libraryStore,
    generalResultEntryStore,
  } = useStores();
  const {control} = useForm();
  const [conclusionResult, setConclusionResult] = useState<Array<any>>();
  const [libraryList, setLibraryList] = useState<Array<any>>();
  const resultRef = useRef<any>();

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
              Toast.warning({
                message: `😔 ${res.findByFieldsLibrarys.message}`,
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
      {row?.resultType == 'V' ? (
        !row?.result ? (
          <Form.Input1
            key={row?._id}
            label=''
            name={`field-${row.index}`}
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
            placeholder='Result'
            defaultValue={row?.result}
            maxLength={50}
            pattern={FormHelper.patterns.decimalPatterm}
            className={
              'w-full leading-4 p-2 h-10 focus:outline-none focus:ring block shadow-sm sm:text-base border-2  rounded-md'
            }
            onBlur={e => {
              const {name} = e.target;
              const [fieldName, fieldIndex] = name.split('-');
              const fieldIntIndex = Number.parseInt(fieldIndex, 10);
              const nextfield: any = document.querySelector(
                `[name=field-${fieldIntIndex + 1}]`,
              );
              if (nextfield !== null) {
                nextfield.focus();
              }

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
          <select
            name={`field-${row.index}`}
            className={
              'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
            }
            onChange={e => {
              const [fieldName, fieldIndex] = e.target.name.split('-');
              const fieldIntIndex = Number.parseInt(fieldIndex, 10);
              const nextfield: any = document.querySelector(
                `[name=field-${fieldIntIndex + 1}]`,
              );
              if (nextfield !== null) {
                nextfield.focus();
              }
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
              const [fieldName, fieldIndex] = e.target.name.split('-');
              const fieldIntIndex = Number.parseInt(fieldIndex, 10);
              const nextfield: any = document.querySelector(
                `[name=field-${fieldIntIndex + 1}]`,
              );
              if (nextfield !== null) {
                nextfield.focus();
              }
              const item = JSON.parse(e.target.value);
              if (item) {
                onSelect &&
                  onSelect({
                    result: item.description,
                    alpha: item?.code,
                    abnFlag: item?.abNormal || false,
                    critical: item?.critical || false,
                  });
              }
            }}
          >
            <option selected>Select</option>
            {libraryList?.map((item: any, index: number) => (
              <option key={index} value={JSON.stringify(item)}>
                {`${item.code} - ${item.description}`}
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
            onBlur={e => {
              const [fieldName, fieldIndex] = e.target.name.split('-');
              const fieldIntIndex = Number.parseInt(fieldIndex, 10);
              const nextfield: any = document.querySelector(
                `[name=field-${fieldIntIndex + 1}]`,
              );
              if (nextfield !== null) {
                nextfield.focus();
              }
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
              const [fieldName, fieldIndex] = e.target.name.split('-');
              const fieldIntIndex = Number.parseInt(fieldIndex, 10);
              const nextfield: any = document.querySelector(
                `[name=field-${fieldIntIndex + 1}]`,
              );
              if (nextfield !== null) {
                nextfield.focus();
              }
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

      {(row?.resultType == 'FR' || row?.resultType == 'BO') && !row.result && (
        <Form.InputFile
          label='File'
          name={`field-${row.index}`}
          placeholder={'File'}
          accept='application/pdf'
          onChange={e => {
            const [fieldName, fieldIndex] = e.target.name.split('-');
            const fieldIntIndex = Number.parseInt(fieldIndex, 10);
            const nextfield: any = document.querySelector(
              `[name=field-${fieldIntIndex + 1}]`,
            );
            if (nextfield !== null) {
              nextfield.focus();
            }
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
      {(row?.resultType == 'FR' || row?.resultType == 'BO') && row?.result && (
        <div className='flex'>
          <Tooltip tooltipText='Report'>
            <Icons.IconContext
              size='20'
              color='#000'
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
    </div>
  );
});
