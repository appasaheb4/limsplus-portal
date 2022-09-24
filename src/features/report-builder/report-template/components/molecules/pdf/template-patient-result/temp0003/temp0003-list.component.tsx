import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';
import _ from 'lodash';
import {Style} from '@react-pdf/types';
import {} from '@storybook/addons';
import {PdfSmall, PdfBorderView, PdfImage, PdfView} from '@/library/components';
import {decompressString} from '@/library/utils';

const styles = StyleSheet.create({
  table: {
    marginHorizontal: 20,
    flexFlow: 1,
  },
  tableRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  headerBg: {
    backgroundColor: '#aaa',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
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

interface PdfTPRTemp0003ListProps {
  style?: Style;
  headerStyle?: Style;
  headerFixed?: boolean;
  data: Array<any>;
}

export const PdfTPRTemp0003List = ({
  headerFixed = false,
  data,
  style,
  headerStyle,
}: PdfTPRTemp0003ListProps) => {
  const [patientResultList, setPatientResultList] = useState<Array<any>>();
  const [departmentFooter, setDepartmentFooter] = useState<Array<any>>([]);
  const fields = [
    {
      title: 'Test Name',
      width: '40',
    },
    {
      title: 'Results',
      width: '20',
    },
    {
      title: 'Units',
      width: '20',
    },
    {
      title: 'Bio. Ref. Interval',
      width: '20',
    },
  ];

  useEffect(() => {
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
          panelHeader,
          departmentFooter: {
            userInfo: deptItems?.find(
              item => item?.departmentHeader?.departmentName == deptKey,
            )?.departmentFooter?.userInfo,
          },
        });
      }
      const userInfo: Array<any> = [];
      patientResultList.map(item => {
        return item?.departmentFooter?.userInfo?.filter(e => {
          userInfo.push(e);
        });
      });
      const departmentFooter = _.uniqBy(userInfo, function (e) {
        return e?.userId;
      });
      setDepartmentFooter(departmentFooter);
      setPatientResultList(patientResultList);
    }
  }, [data]);

  return (
    <View style={[styles.table, {...style}]}>
      <View
        style={[styles.tableRow, styles.headerBg, {...headerStyle}]}
        fixed={headerFixed}
      >
        {fields.map((item, index) => (
          <View key={index} style={[{width: item.width + '%'}]}>
            <Text style={[styles.tableCellHeader]}>{item?.title}</Text>
          </View>
        ))}
      </View>
      {patientResultList?.map((deptItem, index) => (
        <>
          <PdfView key={index} mh={0} p={0}>
            {/* Panel Header */}
            {deptItem.panelHeader.map((panelItem, index) => (
              <>
                <PdfBorderView
                  style={{
                    width: '100%',
                  }}
                  mh={0}
                  mv={0}
                  p={0}
                  bw={0}
                  borderColor='transparent'
                >
                  <PdfSmall style={{marginLeft: 10}}>
                    {panelItem.panelHeader?.tpmPrintPanelName
                      ? panelItem?.panelHeader?.panelDescription
                      : ''}
                  </PdfSmall>
                  <PdfSmall
                    style={{
                      marginLeft: 10,
                      fontSize: 8,
                      marginTop: -2,
                    }}
                  >
                    {panelItem?.panelHeader?.tpmPanelMethod
                      ? panelItem?.panelHeader?.panelMethodDescription
                      : ''}
                  </PdfSmall>
                </PdfBorderView>
                {/* Test Header */}
                {panelItem?.testHeader?.map((testItem, testIndex) => (
                  <>
                    <PdfBorderView
                      style={{
                        width: '100%',
                      }}
                      mh={0}
                      mv={0}
                      p={0}
                      bw={0}
                      borderColor='transparent'
                    >
                      {testItem.testHeader?.tpmPrintTestName ? (
                        <PdfSmall style={{marginLeft: 10}}>
                          {testItem?.testHeader?.testDescription}{' '}
                          {` ${testItem.testHeader?.testRightMarker}`}
                        </PdfSmall>
                      ) : null}
                      <PdfSmall
                        style={{
                          marginLeft: 10,
                          fontSize: 8,
                          marginTop: -2,
                        }}
                      >
                        {testItem?.testHeader?.tpmTestMethod
                          ? testItem?.testHeader?.testMethodDescription
                          : ''}
                      </PdfSmall>
                    </PdfBorderView>

                    {/* Patient Result List */}

                    <View key={testIndex} style={styles.tableRow}>
                      {Object.entries(testItem?.patientResultList).map(
                        (_item: any, _idx) => (
                          <PdfBorderView
                            key={testIndex}
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
                                <PdfSmall style={{marginLeft: 10}}>
                                  {_item[1]?.analyteDescription}
                                </PdfSmall>

                                {_item[1]?.tpmAnalyteMethod ? (
                                  <PdfSmall
                                    style={{marginLeft: 10, fontSize: 8}}
                                  >
                                    {_item[1]?.analyteMethodDescription}
                                  </PdfSmall>
                                ) : null}
                                {_item[1]?.tpmAnalyteInterpretation ? (
                                  <PdfSmall
                                    style={{marginLeft: 10, fontSize: 8}}
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

                    {/* Test Footer */}
                    {testItem?.testFooter?.tpmTestInterpretation && (
                      <PdfBorderView
                        style={{
                          width: '100%',
                        }}
                        mh={0}
                        mv={0}
                        p={0}
                        bw={0}
                        borderColor='transparent'
                      >
                        <PdfSmall style={{marginLeft: 10}}>
                          {testItem?.testFooter?.testInterpretation || ''}
                        </PdfSmall>
                      </PdfBorderView>
                    )}
                  </>
                ))}

                {/* Panel Footer */}
                {panelItem?.panelFooter?.tpmPanelInterpretation && (
                  <PdfBorderView
                    style={{
                      width: '100%',
                    }}
                    mh={0}
                    mv={0}
                    p={0}
                    bw={0}
                    borderColor='transparent'
                  >
                    <PdfSmall style={{marginLeft: 10}}>
                      {panelItem?.panelFooter?.panelInterpretation}
                    </PdfSmall>
                  </PdfBorderView>
                )}
              </>
            ))}
          </PdfView>
        </>
      ))}
      {/* Department Footer */}
      {departmentFooter?.length > 0 && (
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
          {departmentFooter?.map(deptFooterItem => (
            <PdfView flexDirection='column' alignItems='center'>
              <PdfImage
                src={decompressString(deptFooterItem?.signatureBase64)}
                style={{
                  width: 80,
                  height: 60,
                  marginLeft: 10,
                  padding: 5,
                }}
              />
              <PdfSmall>{deptFooterItem?.fullName}</PdfSmall>
              <PdfSmall style={{marginTop: -4}}>
                {deptFooterItem?.userDegree}
              </PdfSmall>
              <PdfSmall style={{marginTop: -4}}>
                {deptFooterItem?.deginisation}
              </PdfSmall>
            </PdfView>
          ))}
        </PdfBorderView>
      )}
    </View>
  );
};
