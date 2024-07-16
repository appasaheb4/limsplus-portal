import React, { useState, useEffect } from 'react';
import { Document, PDFViewer, Page, Font, View } from '@react-pdf/renderer';
import _ from 'lodash';
import Html from 'react-pdf-html';
import { Container } from 'reactstrap';

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
  family: 'arimaRegular',
  src: '/assets/fonts/arima/Arima-Regular.ttf',
});

interface ModalReportHtmlViewProps {
  visible: boolean;
  details: string;
  onClose: () => void;
}

export const ModalReportHtmlView = ({
  visible = false,
  details = '<h1>Testing</h1>',
  onClose,
}: ModalReportHtmlViewProps) => {
  const [showModal, setShowModal] = useState(visible);
  const regex = /style=(.*)font-[^;]+;/g;
  //const regex = /style=(.*)font-family[^;]+;/g;
  const subst = '';

  //   const staticContent = `
  //   <p><strong><br></strong></p><p><strong>MINIMAL RESIDUAL DISEASE(MRD) FL</strong></p><p>test</p>
  //   <table style="border-collapse: collapse; maxWidth: 80.6584%;"><tbody>
  // <tr>
  // 	<td style="maxWidth: 12%;">test</td>
  // 	<td style="maxWidth: 88%;">test</td></tr>
  // <tr>
  // 	<td style="maxWidth: 12%;">test</td>
  // 	<td style="maxWidth: 88%;">test</td></tr></tbody></table>`;

  const staticContent = `<p><strong><br></strong></p><p><strong>MINIMAL RESIDUAL DISEASE(MRD) FL</strong></p><p>test</p>
  <table style="border-collapse:collapse;width: 100%;"><tbody>
<tr>
	<td style="width: 71.1248%;">test</td>
	<td style="width: 28.8752%;">test</td></tr>
<tr>
	<td>tes</td>
	<td>test</td></tr></tbody></table>`;

  useEffect(() => {
    setShowModal(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const html = content => `
  <html>
    <body id="reportTable">
        ${content}
    </body>
 <script>
    document.querySelector('#reportTable').style.backgroundColor='red'
    const tables = document.querySelectorAll('table')
    tables.forEach((item)=>{
    item.style.backgroundColor='red'
    })
    </script>
  </html>
  `;

  const stylesheet = {
    body: {
      fontSize: '10px',
      fontFamily: 'arimaRegular',
    },
    p: {
      margin: 0,
      fontSize: '10px',
    },
    table: {
      border: '1px solid !important',
      marginTop: 4,
      marginBottom: 4,
    },
    td: {
      padding: 2,
    },
    strong: {
      fontFamily: 'IBMPlexSans',
      fontWeight: 'bold',
    },
    em: {
      fontFamily: 'IBMPlexSans',
      fontStyle: 'italic',
    },
    img: {
      width: 200,
      height: 200,
    },
    sup: {
      verticalAlign: 'super',
      fontSize: '8px',
    },
    sub: {
      verticalAlign: 'sub',
      fontSize: '8px',
    },
  };

  console.log({
    result: details,
  });

  return (
    <>
      <Container>
        {showModal && (
          <>
            <div className='justify-center items-center m-10  overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none'>
              <div className='relative mx-auto '>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  <div className='flex items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <h3 className='text-3xl font-semibold'>Preview</h3>
                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => {
                        setShowModal(false);
                        onClose && onClose();
                      }}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className='relative p-2 flex-auto'>
                    <div className='grid grid-cols-1'>
                      <PDFViewer
                        style={{
                          width: window.innerWidth,
                          height: window.innerHeight,
                        }}
                        showToolbar={false}
                      >
                        <Document title='Preview'>
                          <Page size='A4'>
                            <View
                              style={{
                                padding: 10,
                              }}
                            >
                              <Html stylesheet={stylesheet}>
                                {html(staticContent.replace(regex, subst))}
                              </Html>
                            </View>
                          </Page>
                        </Document>
                      </PDFViewer>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase p-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        setShowModal(false);
                        onClose && onClose();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
          </>
        )}
      </Container>
    </>
  );
};
