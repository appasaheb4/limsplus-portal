import React from 'react';
import { Table } from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Buttons,
  Toast,
} from '@/library/components';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { Icons } from '@/library/components';
import { debounce } from '@/core-utils';
import { DistinctPatientResult } from '@features/registration/patient-registration/models';

interface FilterInputTableProps {
  data: Partial<DistinctPatientResult>;
  onFilter: (filter: any, type) => void;
}

export const FilterInputTable = observer(
  ({ data, onFilter }: FilterInputTableProps) => {
    const {
      loading,
      patientResultStore,
      loginStore,
      generalResultEntryStore,
      appStore,
    } = useStores();

    const {
      control,
      formState: { errors },
    } = useForm({ mode: 'all' });

    const getFilteredData = (searchInput, key, itemList) => {
      let result = itemList;
      if (!_.isEmpty(searchInput)) {
        result = itemList.filter(item => {
          return item[key]
            ?.toString()
            .toLowerCase()
            .includes(searchInput?.toLowerCase());
        });
      }
      if (result?.length != 0) return result;
      else {
        debounce(() => {
          patientResultStore.patientResultService
            .filterByFields({
              input: {
                filter: {
                  fields: [key],
                  srText: searchInput,
                },
              },
            })
            .then(res => {
              if (
                res.filterByFieldsPatientResult?.patientResultList?.length == 0
              ) {
                Toast.error({
                  message: '😊 Record not found',
                });
                return;
              } else {
                patientResultStore.updateDistinctPatientResult(
                  {
                    getPatientResultDistinct: {
                      patientResultList:
                        res.filterByFieldsPatientResult?.patientResultList,
                    },
                  },
                  false,
                );
              }
            });
        });
      }
    };

    return (
      <div
        className='flex flex-row gap-2 items-center'
        style={{ minWidth: '100px' }}
      >
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs'>
              <th className='text-white z-0' style={{ width: '50px' }}>
                PLab
              </th>
              <th className='text-white z-0' style={{ width: '100px' }}>
                Department
              </th>
              <th className='text-white z-0' style={{ width: '100px' }}>
                Test Code / Name
              </th>
              <th className='text-white z-0' style={{ width: '50px' }}>
                LabId
              </th>
              <th className='text-white z-0' style={{ width: '100px' }}>
                Sample Id
              </th>
              <th className='text-white z-0' style={{ width: '100px' }}>
                Patient Name
              </th>
              <th className='text-white z-0' style={{ width: '10px' }}>
                Clear
              </th>
            </tr>
          </thead>
          <tbody className='text-xs'>
            <tr>
              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange } }) => (
                    <div className='flex flex-row items-center gap-2'>
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        hasError={!!errors.analyte}
                        placeholder='Search by plab'
                        disable
                        data={[]}
                        displayValue={
                          generalResultEntryStore.filterGeneralResEntry?.pLab ||
                          loginStore.login?.lab
                        }
                        // onFilter={(value: string) => {
                        //   patientResultStore.filterDistinctPatientResult(
                        //     getFilteredData(
                        //       value,
                        //       'pLab',
                        //       patientResultStore.distinctPatientResultCopy,
                        //     ),
                        //   );
                        // }}
                        // onSelect={item => {
                        //   onChange(item.pLab);
                        //   generalResultEntryStore.updateFilterGeneralResEntry({
                        //     ...generalResultEntryStore.filterGeneralResEntry,
                        //     pLab: item.pLab,
                        //   });
                        //   patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                        //     {
                        //       ...generalResultEntryStore.filterGeneralResEntry,
                        //       pLab: item.pLab,
                        //       finishResult: 'P',
                        //       panelStatus: 'P',
                        //       testStatus: 'P',
                        //     },
                        //   );
                        //   patientResultStore.filterDistinctPatientResult(
                        //     patientResultStore.distinctPatientResultCopy,
                        //   );
                        // }}
                      />
                    </div>
                  )}
                  name='plab'
                  rules={{ required: true }}
                  defaultValue={patientResultStore.distinctPatientResult}
                />
              </td>

              <td>
                <div className='flex flex-row items-center gap-2'>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        hasError={!!errors.analyte}
                        placeholder='Search by department'
                        data={{
                          list: data?.department,
                          displayKey: ['_id'],
                        }}
                        // displayValue={
                        //   generalResultEntryStore.filterGeneralResEntry
                        //     ?.departement
                        // }
                        // onFilter={(value: string) => {
                        //   patientResultStore.filterDistinctPatientResult(
                        //     getFilteredData(
                        //       value,
                        //       'departement',
                        //       patientResultStore.distinctPatientResultCopy,
                        //     ),
                        //   );
                        // }}
                        onSelect={item => {
                          onChange(item._id);
                          onFilter(
                            {
                              departement: item._id,
                            },
                            'department',
                          );
                          patientResultStore.filterDistinctPatientResult(
                            patientResultStore.distinctPatientResultCopy,
                          );
                        }}
                      />
                    )}
                    name='department'
                    rules={{ required: false }}
                    defaultValue={data?.department}
                  />
                  <Icons.IconContext
                    color={
                      appStore.applicationSetting.theme != 'dark'
                        ? '#000000'
                        : '#ffffff'
                    }
                    size='30'
                    onClick={() => {
                      patientResultStore.filterDistinctPatientResult(
                        patientResultStore.distinctPatientResultCopy,
                      );
                      onFilter(
                        {
                          departement: undefined,
                        },
                        'department',
                      );
                    }}
                  >
                    <Icons.Iconai.AiFillCloseCircle />
                  </Icons.IconContext>
                </div>
              </td>
              <td>
                <div className='flex flex-row items-center gap-2'>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        hasError={!!errors.testCode}
                        placeholder='Search by code '
                        displayValue={
                          generalResultEntryStore.filterGeneralResEntry?.testCode?.toString() ||
                          ''
                        }
                        data={{
                          list: data?.testCodeName?.map((item: any) => {
                            return {
                              ...item,
                              testCode: item?._id?.testCode,
                              testName: item._id?.testName,
                            };
                          }),
                          displayKey: ['testCode', 'testName'],
                        }}
                        // onFilter={(value: string) => {
                        //   patientResultStore.filterDistinctPatientResult(
                        //     getFilteredData(
                        //       value,
                        //       'testCode',
                        //       patientResultStore.distinctPatientResultCopy,
                        //     ),
                        //   );
                        // }}
                        onSelect={item => {
                          onChange(item.testCode);
                          onFilter(
                            {
                              testCode: item?.testCode,
                            },
                            'testCode',
                          );
                          patientResultStore.filterDistinctPatientResult(
                            patientResultStore.distinctPatientResultCopy,
                          );
                        }}
                      />
                    )}
                    name='testCode'
                    rules={{ required: true }}
                    defaultValue={data?.testCodeName}
                  />
                  <Icons.IconContext
                    color={
                      appStore.applicationSetting.theme != 'dark'
                        ? '#000000'
                        : '#ffffff'
                    }
                    size='30'
                    onClick={() => {
                      patientResultStore.filterDistinctPatientResult(
                        patientResultStore.distinctPatientResultCopy,
                      );
                      onFilter(
                        {
                          testCode: undefined,
                        },
                        'testCode',
                      );
                    }}
                  >
                    <Icons.Iconai.AiFillCloseCircle />
                  </Icons.IconContext>
                </div>
              </td>

              <td>
                <div className='flex flex-row items-center gap-2'>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        hasError={!!errors.labId}
                        keyboard='number'
                        placeholder='Search by labId'
                        data={{
                          list: data?.labId,
                          displayKey: ['_id'],
                        }}
                        displayValue={generalResultEntryStore.filterGeneralResEntry?.labId?.toString()}
                        // onFilter={(value: string) => {
                        //   patientResultStore.filterDistinctPatientResult(
                        //     getFilteredData(
                        //       value,
                        //       'labId',
                        //       patientResultStore.distinctPatientResultCopy,
                        //     ),
                        //   );
                        // }}
                        onSelect={item => {
                          onChange(item?._id);
                          onFilter(
                            {
                              labId: Number.parseInt(item._id),
                            },
                            'labId',
                          );
                          patientResultStore.filterDistinctPatientResult(
                            patientResultStore.distinctPatientResultCopy,
                          );
                        }}
                      />
                    )}
                    name='labId'
                    rules={{ required: true }}
                    defaultValue={data?.labId}
                  />
                  <Icons.IconContext
                    color={
                      appStore.applicationSetting.theme != 'dark'
                        ? '#000000'
                        : '#ffffff'
                    }
                    size='30'
                    onClick={() => {
                      patientResultStore.filterDistinctPatientResult(
                        patientResultStore.distinctPatientResultCopy,
                      );
                      onFilter(
                        {
                          labId: undefined,
                        },
                        'labId',
                      );
                    }}
                  >
                    <Icons.Iconai.AiFillCloseCircle />
                  </Icons.IconContext>
                </div>
              </td>
              <td title='sampleId'>
                <div className='flex flex-row items-center gap-2'>
                  <Controller
                    control={control}
                    render={({ field: { onChange } }) => (
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        hasError={!!errors.sampleId}
                        keyboard='number'
                        placeholder='Search by sample id'
                        data={{
                          list: data?.sampleId,
                          displayKey: ['_id'],
                        }}
                        displayValue={generalResultEntryStore.filterGeneralResEntry?.labId?.toString()}
                        // onFilter={(value: string) => {
                        //   patientResultStore.filterDistinctPatientResult(
                        //     getFilteredData(
                        //       value,
                        //       'sampleId',
                        //       patientResultStore.distinctPatientResultCopy,
                        //     ),
                        //   );
                        // }}
                        onSelect={item => {
                          onChange(item?._id);
                          onFilter(
                            {
                              sampleId: item?._id,
                            },
                            'sampleId',
                          );
                          patientResultStore.filterDistinctPatientResult(
                            patientResultStore.distinctPatientResultCopy,
                          );
                        }}
                      />
                    )}
                    name='sampleId'
                    rules={{ required: true }}
                    defaultValue={data?.sampleId}
                  />
                  <Icons.IconContext
                    color={
                      appStore.applicationSetting.theme != 'dark'
                        ? '#000000'
                        : '#ffffff'
                    }
                    size='30'
                    onClick={() => {
                      patientResultStore.filterDistinctPatientResult(
                        patientResultStore.distinctPatientResultCopy,
                      );
                      onFilter(
                        {
                          sampleId: undefined,
                        },
                        'sampleId',
                      );
                    }}
                  >
                    <Icons.Iconai.AiFillCloseCircle />
                  </Icons.IconContext>
                </div>
              </td>
              <td>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      loader={loading}
                      hasError={!!errors.patientName}
                      placeholder='Search by patient name'
                      data={{
                        list: data?.name,
                        displayKey: ['_id'],
                      }}
                      displayValue={generalResultEntryStore.filterGeneralResEntry?.name?.toString()}
                      // onFilter={(value: string) => {
                      //   patientResultStore.filterDistinctPatientResult(
                      //     getFilteredData(
                      //       value,
                      //       'name',
                      //       patientResultStore.distinctPatientResultCopy,
                      //     ),
                      //   );
                      // }}
                      onSelect={item => {
                        onChange(item?._id);
                        onFilter(
                          {
                            name: item?._id,
                          },
                          'name',
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                      }}
                    />
                  )}
                  name='patientName'
                  rules={{ required: false }}
                  defaultValue={data?.name}
                />
              </td>
              <td>
                <Icons.IconContext
                  color={
                    appStore.applicationSetting.theme != 'dark'
                      ? '#000000'
                      : '#ffffff'
                  }
                  size='30'
                  onClick={() => {
                    patientResultStore.filterDistinctPatientResult(
                      patientResultStore.distinctPatientResultCopy,
                    );
                    onFilter(
                      {
                        departement: undefined,
                        testCode: undefined,
                        labId: undefined,
                        sampleId: undefined,
                        name: undefined,
                      },
                      'all',
                    );
                  }}
                >
                  <Icons.Iconai.AiFillCloseCircle />
                </Icons.IconContext>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  },
);
