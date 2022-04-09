import React, {useEffect} from 'react';
import {Container} from 'reactstrap';

interface ModalProps {
  show?: boolean;
  title?: string;
  subTitle?: string;
  onClick: () => void;
}

export const ModalIdleTimeout = (props: ModalProps) => {
  const [showModal, setShowModal] = React.useState(props.show);

  useEffect(() => {
    setShowModal(props.show);
  }, [props.show]);

  return (
    <Container>
      {showModal && (
        <>
          <div className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <h3 className="text-3xl font-semibold">{props.title}</h3>
                  <h3 className="text-sm font-semibold">{props.subTitle}</h3>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{transition: 'all .15s ease'}}
                    onClick={() => {
                      props.onClick && props.onClick();
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </Container>
  );
};
