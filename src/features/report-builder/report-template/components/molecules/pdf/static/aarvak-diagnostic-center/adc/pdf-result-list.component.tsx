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
  data,
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

  const resultList: any = [
    {
      title: 'HAEMOGLOBIN (Hb)',
      value: '12.0',
      unit: 'gm/dl',
      normalValue: '12 - 15',
    },
    {
      title: 'TOTAL LEUCOCYTE COUNT (TLC)',
      value: '4,900',
      unit: '/cumm',
      normalValue: '4000 - 11000',
    },
  ];

  for (let index = 0; index < 30; index++) {
    resultList.push(resultList[index % 2]);
  }

  return (
    <>
      <View style={[styles.table, {...style}]}>
        <View style={[styles.tableRow, {...headerStyle}]} fixed={headerFixed}>
          {fields.map((item, index) => (
            <View key={index} style={[{width: item.width + '%'}]}>
              <Text style={[styles.tableCellHeader]}>{item?.title}</Text>
            </View>
          ))}
        </View>
        {resultList?.map((item, index) => (
          <>
            <PdfView key={index} mh={0} p={0}>
              {/* Department Header */}
              {/* <PdfBorderView
              style={{
                width: '100%',
              }}
              mh={0}
              mv={0}
              p={0}
              bw={0}
              borderColor='transparent'
            >
              <PdfSmall style={{marginLeft: 10}}>{item.title}</PdfSmall>
            </PdfBorderView> */}
              <View key={index} style={styles.tableRow}>
                {Object.entries(item).map((_item: any, _idx) => (
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
                    <PdfSmall style={{textAlign: 'center'}}>
                      {_item[1] || ''}
                    </PdfSmall>
                  </PdfBorderView>
                ))}
              </View>
            </PdfView>
          </>
        ))}
      </View>
      <PdfView style={{marginTop: 10}}>
        <PdfSmall style={{textAlign: 'center'}}>
          ---------------------- End of report ----------------------
        </PdfSmall>
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
