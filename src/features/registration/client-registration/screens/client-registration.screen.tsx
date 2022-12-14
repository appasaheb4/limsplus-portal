import React, {useState, useContext, useEffect} from 'react';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalImportFile,
  Icons,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import * as XLSX from 'xlsx';
import {Styles} from '@/config';
import {ClientRegistrationList} from '../components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

const ClientRegistration = observer(() => {
  const {
    loginStore,
    clientRegistrationStore,
    segmentMappingStore,
    routerStore,
  } = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [modalImportFile, setModalImportFile] = useState({});
  const [hideAddSegmentMapping, setHideAddSegmentMapping] =
    useState<boolean>(true);
  const [saveTitle, setSaveTitle] = useState('Save');

  const handleFileUpload = (file: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', (evt: any) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, {type: 'binary'});
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header: 1});
      const defaultHeader: string[] = [
        'Country Name',
        'Lab ID',
        'Registration Date',
        'Client Code',
        'Client Name',
        'Patient Name',
        'Age',
        'Age Units',
        'Sex',
        'Test Name',
        'Test Code',
        'Sample',
        'Due Date',
        'Report Date',
        'Status',
        'PDF Report',
      ];
      const headers: any = [];
      const object: any = [];
      let fileImaport: boolean = false;
      // eslint-disable-next-line unicorn/no-array-for-each
      data.forEach((item: any, index: number) => {
        if (index === 0) {
          headers.push(item);
          if (JSON.stringify(headers[0]) !== JSON.stringify(defaultHeader))
            return alert('Please select correct file!');
        } else {
          if (JSON.stringify(headers[0]) === JSON.stringify(defaultHeader)) {
            if (item?.length > 0) {
              object.push({
                countryName: item[0],
                labId: Number.parseInt(item[1]),
                registrationDate: new Date(dayjs(item[2]).format('YYYY-MM-DD')),
                clientCode: item[3],
                clientName: item[4],
                patientName: item[5],
                age: Number.parseInt(item[6]),
                ageUnits: item[7],
                sex: item[8],
                testName: item[9],
                testCode: item[10],
                sample: item[11],
                dueDate: new Date(dayjs(item[12]).format('YYYY-MM-DD')),
                reportDate: new Date(dayjs(item[13]).format('YYYY-MM-DD')),
                status: item[14],
                pdfReport: item[15],
              });
            }
            fileImaport = true;
          }
        }
      });

      if (fileImaport && object.length > 0) {
        clientRegistrationStore.clientRegistrationService
          .import({input: {filter: {object}}})
          .then(res => {
            if (res.importClientRegistration.success) {
              Toast.success({
                message: `😊 ${res.importClientRegistration.message}`,
              });
            }
          });
      }
    });
    reader.readAsBinaryString(file);
  };

  const onSubmitSegmentMapiing = () => {
    if (segmentMappingStore.segmentMappingService) {
      segmentMappingStore.segmentMappingService
        .addSegmentMapping({input: {...segmentMappingStore.segmentMapping}})
        .then(res => {
          if (res.createSegmentMapping.success) {
            Toast.success({
              message: `😊 ${res.createSegmentMapping.message}`,
            });
            if (saveTitle === 'Save') {
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
            segmentMappingStore.fetchListSegmentMapping();
          }
        });
    } else {
      Toast.warning({
        message: '😔 Please enter all information!',
      });
    }
  };

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {RouterFlow.checkPermission(toJS(routerStore.userPermission), 'Add') && (
        <Buttons.ButtonCircleAddRemove
          show={hideAddSegmentMapping}
          onClick={status => setHideAddSegmentMapping(!hideAddSegmentMapping)}
        />
      )}

      <div className=' mx-auto flex-wrap'>
        <div
          className={
            'p-2 rounded-lg shadow-xl ' +
            (hideAddSegmentMapping ? 'hidden' : 'shown')
          }
        >
          <List direction='row' space={3} align='center'>
            <Buttons.Button
              size='medium'
              type='outline'
              onClick={() => {
                setModalImportFile({
                  show: true,
                  title: 'Import excel file!',
                });
              }}
            >
              <Icons.EvaIcon
                icon='arrowhead-down-outline'
                size='medium'
                color={Styles.COLORS.BLACK}
              />
              Import File
            </Buttons.Button>
          </List>
        </div>
      </div>

      <div className='p-2 rounded-lg shadow-xl overflow-scroll'>
        <ClientRegistrationList
          data={clientRegistrationStore.clientRegistrationList || []}
          totalSize={clientRegistrationStore.clientRegistrationCount}
          extraData={{}}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Edit/Modify',
          )}
          duplicate={(item: any) => {
            setSaveTitle('Duplicate');
            setHideAddSegmentMapping(false);
            segmentMappingStore.updateSegmentMapping({
              ...item,
              dataFlowFrom:
                item.dataFlowFrom !== undefined
                  ? item.dataFlowFrom.split('&gt;').join('>')
                  : '',
              attachments: '',
            });
          }}
          onPageSizeChange={(page, limit) => {
            segmentMappingStore.fetchListSegmentMapping(page, limit);
          }}
          onFilter={(type, filter, page, limit) => {
            segmentMappingStore.segmentMappingService.filter({
              input: {type, filter, page, limit},
            });
          }}
        />
      </div>
      <ModalImportFile
        accept='.csv,.xlsx,.xls'
        {...modalImportFile}
        click={(file: any) => {
          setModalImportFile({show: false});
          handleFileUpload(file);
        }}
        close={() => {
          setModalImportFile({show: false});
        }}
      />
    </>
  );
});

export default ClientRegistration;
