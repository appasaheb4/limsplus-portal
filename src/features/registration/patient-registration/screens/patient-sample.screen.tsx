import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { PatientSampleList } from '../components';
import { Toast, ModalConfirm } from '@/library/components';
import { useStores } from '@/stores';
import { toJS } from 'mobx';
import { RouterFlow } from '@/flows';

interface PatientSampleProps {
  onModalConfirm?: (item: any) => void;
}

export const PatientSample = observer((props: PatientSampleProps) => {
  const { patientResultStore, patientSampleStore, routerStore } = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>();
  return (
    <>
      <div
        className='p-2 rounded-lg shadow-xl overflow-scroll'
        style={{ overflowX: 'scroll' }}
      >
        <PatientSampleList
          data={patientSampleStore.patientSampleList}
          totalSize={patientSampleStore.patientSampleListCount}
          extraData={{}}
          isView={RouterFlow.checkPermission(
            routerStore.userPermission,
            'View',
          )}
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isUpdate={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Update',
          )}
          isExport={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Export',
          )}
          onDelete={selectedUser =>
            props.onModalConfirm && props.onModalConfirm(selectedUser)
          }
          onSelectedRow={rows => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: 'Delete',
                id: rows,
                title: 'Are you sure?',
                body: 'Do you want to delete selected record?',
              });
          }}
          onUpdateDetails={(details: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'update',
              data: { details, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onPageSizeChange={(page, limit) => {
            patientSampleStore.patientSampleService.listPatientSample(
              page,
              limit,
            );
          }}
          onFilter={(type, filter, page, limit) => {
            patientSampleStore.patientSampleService.filter({
              input: { type, filter, page, limit },
            });
          }}
        />
      </div>
      <br />
      <ModalConfirm
        {...modalConfirm}
        click={(action?: string) => {
          setModalConfirm({ show: false });
          switch (action) {
            case 'update': {
              patientSampleStore.patientSampleService
                .updateFields({
                  input: {
                    ...modalConfirm.data.details,
                    _id: modalConfirm.data.id,
                  },
                })
                .then((res: any) => {
                  console.log({ res });

                  if (res.updatePatientSample.success) {
                    Toast.success({
                      message: `😊 ${res.updatePatientSample.message}`,
                    });
                  }
                });
              break;
            }
          }
        }}
        onClose={() => {
          setModalConfirm({ show: false });
        }}
      />
    </>
  );
});
