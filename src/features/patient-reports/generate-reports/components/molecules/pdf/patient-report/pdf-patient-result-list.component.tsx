import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';
import _ from 'lodash';
import {Style} from '@react-pdf/types';
import {} from '@storybook/addons';
import {PdfSmall, PdfBorderView, PdfImage, PdfView} from '@/library/components';
import {decompressString} from '@/library/utils';

const styles = StyleSheet.create({
  table: {
    borderColor: '#000',
    borderWidth: 1,
    marginHorizontal: 20,
    flexFlow: 1,
  },
  tableRow: {
    flexDirection: 'row',
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

interface PdfPatientResultListProps {
  style?: Style;
  headerStyle?: Style;
  headerFixed?: boolean;
  data: Array<any>;
}

export const PdfPatientResultList = ({
  headerFixed = false,
  data,
  style,
  headerStyle,
}: PdfPatientResultListProps) => {
  const [patientResultList, setPatientResultList] = useState<Array<any>>();
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
            },
            panelFooter: {
              panelInterpretation: panelItems?.find(
                pItem => pItem?.panelHeader?.panelDescription == panelKey,
              )?.panelFooter?.panelInterpretation,
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
            signature: deptItems?.find(
              item => item?.departmentHeader?.departmentName == deptKey,
            )?.departmentFooter?.signature,
          },
        });
      }
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
            {/* Department Header */}
            <PdfBorderView
              style={{
                width: '100%',
              }}
              mh={0}
              mv={0}
              p={0}
              bw={1}
              borderColor='#000'
            >
              <PdfSmall style={{marginLeft: 10}}>
                {deptItem?.departmentHeader?.departmentName}
              </PdfSmall>
            </PdfBorderView>
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
                  bw={1}
                  borderColor='#000'
                >
                  <PdfSmall style={{marginLeft: 10}}>
                    {panelItem?.panelHeader?.panelDescription}{' '}
                  </PdfSmall>
                  <PdfSmall style={{marginLeft: 10}}>
                    {panelItem?.panelHeader?.panelMethodDescription &&
                    panelItem?.panelHeader?.panelMethodFlag
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
                      bw={1}
                      borderColor='#000'
                    >
                      <PdfSmall style={{marginLeft: 10}}>
                        {testItem?.testHeader?.testDescription}{' '}
                        {` ${testItem.testHeader?.testRightMarker}`}
                      </PdfSmall>
                      <PdfSmall style={{marginLeft: 10}}>
                        {testItem?.testHeader?.testMethodDescription &&
                        testItem?.testHeader?.testMethodFlag
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
                            bw={1}
                            borderColor='#000'
                          >
                            {typeof _item[1] == 'object' ? (
                              <>
                                <PdfSmall style={{textAlign: 'center'}}>
                                  {_item[1]?.analyteDescription}
                                </PdfSmall>
                                <PdfSmall style={{textAlign: 'center'}}>
                                  {_item[1]?.analyteMethodDescription}
                                </PdfSmall>
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
                    {testItem?.testFooter?.testInterpretation && (
                      <PdfBorderView
                        style={{
                          width: '100%',
                        }}
                        mh={0}
                        mv={0}
                        p={0}
                        bw={1}
                        borderColor='#000'
                      >
                        <PdfSmall style={{marginLeft: 10}}>
                          {testItem?.testFooter?.testInterpretation || ''}
                        </PdfSmall>
                      </PdfBorderView>
                    )}
                  </>
                ))}

                {/* Panel Footer */}
                {panelItem?.panelFooter?.panelInterpretation && (
                  <PdfBorderView
                    style={{
                      width: '100%',
                    }}
                    mh={0}
                    mv={0}
                    p={0}
                    bw={1}
                    borderColor='#000'
                  >
                    <PdfSmall style={{marginLeft: 10}}>
                      {panelItem?.panelFooter?.panelInterpretation}
                    </PdfSmall>
                  </PdfBorderView>
                )}
              </>
            ))}

            {/* Department Footer */}
            {deptItem?.departmentFooter?.signature?.length > 0 && (
              <PdfBorderView
                style={{
                  width: '100%',
                }}
                mh={0}
                mv={0}
                p={0}
                bw={1}
                flexDirection='row'
                borderColor='#000'
              >
                {deptItem?.departmentFooter?.signature?.map(signItem => (
                  <PdfImage
                    src={decompressString(signItem)}
                    style={{
                      width: 150,
                      height: 100,
                      marginLeft: 10,
                      padding: 5,
                    }}
                  />
                ))}
              </PdfBorderView>
            )}
          </PdfView>
        </>
      ))}
    </View>
  );
};
