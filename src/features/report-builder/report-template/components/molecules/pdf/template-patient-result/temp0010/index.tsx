import React, { useRef } from 'react';
import { Page, StyleSheet, Font, View } from '@react-pdf/renderer';
import _ from 'lodash';
import { PdfPageNumber, PdfView, PdfFooterView, PdfImage } from '@components';
import { PdfBorderView, PdfSmall } from '@/library/components';
import { getHeaderAndFooter } from '@/core-utils';
import { PdfPatientDetails } from './pdf-patient-details.component';
import Html from 'react-pdf-html';

Font.register({
  family: 'IBMPlexSans',
  fonts: [
    {
      src: '/assets/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    {
      src: '/assets/fonts/IBM_Plex_Sans/IBMPlexSans-Italic.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

Font.register({
  family: 'arimaRegular',
  src: '/assets/fonts/arima/Arima-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingBottom: '80pt',
  },
});

interface PdfTemp0010Props {
  companyCode?: string;
  data?: any;
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

export const PdfTemp0010 = ({
  companyCode = 'GENEFLOW',
  data,
  isWithHeader = true,
  width = '100%',
  height = '90%',
  documentTitle = 'Aarvak Diagnostic Center Without',
  isToolbar = false,
  isBackgroundImage = false,
  backgroundImage,
  mainBoxCSS,
  pageSize,
  children,
}: PdfTemp0010Props) => {
  const { patientReports } = data;
  const regex = /style=(.*)font-[^;]+;/g;
  //const regex = /style=(.*)font-family[^;]+;/g;
  const subst = '';
  const userInfo: Array<any> = [];
  const boxCSS = useRef<any>(styles.page);
  if (mainBoxCSS) {
    try {
      boxCSS.current = eval('({' + mainBoxCSS + '})');
    } catch (e) {
      boxCSS.current = styles.page;
    }
  }

  const html = content => `
  <html>
  <head>
  </head>
    <body>
        ${content}
    </body>
  </html>
  `;

  const stylesheet = {
    body: {
      fontSize: '10px',
      fontFamily: 'arimaRegular',
    },
    p: {
      margin: 0,
      fontSize: '10px',
    },
    table: {
      border: '1px solid !important',
      marginTop: 4,
      marginBottom: 4,
    },
    td: {
      padding: 2,
    },
    strong: {
      fontFamily: 'IBMPlexSans',
      fontWeight: 'bold',
    },
    em: {
      fontFamily: 'IBMPlexSans',
      fontStyle: 'italic',
    },
    img: {
      width: 200,
      height: 200,
    },
    sup: {
      verticalAlign: 'super',
      fontSize: '8px',
    },
    sub: {
      verticalAlign: 'sub',
      fontSize: '8px',
    },
  };

  const getPatientResultList = data => {
    if (data?.length > 0) {
      const patientResultList: Array<any> = [];
      const departmentList = _.groupBy(
        data,
        (o: any) => o?.departmentHeader?.departmentName,
      );
      for (const [deptKey, deptItems] of Object.entries(departmentList)) {
        const panelList = _.groupBy(
          deptItems,
          (o: any) => o?.panelHeader?.panelDescription,
        );
        let panelHeader: Array<any> = [];
        for (const [panelKey, panelItems] of Object.entries(panelList)) {
          const testList = _.groupBy(
            panelItems,
            (o: any) => o?.testHeader?.testDescription,
          );
          let testHeader: Array<any> = [];
          for (const [testKey, testItems] of Object.entries(testList)) {
            const analyteList = _.groupBy(
              testItems,
              (o: any) => o.analyte?.analyteDescription,
            );
            let patientResultList: any = [];
            for (const [analyteKey, analyteItems] of Object.entries(
              analyteList,
            )) {
              patientResultList.push({
                analyteName: analyteKey,
                value: {
                  ...analyteItems[0],
                  analyteType: analyteItems[0]?.panelHeader?.analyteType,
                  ...analyteItems[0]?.analyte,
                },
                reportOrder: analyteItems[0]?.analyteReportOrder || 0,
              });
            }
            patientResultList = _.orderBy(
              patientResultList,
              'reportOrder',
              'asc',
            );
            testHeader.push({
              testHeader: {
                testDescription: testKey,
                testMethodDescription: testItems?.find(
                  testItem => testItem?.testHeader?.testDescription == testKey,
                )?.testHeader?.testMethodDescription,
                testBottomMarker: testItems?.find(
                  testItem => testItem?.testHeader?.testDescription == testKey,
                )?.testHeader?.testBottomMarker,
                testRightMarker: testItems?.find(
                  testItem => testItem?.testHeader?.testDescription == testKey,
                )?.testHeader?.testRightMarker,
                isPrintTestName: testItems?.find(
                  testItem => testItem?.testHeader?.testDescription == testKey,
                )?.testHeader?.isPrintTestName,
                isTestMethod: testItems?.find(
                  testItem => testItem?.testHeader?.testDescription == testKey,
                )?.testHeader?.isTestMethod,
              },
              testFooter: {
                testInterpretation: testItems?.find(
                  testItem => testItem?.testHeader?.testDescription == testKey,
                )?.testFooter?.testInterpretation,
                tpmTestInterpretation: testItems?.find(
                  testItem => testItem?.testHeader?.testDescription == testKey,
                )?.testFooter?.tpmTestInterpretation,
              },
              reportOrder: testItems?.find(
                testItem => testItem?.testHeader?.testDescription == testKey,
              )?.testReportOrder,
              patientResultList,
            });
          }

          testHeader = _.orderBy(testHeader, 'reportOrder', 'asc');

          panelHeader.push({
            panelHeader: {
              analyteType: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.analyteType,
              analyteDescription: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.analyteDescription,
              panelDescription: panelKey,
              panelMethodDescription: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.panelMethodDescription,
              isPrintPanelName: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.isPrintPanelName,
              isPanelMethod: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.isPanelMethod,
              critical: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.critical,
              abnFlag: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.abnFlag,
            },
            panelFooter: {
              panelInterpretation: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelFooter?.panelInterpretation,
              tpmPanelInterpretation: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelFooter?.tpmPanelInterpretation,
            },
            reportOrder: panelItems?.find(
              pItem => pItem?.panelHeader?.panelDescription == panelKey,
            )?.panelReportOrder,
            isPMPageBreak: panelItems?.find(
              pItem => pItem?.panelHeader?.panelDescription == panelKey,
            )?.panelHeader?.isPMPageBreak,
            testHeader,
          });
        }
        panelHeader = _.orderBy(panelHeader, 'reportOrder', 'asc');
        patientResultList.push({
          departmentHeader: {
            departmentName: deptKey,
          },
          panelHeader,
          departmentFooter: {
            userInfo: deptItems?.find(
              item => item?.departmentHeader?.departmentName == deptKey,
            )?.departmentFooter?.userInfo,
          },
        });
      }
      return patientResultList;
    }
    return [];
  };

  const getUserInfo = patientResultList => {
    patientResultList.filter(item => {
      if (item?.departmentFooter?.userInfo?.length > 0) {
        item.departmentFooter?.userInfo?.filter(e => {
          userInfo.push(e);
        });
      }
    });
    return _.uniqBy(userInfo, 'userId' as any);
  };

  // console.log({
  //   data,
  //   result: JSON.parse(patientReports?.patientResultList[0]?.result)?.result,
  // });

  const htmlContent = (details: string) => {
    const container = document.createElement('div');
    container.innerHTML = details;
    const tables = container.querySelectorAll('table');
    tables.forEach((items, index) => {
      const width = items.style.width;
      const height = items.style.height;
      if (width?.includes('px') || height?.includes('px')) {
        items.style.width = '100%';
        items.style.height = 'auto';
      }
      items.innerHTML = items.innerHTML?.replaceAll('width', 'maxWidth');
      const row = items.querySelectorAll('tr');
      const tdWidth = row[0]?.querySelectorAll('td');
      row.forEach((tr, i) => {
        if (i > 0) {
          tr.querySelectorAll('td')?.forEach((td, tdi) => {
            td.setAttribute(
              'style',
              tdWidth[tdi]?.getAttribute('style') as any,
            );
          });
        }
      });
    });
    return container.innerHTML;
  };

  return (
    <>
      <Page size={pageSize} style={boxCSS.current}>
        <PdfView fixed mh={0} p={0}>
          {isWithHeader && getHeaderAndFooter(companyCode, {})?.header}
        </PdfView>
        <PdfPatientDetails data={patientReports} />
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 90,
          }}
        >
          {patientReports?.patientResultList?.map((item, index) => (
            <Html stylesheet={stylesheet} key={index}>
              {html(
                htmlContent(
                  JSON.parse(item.result).result.replace(regex, subst),
                ),
              )}
            </Html>
          ))}
          {/*  user signature */}
          {getUserInfo(
            getPatientResultList(data?.patientReports?.patientResultList),
          )?.length > 0 && (
            <PdfBorderView
              style={{
                width: '100%',
              }}
              mh={0}
              mv={0}
              p={0}
              bw={0}
              flexDirection='row'
              borderColor='transparent'
            >
              {getUserInfo(
                getPatientResultList(data?.patientReports?.patientResultList),
              )?.map(item => (
                <PdfView flexDirection='column' alignItems='center'>
                  <PdfImage
                    src={item?.signature}
                    style={{
                      width: 80,
                      height: 60,
                      marginLeft: 10,
                      padding: 5,
                    }}
                  />
                  <PdfSmall>{item?.fullName}</PdfSmall>
                  <PdfSmall style={{ marginTop: -4 }}>
                    {item?.deginisation}
                  </PdfSmall>
                  <PdfSmall style={{ marginTop: -4 }}>
                    {item?.userDegree}
                  </PdfSmall>
                </PdfView>
              ))}
            </PdfBorderView>
          )}
        </View>
        <PdfPageNumber style={{ textAlign: 'right' }} bottom={88} />
        <PdfFooterView fixed bg='transparent' height={88} p={0}>
          {isWithHeader && getHeaderAndFooter(companyCode, {})?.footer}
        </PdfFooterView>
      </Page>
    </>
  );
};
