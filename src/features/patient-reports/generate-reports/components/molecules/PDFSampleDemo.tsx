import React from 'react';
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
Font.register({
  family: 'arimaRegular',
  src: '../../../assets/fonts/arima/Arima-Regular.ttf',
});
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontSize: 12,
  },
  viewFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  pageNumber: {
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
  },
});

export const PDFSampleDemo = () => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Header */}
        <View style={{backgroundColor: 'orange', padding: 10}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              fontFamily: 'arimaRegular',
            }}
          >
            {' '}
            LimsPlus Solutions Private Limited
          </Text>
        </View>
        <View>
          <Text>Name: Appasaheb</Text>
          <Text>Lab No: 8968978</Text>
        </View>
        <View>
          <Text
            style={styles.pageNumber}
            render={({pageNumber, totalPages}) =>
              `Page ${pageNumber} of ${totalPages}`
            }
            fixed
          />
        </View>
        <View
          style={[
            styles.viewFooter,
            {backgroundColor: 'orange', padding: 10, alignItems: 'center'},
          ]}
        >
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'arimaRegular',
            }}
          >
            {' '}
            If test results are alarming or unexpected, client is advised to
            contact the Customer Care immediately for possible remedial action.
          </Text>
          <Text style={{fontSize: 14, fontFamily: 'arimaRegular'}}>
            {' '}
            <b>Tel</b>:+91 9818162255, <b>E-mail</b>: limsplus@gmail.com
          </Text>
        </View>
      </Page>
    </Document>
  );
};
