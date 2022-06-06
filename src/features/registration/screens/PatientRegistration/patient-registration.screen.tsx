import React from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Buttons,
  Icons,
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
const PatientRegistation = observer(() => {
  const {loading, loginStore, patientRegistrationStore, patientVisitStore} =
    useStores();
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
          {[
            {title: 'PATIENT MANAGER'},
            {title: 'PATIENT VISIT'},
            {title: 'PATIENT ORDER'},
            {title: 'PATIENT TEST'},
            {title: 'PATIENT RESULT'},
            {title: 'PATIENT SAMPLE'},
          ].map(item => {
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

      <div className='flex flex-row items-center justify-center mb-20'>
        <h4>SPECIMEN AND TEST DETAILS</h4>
      </div>
      {/* <div>
        <Accordion>
          {[
            {title: 'INFORMATION GROUP'},
            {title: 'SPECIAL RESULT'},
            {title: 'SAMPLE'},
            {title: 'PANEL'},
            {title: 'ANALYTE'},
          ].map(item => {
            return (
              <AccordionItem
                title={`${item.title}`}
                // expanded={item.title === "Patient Manager"}
              >
                {item.title === 'INFORMATION GROUP' && <InformationGroup />},
                {item.title === 'SPECIAL RESULT' && <InformationGroup />}
                {item.title === 'SAMPLE' && <></>}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div> */}
    </>
  );
});

export default PatientRegistation;
