import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';
import _ from 'lodash';
import {Style} from '@react-pdf/types';
import {} from '@storybook/addons';
import {PdfSmall, PdfBorderView, PdfImage, PdfView} from '@/library/components';

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
              },
              patientResultList: {
                testName: testItem?.testName,
                result: testItem?.result,
                units: testItem?.units,
                bioRefInterval: testItem?.bioRefInterval,
              },
              testFooter: {
                testInterpretation: testItems?.find(
                  testItem => testItem?.testHeader?.testDescription == testKey,
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
    console.log({patientResultList});
    setPatientResultList(patientResultList);
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
                borderStyle: 'solid',
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
                    borderStyle: 'solid',
                  }}
                  mh={0}
                  mv={0}
                  p={0}
                  bw={1}
                  borderColor='#000'
                >
                  <PdfSmall style={{marginLeft: 10}}>
                    {panelItem?.panelHeader?.panelDescription}
                  </PdfSmall>
                  <PdfSmall style={{marginLeft: 10}}>
                    {panelItem?.panelHeader?.panelMethodDescription}
                  </PdfSmall>
                </PdfBorderView>
                {/* Test Header */}
                {panelItem?.testHeader?.map((testItem, testIndex) => (
                  <>
                    <PdfBorderView
                      style={{
                        width: '100%',
                        borderStyle: 'solid',
                      }}
                      mh={0}
                      mv={0}
                      p={0}
                      bw={1}
                      borderColor='#000'
                    >
                      <PdfSmall style={{marginLeft: 10}}>
                        {testItem?.testHeader?.testDescription}
                      </PdfSmall>
                      <PdfSmall style={{marginLeft: 10}}>
                        {testItem?.testHeader?.testMethodDescription}
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
                              borderStyle: 'solid',
                            }}
                            mh={0}
                            mv={0}
                            p={0}
                            bw={1}
                            borderColor='#000'
                          >
                            {typeof _item[1] == 'object' ? (
                              <PdfSmall style={{textAlign: 'center'}}>
                                {_item[1]?.panelDescription}
                              </PdfSmall>
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
                    <PdfBorderView
                      style={{
                        width: '100%',
                        borderStyle: 'solid',
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
                  </>
                ))}

                {/* Panel Footer */}
                <PdfBorderView
                  style={{
                    width: '100%',
                    borderStyle: 'solid',
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
              </>
            ))}

            {/* Department Footer */}
            <PdfBorderView
              style={{
                width: '100%',
                borderStyle: 'solid',
              }}
              mh={0}
              mv={0}
              p={0}
              bw={1}
              borderColor='#000'
            >
              <PdfImage
                src='data:image/png;base64,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'
                style={{width: 150, height: 100, marginLeft: 10, padding: 5}}
              />
            </PdfBorderView>
          </PdfView>
        </>
      ))}
    </View>
  );
};
