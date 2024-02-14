import React from 'react';
import { observer } from 'mobx-react';
import { PatientResultList } from '../components';
import { useStores } from '@/stores';
import { toJS } from 'mobx';
import { RouterFlow } from '@/flows';

interface PatientResultProps {
  onModalConfirm?: (item: any) => void;
}
export const PatientResult = observer((props: PatientResultProps) => {
  const { patientResultStore, patientRegistrationStore, routerStore } =
    useStores();

  return (
    <>
      <div
        className='p-2 rounded-lg shadow-xl overflow-scroll'
        style={{ overflowX: 'scroll' }}
      >
        <PatientResultList
          data={patientResultStore.patientResultListWithLabId}
          totalSize={patientResultStore.patientResultTestCount}
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
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: 'Update',
                data: { value, dataField, id },
                title: 'Are you sure?',
                body: 'Do you want to update this record?',
              });
          }}
          onPageSizeChange={(page, limit) => {
            patientResultStore.patientResultService.listPatientResultWithLabId(
              { labId: patientRegistrationStore.defaultValues?.labId },
              page,
              limit,
            );
          }}
          onFilter={(type, filter, page, limit) => {
            patientResultStore.patientResultService.filterWithLabId({
              input: {
                type,
                filter: {
                  ...filter,
                  labId: patientRegistrationStore.defaultValues?.labId,
                },
                page,
                limit,
              },
            });
          }}
        />
      </div>
      <br />
    </>
  );
});
