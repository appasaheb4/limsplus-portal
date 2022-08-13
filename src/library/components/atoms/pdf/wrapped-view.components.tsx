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
import {Style} from '@react-pdf/types';
interface PdfViewProps {
  mh?: number;
  mt?: number;
  mv?: number;
  p?: number;
  borderColor?: string;
  bg?: string;
  bw?: number;
  alignItems?: 'flex-end' | 'flex-start' | 'center';
  flexDirection?: 'row' | 'column';
  fixed?: boolean;
  style?: Style | Style[] | any;
  children?: React.ReactNode;
}

export const PdfView = ({
  mh = 20,
  p = 2,
  flexDirection = 'column',
  style,
  fixed = false,
  children,
}: PdfViewProps) => {
  return (
    <View
      style={{
        marginHorizontal: mh,
        padding: p,
        flexDirection: flexDirection,
        ...style,
      }}
      fixed={fixed}
    >
      {children}
    </View>
  );
};

export const PdfBorderView = ({
  mh = 20,
  mv = 50,
  p = 2,
  borderColor = 'gray',
  bw = 2,
  style,
  fixed = false,
  children,
}: PdfViewProps) => {
  return (
    <View
      style={{
        marginHorizontal: mh,
        marginVertical: mv,
        padding: p,
        borderColor: borderColor,
        borderWidth: bw,
        ...style,
      }}
      fixed={fixed}
    >
      {children}
    </View>
  );
};

export const PdfHeader = ({
  bg = 'orange',
  p = 10,
  alignItems = 'flex-start',
  fixed = false,
  style,
  children,
}: PdfViewProps) => {
  return (
    <View
      style={{
        backgroundColor: bg,
        alignItems: alignItems,
        padding: p,
        ...style,
      }}
      fixed={fixed}
    >
      {children}
    </View>
  );
};

export const PdfSubHeader = ({
  bg = 'yellow',
  p = 4,
  alignItems = 'flex-end',
  fixed = false,
  style,
  children,
}: PdfViewProps) => {
  return (
    <View
      style={{
        backgroundColor: bg,
        alignItems: alignItems,
        padding: p,
        ...style,
      }}
      fixed={fixed}
    >
      {children}
    </View>
  );
};

export const PdfFooterView = ({
  bg = 'orange',
  p = 10,
  alignItems = 'center',
  fixed = false,
  style,
  children,
}: PdfViewProps) => {
  return (
    <View
      style={[
        {position: 'absolute', bottom: 0, left: 0, right: 0},
        {backgroundColor: bg, padding: p, alignItems: alignItems, ...style},
      ]}
      fixed={fixed}
    >
      {children}
    </View>
  );
};

interface GridProps {
  cols?: number;
  bg?: 'transparent' | string;
  style?: Style | Style[];
  children?: React.ReactNode;
}

export const PdfGrid: React.FunctionComponent<GridProps> = ({
  cols = 1,
  bg = 'white',
  style,
  children,
}) => (
  <View
    style={{
      width: `${100 / cols}%`,
      backgroundColor: bg,
      ...style,
    }}
  >
    {children}
  </View>
);
