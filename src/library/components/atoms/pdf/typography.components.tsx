import React from 'react';
import {Text} from '@react-pdf/renderer';
import {Style} from '@react-pdf/types';

interface PdfTextProps {
  fontWeight?: 'bold' | 'medium' | 'normal';
  fontSize?: number;
  fontFamily?: string;
  textAlign?: 'center' | 'left';
  style?: Style | Style[];
  bottom?: number;
  fixed?: boolean;
  children?: React.ReactNode;
}

export const PdfHeading = ({
  fontWeight = 'bold',
  fontSize = 22,
  fontFamily = 'arimaRegular',
  style,
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
        ...style,
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
  style,
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
        ...style,
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
  style,
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
        textAlign: textAlign,
        ...style,
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
  style,
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
        ...style,
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
  style,
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export const PdfPageNumber = ({style, bottom = 55}: PdfTextProps) => {
  return (
    <Text
      style={{
        position: 'absolute',
        bottom: bottom,
        right: 5,
        fontSize: 12,
        color: 'grey',
        ...style,
      }}
      render={({pageNumber, totalPages}) =>
        `Page ${pageNumber} of ${totalPages}`
      }
      fixed
    />
  );
};
