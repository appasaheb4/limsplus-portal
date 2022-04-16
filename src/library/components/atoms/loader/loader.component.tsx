import React from 'react';
import * as Bootstrap from 'react-bootstrap';
export const Loader = () => {
  return (
    <div className="bg-black">
      <Bootstrap.Modal show={true} centered>
        <Bootstrap.Modal.Body style={{textAlign: 'center'}}>
          <Bootstrap.Spinner animation="border" variant="dark" />
          <br />
          <span>Loading...</span>
        </Bootstrap.Modal.Body>
      </Bootstrap.Modal>
    </div>
  );
};

export const ModalLoader = () => {
  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full my-6 mx-auto max-w-xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*body*/}
              <div className="relative p-2 flex-auto flex flex-col items-center">
                <style>
                  {`
    .spinner .background {
      fill: #555;
    }
    .spinner .line {
      animation: PacMan 5s infinite;
      fill: none;
      stroke: #d26188;
      stroke-width: 25;
    }
    .spinner .spinner {
      animation: Spin 2s infinite linear;
    }
    @keyframes PacMan {
      0% {
        stroke-dasharray: 79px 79;
      }
      50% {
        stroke-dasharray: 1px 79;
      }
      100% {
        stroke-dasharray: 79px 79;
      }
    }
    @keyframes Spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    `}
                </style>
                <svg
                  className="spinner"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                >
                  <circle className="background" cx="0" cy="0"></circle>
                  <path
                    className="line"
                    d="M 37.5,50 C 37.5,43.096441 43.096441,37.5 50,37.5 C 56.903559,37.5 62.5,43.096441 62.5,50 C 62.5,56.903559 56.903559,62.5 50,62.5 C 43.096441,62.5 37.5,56.903559 37.5,50"
                  ></path>
                </svg>{' '}
                <span style={{marginTop: -15}}>loading ...</span>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
};
