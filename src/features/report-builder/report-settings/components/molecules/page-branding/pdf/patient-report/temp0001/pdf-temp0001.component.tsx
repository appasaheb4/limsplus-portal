import React, {useRef} from 'react';
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from '@react-pdf/renderer';
import {
  PdfHeading,
  PdfRegular,
  PdfPageNumber,
  PdfHeader,
  PdfSubHeader,
  PdfView,
  PdfBorderView,
  PdfFooterView,
  PdfSmall,
  PdfTable,
} from '@components';
import {observer} from 'mobx-react';
import {PdfTemplateSetting} from '../../../../template-setting/pdf-template-setting';
import {PageBranding} from '../../../../../../models/page-branding.model';

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

interface PdfTemp0001Props {
  data: PageBranding;
}

export const PdfTemp0001 = observer(({data}: PdfTemp0001Props) => {
  const headerTitleCSS = useRef<any>({});
  const headerMainBoxCSS = useRef<any>({});
  if (data.header?.titleCSS) {
    try {
      headerTitleCSS.current = eval('({' + data.header?.titleCSS + '})');
    } catch (e) {
      headerTitleCSS.current = {};
    }
  }
  if (data.header?.mainBoxCSS) {
    try {
      headerMainBoxCSS.current = eval('({' + data.header?.mainBoxCSS + '})');
    } catch (e) {
      headerMainBoxCSS.current = {};
    }
  }

  return (
    <PdfTemplateSetting
      height={700}
      isToolbar={data.templateSettings?.isToolbar}
      mainBoxCSS={data.templateSettings?.mainBoxCSS}
      pageSize={data.templateSettings?.pageSize}
      children={
        <>
          {/* Header */}
          {data.header?.isVisible && (
            <PdfHeader style={headerMainBoxCSS.current} fixed>
              <PdfHeading style={headerTitleCSS.current}>
                {data.header?.title || 'Lims Plus'}
              </PdfHeading>
            </PdfHeader>
          )}

          {/* Sub Header */}
          {data.subHeader?.isVisible && (
            <PdfSubHeader fixed>
              <PdfRegular>Regd. Office: Dr Lal Pathlabs Ltd.</PdfRegular>
              <PdfRegular>
                Web: www.limsplus.com CIN No: 9867987FDLKAJ987987
              </PdfRegular>
            </PdfSubHeader>
          )}

          {/* Page Number */}
          {data.isPdfPageNumber && <PdfPageNumber />}

          {/* Footer */}
          {data.footer?.isVisible && (
            <PdfFooterView fixed>
              <PdfSmall textAlign='center'>
                {' '}
                If test results are alarming or unexpected, client is advised to
                contact the Customer Care immediately for possible remedial
                action.
              </PdfSmall>
              <PdfSmall>
                <b>Tel</b>:+91 9818162255, <b>E-mail</b>: limsplus@gmail.com
              </PdfSmall>
            </PdfFooterView>
          )}
        </>
      }
    />
  );
});
