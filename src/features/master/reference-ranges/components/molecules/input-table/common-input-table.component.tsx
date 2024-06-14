import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Toast,
} from '@/library/components';
import { lookupItems, lookupValue } from '@/library/utils';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { Controller } from 'react-hook-form';

interface CommonInputTableProps {
  data?: any;
  isVersionUpgrade?: boolean;
  isReload?: boolean;
  reset: any;
  setValue: any;
  clearErrors: any;
  setError: any;
  control: any;
  errors: any;
}

export const CommonInputTable = observer(
  ({
    data,
    isVersionUpgrade = false,
    isReload = false,
    reset,
    setValue,
    clearErrors,
    setError,
    control,
    errors,
  }: CommonInputTableProps) => {
    const {
      loading,
      refernceRangesStore,
      masterAnalyteStore,
      departmentStore,
      routerStore,
      interfaceManagerStore,
      loginStore,
      labStore,
    } = useStores();
    const [listAnalyte, setListAnalyte] = useState([]);
    const [isDisableLab, setIsDisableLab] = useState<boolean>(false);
    const [isDisableEquipmentType, setIsDisableEquipmentType] =
      useState<boolean>(false);

    useEffect(() => {
      setError('department');
      setError('analyte');
      setError('species');
      setError('sex');
      setError('rangeSetOn');
      reset();
      // setValue('species', refernceRangesStore.referenceRanges?.species);
      // setValue('rangeSetOn', refernceRangesStore.referenceRanges?.rangeSetOn);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReload]);

    useEffect(() => {
      switch (refernceRangesStore.referenceRanges?.rangeSetOn) {
        case 'I':
          setIsDisableEquipmentType(false);
          setError('equipmentType', { type: 'onBlur' });
          setIsDisableLab(true);
          clearErrors('lab');
          refernceRangesStore.updateReferenceRanges({
            ...refernceRangesStore.referenceRanges,
            lab: undefined,
          });
          break;
        case 'L':
          setIsDisableEquipmentType(true);
          clearErrors('equipmentType');
          setIsDisableLab(false);
          setError('lab', { type: 'onBlur' });
          refernceRangesStore.updateReferenceRanges({
            ...refernceRangesStore.referenceRanges,
            instType: undefined,
          });
          break;
        case 'B':
          setIsDisableEquipmentType(false);
          setError('equipmentType', { type: 'onBlur' });
          setIsDisableLab(false);
          setError('lab', { type: 'onBlur' });
          break;
        case 'A':
          setIsDisableEquipmentType(true);
          clearErrors('equipmentType');
          setIsDisableLab(true);
          clearErrors('lab');
          refernceRangesStore.updateReferenceRanges({
            ...refernceRangesStore.referenceRanges,
            instType: undefined,
            lab: undefined,
          });
          break;
        default:
          break;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refernceRangesStore.referenceRanges?.rangeSetOn]);

    return (
      <div
        className='flex flex-row gap-2 items-center'
        style={{ minWidth: '500px' }}
      >
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs'>
              <th className='text-white' style={{ minWidth: '190px' }}>
                Department
              </th>
              <th className='text-white' style={{ minWidth: '190px' }}>
                Analyte
              </th>
              <th className='text-white' style={{ minWidth: '150px' }}>
                Species
              </th>
              <th className='text-white' style={{ minWidth: '150px' }}>
                Sex
              </th>
              <th className='text-white' style={{ minWidth: '150px' }}>
                Range_Set_On
              </th>
              <th className='text-white' style={{ minWidth: '190px' }}>
                Lab
              </th>
              <th className='text-white' style={{ minWidth: '190px' }}>
                Inst Type
              </th>
            </tr>
          </thead>
          <tbody className='text-xs'>
            <tr>
              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.department}
                      displayValue={value}
                      placeholder='Search by code or name'
                      data={{
                        list: departmentStore.listDepartment.filter(
                          item => item.status == 'A',
                        ),
                        displayKey: ['code', 'name'],
                      }}
                      disable={isVersionUpgrade ? true : false}
                      onFilter={(value: string) => {
                        departmentStore.DepartmentService.filterByFields({
                          input: {
                            filter: {
                              fields: ['code', 'name'],
                              srText: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        });
                      }}
                      onSelect={item => {
                        onChange(item.code);
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          department: item.code,
                        });
                        if (item.code) {
                          masterAnalyteStore.masterAnalyteService
                            .findByFields({
                              input: {
                                filter: {
                                  lab: loginStore.login.lab,
                                  departments: item.code,
                                  status: 'A',
                                },
                              },
                            })
                            .then(res => {
                              if (res.findByFieldsAnalyteMaster.success) {
                                setListAnalyte(
                                  res.findByFieldsAnalyteMaster?.data,
                                );
                              } else {
                                Toast.error({
                                  message: '😔 Analyte list not found',
                                });
                              }
                            });
                        }
                        departmentStore.updateDepartmentList(
                          departmentStore.listDepartmentCopy,
                        );
                      }}
                    />
                  )}
                  name='department'
                  rules={{ required: true }}
                  defaultValue={''}
                />
              </td>
              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.analyte}
                      placeholder='Search by code or name'
                      disable={
                        isVersionUpgrade
                          ? true
                          : refernceRangesStore.referenceRanges?.department
                          ? false
                          : true
                      }
                      displayValue={value}
                      data={{
                        list: listAnalyte,
                        displayKey: ['analyteCode', 'analyteName'],
                      }}
                      onFilter={(value: string) => {
                        const result = listAnalyte.filter((item: any) =>
                          item.analyteCode
                            ?.toLowerCase()
                            .includes(value?.toLowerCase()),
                        );
                        setListAnalyte(result);
                      }}
                      onSelect={item => {
                        onChange(item.analyteCode);
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          analyteCode: item.analyteCode,
                          analyteName: item.analyteName,
                          analyteDepartments: item.departments,
                          lab: item.lab,
                          picture: item.picture,
                        });
                        masterAnalyteStore.updateMasterAnalyteList(
                          masterAnalyteStore.listMasterAnalyteCopy,
                        );
                      }}
                    />
                  )}
                  name='analyte'
                  rules={{ required: true }}
                  defaultValue=''
                />
              </td>
              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      value={value}
                      disabled={isVersionUpgrade}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.species ? 'border-red  ' : 'border-gray-300'
                      } rounded-md`}
                      onChange={e => {
                        const species = e.target.value as string;
                        onChange(species);
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          species,
                        });
                      }}
                    >
                      <option>Select</option>
                      {lookupItems(routerStore.lookupItems, 'SPECIES').map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ),
                      )}
                    </select>
                  )}
                  name='species'
                  rules={{ required: true }}
                  defaultValue=''
                />
              </td>
              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      value={value}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.sex ? 'border-red  ' : 'border-gray-300'
                      } rounded-md`}
                      onChange={e => {
                        const sex = e.target.value as string;
                        onChange(sex);
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          sex,
                        });
                      }}
                    >
                      <option>Select</option>
                      {lookupItems(routerStore.lookupItems, 'SEX').map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ),
                      )}
                    </select>
                  )}
                  name='sex'
                  rules={{ required: true }}
                  defaultValue=''
                />
              </td>
              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <select
                      value={value}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.rangeSetOn ? 'border-red  ' : 'border-gray-300'
                      } rounded-md`}
                      onChange={e => {
                        const rangeSetOn = e.target.value as string;
                        onChange(rangeSetOn);
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          rangeSetOn,
                          instType:
                            rangeSetOn === 'L'
                              ? undefined
                              : refernceRangesStore.referenceRanges?.instType,
                          lab:
                            rangeSetOn === 'I'
                              ? undefined
                              : refernceRangesStore.referenceRanges?.lab,
                        });
                      }}
                    >
                      <option>Select</option>
                      {lookupItems(routerStore.lookupItems, 'RANGE_SET_ON').map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ),
                      )}
                    </select>
                  )}
                  name='rangeSetOn'
                  rules={{ required: true }}
                  defaultValue=''
                />
              </td>
              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Search by code or name'
                      hasError={!!errors.lab}
                      data={{
                        list: labStore.listLabs?.filter(
                          item => item.status == 'A',
                        ),
                        displayKey: ['code', 'name'],
                      }}
                      displayValue={value}
                      disable={isDisableLab}
                      onFilter={(value: string) => {
                        labStore.LabService.filterByFields({
                          input: {
                            filter: {
                              fields: ['code', 'name'],
                              srText: value,
                            },
                            page: 0,
                            limit: 10,
                          },
                        });
                      }}
                      onSelect={item => {
                        onChange(item.code);
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          lab: item.code,
                        });
                        labStore.updateLabList(labStore.listLabsCopy);
                      }}
                    />
                  )}
                  name='lab'
                  rules={{ required: !isDisableLab }}
                  defaultValue=''
                />
              </td>
              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      placeholder='Search by inst type'
                      hasError={!!errors.equipmentType}
                      disable={isDisableEquipmentType}
                      data={{
                        list: interfaceManagerStore.listInterfaceManager,
                        displayKey: ['instrumentType'],
                      }}
                      displayValue={value}
                      onFilter={(value: string) => {
                        interfaceManagerStore.interfaceManagerService.filterByFields(
                          {
                            input: {
                              filter: {
                                fields: ['instrumentType'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          },
                        );
                      }}
                      onSelect={item => {
                        onChange(item.instrumentType);
                        refernceRangesStore.updateReferenceRanges({
                          ...refernceRangesStore.referenceRanges,
                          instType: item.instrumentType,
                        });
                        interfaceManagerStore.updateInterfaceManagerList(
                          interfaceManagerStore.listInterfaceManagerCopy,
                        );
                      }}
                    />
                  )}
                  name='equipmentType'
                  rules={{ required: !isDisableEquipmentType }}
                  defaultValue=''
                />
              </td>
            </tr>
          </tbody>
        </Table>
        ;
        {/* <Buttons.Button
          size='medium'
          type='solid'
          onClick={handleSubmit(addItem)}
        >
          <Icons.EvaIcon icon='plus-circle-outline' />
          {'Add'}
        </Buttons.Button> */}
      </div>
    );
  },
);
