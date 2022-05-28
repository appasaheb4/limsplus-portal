import React from 'react';
import {Table} from 'reactstrap';
import {AutoCompleteFilterSingleSelectMultiFieldsDisplay} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {useForm, Controller} from 'react-hook-form';

export const FilterInputTable = observer(() => {
  const {loading, patientResultStore} = useStores();
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
                    onFilter={(value: string) => {
                      patientResultStore.patientResultService.filterByFields({
                        input: {
                          filter: {
                            fields: ['pLab'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
                    }}
                    onSelect={item => {
                      onChange(item.pLab);
                      console.log({item});
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
                    onFilter={(value: string) => {
                      patientResultStore.patientResultService.filterByFields({
                        input: {
                          filter: {
                            fields: ['departement'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
                    }}
                    onSelect={item => {
                      onChange(item.departement);
                      console.log({item});
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
                    onFilter={(value: string) => {
                      patientResultStore.patientResultService.filterByFields({
                        input: {
                          filter: {
                            fields: ['testStatus'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
                    }}
                    onSelect={item => {
                      onChange(item.testStatus);
                      console.log({item});
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
                    onFilter={(value: string) => {
                      patientResultStore.patientResultService.filterByFields({
                        input: {
                          filter: {
                            fields: ['resultStatus'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
                    }}
                    onSelect={item => {
                      onChange(item.resultStatus);
                      console.log({item});
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
                    placeholder='Search by code or name'
                    data={{
                      list: _.uniqBy(
                        patientResultStore.patientResultList,
                        'testCode',
                      ),
                      displayKey: ['testCode', 'testName'],
                    }}
                    onFilter={(value: string) => {
                      patientResultStore.patientResultService.filterByFields({
                        input: {
                          filter: {
                            fields: ['testCode', 'testName'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
                    }}
                    onSelect={item => {
                      onChange(item.testStatus);
                      console.log({item});
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
                    placeholder='Search by code or name'
                    data={{
                      list: _.uniqBy(
                        patientResultStore.patientResultList,
                        'analyteCode',
                      ),
                      displayKey: ['analyteCode', 'analyteName'],
                    }}
                    onFilter={(value: string) => {
                      patientResultStore.patientResultService.filterByFields({
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
                      console.log({item});
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
                    onFilter={(value: string) => {
                      patientResultStore.patientResultService.filterByFields({
                        input: {
                          filter: {
                            fields: ['labId'],
                            srText: value,
                          },
                          page: 0,
                          limit: 10,
                        },
                      });
                    }}
                    onSelect={item => {
                      onChange(item.labId);
                      console.log({item});
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
    </div>
  );
});
