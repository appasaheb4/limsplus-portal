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
  const userInfo: Array<any> = [];
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
                  isPrintTestName: testItem?.testHeader?.isPrintTestName,
                  isTestMethod: testItem?.testHeader?.isTestMethod,
                },
                patientResultList: {
                  analyte: testItem?.analyte,
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
      //console.log({patientResultList});
      return patientResultList;
    }
    return [];
  };

  const omitEmpty = value => {
    if (value == 'undefined' || value == _.isEmpty(value)) return '';
    else return value;
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
                      {panelItem.panelHeader?.isPrintPanelName &&
                      panelItem.panelHeader?.analyteType !== 'H'
                        ? omitEmpty(panelItem?.panelHeader?.panelDescription)
                        : ''}
                    </PdfSmall>
                    <PdfSmall
                      style={{
                        marginLeft: 10,
                        fontSize: 8,
                        marginTop: -2,
                      }}
                    >
                      {panelItem?.panelHeader?.isPanelMethod &&
                      panelItem.panelHeader?.analyteType !== 'H'
                        ? omitEmpty(
                            panelItem?.panelHeader?.panelMethodDescription,
                          )
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
                        {testItem.testHeader?.isPrintTestName &&
                        panelItem.panelHeader?.analyteType !== 'H' ? (
                          <PdfSmall style={{marginLeft: 10}}>
                            {testItem?.testHeader?.testDescription || ''}{' '}
                            {` ${testItem.testHeader?.testRightMarker || ''}`}
                          </PdfSmall>
                        ) : null}
                        <PdfSmall
                          style={{
                            marginLeft: 10,
                            fontSize: 8,
                            marginTop: -2,
                          }}
                        >
                          {testItem?.testHeader?.isTestMethod &&
                          panelItem.panelHeader?.analyteType !== 'H'
                            ? omitEmpty(
                                testItem?.testHeader?.testMethodDescription,
                              )
                            : ''}
                        </PdfSmall>
                      </PdfBorderView>
                      {/* Patient Result List */}
                      {panelItem.panelHeader?.analyteType === 'H' ? (
                        <PdfSmall style={{marginLeft: 10}}>
                          {panelItem.panelHeader?.analyteDescription}
                        </PdfSmall>
                      ) : (
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
                                {_item[1]?.analyteType === 'H' ? (
                                  <PdfSmall style={{marginLeft: 10}}>
                                    {_item[1]?.analyteDescription}
                                  </PdfSmall>
                                ) : (
                                  <>
                                    {typeof _item[1] == 'object' ? (
                                      <>
                                        {_item[1]?.isPrintAnalyteName ? (
                                          <PdfSmall style={{marginLeft: 10}}>
                                            {_item[1]?.analyteDescription}
                                          </PdfSmall>
                                        ) : null}

                                        {_item[1]?.isAnalyteMethod ? (
                                          <PdfSmall
                                            style={{
                                              marginLeft: 10,
                                              fontSize: 8,
                                            }}
                                          >
                                            {_item[1]?.analyteMethodDescription}
                                          </PdfSmall>
                                        ) : null}
                                        {_item[1]?.analyteInterpretation ? (
                                          <PdfSmall
                                            style={{
                                              marginLeft: 10,
                                              fontSize: 8,
                                            }}
                                          >
                                            {
                                              _item[1]
                                                ?.analyteMasterInterpretation
                                            }
                                          </PdfSmall>
                                        ) : null}
                                      </>
                                    ) : _idx == 1 ? (
                                      <PdfSmall
                                        style={{
                                          textAlign: 'center',
                                          color:
                                            _idx == 1
                                              ? JSON.parse(_item[1])?.critical
                                                ? '#FF0000'
                                                : JSON.parse(_item[1])?.abnFlag
                                                ? '#FFFF00'
                                                : '#000000'
                                              : '#000000',
                                        }}
                                      >
                                        {JSON.parse(_item[1]).result}
                                      </PdfSmall>
                                    ) : (
                                      <PdfSmall
                                        style={{
                                          textAlign: 'center',
                                        }}
                                      >
                                        {_item[1]}
                                      </PdfSmall>
                                    )}
                                  </>
                                )}
                              </PdfBorderView>
                            ),
                          )}
                        </View>
                      )}

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
        {getUserInfo(getPatientResultList(data))?.length > 0 && (
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
            {getUserInfo(getPatientResultList(data))?.map(item => (
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
                <PdfSmall style={{marginTop: -4}}>{item?.userDegree}</PdfSmall>
                <PdfSmall style={{marginTop: -4}}>
                  {item?.deginisation}
                </PdfSmall>
              </PdfView>
            ))}
          </PdfBorderView>
        )}
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
