import React from 'react';
import {Text, View, StyleSheet, Font} from '@react-pdf/renderer';
import _ from 'lodash';
import {Style} from '@react-pdf/types';
import {PdfSmall, PdfBorderView, PdfView, PdfImage} from '@/library/components';

Font.register({
  family: 'arimaBold',
  src: 'https://fonts.googleapis.com/css2?family=Arima:wght@500&display=swap',
});

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
      console.log({patientResultList});
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
                    <PdfSmall
                      style={{
                        marginLeft: 10,
                        marginTop: 3,
                        fontFamily: 'Arima-Bold',
                      }}
                    >
                      {panelItem.panelHeader?.isPrintPanelName &&
                      panelItem.panelHeader?.analyteType !== 'H'
                        ? omitEmpty(panelItem?.panelHeader?.panelDescription)
                        : ''}
                    </PdfSmall>
                    <PdfSmall
                      style={{
                        marginLeft: 10,
                        fontSize: 9,
                        fontFamily: 'Arima-Bold',
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
                          <PdfSmall
                            style={{
                              marginLeft: 10,
                              fontFamily: 'Arima-Bold',
                              marginTop: 2,
                            }}
                          >
                            {testItem?.testHeader?.testDescription || ''}{' '}
                            {` ${testItem.testHeader?.testRightMarker || ''}`}
                          </PdfSmall>
                        ) : null}
                        <PdfSmall
                          style={{
                            marginLeft: 10,
                            fontSize: 8,
                            fontFamily: 'Arima-Bold',
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
                        <PdfSmall
                          style={{marginLeft: 10, fontFamily: 'Arima-Bold'}}
                        >
                          {panelItem.panelHeader?.analyteDescription}
                        </PdfSmall>
                      ) : (
                        <View key={testIndex}>
                          {testItem.patientResultList?.map(
                            ({value: _item}: any, _idx) => (
                              <>
                                {_item?.reportable ? (
                                  <>
                                    <PdfBorderView
                                      key={_idx}
                                      style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                      }}
                                      mh={0}
                                      mv={0}
                                      p={0}
                                      bw={0}
                                      borderColor='transparent'
                                    >
                                      {_item?.analyteType === 'H' ? (
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
                                          <PdfSmall
                                            style={{
                                              marginLeft: 10,
                                              marginVertical: 2,
                                            }}
                                          >
                                            {_item?.analyteDescription}
                                          </PdfSmall>
                                        </PdfBorderView>
                                      ) : (
                                        <>
                                          <PdfBorderView
                                            style={{
                                              width: '40%',
                                            }}
                                            mh={0}
                                            mv={0}
                                            p={0}
                                            bw={0}
                                            borderColor='transparent'
                                          >
                                            {_item.isPrintAnalyteName ? (
                                              <PdfSmall
                                                style={{
                                                  marginLeft: 10,
                                                  color: _item?.critical
                                                    ? '#FF0000'
                                                    : '#000000',
                                                }}
                                              >
                                                {_item?.analyteDescription}
                                              </PdfSmall>
                                            ) : null}

                                            {_item?.isAnalyteMethod ? (
                                              <PdfSmall
                                                style={{
                                                  marginLeft: 10,
                                                  fontSize: 8,
                                                }}
                                              >
                                                {
                                                  _item?.analyteMethodDescription
                                                }
                                              </PdfSmall>
                                            ) : null}
                                            {_item?.analyteInterpretation ? (
                                              <PdfSmall
                                                style={{
                                                  marginLeft: 10,
                                                  fontSize: 8,
                                                }}
                                              >
                                                {
                                                  _item?.analyteMasterInterpretation
                                                }
                                              </PdfSmall>
                                            ) : null}
                                          </PdfBorderView>

                                          <PdfBorderView
                                            style={{
                                              width: '20%',
                                            }}
                                            mh={0}
                                            mv={0}
                                            p={0}
                                            bw={0}
                                            borderColor='transparent'
                                          >
                                            <PdfSmall
                                              style={{
                                                textAlign: 'center',
                                                color:
                                                  _item?.critical ||
                                                  _item?.abnFlag
                                                    ? '#FF0000'
                                                    : '#000000',
                                              }}
                                            >
                                              {
                                                JSON.parse(_item?.result)
                                                  ?.result
                                              }
                                            </PdfSmall>
                                          </PdfBorderView>

                                          <PdfBorderView
                                            style={{
                                              width: '20%',
                                            }}
                                            mh={0}
                                            mv={0}
                                            p={0}
                                            bw={0}
                                            borderColor='transparent'
                                          >
                                            <PdfSmall
                                              style={{
                                                textAlign: 'center',
                                                color: _item?.critical
                                                  ? '#FF0000'
                                                  : '#000000',
                                              }}
                                            >
                                              {JSON.parse(_item?.units)?.unit}
                                            </PdfSmall>
                                          </PdfBorderView>
                                          {_item?.showRanges && (
                                            <PdfBorderView
                                              style={{
                                                width: '20%',
                                              }}
                                              mh={0}
                                              mv={0}
                                              p={0}
                                              bw={0}
                                              borderColor='transparent'
                                            >
                                              <PdfSmall
                                                style={{
                                                  textAlign: 'center',
                                                  color: _item?.critical
                                                    ? '#FF0000'
                                                    : '#000000',
                                                }}
                                              >
                                                {
                                                  JSON.parse(
                                                    _item?.bioRefInterval,
                                                  )?.range
                                                }
                                              </PdfSmall>
                                            </PdfBorderView>
                                          )}
                                        </>
                                      )}
                                    </PdfBorderView>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
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
      </PdfView>
    </>
  );
};
