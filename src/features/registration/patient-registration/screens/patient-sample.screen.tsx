import React from 'react';
import { observer } from 'mobx-react';
import { PatientSampleList } from '../components';
import { useStores } from '@/stores';
import { toJS } from 'mobx';
import { RouterFlow } from '@/flows';

interface PatientSampleProps {
  onModalConfirm?: (item: any) => void;
}

export const PatientSample = observer((props: PatientSampleProps) => {
  const { patientResultStore, patientSampleStore, routerStore } = useStores();

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
                body: 'Delete selected items!',
              });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: 'Update',
                data: { value, dataField, id },
                title: 'Are you sure?',
                body: 'Update recoard!',
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
    </>
  );
});
