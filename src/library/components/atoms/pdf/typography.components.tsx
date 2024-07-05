import React from 'react';
import { Text, Font } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

Font.register({
  family: 'IBMPlexSans',
  fonts: [
    {
      src: '/assets/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    {
      src: '/assets/fonts/IBM_Plex_Sans/IBMPlexSans-Italic.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

Font.register({
  family: 'Arima-Bold',
  fonts: [
    {
      src: '/assets/fonts/arima/Arima-Bold.ttf',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    {
      src: '/assets/fonts/arima/Arima-Regular.ttf',
      fontStyle: 'normal',
    },
  ],
});

interface PdfTextProps {
  fontWeight?: 'bold' | 'medium' | 'normal';
  fontSize?: number;
  fontFamily?:
    | 'Times-Roman'
    | 'Times-Bold'
    | 'Times-Italic'
    | 'Times-BoldItalic'
    | string;
  textAlign?: 'center' | 'left' | 'right';
  style?: Style | Style[];
  lineHeight?: number;
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

export const PdfSmall = ({
  fontSize = 10,
  fontFamily = 'arimaRegular',
  fontWeight = 'normal',
  textAlign = 'left',
  lineHeight = 0,
  fixed = false,
  style,
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        textAlign: textAlign,
        ...style,
      }}
      fixed={fixed}
    >
      {children}
    </Text>
  );
};

export const PdfPageNumber = ({ style, bottom = 55 }: PdfTextProps) => {
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
      render={({ pageNumber, totalPages }) =>
        `Page ${pageNumber} of ${totalPages}`
      }
      fixed
    />
  );
};
