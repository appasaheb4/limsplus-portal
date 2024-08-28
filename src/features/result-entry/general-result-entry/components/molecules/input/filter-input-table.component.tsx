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

export const FilterInputTable = observer(() => {
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
                      data={{
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item => item.pLab !== undefined,
                          ),
                          'pLab',
                        ),
                        displayKey: ['pLab'],
                      }}
                      displayValue={
                        generalResultEntryStore.filterGeneralResEntry?.pLab ||
                        loginStore.login?.lab
                      }
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'pLab',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item.pLab);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          pLab: item.pLab,
                          isSingleLabId: false,
                        });
                        patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            pLab: item.pLab,
                            finishResult: 'P',
                            panelStatus: 'P',
                            testStatus: 'P',
                          },
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                      }}
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
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item =>
                              item.departement !== undefined &&
                              item.pLab ==
                                generalResultEntryStore.filterGeneralResEntry
                                  ?.pLab,
                          ),
                          'departement',
                        ),
                        displayKey: ['departement'],
                      }}
                      displayValue={
                        generalResultEntryStore.filterGeneralResEntry
                          ?.departement
                      }
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'departement',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item.departement);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          departement: item.departement,
                          isSingleLabId: false,
                        });
                        patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            departement: item.departement,
                            finishResult: 'P',
                            panelStatus: 'P',
                            testStatus: 'P',
                          },
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                      }}
                    />
                  )}
                  name='department'
                  rules={{ required: true }}
                  defaultValue={patientResultStore.distinctPatientResult}
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
                    generalResultEntryStore.updateFilterGeneralResEntry({
                      ...generalResultEntryStore.filterGeneralResEntry,
                      departement: undefined,
                      isSingleLabId: false,
                    });
                    patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        departement: undefined,
                        finishResult: 'P',
                        panelStatus: 'P',
                        testStatus: 'P',
                      },
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
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item =>
                              item.testCode !== undefined &&
                              item.pLab ==
                                generalResultEntryStore.filterGeneralResEntry
                                  ?.pLab &&
                              generalResultEntryStore.filterGeneralResEntry
                                ?.departement
                                ? item.departement ==
                                  generalResultEntryStore.filterGeneralResEntry
                                    ?.departement
                                : {},
                          ),
                          'testCode',
                        ),
                        displayKey: ['testCode', 'testName'],
                      }}
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'testCode',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item.testCode);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          testCode: item.testCode,
                          isSingleLabId: false,
                        });
                        patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            testCode: item.testCode,
                            finishResult: 'P',
                            panelStatus: 'P',
                            testStatus: 'P',
                          },
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                      }}
                    />
                  )}
                  name='testCode'
                  rules={{ required: true }}
                  defaultValue={patientResultStore.distinctPatientResult}
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
                    generalResultEntryStore.updateFilterGeneralResEntry({
                      ...generalResultEntryStore.filterGeneralResEntry,
                      testCode: undefined,
                      isSingleLabId: false,
                    });
                    patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        testCode: undefined,
                        finishResult: 'P',
                        panelStatus: 'P',
                        testStatus: 'P',
                      },
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
                        list: _.uniqBy(
                          patientResultStore.distinctPatientResult?.filter(
                            item =>
                              item.labId !== undefined &&
                              item.pLab ==
                                generalResultEntryStore.filterGeneralResEntry
                                  ?.pLab,
                          ),
                          'labId',
                        ),
                        displayKey: ['labId'],
                      }}
                      displayValue={generalResultEntryStore.filterGeneralResEntry?.labId?.toString()}
                      onFilter={(value: string) => {
                        patientResultStore.filterDistinctPatientResult(
                          getFilteredData(
                            value,
                            'labId',
                            patientResultStore.distinctPatientResultCopy,
                          ),
                        );
                      }}
                      onSelect={item => {
                        onChange(item?.labId);
                        generalResultEntryStore.updateFilterGeneralResEntry({
                          ...generalResultEntryStore.filterGeneralResEntry,
                          labId: Number.parseInt(item.labId),
                          isSingleLabId: false,
                        });
                        patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                          {
                            ...generalResultEntryStore.filterGeneralResEntry,
                            labId: item.labId,
                            finishResult: 'P',
                            panelStatus: 'P',
                            testStatus: 'P',
                          },
                        );
                        patientResultStore.filterDistinctPatientResult(
                          patientResultStore.distinctPatientResultCopy,
                        );
                      }}
                    />
                  )}
                  name='labId'
                  rules={{ required: true }}
                  defaultValue={patientResultStore.distinctPatientResult}
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
                    generalResultEntryStore.updateFilterGeneralResEntry({
                      ...generalResultEntryStore.filterGeneralResEntry,
                      labId: undefined,
                      isSingleLabId: false,
                    });
                    patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                      {
                        ...generalResultEntryStore.filterGeneralResEntry,
                        labId: undefined,
                        finishResult: 'P',
                        panelStatus: 'P',
                        testStatus: 'P',
                      },
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
                      list: _.uniqBy(
                        patientResultStore.distinctPatientResult?.filter(
                          item =>
                            item.pLab ==
                              generalResultEntryStore.filterGeneralResEntry
                                ?.pLab && item.name != '',
                        ),
                        'name',
                      ),
                      displayKey: ['name'],
                    }}
                    displayValue={generalResultEntryStore.filterGeneralResEntry?.name?.toString()}
                    onFilter={(value: string) => {
                      patientResultStore.filterDistinctPatientResult(
                        getFilteredData(
                          value,
                          'name',
                          patientResultStore.distinctPatientResultCopy,
                        ),
                      );
                    }}
                    onSelect={item => {
                      onChange(item?.name);
                      generalResultEntryStore.updateFilterGeneralResEntry({
                        ...generalResultEntryStore.filterGeneralResEntry,
                        name: item?.name,
                        isSingleLabId: false,
                      });
                      patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                        {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          name: item.name,
                          finishResult: 'P',
                          panelStatus: 'P',
                          testStatus: 'P',
                        },
                      );
                      patientResultStore.filterDistinctPatientResult(
                        patientResultStore.distinctPatientResultCopy,
                      );
                    }}
                  />
                )}
                name='patientName'
                rules={{ required: false }}
                defaultValue={patientResultStore.distinctPatientResult}
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
                  generalResultEntryStore.updateFilterGeneralResEntry({
                    ...generalResultEntryStore.filterGeneralResEntry,
                    departement: undefined,
                    testCode: undefined,
                    labId: undefined,
                    isSingleLabId: false,
                  });
                  patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
                    {
                      ...generalResultEntryStore.filterGeneralResEntry,
                      departement: undefined,
                      finishResult: 'P',
                      panelStatus: 'P',
                      testStatus: 'P',
                    },
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
});
