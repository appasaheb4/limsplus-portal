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
import {PdfTSTemp0001} from '../../template-setting/temp0001/temp0001.component';
import {PageBranding} from '@features/report-builder/report-settings/models/page-branding.model';

import {PdfTemp0001Header} from './temp0001-header.component';
import {PdfTemp0001SubHeader} from './temp0001-sub-header.component';
import {PdfTemp0001Footer} from './temp0001-footer.component';

Font.register({
  family: 'arimaRegular',
  src: '../../../assets/fonts/arima/Arima-Regular.ttf',
});

interface PdfPBTemp0001Props {
  data: PageBranding;
  templateSettings?: any;
  children?: any;
}

export const PdfPBTemp0001 = observer(
  ({data, templateSettings, children}: PdfPBTemp0001Props) => {
    // const pageNumberCSS = useRef<any>({});
    // if (data?.pageNumber?.pageNumberCSS) {
    //   try {
    //     pageNumberCSS.current = eval(
    //       '({' + data?.pageNumber?.pageNumberCSS + '})',
    //     );
    //   } catch (e) {
    //     pageNumberCSS.current = {};
    //   }
    // }
    return (
      <PdfTSTemp0001
        height={window.innerHeight / 1.3}
        documentTitle='Page Branding'
        isToolbar={templateSettings?.isToolbar}
        isBackgroundImage={templateSettings?.isBackgroundImage}
        backgroundImage={templateSettings?.backgroundImageBase64}
        mainBoxCSS={templateSettings?.mainBoxCSS}
        pageSize={templateSettings?.pageSize}
        children={
          <>
            {/* Header */}
            {data?.isHeader && <PdfTemp0001Header data={data} />}

            {/* Sub Header */}
            {data?.isSubHeader && <PdfTemp0001SubHeader data={data} />}

            {/* children */}
            {children}

            {/* Page Number */}
            {/* {data?.isPdfPageNumber && (
              <PdfPageNumber style={{...pageNumberCSS.current}} />
            )} */}

            {/* Footer */}
            {data?.isFooter && <PdfTemp0001Footer data={data} />}
          </>
        }
      />
    );
  },
);
