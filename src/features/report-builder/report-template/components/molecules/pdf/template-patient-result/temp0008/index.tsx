import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Font, Page} from '@react-pdf/renderer';
import {Document, pdfjs, Page as PdfPage} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

Font.register({
  family: 'arimaRegular',
  src: '../../../assets/fonts/arima/Arima-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingBottom: '80pt',
  },
});

interface PdfTemp0008Props {
  data: any;
  isWithHeader?: boolean;
  width?: string | number;
  height?: number | string;
  documentTitle?: string;
  isToolbar?: boolean;
  isBackgroundImage?: boolean;
  backgroundImage?: string;
  pageSize?: any;
  mainBoxCSS?: any;
  children?: React.ReactNode;
}

export const PdfTemp0008 = ({
  data,
  isWithHeader = true,
  width = '100%',
  height = '95%',
  documentTitle = 'Medical Report',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: PdfTemp0008Props) => {
  const {patientReports} = data;
  const [pageNumber, setPageNumber] = useState();

  const boxCSS = useRef<any>(styles.page);
  if (mainBoxCSS) {
    try {
      boxCSS.current = eval('({' + mainBoxCSS + '})');
    } catch (e) {
      boxCSS.current = styles.page;
    }
  }

  useEffect(() => {
    window.open(patientReports?.patientResultList[0]?.result, '_blank');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientReports?.patientResultList[0]?.result]);

  const onDocumentLoad = ({numPages}) => {
    setPageNumber(numPages);
  };

  return (
    <>
      <Page>
        <Document
          file={{
            url: 'https://limsplussolutions.blob.core.windows.net/patient-registration/1678267353_PaySlip-MPIPL-PNI-22-1214(APPASAHEB%20BALU%20LAKADE)_DEC_2022.pdf',
          }}
          renderMode='canvas'
          onLoadSuccess={onDocumentLoad}
          //className='w-full relative'
          error={
            'Unable to load the library article. Please reach out to the support for further assistance.'
          }
        >
          <PdfPage size='A4' pageNumber={1} renderAnnotationLayer={true} />
        </Document>
      </Page>
    </>
  );
};
