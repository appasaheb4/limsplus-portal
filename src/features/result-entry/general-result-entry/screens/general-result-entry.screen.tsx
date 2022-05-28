/* eslint-disable */
import React, {useMemo} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Buttons,
  List,
  Grid,
  Svg,
  Toast,
  Form,
  AutoCompleteFilterSingleSelect,
  Header,
  PageHeading,
  PageHeadingLabDetails,
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
  const {loginStore, routerStore, patientResultStore} = useStores();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

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
        onSaveFields={rows => {
          // setModalConfirm({
          //   show: true,
          //   type: 'delete',
          //   id: rows,
          //   title: 'Are you sure?',
          //   body: `Delete selected items!`,
          // });
        }}
        onPageSizeChange={(page, limit) => {
          //refernceRangesStore.fetchListReferenceRanges(page, limit);
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
    </>
  );
});

export default GeneralResultEntry;
