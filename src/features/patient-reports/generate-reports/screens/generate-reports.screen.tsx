import React, {useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Header,
  PageHeading,
  PageHeadingLabDetails,
} from '@/library/components';
import {useForm} from 'react-hook-form';

import '@/library/assets/css/accordion.css';
import {useStores} from '@/stores';
import 'react-accessible-accordion/dist/fancy-example.css';

import {
  PdfTPRTemp0001,
  PdfTPRTemp0002,
  PdfTPRTemp0003,
  PdfTemp0004,
  PdfTemp0005,
} from '@features/report-builder/report-template/components';
import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer';

const GenerateReport = observer(() => {
  const {
    loading,
    patientManagerStore,
    routerStore,
    patientVisitStore,
    patientRegistrationStore,
    loginStore,
    generateReportsStore,
    reportSettingStore,
  } = useStores();
  const [tempCode, setTempCode] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  setValue('species', patientManagerStore.patientManger.species);

  const getTemplate = (tempCode: string, data: any) => {
    switch (tempCode) {
      case 'TEMP0001':
        return <PdfTPRTemp0001 data={data} />;
      case 'TEMP0002':
        return <PdfTPRTemp0002 data={data} />;
      case 'TEMP0003':
        return <PdfTPRTemp0003 data={data} />;
      case 'TEMP0004':
        return <PdfTemp0004 data={data} />;
      case 'TEMP0005':
        return <PdfTemp0005 data={data} />;
      default:
        return (
          <div className='justify-center items-center'>
            <h4 className='text-center mt-10 text-red'>
              Template not found. Please select correct template code and labId.
              🚨
            </h4>
          </div>
        );
        break;
    }

    // return (
    //   <div className='justify-center items-center'>
    //     <h4 className='text-center mt-10 text-red'>
    //       Template not found. Please select correct template code and labId. 🚨
    //     </h4>
    //   </div>
    // );
  };

  return (
    <>
      <Header>
        <div className='flex flex-row gap-2 items-center'>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
            loader={loading}
            placeholder='Lab Id'
            className='h-4'
            data={{
              list: _.uniqBy(
                patientVisitStore.labIdList?.filter(
                  item => item.labId !== undefined,
                ),
                'labId',
              ),
              displayKey: ['labId'],
            }}
            onFilter={(labId: string) => {
              patientVisitStore.patientVisitService.filterByLabId({
                input: {
                  filter: {labId},
                },
              });
            }}
            onSelect={item => {
              generateReportsStore.generateReportsService
                .listPatientReports(item.labId)
                .then(res => {
                  if (res.getPatientReports.success) {
                    console.log({res});
                    const uniqByPatientResult = _.uniqBy(
                      res.getPatientReports.data?.patientResultList,
                      (item: any) => {
                        return item.reportTemplate;
                      },
                    );
                    console.log({uniqByPatientResult});
                  } else {
                    alert(res.getPatientReports.message);
                  }
                  // generateReportsStore.updatePatientReports(res?.data);
                  // generateReportsStore.updatePageBranding(
                  //   res?.data?.templatePatientResult?.pageBranding,
                  // );
                })
                .catch(errors => {
                  return Toast.error({
                    message: `😔 ${errors.message}`,
                  });
                });
            }}
          />
        </div>
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {window.innerWidth <= 768 ? (
        <PDFDownloadLink
          document={
            <>
              {getTemplate(tempCode, {
                patientReports: generateReportsStore.patientReports,
                pageBranding: generateReportsStore.pageBranding,
              })}
            </>
          }
          fileName='Patient Reports'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '100%',
          }}
        >
          {({loading, error}) =>
            loading ? (
              <button>Loading document...</button>
            ) : (
              <button className='border-2 p-2 rounded-md bg-blue-500 text-white'>
                Pdf Patient Reports
              </button>
            )
          }
        </PDFDownloadLink>
      ) : (
        <>
          <PdfTPRTemp0001
            data={{
              patientReports: generateReportsStore.patientReports,
              pageBranding: generateReportsStore.pageBranding,
            }}
          />
          {/* <PdfTPRTemp0002
            data={{
              patientReports: generateReportsStore.patientReports,
              pageBranding: generateReportsStore.pageBranding,
            }}
          /> */}
        </>
      )}
    </>
  );
});
export default GenerateReport;
