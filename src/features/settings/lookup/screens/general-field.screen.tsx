import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import {
  Toast,
  Grid,
  List,
  Form,
  AutoCompleteGroupByCheck,
  AutoComplete,
  Buttons,
  Icons,
  Svg,
} from '@/library/components';
import { dashboardRouter as dashboardRoutes } from '@/routes';
const router = dashboardRoutes;
import { GeneralFieldHoc } from '../hoc';
import { useStores } from '@/stores';
import { toJS } from 'mobx';
import { resetLookup } from '../startup';

interface GeneralFieldProps {
  onClose: () => void;
  onModalConfirm?: (item: any) => void;
}

export const GeneralField = GeneralFieldHoc(
  observer((props: GeneralFieldProps) => {
    const { lookupStore, routerStore, loginStore } = useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();

    const onSubmitGeneralFiled = (data: any) => {
      lookupStore.LookupService.generalSettingsUpdate({
        input: {
          ...lookupStore.globalSettings,
          router,
        },
      }).then(res => {
        if (res.lookupGeneralSettingsUpdate.success) {
          Toast.success({
            message: `😊 ${res.lookupGeneralSettingsUpdate.message}`,
          });
          reset();
          resetLookup();
          props.onClose();
        }
      });
    };

    useEffect(() => {
      // Default value initialization
      setValue('environment', lookupStore.globalSettings?.environment);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lookupStore.globalSettings]);

    return (
      <>
        <Grid cols={2}>
          <List direction='col' space={4} justify='stretch' fill>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.InputWrapper
                  hasError={!!errors.documentList}
                  label='Document Name'
                >
                  <AutoCompleteGroupByCheck
                    hasError={!!errors.documentList}
                    data={router}
                    defaultItem={
                      toJS(
                        lookupStore.globalSettings &&
                          lookupStore.globalSettings.documentList,
                      ) || []
                    }
                    onChange={async (item: any) => {
                      onChange(item);
                      lookupStore.updateGlobalSettings({
                        ...lookupStore.globalSettings,
                        documentList: item,
                      });
                    }}
                  />
                </Form.InputWrapper>
              )}
              name='documentList'
              rules={{ required: true }}
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.InputWrapper
                  hasError={!!errors.filedName}
                  label='Global Filed'
                >
                  <AutoComplete
                    hasError={!!errors.filedName}
                    data={{
                      list: toJS(lookupStore.listLookup).filter(
                        (a, i) =>
                          toJS(lookupStore.listLookup).findIndex(
                            s => a.fieldName === s.fieldName,
                          ) === i,
                      ),
                      displayKey: ['fieldName'],
                      findKey: ['fieldName'],
                    }}
                    onChange={(item: any) => {
                      onChange(item?.toUpperCase());
                      lookupStore.updateGlobalSettings({
                        ...lookupStore.globalSettings,
                        fieldName: item?.toUpperCase(),
                      });
                    }}
                  />
                </Form.InputWrapper>
              )}
              name='filedName'
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
                      hasError={!!errors.code}
                      value={lookupStore.localInput.code}
                      onChange={code => {
                        onChange(code?.toUpperCase());
                        lookupStore.updateLocalInput({
                          ...lookupStore.localInput,
                          code: lookupStore.flagUpperCase
                            ? code?.toUpperCase()
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
                      hasError={!!errors.value}
                      value={lookupStore.localInput.value}
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
                      let arrValue = lookupStore.globalSettings?.arrValue || [];
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
                        lookupStore.updateGlobalSettings({
                          ...lookupStore.globalSettings,
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
              </Grid>
              <List space={2} direction='row' justify='center'>
                <div className='mt-2'>
                  {lookupStore.globalSettings?.arrValue?.map((item, index) => (
                    <div className='mb-2' key={index}>
                      <Buttons.Button
                        size='medium'
                        type='solid'
                        icon={Svg.Remove}
                        onClick={() => {
                          const firstArr =
                            lookupStore.globalSettings?.arrValue?.slice(
                              0,
                              index,
                            ) || [];
                          const secondArr =
                            lookupStore.globalSettings?.arrValue?.slice(
                              index + 1,
                            ) || [];
                          const finalArray = [...firstArr, ...secondArr];
                          lookupStore.updateGlobalSettings({
                            ...lookupStore.globalSettings,
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
                    value={value}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.defaultLab ? 'border-red' : 'border-gray-300'
                    } rounded-md`}
                    onChange={e => {
                      let defaultItem = JSON.parse(e.target.value);
                      defaultItem = [
                        {
                          code: defaultItem.code,
                          value: defaultItem.value,
                        },
                      ];
                      onChange(defaultItem);
                      lookupStore.updateGlobalSettings({
                        ...lookupStore.globalSettings,
                        defaultItem,
                      });
                    }}
                  >
                    <option>Select</option>
                    {lookupStore.globalSettings &&
                      lookupStore.globalSettings.arrValue &&
                      lookupStore.globalSettings.arrValue.map(
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
                    lookupStore.updateGlobalSettings({
                      ...lookupStore.globalSettings,
                      description,
                    });
                  }}
                />
              )}
              name='description'
              rules={{ required: false }}
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
            onClick={handleSubmit(onSubmitGeneralFiled)}
          >
            Update
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
      </>
    );
  }),
);
