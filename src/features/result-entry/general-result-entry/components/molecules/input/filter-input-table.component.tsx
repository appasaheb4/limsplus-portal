import React from 'react';
import {Table} from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Buttons,
} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {useForm, Controller} from 'react-hook-form';

export const FilterInputTable = observer(() => {
  const {loading, patientResultStore, generalResultEntryStore} = useStores();
  const {
    control,
    formState: {errors},
  } = useForm({mode: 'all'});

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
                      list: _.uniqBy(
                        patientResultStore.patientResultList,
                        'pLab',
                      ),
                      displayKey: ['pLab'],
                    }}
                    displayValue={
                      generalResultEntryStore.filterGeneralResEntry?.pLab
                    }
                    onFilter={(value: string) => {
                      // patientResultStore.patientResultService.filterByFields({
                      //   input: {
                      //     filter: {
                      //       fields: ['pLab'],
                      //       srText: value,
                      //     },
                      //     page: 0,
                      //     limit: 10,
                      //   },
                      // });
                    }}
                    onSelect={item => {
                      onChange(item.pLab);
                      generalResultEntryStore.updateFilterGeneralResEntry({
                        ...generalResultEntryStore.filterGeneralResEntry,
                        pLab: item.pLab,
                      });
                      const input = _.pickBy(
                        {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          pLab: item.pLab,
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        function (value, key) {
                          return !(
                            value === undefined ||
                            value === null ||
                            value === ''
                          );
                        },
                      );
                      patientResultStore.patientResultService.patientListForGeneralResultEntry(
                        {
                          input: {
                            filter: {
                              ...input,
                            },
                            page: 0,
                            limit: 10,
                          },
                        },
                      );
                    }}
                  />
                )}
                name='plab'
                rules={{required: true}}
                defaultValue={patientResultStore.patientResultList}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.analyte}
                    placeholder='Search by departement'
                    data={{
                      list: _.uniqBy(
                        patientResultStore.patientResultList,
                        'departement',
                      ),
                      displayKey: ['departement'],
                    }}
                    displayValue={
                      generalResultEntryStore.filterGeneralResEntry?.departement
                    }
                    onFilter={(value: string) => {
                      // patientResultStore.patientResultService.filterByFields({
                      //   input: {
                      //     filter: {
                      //       fields: ['departement'],
                      //       srText: value,
                      //     },
                      //     page: 0,
                      //     limit: 10,
                      //   },
                      // });
                    }}
                    onSelect={item => {
                      onChange(item.departement);
                      generalResultEntryStore.updateFilterGeneralResEntry({
                        ...generalResultEntryStore.filterGeneralResEntry,
                        departement: item.departement,
                      });
                      const input = _.pickBy(
                        {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          departement: item.departement,
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        function (value, key) {
                          return !(
                            value === undefined ||
                            value === null ||
                            value === ''
                          );
                        },
                      );
                      patientResultStore.patientResultService.patientListForGeneralResultEntry(
                        {
                          input: {
                            filter: {
                              ...input,
                            },
                            page: 0,
                            limit: 10,
                          },
                        },
                      );
                    }}
                  />
                )}
                name='department'
                rules={{required: true}}
                defaultValue={patientResultStore.patientResultList}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.testStatus}
                    placeholder='Search by test status'
                    data={{
                      list: _.uniqBy(
                        patientResultStore.patientResultList,
                        'testStatus',
                      ),
                      displayKey: ['testStatus'],
                    }}
                    displayValue={
                      generalResultEntryStore.filterGeneralResEntry?.testStatus
                    }
                    onFilter={(value: string) => {
                      // patientResultStore.patientResultService.filterByFields({
                      //   input: {
                      //     filter: {
                      //       fields: ['testStatus'],
                      //       srText: value,
                      //     },
                      //     page: 0,
                      //     limit: 10,
                      //   },
                      // });
                    }}
                    onSelect={item => {
                      onChange(item.testStatus);
                      generalResultEntryStore.updateFilterGeneralResEntry({
                        ...generalResultEntryStore.filterGeneralResEntry,
                        testStatus: item.testStatus,
                      });
                      const input = _.pickBy(
                        {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          testStatus: item.testStatus,
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        function (value, key) {
                          return !(
                            value === undefined ||
                            value === null ||
                            value === ''
                          );
                        },
                      );
                      patientResultStore.patientResultService.patientListForGeneralResultEntry(
                        {
                          input: {
                            filter: {
                              ...input,
                            },
                            page: 0,
                            limit: 10,
                          },
                        },
                      );
                    }}
                  />
                )}
                name='testStatus'
                rules={{required: true}}
                defaultValue={patientResultStore.patientResultList}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.resultStatus}
                    placeholder='Search by result status'
                    data={{
                      list: _.uniqBy(
                        patientResultStore.patientResultList,
                        'resultStatus',
                      ),
                      displayKey: ['resultStatus'],
                    }}
                    displayValue={
                      generalResultEntryStore.filterGeneralResEntry
                        ?.resultStatus
                    }
                    onFilter={(value: string) => {
                      // patientResultStore.patientResultService.filterByFields({
                      //   input: {
                      //     filter: {
                      //       fields: ['resultStatus'],
                      //       srText: value,
                      //     },
                      //     page: 0,
                      //     limit: 10,
                      //   },
                      // });
                    }}
                    onSelect={item => {
                      onChange(item.resultStatus);
                      generalResultEntryStore.updateFilterGeneralResEntry({
                        ...generalResultEntryStore.filterGeneralResEntry,
                        resultStatus: item.resultStatus,
                      });
                      const input = _.pickBy(
                        {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          resultStatus: item.resultStatus,
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        function (value, key) {
                          return !(
                            value === undefined ||
                            value === null ||
                            value === ''
                          );
                        },
                      );
                      patientResultStore.patientResultService.patientListForGeneralResultEntry(
                        {
                          input: {
                            filter: {
                              ...input,
                            },
                            page: 0,
                            limit: 10,
                          },
                        },
                      );
                    }}
                  />
                )}
                name='resultStatus'
                rules={{required: true}}
                defaultValue={patientResultStore.patientResultList}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.testCode}
                    placeholder='Search by code '
                    data={{
                      list: _.uniqBy(
                        patientResultStore.patientResultList,
                        'testCode',
                      ),
                      displayKey: ['testCode', 'testName'],
                    }}
                    displayValue={
                      generalResultEntryStore.filterGeneralResEntry?.testCode
                    }
                    onFilter={(value: string) => {
                      // patientResultStore.patientResultService.filterByFields({
                      //   input: {
                      //     filter: {
                      //       fields: ['testCode', 'testName'],
                      //       srText: value,
                      //     },
                      //     page: 0,
                      //     limit: 10,
                      //   },
                      // });
                    }}
                    onSelect={item => {
                      onChange(item.testCode);
                      generalResultEntryStore.updateFilterGeneralResEntry({
                        ...generalResultEntryStore.filterGeneralResEntry,
                        testCode: item.testCode,
                      });
                      const input = _.pickBy(
                        {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          testCode: item.testCode,
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        function (value, key) {
                          return !(
                            value === undefined ||
                            value === null ||
                            value === ''
                          );
                        },
                      );
                      patientResultStore.patientResultService.patientListForGeneralResultEntry(
                        {
                          input: {
                            filter: {
                              ...input,
                            },
                            page: 0,
                            limit: 10,
                          },
                        },
                      );
                    }}
                  />
                )}
                name='testCode'
                rules={{required: true}}
                defaultValue={patientResultStore.patientResultList}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.analyteCode}
                    placeholder='Search by code'
                    data={{
                      list: _.uniqBy(
                        patientResultStore.patientResultList,
                        'analyteCode',
                      ),
                      displayKey: ['analyteCode', 'analyteName'],
                    }}
                    displayValue={
                      generalResultEntryStore.filterGeneralResEntry?.analyteCode
                    }
                    onFilter={(value: string) => {
                      // patientResultStore.patientResultService.filterByFields({
                      //   input: {
                      //     filter: {
                      //       fields: ['analyteCode', 'analyteName'],
                      //       srText: value,
                      //     },
                      //     page: 0,
                      //     limit: 10,
                      //   },
                      // });
                    }}
                    onSelect={item => {
                      onChange(item.analyteCode);
                      generalResultEntryStore.updateFilterGeneralResEntry({
                        ...generalResultEntryStore.filterGeneralResEntry,
                        analyteCode: item.analyteCode,
                      });
                      const input = _.pickBy(
                        {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          analyteCode: item.analyteCode,
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        function (value, key) {
                          return !(
                            value === undefined ||
                            value === null ||
                            value === ''
                          );
                        },
                      );
                      patientResultStore.patientResultService.patientListForGeneralResultEntry(
                        {
                          input: {
                            filter: {
                              ...input,
                            },
                            page: 0,
                            limit: 10,
                          },
                        },
                      );
                    }}
                  />
                )}
                name='analyteCode'
                rules={{required: true}}
                defaultValue={patientResultStore.patientResultList}
              />
            </td>
            <td>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                    loader={loading}
                    hasError={errors.labId}
                    placeholder='Search by labId'
                    data={{
                      list: _.uniqBy(
                        patientResultStore.patientResultList,
                        'labId',
                      ),
                      displayKey: ['labId'],
                    }}
                    displayValue={generalResultEntryStore.filterGeneralResEntry?.labId?.toString()}
                    onFilter={(value: string) => {
                      // patientResultStore.patientResultService.filterByFields({
                      //   input: {
                      //     filter: {
                      //       fields: ['labId'],
                      //       srText: value,
                      //     },
                      //     page: 0,
                      //     limit: 10,
                      //   },
                      // });
                    }}
                    onSelect={item => {
                      onChange(item.labId);
                      generalResultEntryStore.updateFilterGeneralResEntry({
                        ...generalResultEntryStore.filterGeneralResEntry,
                        labId: item.labId,
                      });
                      const input = _.pickBy(
                        {
                          ...generalResultEntryStore.filterGeneralResEntry,
                          labId: Number.parseInt(item.labId),
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        function (value, key) {
                          return !(
                            value === undefined ||
                            value === null ||
                            value === ''
                          );
                        },
                      );
                      patientResultStore.patientResultService.patientListForGeneralResultEntry(
                        {
                          input: {
                            filter: {
                              ...input,
                            },
                            page: 0,
                            limit: 10,
                          },
                        },
                      );
                    }}
                  />
                )}
                name='labId'
                rules={{required: true}}
                defaultValue={patientResultStore.patientResultList}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <Buttons.Button
        size='small'
        type='solid'
        onClick={() => {
          generalResultEntryStore.updateFilterGeneralResEntry({
            ...generalResultEntryStore.filterGeneralResEntry,
            pLab: '',
            departement: '',
            testStatus: '',
            resultStatus: '',
            testCode: '',
            analyteCode: '',
            labId: '',
          });
          patientResultStore.patientResultService.listPatientResult();
        }}
      >
        {'Clear Filter'}
      </Buttons.Button>
    </div>
  );
});
