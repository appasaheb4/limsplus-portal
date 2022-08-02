import React, {useState, useRef} from 'react';
import {Page, Text, Document, StyleSheet, Font} from '@react-pdf/renderer';
import {use} from 'i18next';

Font.register({
  family: 'arimaRegular',
  src: '../../../assets/fonts/arima/Arima-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 10,
    backgroundColor: '#ffffff',
    paddingBottom: '80pt',
  },
});

interface PdfTemplateSettingProps {
  pageSize: any;
  mainBoxCSS?: any;
}

export const PdfTemplateSetting = ({
  mainBoxCSS,
  pageSize,
}: PdfTemplateSettingProps) => {
  //const [boxCSS, setBoxCSS] = useState<any>(mainBoxCSS);
  const boxCSS = useRef<any>(styles.page);
  if (mainBoxCSS) {
    try {
      console.log({mainBoxCSS: eval('({' + mainBoxCSS + '})')});
      boxCSS.current = eval('({' + mainBoxCSS + '})');
    } catch (e) {
      boxCSS.current = styles.page;
    }
  }
  return (
    <Document title='Template Settings'>
      <Page size={pageSize} style={boxCSS.current}>
        <Text>Template Setting</Text>
      </Page>
    </Document>
  );
};
