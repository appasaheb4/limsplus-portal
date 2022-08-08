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

import {PdfTemp0001Header} from './pdf-temp0001-header.component';
import {PdfTemp0001SubHeader} from './pdf-temp0001-sub-header.component';
import {PdfTemp0001Footer} from './pdf-temp0001-footer.component';

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
  children?: React.ReactNode;
}

export const PdfTemp0001 = observer(({data, children}: PdfTemp0001Props) => {
  const pageNumberCSS = useRef<any>({});
  if (data.pageNumber?.pageNumberCSS) {
    try {
      pageNumberCSS.current = eval(
        '({' + data.pageNumber?.pageNumberCSS + '})',
      );
    } catch (e) {
      pageNumberCSS.current = {};
    }
  }
  return (
    <PdfTemplateSetting
      height={700}
      documentTitle='Page Branding'
      isToolbar={data.templateSettings?.isToolbar}
      mainBoxCSS={data.templateSettings?.mainBoxCSS}
      pageSize={data.templateSettings?.pageSize}
      children={
        <>
          {/* Header */}
          {data?.isHeader && <PdfTemp0001Header data={data} />}

          {/* Sub Header */}
          {data?.isSubHeader && <PdfTemp0001SubHeader data={data} />}

          {/* children */}
          {children}

          {/* Page Number */}
          {data.isPdfPageNumber && (
            <PdfPageNumber style={{...pageNumberCSS.current}} />
          )}

          {/* Footer */}
          {data?.isFooter && <PdfTemp0001Footer data={data} />}
        </>
      }
    />
  );
});
