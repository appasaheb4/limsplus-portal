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

interface PdfTextProps {
  fontWeight?: 'bold' | 'medium' | 'normal';
  fontSize?: number;
  fontFamily?: string;
  textAlign?: 'center' | 'left';
  children?: React.ReactNode;
}

export const PdfHeading = ({
  fontWeight = 'bold',
  fontSize = 22,
  fontFamily = 'arimaRegular',
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
      }}
    >
      {children}
    </Text>
  );
};

export const PdfSubHeading = ({
  fontWeight = 'bold',
  fontSize = 20,
  fontFamily = 'arimaRegular',
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
      }}
    >
      {children}
    </Text>
  );
};

export const PdfMedium = ({
  fontWeight = 'medium',
  fontSize = 16,
  textAlign = 'left',
  fontFamily = 'arimaRegular',
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
        textAlign: textAlign,
      }}
    >
      {children}
    </Text>
  );
};

export const PdfRegular = ({
  fontWeight = 'normal',
  fontSize = 12,
  fontFamily = 'arimaRegular',
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
      }}
    >
      {children}
    </Text>
  );
};

export const PdfSmall = ({
  fontWeight = 'normal',
  fontSize = 10,
  fontFamily = 'arimaRegular',
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
      }}
    >
      {children}
    </Text>
  );
};

export const PdfPageNumber = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 12,
          marginVertical: 5,
          textAlign: 'center',
          color: 'grey',
        }}
        render={({pageNumber, totalPages}) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </View>
  );
};
