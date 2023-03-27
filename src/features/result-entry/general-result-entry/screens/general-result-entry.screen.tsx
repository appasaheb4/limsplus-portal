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
import {useForm} from 'react-hook-form';
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
  const [tableReaload, setTableReload] = useState<boolean>(false);

  const tableView = useMemo(
    () => (
      <>
        <GeneralResultEntryList
          data={patientResultStore.patientResultListNotAutoUpdate || []}
          totalSize={patientResultStore.patientResultListNotAutoUpdateCount}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Edit/Modify',
          )}
          onUpdateValue={(item, id) => {
            const updated =
              patientResultStore.patientResultListNotAutoUpdate?.map(
                (e: any) => {
                  if (e._id === id)
                    return {
                      ...e,
                      ...item,
                      flagUpdate: true,
                      refRangesList: e.refRangesList?.map(item => {
                        return {
                          ...item,
                          updateDate: new Date(),
                        };
                      }),
                    };
                  else return e;
                },
              );
            patientResultStore.updatePatientResultNotAutoUpdate(updated);
          }}
          onSaveFields={async (updatedRecords, id, type) => {
            if (type == 'directSave') {
              updateRecords(id, updatedRecords);
            } else {
              setModalConfirm({
                show: true,
                type: 'save',
                id: id,
                data: updatedRecords,
                title: 'Are you sure?',
                body: `Update records!`,
              });
            }
          }}
          onPageSizeChange={(page, limit) => {
            patientResultStore.patientResultService.listPatientResultNotAutoUpdate(
              page,
              limit,
            );
          }}
        />
      </>
    ),
    [patientResultStore.patientResultList, tableReaload],
  );

  const updateRecords = (id, data) => {
    patientResultStore.patientResultService
      .updateSingleFiled({
        input: {
          ...data,
          enteredBy: loginStore.login?.userId,
          resultDate: new Date(),
          _id: id,
          __v: undefined,
          flagUpdate: undefined,
        },
      })
      .then(res => {
        if (res.updatePatientResult.success) {
          Toast.success({
            message: `😊 ${res.updatePatientResult.message}`,
            timer: 2000,
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
                    panelStatus: 'P',
                  },
                  page: 0,
                  limit: 10,
                },
              },
            );
        }
      });
    setTableReload(!tableReaload);
  };

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
            updateRecords(modalConfirm.id, modalConfirm.data);
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
