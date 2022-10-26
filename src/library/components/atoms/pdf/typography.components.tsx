import React from 'react';
import {Text, Font} from '@react-pdf/renderer';
import {Style} from '@react-pdf/types';

// import InterRegular from '../../../assets/fonts/inter/InterRegular.ttf';
// import InterSemiBold from '../../../assets/fonts/inter/InterSemiBold.ttf';

// export const registerFont = () => {
//   Font.register({
//     family: 'Inter',
//     fonts: [
//       {
//         // src: 'https://assets.recurrency.com/fonts/Inter/Inter-Regular.ttf',
//         src: InterRegular,
//         fontWeight: 400,
//       },
//       {
//         // src: 'https://assets.recurrency.com/fonts/Inter/Inter-SemiBold.ttf',
//         src: InterSemiBold,
//         fontWeight: 600,
//       },
//     ],
//   });
// };

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
  style,
  children,
}: PdfTextProps) => {
  return (
    <Text
      style={{
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontFamily: fontFamily,
        lineHeight: 1.2,
        textAlign: textAlign,
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
