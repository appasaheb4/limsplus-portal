import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';
import _, {result} from 'lodash';
import {Style} from '@react-pdf/types';
import {} from '@storybook/addons';
import {
  PdfSmall,
  PdfBorderView,
  PdfView,
  PdfRegular,
  PdfImage,
} from '@/library/components';
import {images} from '@/library/assets';

const styles = StyleSheet.create({
  table: {
    marginHorizontal: 10,
    flexFlow: 1,
  },
  tableRow: {
    flexDirection: 'row',
    marginTop: 2,
  },
  tableCellHeader: {
    margin: 2,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 2,
    fontSize: 12,
  },
  textCenter: {
    textAlign: 'center',
  },
});

interface PdfResultListProps {
  style?: Style;
  headerStyle?: Style;
  headerFixed?: boolean;
  data?: Array<any>;
}

export const PdfResultList = ({
  headerFixed = false,
  data = [],
  style,
  headerStyle,
}: PdfResultListProps) => {
  const fields = [
    {
      title: 'Test Name',
      width: '40',
    },
    {
      title: 'Value',
      width: '20',
    },
    {
      title: 'Unit',
      width: '20',
    },
    {
      title: 'Normal Value',
      width: '20',
    },
  ];
  //const [patientResultList, setPatientResultList] = useState<Array<any>>([]);

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
        const panelHeader: Array<any> = [];
        for (const [panelKey, panelItems] of Object.entries(panelList)) {
          const testList = _.groupBy(
            panelItems,
            (o: any) => o?.testHeader?.testDescription,
          );
          const testHeader: Array<any> = [];
          for (const [testKey, testItems] of Object.entries(testList)) {
            testItems.filter(testItem => {
              testHeader.push({
                testHeader: {
                  testDescription: testKey,
                  testMethodDescription:
                    testItem?.testHeader?.testMethodDescription,
                  testBottomMarker: testItem?.testHeader?.testBottomMarker,
                  testRightMarker: testItem?.testHeader?.testRightMarker,
                  tpmPrintTestName: testItem?.testHeader?.tpmPrintTestName,
                  tpmTestMethod: testItem?.testHeader?.tpmTestMethod,
                },
                patientResultList: {
                  testName: testItem?.testName,
                  result: testItem?.result,
                  units: testItem?.units,
                  bioRefInterval: testItem?.bioRefInterval,
                },
                testFooter: {
                  testInterpretation: testItems?.find(
                    testItem =>
                      testItem?.testHeader?.testDescription == testKey,
                  )?.testFooter?.testInterpretation,
                  tpmTestInterpretation: testItems?.find(
                    testItem =>
                      testItem?.testHeader?.testDescription == testKey,
                  )?.testFooter?.tpmTestInterpretation,
                },
              });
            });
          }
          panelHeader.push({
            panelHeader: {
              panelDescription: panelKey,
              panelMethodDescription: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.panelMethodDescription,
              tpmPrintPanelName: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.tpmPrintPanelName,
              tpmPanelMethod: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelHeader?.tpmPanelMethod,
            },
            panelFooter: {
              panelInterpretation: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelFooter?.panelInterpretation,
              tpmPanelInterpretation: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelFooter?.tpmPanelInterpretation,
            },
            testHeader,
          });
        }
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
  };

  return (
    <>
      <View style={[styles.table, {...style}]}>
        <View style={[styles.tableRow, {...headerStyle}]} fixed={headerFixed}>
          {fields?.map((item, index) => (
            <View key={index} style={[{width: item.width + '%'}]}>
              {index == 0 ? (
                <Text
                  style={[
                    styles.tableCellHeader,
                    {textAlign: 'left', marginLeft: 20},
                  ]}
                >
                  {item?.title}
                </Text>
              ) : (
                <Text style={[styles.tableCellHeader]}>{item?.title}</Text>
              )}
            </View>
          ))}
        </View>
        {getPatientResultList(data)?.map((deptItem, index) => (
          <>
            {deptItem.panelHeader.map((panelItem, index) => (
              <>
                {panelItem?.testHeader?.map((testItem, testIndex) => (
                  <>
                    <PdfView key={index} mh={0} p={0}>
                      <View key={index} style={styles.tableRow}>
                        {Object.entries(testItem?.patientResultList).map(
                          (_item: any, _idx) => (
                            <PdfBorderView
                              key={_idx}
                              style={{
                                width: fields[_idx]?.width + '%',
                              }}
                              mh={0}
                              mv={0}
                              p={0}
                              bw={0}
                              borderColor='transparent'
                            >
                              {typeof _item[1] == 'object' ? (
                                <>
                                  <PdfSmall
                                    style={{textAlign: 'left', marginLeft: 20}}
                                  >
                                    {_item[1]?.analyteDescription}
                                  </PdfSmall>

                                  {_item[1]?.tpmAnalyteMethod ? (
                                    <PdfSmall
                                      style={{
                                        textAlign: 'left',
                                        marginLeft: 20,
                                        fontSize: 6,
                                      }}
                                    >
                                      {_item[1]?.analyteMethodDescription}
                                    </PdfSmall>
                                  ) : null}
                                  {_item[1]?.tpmAnalyteInterpretation ? (
                                    <PdfSmall
                                      style={{
                                        textAlign: 'left',
                                        marginLeft: 20,
                                        fontSize: 6,
                                      }}
                                    >
                                      {_item[1]?.analyteMasterInterpretation}
                                    </PdfSmall>
                                  ) : null}
                                </>
                              ) : (
                                <PdfSmall style={{textAlign: 'center'}}>
                                  {_item[1] || ''}
                                </PdfSmall>
                              )}
                            </PdfBorderView>
                          ),
                        )}
                      </View>
                    </PdfView>
                  </>
                ))}
              </>
            ))}
          </>
        ))}
      </View>
      <PdfView style={{marginTop: 10}}>
        <Text
          style={{
            fontWeight: 'normal',
            fontSize: 10,
            fontFamily: 'arimaRegular',
            lineHeight: 0,
            textAlign: 'center',
          }}
          render={({pageNumber, totalPages}) =>
            pageNumber == totalPages &&
            ' ---------------------- End of report ----------------------'
          }
        />
        <PdfView alignItems='flex-end'>
          <PdfImage
            src={images.signAparajita}
            style={{
              width: 50,
              height: 40,
            }}
          />
          <PdfSmall style={{textAlign: 'center'}}>
            {'Dr.Aparajita Sharma'}
          </PdfSmall>
          <PdfSmall style={{textAlign: 'center'}}>{'MBBS, MD'}</PdfSmall>
          <PdfSmall style={{textAlign: 'center'}}>
            {'CONSULTANT PATHOLOGIST'}
          </PdfSmall>
        </PdfView>
      </PdfView>
    </>
  );
};
