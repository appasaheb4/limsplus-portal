import React, {useRef} from 'react';
import {Document, Page, StyleSheet, Font, Text} from '@react-pdf/renderer';
import {PdfSmall, PdfView, PdfFooterView} from '@components';
import {Header} from '../../common/aarvak-diagnostic-center/pdf-header.component';
import {Footer} from '../../common/aarvak-diagnostic-center/pdf-footer.component';
import {PdfMedicalCheckup} from './pdf-medical-checkup';
import {PdfPatientDetails} from './pdf-patient-details.component';

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

  return <></>;
};
