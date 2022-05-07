/* eslint-disable */
import React from 'react';
import {observer} from 'mobx-react';
import {useForm, Controller} from 'react-hook-form';

import {
  Toast,
  Icons,
  AutocompleteGroupBy,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';

import {dashboardRouter as dashboardRoutes} from '@/routes';
let router = dashboardRoutes;
import {DocumentSettingHoc} from '../hoc';
import {useStores} from '@/stores';

interface NewFieldProps {
  onModalConfirm?: (item: any) => void;
}

export const DocumentSettings = DocumentSettingHoc(
  observer((props: NewFieldProps) => {
    const {loginStore, lookupStore, routerStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
    } = useForm();
    setValue('environment', lookupStore.lookup?.environment);
    const onSubmitNewField = (data: any) => {
      if (
        lookupStore.localInput.value === '' &&
        lookupStore.localInput.value === ''
      ) {
        lookupStore.LookupService.addLookup({
          input: {...lookupStore.lookup},
        }).then(res => {
          if (res.createLookup.success) {
            Toast.success({
              message: `😊 ${res.createLookup.message}`,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
      } else {
        Toast.warning({
          message: `😔 Please add code and value then submit.`,
        });
      }
    };

    return (
      <div className={'p-2 rounded-lg shadow-xl'}>
        <Grid cols={2}>
          <List direction='col' space={4} justify='stretch' fill>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Form.InputWrapper
                  hasError={errors.documentName}
                  label='Document Name'
                >
                  <AutocompleteGroupBy
                    hasError={errors.documentName}
                    data={router}
                    onChange={async (item: any, children: any) => {
                      const documentName = {
                        name: item.name,
                        title: item.title,
                        path: item.path,
                        children,
                      };
                      onChange(documentName);
                      lookupStore.updateLookup({
                        ...lookupStore.lookup,
                        documentName,
                      });
                    }}
                  />
                </Form.InputWrapper>
              )}
              name='documentName'
              rules={{required: true}}
              defaultValue=''
            />
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Form.Input
                  label='Field Name'
                  placeholder='Field Name'
                  hasError={errors.fieldName}
                  value={lookupStore.lookup?.fieldName}
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
              rules={{required: true}}
              defaultValue=''
            />
            <Form.InputWrapper label='Code & Value'>
              <Grid cols={3}>
                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
                    <Form.Input
                      placeholder='Code'
                      value={lookupStore.localInput.code}
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
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange}}) => (
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
                  rules={{required: false}}
                  defaultValue=''
                />
                <div className='mt-2 flex flex-row justify-between'>
                  <Form.Toggle
                    label='Enable Upper Case'
                    hasError={errors.method}
                    value={lookupStore.flagUpperCase}
                    onChange={flag => {
                      lookupStore.updateFlagUppperCase(flag);
                    }}
                  />
                  <Buttons.Button
                    size='medium'
                    type='solid'
                    onClick={() => {
                      const value = lookupStore.localInput.value;
                      const code = lookupStore.localInput.code;
                      let arrValue = lookupStore.lookup?.arrValue || [];
                      if (value === undefined || code === undefined)
                        return alert('Please enter value and code.');
                      if (value !== undefined) {
                        arrValue !== undefined
                          ? arrValue.push({
                              value,
                              code,
                            })
                          : (arrValue = [
                              {
                                value,
                                code,
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
                    {`Add`}
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
                            lookupStore.lookup?.arrValue?.slice(0, index) || [];
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
              render={({field: {onChange}}) => (
                <Form.InputWrapper
                  hasError={errors.defaulItem}
                  label='Default Item'
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.defaultLab ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                    onChange={e => {
                      let defaultItem = JSON.parse(e.target.value);
                      defaultItem = [
                        {code: defaultItem.code, value: defaultItem.value},
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
                          <option key={item.name} value={JSON.stringify(item)}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        ),
                      )}
                  </select>
                </Form.InputWrapper>
              )}
              name='defaulItem'
              rules={{required: false}}
              defaultValue=''
            />
          </List>

          <List direction='col' space={4} justify='stretch' fill>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Form.MultilineInput
                  rows={4}
                  label='Description'
                  name='txtDescription'
                  placeholder='Description'
                  value={lookupStore.lookup?.description}
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
              rules={{required: false}}
              defaultValue=''
            />

            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <Form.InputWrapper label='Environment'>
                  <select
                    value={lookupStore.lookup?.environment}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.environment ? 'border-red-500' : 'border-gray-300'
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
                      {loginStore.login && loginStore.login.role !== 'SYSADMIN'
                        ? `Select`
                        : lookupStore.lookup?.environment || `Select`}
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
              rules={{required: true}}
              defaultValue=''
            />
          </List>
        </Grid>
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
