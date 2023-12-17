import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';

import {
  Toast,
  Icons,
  AutocompleteGroupBy,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ManualImportTabs,
  StaticInputLookupTable,
  ImportFile,
} from '@/library/components';
import { lookupItems, lookupValue } from '@/library/utils';

import { dashboardRouter as dashboardRoutes } from '@/routes';
const router = dashboardRoutes;
import { DocumentSettingHoc } from '../hoc';
import { useStores } from '@/stores';
import { resetLookup } from '../startup';
import { LocalInput } from '../models';
import * as XLSX from 'xlsx';
import { AutoCompleteCompanyList } from '@/core-components';

interface DocumentSettingsProps {
  onClose: () => void;
  onModalConfirm?: (item: any) => void;
}

export const DocumentSettings = DocumentSettingHoc(
  observer(({ onClose, onModalConfirm }: DocumentSettingsProps) => {
    const { loginStore, lookupStore, routerStore } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

    const onSubmitNewField = (data: any) => {
      if (lookupStore.lookup.arrValue?.length == 0 && !isImport) {
        return Toast.warning({
          message: '😔 Please add code and value then submit.',
        });
      }
      lookupStore.LookupService.addLookup({
        input: isImport
          ? { isImport, arrImportRecords }
          : { isImport, ...lookupStore.lookup },
      }).then(res => {
        if (res.createLookup.success) {
          Toast.success({
            message: `😊 ${res.createLookup.message}`,
          });
          reset();
          resetLookup();
          lookupStore.updateLocalInput(new LocalInput({}));
          setArrImportRecords([]);
          onClose();
          setIsImport(false);
        }
      });
    };

    useEffect(() => {
      setValue('environment', lookupStore.lookup?.environment);
      setValue('status', lookupStore.lookup?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lookupStore.lookup]);

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });
        let list = data.map((item: any) => {
          const record: any = {};
          router.filter((r: any) => {
            r?.children?.find((e: any) => {
              if (e?.name == item['Document Name']) {
                record.name = r?.name;
                record.title = r?.title || r?.name;
                record.path = r?.path;
                record.children = e;
              } else return;
            });
          });
          return {
            documentName: record,
            fieldName: item['Field Name'],
            arrValue: undefined,
            description: item?.Description,
            defaultItem: undefined,
            environment: item?.Environment,
            companyCode: item['Company Code'],
            status: 'D',
          };
        });
        list = list.filter(item => !_.isEmpty(item.documentName));
        //console.log({ list });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    return (
      <div className={'p-2 rounded-lg shadow-xl'}>
        <ManualImportTabs
          isImport={isImport}
          onClick={flag => {
            setIsImport(flag);
          }}
        />
        {!isImport ? (
          <Grid cols={2}>
            <List direction='col' space={4} justify='stretch' fill>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.InputWrapper
                    hasError={!!errors.documentName}
                    label='Document Name'
                  >
                    <AutocompleteGroupBy
                      hasError={!!errors.documentName}
                      data={router}
                      displayValue={value}
                      onChange={async (item: any, children: any) => {
                        const documentName = {
                          name: item.name,
                          title: item.title,
                          path: item.path,
                          children,
                        };
                        onChange(documentName.name);
                        lookupStore.updateLookup({
                          ...lookupStore.lookup,
                          documentName,
                        });
                      }}
                    />
                  </Form.InputWrapper>
                )}
                name='documentName'
                rules={{ required: true }}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.Input
                    label='Field Name'
                    placeholder='Field Name'
                    hasError={!!errors.fieldName}
                    value={value}
                    onChange={fieldName => {
                      onChange(fieldName.toUpperCase());
                      lookupStore.updateLookup({
                        ...lookupStore.lookup,
                        fieldName: fieldName.toUpperCase(),
                      });
                    }}
                  />
                )}
                name='fieldName'
                rules={{ required: true }}
                defaultValue=''
              />
              <Form.InputWrapper label='Code & Value'>
                <Grid cols={3}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        placeholder='Code'
                        value={value}
                        onChange={code => {
                          onChange(code.toUpperCase());
                          lookupStore.updateLocalInput({
                            ...lookupStore.localInput,
                            code: lookupStore.flagUpperCase
                              ? code.toUpperCase()
                              : code,
                          });
                        }}
                      />
                    )}
                    name='code'
                    rules={{ required: false }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.Input
                        placeholder='Value'
                        value={lookupStore.localInput.value || ''}
                        onChange={value => {
                          onChange(value);
                          lookupStore.updateLocalInput({
                            ...lookupStore.localInput,
                            value,
                          });
                        }}
                      />
                    )}
                    name='value'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <div className='mt-2 flex flex-row justify-between'>
                    <Form.Toggle
                      label='Enable Upper Case'
                      hasError={!!errors.method}
                      value={lookupStore.localInput.flagUpperCase}
                      onChange={flagUpperCase => {
                        lookupStore.updateLocalInput({
                          ...lookupStore.localInput,
                          flagUpperCase,
                        });
                        lookupStore.updateFlagUppperCase(flagUpperCase);
                      }}
                    />
                    <Buttons.Button
                      size='medium'
                      type='solid'
                      onClick={() => {
                        const value = lookupStore.localInput.value;
                        const code = lookupStore.localInput.code;
                        const flagUpperCase =
                          lookupStore.localInput.flagUpperCase;
                        let arrValue = lookupStore.lookup?.arrValue || [];
                        if (value === undefined || code === undefined)
                          return alert('Please enter value and code.');
                        if (value !== undefined) {
                          arrValue !== undefined
                            ? arrValue.push({
                                value,
                                code,
                                flagUpperCase,
                              })
                            : (arrValue = [
                                {
                                  value,
                                  code,
                                  flagUpperCase,
                                },
                              ]);
                          lookupStore.updateLookup({
                            ...lookupStore.lookup,
                            arrValue,
                          });
                          lookupStore.updateLocalInput({
                            ...lookupStore.localInput,
                            value: '',
                            code: '',
                          });
                        }
                      }}
                    >
                      <Icons.EvaIcon icon='plus-circle-outline' />
                      {'Add'}
                    </Buttons.Button>
                  </div>
                  <div className='clearfix'></div>
                </Grid>

                <List space={2} direction='row' justify='center'>
                  <div>
                    {lookupStore.lookup?.arrValue?.map((item, index) => (
                      <div className='mb-2' key={index}>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          icon={Svg.Remove}
                          onClick={() => {
                            const firstArr =
                              lookupStore.lookup?.arrValue?.slice(0, index) ||
                              [];
                            const secondArr =
                              lookupStore.lookup?.arrValue?.slice(index + 1) ||
                              [];
                            const finalArray = [...firstArr, ...secondArr];
                            lookupStore.updateLookup({
                              ...lookupStore.lookup,
                              arrValue: finalArray,
                            });
                          }}
                        >
                          {`${item.value} - ${item.code}`}
                        </Buttons.Button>
                      </div>
                    ))}
                  </div>
                </List>
              </Form.InputWrapper>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.InputWrapper
                    hasError={!!errors.defaulItem}
                    label='Default Item'
                  >
                    <select
                      // value={value}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.defaultLab ? 'border-red' : 'border-gray-300'
                      } rounded-md`}
                      onChange={e => {
                        let defaultItem = JSON.parse(e.target.value);
                        defaultItem = [
                          { code: defaultItem.code, value: defaultItem.value },
                        ];
                        onChange(defaultItem);
                        lookupStore.updateLookup({
                          ...lookupStore.lookup,
                          defaultItem,
                        });
                      }}
                    >
                      <option selected>Select</option>
                      {lookupStore.lookup &&
                        lookupStore.lookup.arrValue &&
                        lookupStore.lookup.arrValue.map(
                          (item: any, index: number) => (
                            <option
                              key={item.name}
                              value={JSON.stringify(item)}
                            >
                              {`${item.value} - ${item.code}`}
                            </option>
                          ),
                        )}
                    </select>
                  </Form.InputWrapper>
                )}
                name='defaulItem'
                rules={{ required: false }}
                defaultValue=''
              />
            </List>

            <List direction='col' space={4} justify='stretch' fill>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.MultilineInput
                    rows={4}
                    label='Description'
                    name='txtDescription'
                    placeholder='Description'
                    value={value}
                    onChange={description => {
                      onChange(description);
                      lookupStore.updateLookup({
                        ...lookupStore.lookup,
                        description,
                      });
                    }}
                  />
                )}
                name='description'
                rules={{ required: false }}
                defaultValue=''
              />
              {/* <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <AutoCompleteCompanyList
                    hasError={!!errors.companyCode}
                    onSelect={companyCode => {
                      onChange(companyCode);
                      lookupStore.updateLookup({
                        ...lookupStore.lookup,
                        companyCode,
                      });
                    }}
                  />
                )}
                name='companyCode'
                rules={{ required: true }}
                defaultValue=''
              /> */}
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.InputWrapper label='Status' hasError={!!errors.status}>
                    <select
                      value={value}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? 'border-red  ' : 'border-gray-300'
                      } rounded-md`}
                      onChange={e => {
                        const status = e.target.value;
                        onChange(status);
                        lookupStore.updateLookup({
                          ...lookupStore.lookup,
                          status,
                        });
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(routerStore.lookupItems, 'STATUS').map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ),
                      )}
                    </select>
                  </Form.InputWrapper>
                )}
                name='status'
                rules={{ required: false }}
                defaultValue=''
              />
              {/* <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.InputWrapper label='Environment'>
                    <select
                      // value={value}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? 'border-red' : 'border-gray-300'
                      } rounded-md`}
                      disabled={
                        loginStore.login && loginStore.login.role !== 'SYSADMIN'
                          ? true
                          : false
                      }
                      onChange={e => {
                        const environment = e.target.value;
                        onChange(environment);
                        lookupStore.updateLookup({
                          ...lookupStore.lookup,
                          environment,
                        });
                      }}
                    >
                      <option selected>
                        {loginStore.login &&
                        loginStore.login.role !== 'SYSADMIN'
                          ? 'Select'
                          : lookupStore.lookup?.environment || 'Select'}
                      </option>
                      {lookupItems(routerStore.lookupItems, 'ENVIRONMENT').map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ),
                      )}
                    </select>
                  </Form.InputWrapper>
                )}
                name='environment'
                rules={{ required: true }}
                defaultValue=''
              /> */}
            </List>
          </Grid>
        ) : (
          <>
            {arrImportRecords?.length > 0 ? (
              <StaticInputLookupTable data={arrImportRecords} />
            ) : (
              <ImportFile
                onClick={file => {
                  handleFileUpload(file[0]);
                }}
              />
            )}
          </>
        )}
        <br />
        <List direction='row' space={3} align='center'>
          <Buttons.Button
            size='medium'
            type='solid'
            icon={Svg.Save}
            onClick={handleSubmit(onSubmitNewField)}
          >
            Save
          </Buttons.Button>
          <Buttons.Button
            size='medium'
            type='outline'
            icon={Svg.Remove}
            onClick={() => {
              window.location.reload();
            }}
          >
            Clear
          </Buttons.Button>
        </List>
      </div>
    );
  }),
);
