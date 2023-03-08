import React, {useEffect, useRef} from 'react';
import {
  Document,
  Page,
  StyleSheet,
  Font,
  View,
  PDFRenderer,
} from '@react-pdf/renderer';
import {PdfMedium, PdfView} from '@components';
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

interface PdfTemp0007Props {
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

export const PdfTemp0007 = ({
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
}: PdfTemp0007Props) => {
  const {patientReports} = data;

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

  return (
    <>
      <PdfView>
        <PdfMedium textAlign='center'>
          Please check full report next tab on
        </PdfMedium>
      </PdfView>
    </>
  );
};
