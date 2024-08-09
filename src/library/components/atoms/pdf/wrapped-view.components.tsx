import React from 'react';
import { View } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
interface PdfViewProps {
  mh?: number;
  mt?: number;
  mv?: number;
  p?: number;
  borderColor?: string;
  bg?: string;
  bw?: number;
  height?: string | number;
  alignItems?: 'flex-end' | 'flex-start' | 'center';
  flexDirection?: 'row' | 'column';
  fixed?: boolean;
  isBreak?: boolean;
  style?: Style | Style[] | any;
  children?: React.ReactNode;
}

export const PdfView = ({
  mh = 20,
  p = 2,
  flexDirection = 'column',
  style,
  fixed = false,
  isBreak = false,
  alignItems,
  mt,
  children,
}: PdfViewProps) => {
  return (
    <View
      break={isBreak}
      style={{
        marginHorizontal: mh,
        marginTop: mt,
        padding: p,
        flexDirection: flexDirection,
        alignItems: alignItems,
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
  flexDirection = 'column',
  fixed = false,
  isBreak = false,
  children,
}: PdfViewProps) => {
  return (
    <View
      break={isBreak}
      style={{
        flexDirection: flexDirection,
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

interface PdfHeaderProps {
  bg?: string;
  p?: number;
  alignItems?: React.CSSProperties['alignItems'] | any;
  fixed?: boolean;
  style?: React.CSSProperties | any;
  children?: React.ReactNode;
}

export const PdfHeader = ({
  bg = 'orange',
  p = 10,
  alignItems = 'flex-start',
  fixed = false,
  style,
  children,
}: PdfHeaderProps) => {
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

interface PdfFooterViewProps {
  bottom?: number;
  left?: number;
  right?: number;
  bg?: string;
  p?: number;
  alignItems?: React.CSSProperties['alignItems'];
  fixed?: boolean;
  height?: string | number;
  style?: React.CSSProperties | any;
  children: React.ReactNode;
}

export const PdfFooterView = ({
  bottom = 0,
  left = 0,
  right = 0,
  bg = 'orange',
  p = 10,
  alignItems = 'center',
  fixed = false,
  height = '100%',
  style,
  children,
}: PdfFooterViewProps) => {
  return (
    <View
      style={[
        { position: 'absolute', bottom, left, right, height },
        { backgroundColor: bg, padding: p, alignItems: alignItems, ...style },
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
