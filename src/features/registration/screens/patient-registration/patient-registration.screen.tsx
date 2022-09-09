import React, {useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Buttons,
  Icons,
  Grid,
  Toast,
} from '@/library/components';

import {Accordion, AccordionItem} from 'react-sanfona';
import '@/library/assets/css/accordion.css';

import {patientRegistrationHoc} from '../../hoc';

import {
  PatientManager,
  PatientVisit,
  PatientOrder,
  PatientSample,
  PatientResult,
  PatientTest,
} from '../index';
import {useStores} from '@/stores';
import {stores} from '@/stores';
import {patientOrder} from '../../utils';

export const patientRegistrationOptions = [
  {title: 'PATIENT MANAGER'},
  {title: 'PATIENT VISIT'},
  {title: 'PATIENT ORDER'},
  {title: 'PATIENT TEST'},
  {title: 'PATIENT RESULT'},
  {title: 'PATIENT SAMPLE'},
];

const PatientRegistration = observer(() => {
  const [reloadPatientResult, setReloadPatientResult] = useState<Array<any>>(
    [],
  );
  const {
    loading,
    loginStore,
    patientRegistrationStore,
    patientVisitStore,
    patientOrderStore,
    patientResultStore,
  } = useStores();
  return (
    <>
      <Header>
        <div className='flex flex-row gap-2 items-center'>
          <PageHeading
            title={stores.routerStore.selectedComponents?.title || ''}
          />
          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
            loader={loading}
            placeholder='Lab Id'
            className='h-4'
            data={{
              list: [{labId: '*'}].concat(
                _.uniqBy(
                  patientVisitStore.labIdList?.filter(
                    item => item.labId !== undefined,
                  ),
                  'labId',
                ),
              ),
              displayKey: ['labId'],
            }}
            disable={patientRegistrationStore.defaultValues?.labIdLock}
            displayValue={
              patientRegistrationStore.defaultValues?.labId?.toString() || '*'
            }
            onFilter={(labId: string) => {
              patientVisitStore.patientVisitService.filterByLabId({
                input: {
                  filter: {labId},
                },
              });
            }}
            onSelect={item => {
              patientRegistrationStore.updateDefaultValue({
                ...patientRegistrationStore.defaultValues,
                labId: item.labId !== '*' ? Number.parseInt(item.labId) : '*',
                labIdLock: true,
              });
              item.labId !== '*'
                ? patientRegistrationHoc.labIdChanged(
                    Number.parseInt(item.labId),
                  )
                : patientRegistrationHoc.labIdChanged();
            }}
          />
          <Buttons.Button
            size='medium'
            type='outline'
            onClick={() => {
              patientRegistrationStore.updateDefaultValue({
                ...patientRegistrationStore.defaultValues,
                labIdLock: !patientRegistrationStore.defaultValues?.labIdLock,
              });
            }}
          >
            {patientRegistrationStore.defaultValues?.labIdLock ? (
              <Icons.IconBs.BsFillLockFill />
            ) : (
              <Icons.IconBs.BsFillUnlockFill />
            )}
          </Buttons.Button>
        </div>

        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div>
        <Accordion>
          {patientRegistrationOptions.map(item => {
            return (
              <AccordionItem
                title={`${item.title}`}
                // expanded={item.title === "PATIENT MANAGER"}
              >
                {item.title === 'PATIENT MANAGER' && <PatientManager />}
                {item.title === 'PATIENT VISIT' && <PatientVisit />}
                {item.title === 'PATIENT ORDER' && <PatientOrder />}
                {item.title === 'PATIENT TEST' && <PatientTest />}
                {item.title === 'PATIENT RESULT' && <PatientResult />}
                {item.title === 'PATIENT SAMPLE' && <PatientSample />}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className='flex flex-col  -mt-10'>
        <h4 className='underline text-center'>Activity</h4>
        <Grid cols={3}>
          <div className='p-3 border border-gray-800  relative mt-2'>
            <h2 className='-mt-10 translate-y-1/2 p-1 w-fit bg-white mb-4'>
              Reload Patient Result
            </h2>
            <div className='flex flex-col items-center content-center'>
              <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder='Lab Id'
                className='h-4'
                data={{
                  list: patientOrderStore.listPatientOrder?.filter(
                    item => item.labId !== undefined,
                  ),
                  displayKey: ['labId'],
                }}
                displayValue={
                  setReloadPatientResult?.length > 0
                    ? setReloadPatientResult[0]?.labId
                    : ''
                }
                onFilter={(labId: string) => {
                  patientVisitStore.patientVisitService.filterByLabId({
                    input: {
                      filter: {labId},
                    },
                  });
                }}
                onSelect={item => {
                  setReloadPatientResult([item]);
                  console.log({item});
                }}
              />

              <Buttons.Button
                size='medium'
                type='solid'
                className='mt-2'
                disabled={reloadPatientResult?.length > 0 ? false : true}
                onClick={() => {
                  patientResultStore.patientResultService
                    .reloadRecordByPatientOrder({
                      input: {filter: {reloadPatientResult}},
                    })
                    .then(res => {
                      if (res.reloadPatientResult.success) {
                        Toast.success({
                          message: `😊 ${res.reloadPatientResult.message}`,
                        });
                      }
                    });
                }}
              >
                Reload
              </Buttons.Button>
            </div>
          </div>
        </Grid>
      </div>
    </>
  );
});

export default PatientRegistration;
