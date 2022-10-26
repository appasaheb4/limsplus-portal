import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';
import _ from 'lodash';
import {Style} from '@react-pdf/types';
import {} from '@storybook/addons';
import {
  PdfSmall,
  PdfBorderView,
  PdfImage,
  PdfView,
  PdfMedium,
  PdfRegular,
} from '@/library/components';

const styles = StyleSheet.create({
  table: {
    flexFlow: 1,
  },
  tableRow: {
    flexDirection: 'row',
  },
  headerBg: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  tableCell: {
    fontSize: 12,
  },
  textCenter: {
    textAlign: 'center',
  },
});

interface PdfTableTransactionLineProps {
  style?: Style;
  headerStyle?: Style;
  headerFixed?: boolean;
  data: Array<any>;
}

export const PdfTransactionLineTable = ({
  headerFixed = false,
  data,
  style,
  headerStyle,
}: PdfTableTransactionLineProps) => {
  const fields = [
    {
      title: 'Sr.No',
      width: '10',
    },
    {
      title: 'Test Code',
      width: '20',
    },
    {
      title: 'Test Name',
      width: '50',
    },
    {
      title: 'Price',
      width: '20',
    },
  ];

  return (
    <View style={[styles.table, {...style}]}>
      <View
        style={[styles.tableRow, styles.headerBg, {...headerStyle}]}
        fixed={headerFixed}
      >
        {fields.map((item, index) => (
          <View
            key={index}
            style={[
              {width: item.width + '%', borderWidth: 1, borderColor: 'gray'},
            ]}
          >
            <PdfSmall
              style={{
                fontFamily: 'Times-Bold',
                textAlign: 'center',
              }}
            >
              {item?.title}
            </PdfSmall>
          </View>
        ))}
      </View>

      {data?.map(tranItem => (
        <View style={styles.tableRow}>
          {Object.entries(tranItem).map((item: any, _idx) => (
            <PdfBorderView
              key={_idx}
              style={{
                width: fields[_idx]?.width + '%',
              }}
              mh={0}
              mv={0}
              p={0}
              bw={1}
              borderColor='gray'
            >
              <PdfSmall style={{textAlign: 'center', padding: 2}}>
                {item[1]}
              </PdfSmall>
            </PdfBorderView>
          ))}
        </View>
      ))}
    </View>
  );
};
