import React, {useEffect} from 'react';
import {Container} from 'reactstrap';
import {observer} from 'mobx-react';
import * as Assets from '@/library/assets';
import {useForm, Controller} from 'react-hook-form';
import {FormHelper} from '@/helper';

import {Form, List} from '@/library/components';
import {useStores} from '@/stores';

interface ModalForgotPasswordProps {
  show?: boolean;
  data?: any;
  onClick: (data: any) => void;
  onClose: () => void;
}

export const ModalForgotPassword = observer(
  (props: ModalForgotPasswordProps) => {
    const [showModal, setShowModal] = React.useState(props.show);
    const {loginStore} = useStores();
    useEffect(() => {
      setShowModal(props.show);
    }, [props]);

    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm();

    const onForgotPassword = () => {
      if (
        loginStore.forgotPassword?.email !== undefined ||
        loginStore.forgotPassword?.mobileNo !== undefined
      ) {
        props.onClick(loginStore.forgotPassword);
      }
    };

    return (
      <Container>
        {showModal && (
          <>
            <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div>
                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => props.onClose()}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  <div className='flex  flex-col  items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <div className='items-center justify-center flex mb-2'>
                      <img
                        src={Assets.logo}
                        className=' img-thumbnail img-fluid'
                        style={{width: 70, height: 55, marginRight: 10}}
                        alt='lims plus'
                      />
                      <h4 className='font-semibold'>{'Lims Plus'}</h4>
                    </div>
                    <div>
                      <div className='items-center justify-center flex'>
                        <h1 className='text-4xl'>Forgot Password</h1>
                      </div>
                    </div>
                  </div>

                  {/*body*/}
                  <div className='relative ml-24 mr-24 p-2 flex-auto'>
                    <List direction='col' space={4} justify='stretch' fill>
                      <Controller
                        control={control}
                        render={({field: {onChange}}) => (
                          <Form.Input
                            label='User Id'
                            placeholder='User Id'
                            hasError={!!errors.userId}
                            value={loginStore.forgotPassword?.userId}
                            onChange={userId => {
                              onChange(userId);
                              loginStore.updateForgotPassword({
                                ...loginStore.forgotPassword,
                                userId: userId.toUpperCase(),
                              });
                            }}
                          />
                        )}
                        name='userId'
                        rules={{required: true}}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange}}) => (
                          <Form.Input
                            type='mail'
                            label='Email'
                            placeholder='Email'
                            hasError={!!errors.email}
                            value={loginStore.forgotPassword?.email}
                            onChange={email => {
                              onChange(email);
                              loginStore.updateForgotPassword({
                                ...loginStore.forgotPassword,
                                email,
                              });
                            }}
                          />
                        )}
                        name='email'
                        rules={{
                          required: false,
                          pattern: FormHelper.patterns.email,
                        }}
                        defaultValue=''
                      />
                      <span className='text-center'>OR</span>
                      <Controller
                        control={control}
                        render={({field: {onChange}}) => (
                          <Form.Input
                            pattern={FormHelper.patterns.mobileNo}
                            label='Mobile Number'
                            placeholder='Mobile Number'
                            hasError={!!errors.mobileNo}
                            value={loginStore.forgotPassword?.mobileNo}
                            onChange={mobileNo => {
                              onChange(mobileNo);
                              loginStore.updateForgotPassword({
                                ...loginStore.forgotPassword,
                                mobileNo,
                              });
                            }}
                          />
                        )}
                        name='mobileNo'
                        rules={{required: false}}
                        defaultValue=''
                      />
                    </List>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-center p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className='bg-black text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{transition: 'all .15s ease'}}
                      onClick={handleSubmit(onForgotPassword)}
                    >
                      Send
                    </button>
                  </div>
                  <div className='justify-center items-center flex'>
                    <p>Powered by Lims Plus Solutions Pvt Ltd.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
          </>
        )}
      </Container>
    );
  },
);
