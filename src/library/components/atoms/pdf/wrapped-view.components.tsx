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

interface PdfViewProps {
  mh?: number;
  p?: number;
  borderColor?: string;
  bg?: string;
  bw?: number;
  alignItems?: 'flex-end' | 'flex-start' | 'center';
  children?: React.ReactNode;
}

export const PdfView = ({mh = 20, p = 2, children}: PdfViewProps) => {
  return (
    <View
      style={{
        marginHorizontal: mh,
        padding: p,
      }}
    >
      {children}
    </View>
  );
};

export const PdfBorderView = ({
  mh = 20,
  p = 2,
  borderColor = 'gray',
  bw = 2,
  children,
}: PdfViewProps) => {
  return (
    <View
      style={{
        marginHorizontal: mh,
        padding: p,
        borderColor: borderColor,
        borderWidth: bw,
      }}
    >
      {children}
    </View>
  );
};

export const PdfHeader = ({
  bg = 'orange',
  p = 10,
  alignItems = 'flex-start',
  children,
}: PdfViewProps) => {
  return (
    <View
      style={{
        backgroundColor: bg,
        alignItems: alignItems,
        padding: p,
      }}
    >
      {children}
    </View>
  );
};

export const PdfSubHeader = ({
  bg = 'yellow',
  p = 4,
  alignItems = 'flex-end',
  children,
}: PdfViewProps) => {
  return (
    <View
      style={{
        backgroundColor: bg,
        alignItems: alignItems,
        padding: p,
      }}
    >
      {children}
    </View>
  );
};

export const PdfFooterView = ({
  bg = 'orange',
  p = 10,
  alignItems = 'center',
  children,
}: PdfViewProps) => {
  return (
    <View
      style={[
        {position: 'absolute', bottom: 0, left: 0, right: 0},
        {backgroundColor: bg, padding: p, alignItems: alignItems},
      ]}
    >
      {children}
    </View>
  );
};

interface GridProps {
  cols?: number;
  children?: React.ReactNode;
}

export const PdfGrid: React.FunctionComponent<GridProps> = props => (
  <View
    style={{
      flex: 1,
    }}
  >
    {props.children}
  </View>
);
