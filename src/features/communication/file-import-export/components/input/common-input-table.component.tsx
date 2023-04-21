import React from 'react';
import {Table} from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
  Buttons,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {useForm, Controller} from 'react-hook-form';

interface CommonFileImportExportInputTableProps {
  data?: any;
}

export const CommonFileImportExportInputTable = observer(
  ({data}: CommonFileImportExportInputTableProps) => {
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
      reset,
    } = useForm({mode: 'all'});

    return (
      <div
        className='flex flex-row gap-2 items-center'
        style={{minWidth: '500px'}}
      >
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs'>
              <th className='text-white' style={{minWidth: '190px'}}>
                Transfer Type
              </th>
              <th className='text-white' style={{minWidth: '190px'}}>
                Client Code
              </th>
              <th className='text-white' style={{minWidth: '150px'}}>
                Client Name
              </th>
              <th className='text-white' style={{minWidth: '150px'}}>
                Template for import
              </th>
              <th className='text-white' style={{minWidth: '150px'}}>
                Template for export
              </th>
            </tr>
          </thead>
          <tbody className='text-xs'>
            <tr>
              <td>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <select
                      value={value}
                      disabled={
                        loginStore.login && loginStore.login.role !== 'SYSADMIN'
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment ? 'border-red  ' : 'border-gray-300'
                      } rounded-md`}
                      onChange={e => {
                        const environment = e.target.value;
                        onChange(environment);
                        // bannerStore.updateBanner({
                        //   ...bannerStore.banner,
                        //   environment,
                        // });
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(routerStore.lookupItems, 'ENVIRONMENT').map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ),
                      )}
                    </select>
                  )}
                  name='analyte'
                  rules={{required: true}}
                  defaultValue=''
                />
              </td>
              <td>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.department}
                      displayValue={value}
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
                  defaultValue=''
                />
              </td>
              <td>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <select
                      value={value}
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
                  render={({field: {onChange, value}}) => (
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
                  render={({field: {onChange, value}}) => (
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
            </tr>
          </tbody>
        </Table>
        <Buttons.Button
          size='medium'
          type='solid'
          //onClick={handleSubmit(addItem)}
        >
          <Icons.EvaIcon icon='plus-circle-outline' />
          {'Upload'}
        </Buttons.Button>
      </div>
    );
  },
);
