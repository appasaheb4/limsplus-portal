import React, {useEffect, useState} from 'react';
import {Table} from 'reactstrap';
import dayjs from 'dayjs';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
  Buttons,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {useForm, Controller} from 'react-hook-form';

export const FilterInputTable = observer(() => {
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
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    clearErrors,
    setError,
  } = useForm({mode: 'all'});

  const [isDisableLab, setIsDisableLab] = useState<boolean>(false);
  const [isDisableEquipmentType, setIsDisableEquipmentType] =
    useState<boolean>(false);

  return (
    <div className='flex flex-row gap-2 items-center'>
      <Table striped bordered>
        <thead>
          <tr className='p-0 text-xs'>
            <th className='text-white sticky left-0 z-10'>PLab</th>
            <th className='text-white'>Department</th>
            <th className='text-white'>Test Status</th>
            <th className='text-white'>Result Status</th>
            <th className='text-white'>Test Code / Name</th>
            <th className='text-white'>Analyte Code / Name</th>
            <th className='text-white'>LabId</th>
          </tr>
        </thead>
        <tbody className='text-xs'>
          <tr>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.analyte}
                    placeholder='Search by plab'
                    data={{
                      list: masterAnalyteStore.listMasterAnalyte,
                      displayKey: ['plab'],
                    }}
                    onFilter={(value: string) => {
                      masterAnalyteStore.masterAnalyteService.filterByFields({
                        input: {
                          filter: {
                            fields: ['analyteCode', 'analyteName'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
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
                      departmentStore.DepartmentService.filter({
                        input: {
                          type: 'filter',
                          filter: {
                            code: item.departments,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
                    }}
                  />
                )}
                name='plab'
                rules={{required: true}}
                defaultValue={masterAnalyteStore.listMasterAnalyte}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.department}
                    placeholder='Search by code or name'
                    data={{
                      list: departmentStore.listDepartment.filter(item =>
                        refernceRangesStore.referenceRanges?.analyteDepartments?.includes(
                          item.code,
                        ),
                      ),
                      displayKey: ['code', 'name'],
                    }}
                    disable={
                      refernceRangesStore.referenceRanges?.analyteCode
                        ? false
                        : true
                    }
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
                      console.log({item});
                      onChange(item.code);
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        department: item.code,
                      });
                      departmentStore.updateDepartmentList(
                        departmentStore.listDepartmentCopy,
                      );
                    }}
                  />
                )}
                name='department'
                rules={{required: true}}
                defaultValue={departmentStore.listDepartment}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <select
                    value={refernceRangesStore.referenceRanges?.species}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.species ? 'border-red-500  ' : 'border-gray-300'
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
                    <option selected>Select</option>
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
                rules={{required: true}}
                defaultValue=''
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <select
                    value={refernceRangesStore.referenceRanges?.sex}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.sex ? 'border-red-500  ' : 'border-gray-300'
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
                    <option selected>Select</option>
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
                rules={{required: true}}
                defaultValue=''
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <select
                    value={refernceRangesStore.referenceRanges?.rangeSetOn}
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.rangeSetOn ? 'border-red-500  ' : 'border-gray-300'
                    } rounded-md`}
                    onChange={e => {
                      const rangeSetOn = e.target.value as string;
                      onChange(rangeSetOn);
                      refernceRangesStore.updateReferenceRanges({
                        ...refernceRangesStore.referenceRanges,
                        rangeSetOn,
                        equipmentType:
                          rangeSetOn === 'L'
                            ? undefined
                            : refernceRangesStore.referenceRanges
                                ?.equipmentType,
                        lab:
                          rangeSetOn === 'I'
                            ? undefined
                            : refernceRangesStore.referenceRanges?.lab,
                      });
                    }}
                  >
                    <option selected>Select</option>
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
                rules={{required: true}}
                defaultValue=''
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    placeholder='Search by code or name'
                    hasError={errors.lab}
                    data={{
                      list: labStore.listLabs,
                      displayKey: ['code', 'name'],
                    }}
                    displayValue={refernceRangesStore.referenceRanges?.lab}
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
                rules={{required: !isDisableLab}}
                defaultValue={labStore.listLabs || isDisableLab}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    placeholder='Search by instrumentType'
                    hasError={errors.equipmentType}
                    disable={isDisableEquipmentType}
                    data={{
                      list: interfaceManagerStore.listInterfaceManager,
                      displayKey: ['instrumentType'],
                    }}
                    displayValue={
                      refernceRangesStore.referenceRanges?.equipmentType
                    }
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
                        equipmentType: item.instrumentType,
                      });
                      interfaceManagerStore.updateInterfaceManagerList(
                        interfaceManagerStore.listInterfaceManagerCopy,
                      );
                    }}
                  />
                )}
                name='equipmentType'
                rules={{required: !isDisableEquipmentType}}
                defaultValue={
                  interfaceManagerStore.listInterfaceManager ||
                  isDisableEquipmentType
                }
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
});
