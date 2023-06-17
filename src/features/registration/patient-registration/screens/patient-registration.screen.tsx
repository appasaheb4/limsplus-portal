import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Icons,
  Tooltip,
  Form,
} from '@/library/components';
import {Accordion, AccordionItem} from 'react-sanfona';
import '@/library/assets/css/accordion.css';
import {icons} from '@/library/assets';
import {
  PatientManager,
  PatientVisit,
  PatientOrder,
  PatientSample,
  PatientResult,
  PatientTest,
} from './index';
import {useStores} from '@/stores';
import {stores} from '@/stores';

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
    patientManagerStore,
    patientRegistrationStore,
    patientVisitStore,
    patientOrderStore,
    patientTestStore,
    patientResultStore,
    patientSampleStore,
  } = useStores();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(!reload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientRegistrationStore.defaultValues?.accordionExpandItem]);

  const accordionList = useMemo(
    () => (
      <>
        <Accordion>
          {patientRegistrationOptions.map(item => {
            return (
              <AccordionItem
                title={`${item.title}`}
                expanded={
                  item.title ===
                  patientRegistrationStore.defaultValues?.accordionExpandItem
                }
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
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [patientRegistrationStore.defaultValues?.accordionExpandItem],
  );

  return (
    <>
      <Header>
        <div className='flex flex-col'>
          <div className='flex flex-row gap-2 items-center'>
            <PageHeading
              title={stores.routerStore.selectedComponents?.title || ''}
            />
            <div className='flex mx-20 items-center gap-2'>
              <Form.Input2
                placeholder='PId'
                className='w-40 arrow-hide'
                type='number'
                value={patientRegistrationStore.defaultValues?.pId}
                onChange={pId => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    pId,
                  });
                }}
                onKeyDown={() => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    labId: '',
                    mobileNo: '',
                    filterLock: false,
                  });
                }}
                onBlur={pId => {
                  if (pId?.length > 0) {
                    patientRegistrationStore.getPatientRegRecords(
                      'pId',
                      pId?.toString(),
                    );
                  }
                }}
              />
              {patientRegistrationStore.filterOptionList.labIds?.length > 1 ? (
                <select
                  className={
                    'leading-4 p-2 focus:outline-none focus:ring block mt-1 h-11 shadow-sm sm:text-base border-2 border-gray-300 rounded-md w-40'
                  }
                  onChange={e => {
                    const labId = e.target.value;
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      pId: '',
                      labId,
                      mobileNo: '',
                      filterLock: false,
                    });
                    patientRegistrationStore.getPatientRegRecords(
                      'labId',
                      labId?.toString(),
                    );
                  }}
                >
                  <option selected>{'Select LabId'}</option>
                  {patientRegistrationStore.filterOptionList.labIds?.map(
                    (item: any, index: number) => (
                      <option key={index} value={item}>
                        {item.toString()}
                      </option>
                    ),
                  )}
                </select>
              ) : (
                <Form.Input2
                  placeholder='Lab Id'
                  className='w-40 arrow-hide'
                  type='number'
                  value={patientRegistrationStore.defaultValues?.labId}
                  onChange={labId => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      labId,
                    });
                  }}
                  onKeyDown={() => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      pId: '',
                      mobileNo: '',
                      filterLock: false,
                    });
                  }}
                  onBlur={labId => {
                    if (labId?.length > 0) {
                      patientRegistrationStore.getPatientRegRecords(
                        'labId',
                        labId?.toString(),
                      );
                    }
                  }}
                />
              )}
              <Form.Input2
                placeholder='Mobile No'
                className='w-40 arrow-hide'
                type='number'
                value={patientRegistrationStore.defaultValues?.mobileNo}
                onChange={mobileNo => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    mobileNo,
                  });
                }}
                onKeyDown={() => {
                  patientRegistrationStore.updateDefaultValue({
                    ...patientRegistrationStore.defaultValues,
                    pId: '',
                    labId: '',
                    filterLock: false,
                  });
                }}
                onBlur={mobileNo => {
                  if (mobileNo?.length > 0) {
                    patientRegistrationStore.getPatientRegRecords(
                      'mobileNo',
                      mobileNo?.toString(),
                    );
                  }
                }}
              />
              <Tooltip tooltipText='Remove Filter'>
                <div
                  className='p-1 shadow-md rounded-md border border-gray-400'
                  onClick={() => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      pId: '',
                      labId: '',
                      mobileNo: '',
                      filterLock: false,
                    });
                    patientManagerStore.reset();
                    patientVisitStore.reset();
                    patientOrderStore.reset();
                    patientTestStore.reset();
                    patientResultStore.reset();
                    patientSampleStore.reset();
                  }}
                >
                  <Icons.RIcon
                    nameIcon='AiFillCloseCircle'
                    propsIcon={{size: 24}}
                  />
                </div>
              </Tooltip>
            </div>
            <PageHeadingLabDetails store={loginStore} />
          </div>

          <div className='items-center justify-center  mt-2 grid gap-2 grid-cols-4 just'>
            {patientManagerStore.listPatientManger?.map(item => (
              <>
                <div
                  className='flex rounded-md shadow-md p-2 gap-1 items-center'
                  onClick={() => {
                    patientRegistrationStore.updateDefaultValue({
                      ...patientRegistrationStore.defaultValues,
                      pId: item?.pId?.toString(),
                    });
                    patientRegistrationStore.getPatientRegRecords(
                      'pId',
                      item?.pId?.toString(),
                    );
                  }}
                >
                  <div>
                    <img
                      src={item.sex == 'M' ? icons.male : icons.female}
                      style={{width: 40, height: 40}}
                      alt='male'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-sm font-bold'>
                      {patientManagerStore.listPatientManger[0]?.firstName +
                        ' ' +
                        (patientManagerStore.listPatientManger[0]?.middleName !=
                        undefined
                          ? patientManagerStore.listPatientManger[0]?.middleName
                          : '') +
                        ' ' +
                        patientManagerStore.listPatientManger[0]?.lastName}
                    </span>
                    <span>
                      {item.sex} |{' '}
                      <span>
                        {patientManagerStore.listPatientManger[0]?.age +
                          ' ' +
                          patientManagerStore.listPatientManger[0]?.ageUnit}
                      </span>
                    </span>
                    <span>
                      {patientManagerStore.listPatientManger[0]?.mobileNo}
                    </span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </Header>
      <div>{accordionList}</div>
    </>
  );
});
export default PatientRegistration;
