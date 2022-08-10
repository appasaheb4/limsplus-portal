/* eslint-disable */
import React, {useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  ModalConfirm,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {useForm, Controller} from 'react-hook-form';
import {FormHelper} from '@/helper';
import {FilterInputTable, GeneralResultEntryList} from '../components';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

const GeneralResultEntry = observer(() => {
  const {loginStore, routerStore, patientResultStore, generalResultEntryStore} =
    useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalConfirm, setModalConfirm] = useState<any>();

  const tableView = useMemo(
    () => (
      <GeneralResultEntryList
        data={patientResultStore.patientResultList || []}
        totalSize={patientResultStore.patientResultListCount}
        isDelete={RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Delete',
        )}
        isEditModify={RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Edit/Modify',
        )}
        onUpdateValue={(item, id) => {
          const updated = patientResultStore.patientResultList?.map(
            (e: any) => {
              if (e._id === id)
                return {
                  ...e,
                  ...item,
                };
              else return e;
            },
          );
          patientResultStore.updatePatientResult(updated);
        }}
        onSaveFields={(updatedRecords, id) => {
          setModalConfirm({
            show: true,
            type: 'save',
            id: id,
            data: updatedRecords,
            title: 'Are you sure?',
            body: `Update records!`,
          });
        }}
        onPageSizeChange={(page, limit) => {
          patientResultStore.patientResultService.listPatientResult(
            page,
            limit,
          );
        }}
        onFilter={(type, filter, page, limit) => {
          // refernceRangesStore.referenceRangesService.filter({
          //   input: {type, filter, page, limit},
          // });
        }}
      />
    ),
    [patientResultStore.patientResultList],
  );

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div className='mx-auto flex-wrap'>
        <FilterInputTable />
      </div>
      <div className='p-2 rounded-lg shadow-xl overflow-auto'>{tableView}</div>
      <ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          setModalConfirm({show: false});
          if (type === 'save') {
            patientResultStore.patientResultService
              .updateSingleFiled({
                input: {
                  ...modalConfirm.data,
                  enteredBy: loginStore.login?.userId,
                  resultDate: new Date(),
                  _id: modalConfirm.id,
                  __v: undefined,
                },
              })
              .then(res => {
                if (res.updatePatientResult.success) {
                  Toast.success({
                    message: `😊 ${res.updatePatientResult.message}`,
                  });
                  if (!generalResultEntryStore.filterGeneralResEntry)
                    patientResultStore.patientResultService.listPatientResult({
                      pLab: loginStore.login?.lab,
                      resultStatus: 'P',
                      testStatus: 'P',
                    });
                  else
                    patientResultStore.patientResultService.patientListForGeneralResultEntry(
                      {
                        input: {
                          filter: {
                            ...generalResultEntryStore.filterGeneralResEntry,
                          },
                          page: 0,
                          limit: 10,
                        },
                      },
                    );
                }
              });
          }
        }}
        onClose={() => {
          setModalConfirm({show: false});
        }}
      />
    </>
  );
});
export default GeneralResultEntry;
