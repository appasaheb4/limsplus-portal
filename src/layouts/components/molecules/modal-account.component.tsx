import React, {useState} from 'react';
import {observer} from 'mobx-react';
import * as Assets from '@/library/assets';
import {
  ModalTransition,
  Header,
  PageHeading,
  Image,
  List,
  Form,
  Toast,
  ModalFileUpload,
} from '@/library/components';

import {stores, useStores} from '@/stores';

import {useHistory} from 'react-router-dom';
interface ModalAccountProps {
  show: boolean;
  onClose?: () => void;
}

export const ModalAccount = observer((props: ModalAccountProps) => {
  const {userStore, loginStore} = useStores();
  const history: any = useHistory();
  const [modalFileUpload, setModalFileUpload] = useState<any>();

  return (
    <>
      <ModalTransition
        show={!!props.show}
        onClose={() => props.onClose && props.onClose()}
      >
        <Header>
          <PageHeading title='Account' />
        </Header>

        <Image
          widht={200}
          height={200}
          source={loginStore.login?.picture || Assets.defaultAvatar}
          onClick={() =>
            setModalFileUpload({show: true, title: 'Profile image select'})
          }
        />

        <div className='flex justify-center'>
          <label className='font-bold text-1xl'>
            {' '}
            {loginStore.login?.fullName}
          </label>
        </div>
        <div className='p-2'>
          <List direction='col' space={4} justify='stretch' fill>
            <div className='bg-gray-500 rounded-md p-2 items-stretch'>
              <label className='text-white'>
                Lab : {loginStore.login?.lab}
              </label>
              <br />
              <label className='text-white'>
                Role: {loginStore.login?.role}
              </label>
              <br />
              <label className='text-white'>
                Environment: {loginStore.login?.environment}
              </label>
            </div>
            {loginStore.login?.labList !== undefined &&
              loginStore.login?.labList?.length > 1 && (
                <Form.InputWrapper label={'Switch Lab'} id='labChange'>
                  <select
                    name='defualtLab'
                    value={loginStore.login?.lab}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const lab = e.target.value;
                      loginStore.updateLogin({
                        ...loginStore.login,
                        lab,
                      });
                      history.push('/dashboard/default');
                      Toast.success({
                        message: '😊 Your lab change successfully',
                      });
                      props.onClose && props.onClose();
                    }}
                  >
                    {loginStore.login?.labList?.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      ),
                    )}
                  </select>
                </Form.InputWrapper>
              )}
            {loginStore.login?.roleList !== undefined &&
              loginStore.login?.roleList?.length > 1 && (
                <Form.InputWrapper label={'Switch Role'} id='roleChange'>
                  <select
                    name='roleChange'
                    value={loginStore.login?.role}
                    className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                    onChange={e => {
                      const role = e.target.value;
                      userStore.UsersService.switchAccess({
                        input: {
                          role,
                        },
                      }).then((res: any) => {
                        if (res.userSwitchAccess.success) {
                          loginStore.updateLogin({
                            ...loginStore.login,
                            role,
                          });
                          const router =
                            res.userSwitchAccess.data.roleMapping.router;
                          stores.routerStore.updateUserRouter(router);
                          Toast.success({
                            message: `😊 ${res.userSwitchAccess.message}`,
                          });
                          history.push('/dashboard/default');
                          props.onClose && props.onClose();
                        } else {
                          Toast.error({
                            message: `😔 ${res.userSwitchAccess.message}`,
                          });
                        }
                      });
                    }}
                  >
                    {loginStore.login?.roleList?.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.description}
                        </option>
                      ),
                    )}
                  </select>
                </Form.InputWrapper>
              )}
          </List>
        </div>
      </ModalTransition>
      <ModalFileUpload
        {...modalFileUpload}
        onClick={(picture: any) => {
          userStore.UsersService.uploadImage({
            input: {
              picture,
              _id: loginStore.login?._id,
            },
          }).then((res: any) => {
            setModalFileUpload({show: false});
            if (res.updateUserImages.success) {
              loginStore.updateLogin({
                ...loginStore.login,
                picture: res.updateUserImages.data.picture,
              });
              Toast.success({
                message: `😊 ${res.updateUserImages.message}`,
              });
            } else {
              Toast.error({
                message: `😔 ${res.updateUserImages.message}`,
              });
            }
          });
        }}
        onClose={() => setModalFileUpload({show: false})}
      />
    </>
  );
});
