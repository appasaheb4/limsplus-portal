import React, {Fragment} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';
import {PdfSmall} from './typography.components';
import {PdfBorderView} from './wrapped-view.components';
import {Style} from '@react-pdf/types';

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

interface PdfTableProps {
  style?: Style;
  headerFixed?: boolean;
  fields: Array<any>;
  data: Array<any>;
}

export const PdfTable = ({
  headerFixed = false,
  fields,
  data,
  style,
}: PdfTableProps) => (
  <View style={[styles.table, {...style}]}>
    <View style={[styles.tableRow, styles.headerBg]} fixed={headerFixed}>
      {fields.map((item, index) => (
        <View key={index} style={[{width: item.width + '%'}]}>
          <Text style={[styles.tableCellHeader]}>{item.title}</Text>
        </View>
      ))}
    </View>
    {data.map((item, index) => (
      <View key={index} style={styles.tableRow}>
        {Object.entries(item).map((_item: any, _idx) => (
          <PdfBorderView
            key={_idx}
            style={{
              width: fields[_idx].width + '%',
              borderStyle: 'solid',
              borderLeftWidth: 0,
              borderTopWidth: 0,
            }}
            mh={0}
            mv={0}
            p={0}
            bw={1}
            borderColor='#000'
          >
            <PdfSmall style={{textAlign: 'center'}}>{_item[1]}</PdfSmall>
          </PdfBorderView>
        ))}
      </View>
    ))}
  </View>
);
