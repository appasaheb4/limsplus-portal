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
  data: any;
  templateSettings?: any;
  isWithHeader?: boolean;
  children?: any;
}

export const PdfPBTemp0001 = observer(
  ({
    data,
    templateSettings,
    isWithHeader = true,
    children,
  }: PdfPBTemp0001Props) => {
    const pageNumberCSS = useRef<any>({});
    if (data?.pageNumber?.pageNumberCSS) {
      try {
        pageNumberCSS.current = eval(
          '({' + data?.pageNumber?.pageNumberCSS + '})',
        );
      } catch (e) {
        pageNumberCSS.current = {};
      }
    }

    return (
      <PdfTSTemp0001
        height={window.innerHeight / 1.3}
        documentTitle='Page Branding'
        isToolbar={templateSettings?.isToolbar}
        isBackgroundImage={templateSettings?.isBackgroundImage || ''}
        backgroundImage={templateSettings?.backgroundImage || ''}
        mainBoxCSS={templateSettings?.mainBoxCSS}
        pageSize={templateSettings?.pageSize}
        isWithHeader={isWithHeader}
        children={
          <>
            <PdfView style={{height: 100}} fixed mh={0} p={0}>
              {isWithHeader && (
                <>
                  {/* Header */}
                  {data?.isHeader && <PdfTemp0001Header data={data} />}

                  {/* Sub Header */}
                  {data?.isSubHeader && <PdfTemp0001SubHeader data={data} />}
                </>
              )}
            </PdfView>

            {/* children */}
            {children}

            {/* Page Number */}
            {/* {data?.isPdfPageNumber && (
              <PdfPageNumber style={{...pageNumberCSS.current}} />
            )} */}

            <PdfFooterView fixed bg='transparent' style={{height: 40}} p={0}>
              {isWithHeader && data?.isFooter && (
                <PdfTemp0001Footer data={data} />
              )}
            </PdfFooterView>
          </>
        }
      />
    );
  },
);
