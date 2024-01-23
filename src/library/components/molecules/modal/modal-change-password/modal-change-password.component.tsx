import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Toast, List, Form } from '../../..';
import { FormHelper } from '@/helper';
import { useForm, Controller } from 'react-hook-form';
import { useStores } from '@/stores';
import * as Assets from '@/library/assets';

interface ModalProps {
  show: boolean;
  title?: string;
  onClick: () => void;
  onClose: () => void;
}

export const ModalChangePassword = observer((props: ModalProps) => {
  const { userStore } = useStores();
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm();
  const [showModal, setShowModal] = React.useState(props.show);

  const onSubmitModalChangePassword = () => {
    if (userStore.changePassword) {
      props.onClick();
    } else {
      Toast.error({
        message: '😔 Please enter all information!',
      });
    }
  };

  useEffect(() => {
    setShowModal(props.show);
  }, [props]);

  return (
    <>
      {showModal && (
        <>
          <div className='justify-center items-center flex overflow-x-hidden  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none sm:p-4'>
            <div className='relative w-full my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-boxdark  outline-none focus:outline-none'>
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
                      src={Assets.images.linplusLogo}
                      className='img-fluid'
                      style={{
                        width: '200px',
                        height: '122px',
                        marginRight: 10,
                      }}
                      alt='lims plus'
                    />
                  </div>
                  <div>
                    <div className='items-center justify-center flex'>
                      <span className='text-4xl'>Change Password</span>
                    </div>
                  </div>
                </div>

                {/*body*/}
                <div className='relative  flex-auto p-3'>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputPassword
                          label='Old Password'
                          name='oldPassword'
                          hasError={!!errors.oldPassword}
                          placeholder={
                            errors.oldPassword
                              ? 'Please Enter Old Password'
                              : 'Old Password'
                          }
                          value={value}
                          onChange={oldPassword => {
                            onChange(oldPassword);
                            userStore.updateChangePassword({
                              ...userStore.changePassword,
                              oldPassword,
                            });
                          }}
                        />
                      )}
                      name='oldPassword'
                      rules={{
                        required: true,
                        pattern: FormHelper.patterns.password,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputPassword
                          label='New Password'
                          name='newPassword'
                          placeholder={
                            errors.newPassword
                              ? 'Please Enter New Password'
                              : 'New Password'
                          }
                          hasError={!!errors.newPassword}
                          value={value}
                          onChange={newPassword => {
                            onChange(newPassword);
                            userStore.updateChangePassword({
                              ...userStore.changePassword,
                              newPassword,
                            });
                          }}
                        />
                      )}
                      name='newPassword'
                      rules={{
                        required: true,
                        pattern: FormHelper.patterns.password,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputPassword
                          label='Confirm Password'
                          name='confirmPassword'
                          placeholder={
                            errors.confirmPassword
                              ? 'Please Enter Confirm Password'
                              : 'Confirm Password'
                          }
                          hasError={!!errors.confirmPassword}
                          value={value}
                          onChange={confirmPassword => {
                            onChange(confirmPassword);
                            userStore.updateChangePassword({
                              ...userStore.changePassword,
                              confirmPassword,
                            });
                          }}
                        />
                      )}
                      name='confirmPassword'
                      rules={{
                        required: true,
                        pattern: FormHelper.patterns.password,
                        validate: value =>
                          value === userStore.changePassword?.newPassword,
                      }}
                      defaultValue=''
                    />
                  </List>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end  border-t border-solid border-gray-300 rounded-b p-2'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => props.onClose && props.onClose()}
                  >
                    Later
                  </button>
                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={handleSubmit(onSubmitModalChangePassword)}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </>
  );
});
