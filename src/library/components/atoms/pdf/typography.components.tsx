import React from 'react';
import {Text, Font} from '@react-pdf/renderer';
import {Style} from '@react-pdf/types';

// export const registerFont = () => {
//   Font.register({
//     family: 'arimaBold',
//     fonts: [
//       {
//         src: 'https://fonts.googleapis.com/css2?family=Arima:wght@500&display=swap',
//         fontWeight: 400,
//       },
//     ],
//   });
// };

Font.register({
  family: 'Arima-Bold',
  fonts: [
    {
      src: 'https://limsplussolutions.blob.core.windows.net/assets/fonts/arima-bold.ttf',
      fontWeight: 600,
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
  fontWeight = 'normal',
  fontSize = 10,
  fontFamily = 'arimaRegular',
  textAlign = 'left',
  lineHeight = 0,
  fixed = false,
  style,
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
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
