import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Toast, List, Form} from '../../..';
import {FormHelper} from '@/helper';
import {Container} from 'reactstrap';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';

interface ModalProps {
  show: boolean;
  title?: string;
  onClick: () => void;
  onClose: () => void;
}

export const ModalChangePasswordByAdmin = observer((props: ModalProps) => {
  const {userStore} = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    // setValue,
  } = useForm();
  const [showModal, setShowModal] = React.useState(props.show);

  const onSubmitModalChangePasswordByAdmin = () => {
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
    <Container>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-3">
                {/*header*/}
                <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t ">
                  <div className="flex-col">
                    <h3 className="text-3xl font-semibold">
                      Change Password By Adminstrator
                    </h3>
                  </div>

                  <button
                    className="p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.onClose && props.onClose()}
                  >
                    <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <List direction="col" space={4} justify="stretch" fill>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input
                          type="password"
                          label="New Password"
                          name="newPassword"
                          hasError={errors.newPassword}
                          placeholder={
                            errors.newPassword
                              ? 'Please Enter New Password'
                              : 'New Password'
                          }
                          value={userStore.changePassword?.newPassword}
                          onChange={newPassword => {
                            onChange(newPassword);
                            userStore.updateChangePassword({
                              ...userStore.changePassword,
                              newPassword,
                            });
                          }}
                        />
                      )}
                      name="newPassword"
                      rules={{
                        required: true,
                        pattern: FormHelper.patterns.password,
                      }}
                      defaultValue=""
                    />
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input
                          type="password"
                          label="Confirm Password"
                          name="confirmPassword"
                          hasError={errors.confirmPassword}
                          placeholder={
                            errors.confirmPassword
                              ? 'Please Enter Confirm Password'
                              : 'Confirm Password'
                          }
                          value={userStore.changePassword?.confirmPassword}
                          onChange={confirmPassword => {
                            onChange(confirmPassword);
                            userStore.updateChangePassword({
                              ...userStore.changePassword,
                              confirmPassword,
                            });
                          }}
                        />
                      )}
                      name="confirmPassword"
                      rules={{
                        required: true,
                        pattern: FormHelper.patterns.password,
                        validate: value =>
                          value === userStore.changePassword?.newPassword,
                      }}
                      defaultValue=""
                    />
                  </List>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end  border-t border-solid border-gray-300 rounded-b p-2">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{transition: 'all .15s ease'}}
                    onClick={() => props.onClose && props.onClose()}
                  >
                    Later
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{transition: 'all .15s ease'}}
                    onClick={handleSubmit(onSubmitModalChangePasswordByAdmin)}
                  >
                    Change
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
});
