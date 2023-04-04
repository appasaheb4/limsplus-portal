import React, {useRef} from 'react';
import {
  PdfHeading,
  PdfHeader,
  PdfImage,
} from '@components';
import {Image, View} from '@react-pdf/renderer';

interface PdfTemp0001HeaderProps {
  data: any;
}

export const PdfTemp0001Header = ({data}: PdfTemp0001HeaderProps) => {
  console.log({data});

  const headerTitleCSS = useRef<any>({});
  const headerMainBoxCSS = useRef<any>({});
  const imageCSS = useRef<any>({});
  if (data.header?.titleCSS) {
    try {
      headerTitleCSS.current = eval('({' + data.header?.titleCSS + '})');
    } catch (e) {
      headerTitleCSS.current = {};
    }
  }
  if (data.header?.mainBoxCSS) {
    try {
      headerMainBoxCSS.current = eval('({' + data.header?.mainBoxCSS + '})');
    } catch (e) {
      headerMainBoxCSS.current = {};
    }
  }
  if (data.header?.logoCSS) {
    try {
      imageCSS.current = eval('({' + data.header?.logoCSS + '})');
    } catch (e) {
      imageCSS.current = {};
    }
  }

  //
  return (
    <>
      <PdfHeader
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          ...headerMainBoxCSS.current,
        }}
        fixed
      >
        {data.header?.backgroundImage && (
          <>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
              }}
              fixed={true}
            >
              <Image
                object-fit='fill'
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  objectFit: 'fill',
                }}
                source={{
                  uri:
                    typeof data.header?.backgroundImage == 'object'
                      ? data.header?.backgroundImageBase64
                      : data.header?.backgroundImage,
                  method: 'GET',
                  headers: {'Cache-Control': 'no-cache'},
                  body: '',
                }}
              />
            </View>
          </>
        )}
        {data.header?.logo && (
          <PdfImage
            src={data.header?.logo}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginHorizontal: 10,
              ...imageCSS.current,
            }}
          />
        )}
        <PdfHeading style={headerTitleCSS.current}>
          {data.header?.title || 'Title'}
        </PdfHeading>
      </PdfHeader>
    </>
  );
};
