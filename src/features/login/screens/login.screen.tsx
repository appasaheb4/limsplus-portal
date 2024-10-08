import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  List,
  Form,
  Buttons,
  Svg,
  Icons,
  ModalChangePassword,
  ModalSessionAllowed,
} from '@/library/components';

import { ModalForgotPassword, ModalNoticeBoard } from '../components';
import { Carousel } from 'react-bootstrap';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { FormHelper } from '@/helper';
import { useHistory } from 'react-router-dom';
import { useStores } from '@/stores';
import { t } from '@/localization';
import * as Assets from '@/library/assets';
import LogRocket from 'logrocket';

export const Login = observer(() => {
  const {
    loading,
    userStore,
    loginStore,
    rootStore,
    bannerStore,
    doctorsStore,
    corporateClientsStore,
  } = useStores();
  const history = useHistory();
  const [noticeBoard, setNoticeBoard] = useState<any>({});
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [labRoleList, setLabRoleList] = useState({ labList: [], roleList: [] });
  const refUserId = useRef<any>();
  const [modalForgotPassword, setModalForgotPassword] = useState<any>();
  const [modalChangePassword, setModalChangePassword] = useState<any>();
  const [modalSessionAllowed, setModalSessionAllowed] = useState<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    bannerStore.fetchListAllBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rootStore.isLogin().then(isLogin => {
      if (isLogin) {
        history.push('/dashboard/default');
      } else {
        history.push('/');
      }
    });
    refUserId.current && refUserId.current?.focus();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStore.login]);

  const onLogin = async (data: any) => {
    const loginFailedCount = loginStore.loginFailedCount || 0;
    if (
      loginFailedCount > 4 &&
      loginStore.inputLogin?.userId != 'ADMINISTRATOR'
    ) {
      loginStore.LoginService.accountStatusUpdate({
        input: {
          userId: loginStore.inputLogin?.userId,
          companyCode: loginStore.inputLogin?.companyCode,
          status: 'DI',
        },
      }).then(res => {
        if (res.userAccountStatusUpdate.success) {
          Toast.error({
            message: `😔 ${res.userAccountStatusUpdate.message}`,
          });
          loginStore.updateLoginFailedCount(0);
        }
      });
    } else {
      loginStore.LoginService.onLogin({
        input: {
          user: loginStore.inputLogin,
          loginActivity: {
            device: width <= 768 ? 'Mobile' : 'Desktop',
            platform: 'Web',
          },
        },
      })
        .then(res => {
          if (res.login.success == 1) {
            loginStore.updateLoginFailedCount(0);
            if (!res.login.data.user.passChanged) {
              setModalChangePassword({ show: true });
            } else {
              if (res.login.data.user.noticeBoard !== undefined) {
                setNoticeBoard({
                  show: true,
                  userInfo: res.login.data.user,
                  data: res.login.data.user.noticeBoard,
                });
              } else {
                Toast.success({
                  message: `😊 ${res.login.message}`,
                });
                const user = res.login.data.user;
                loginStore.saveLogin(user);
                loginStore.clearInputUser();
                LogRocket.identify(user?.userId, {
                  name: user?.fullName,
                  email: user?.email,
                  mobileNo: user?.mobileNo,
                });
                setTimeout(() => {
                  history.push('/dashboard/default');
                }, 1000);
              }
            }
          } else if (res.login.success == 2) {
            setModalSessionAllowed({
              show: true,
              data: res.login.data.loginActivityListByUserId,
            });
          } else {
            loginStore.updateLoginFailedCount(loginFailedCount + 1);
            Toast.error({
              message: `😔 ${res.login.message}`,
            });
          }
        })
        .catch(error => {
          loginStore.updateLoginFailedCount(loginFailedCount + 1);
          Toast.error({
            message: `😔 ${error.message}`,
          });
        });
    }
  };
  const carouselSize = width <= 768 ? 300 : 500;

  const getLabList = async (userModule, user) => {
    const corClientKeys = {
      corporateCode: 'code',
      corporateName: 'name',
    };
    const regLocationKeys = {
      locationCode: 'code',
      locationName: 'name',
    };
    const dockerKeys = {
      doctorCode: 'code',
      doctorName: 'name',
    };
    switch (userModule?.split('_')[0]) {
      case 'Registration Location':
        user?.registrationLocation?.map(function (obj) {
          return _.mapKeys(obj, function (value, key) {
            return regLocationKeys[key];
          });
        });
        break;
      case 'Corporate Clients':
        user?.corporateClient[0]?.corporateCode !== '*'
          ? user?.corporateClient?.map(function (obj) {
              return _.mapKeys(obj, function (value, key) {
                return corClientKeys[key];
              });
            })
          : corporateClientsStore.listCorporateClients?.map(function (obj) {
              return _.mapKeys(obj, function (value, key) {
                return corClientKeys[key];
              });
            });
        break;
      case 'Doctor':
        doctorsStore.doctorsService
          .findByFields({
            input: {
              filter: {
                lab: user.defaultLab,
              },
            },
          })
          .then(res => {
            if (!res.findByFieldsDocter.success)
              return Toast.error({
                message: '😔 Doctor list not found!',
              });
            return res.findByFieldsDocter?.data?.map(function (obj) {
              return _.mapKeys(obj, function (value, key) {
                return dockerKeys[key];
              });
            });
          });
        break;
      default:
        return user?.lab;
    }
  };

  return (
    <>
      <div className='flex flex-col h-screen bg-[#FF6C99] w-full justify-center items-center overflow-hidden'>
        <svg
          width='80%'
          height='100%'
          viewBox='0 0 100 100'
          preserveAspectRatio='none'
          style={{ position: 'absolute', left: 0, right: 0 }}
        >
          <path
            d='M0,0 
           L100,0
           C4,30 130,100 0,120'
            fill='#394D7F'
          />
        </svg>

        <div
          className='absolute top-0 left-0 right-0 flex justify-center'
          style={{ marginTop: '-20px' }}
        >
          <img
            src={Assets.images.limsplusTran}
            alt='appIcon'
            className='w-[200px]'
          />
        </div>

        <div
          className='flex flex-col  mt-[72px] md:mt-0 rounded-3xl shadow-lg bg-white items-center absolute p-2 from-blue-600 bg-gradient-to-r max-w-full overflow-x-auto'
          style={{ minWidth: '50%' }}
        >
          <div className='flex flex-col mt-10 sm:flex-row md:flex-row xl:flex-row w-full mb-12'>
            <div className='flex justify-between mx-10 gap-14 items-center'>
              <div className='flex'>
                <div className='flex justify-center items-center'>
                  <Carousel
                    style={{ width: carouselSize, height: carouselSize }}
                    indicators={false}
                    controls={false}
                  >
                    {bannerStore.listAllBanner.map((item, key) => (
                      <Carousel.Item interval={3000} key={key}>
                        <>
                          {item.isTitle && (
                            <span className='flex justify-center text-lg text-white'>
                              {item.title}
                            </span>
                          )}
                          <img
                            key={key}
                            src={item.image}
                            alt={key.toString()}
                            style={{
                              width: carouselSize,
                              height: carouselSize,
                              borderRadius: carouselSize / 2,
                            }}
                          />
                        </>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='flex justify-center items-end'>
                  <div className='flex flex-col mt-2 rounded-3xl bg-white shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] w-[350px]'>
                    <span className='text-center font-bold text-3xl text-black mt-2 ml-4 underline'>
                      Sign In
                    </span>
                    {loginStore.inputLogin?.userModule && (
                      <span className='text-center font-bold text-xl text-black mt-2 ml-4'>
                        {loginStore.inputLogin?.userModule?.split('_')[1]}
                      </span>
                    )}
                    <div className='rounded-2xl p-4'>
                      <List direction='col' space={4} justify='stretch' fill>
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <Form.Input
                              label='User Id'
                              id='userIdInput'
                              name='userId'
                              inputRef={refUserId}
                              wrapperStyle={{ color: 'black' }}
                              placeholder={
                                errors.userId ? 'Please enter userId' : 'UserId'
                              }
                              hasError={!!errors.userId}
                              value={loginStore.inputLogin?.userId || ''}
                              onChange={userId => {
                                onChange(userId);
                                loginStore.updateInputUser({
                                  ...loginStore.inputLogin,
                                  userId: userId?.toUpperCase(),
                                });
                              }}
                              onBlur={async userId => {
                                if (userId) {
                                  //'https://geneflow.limsplussolutions.com'
                                  //'https://www.limsplussolutions.com'
                                  //'https://demo-limsplus-portal.vercel.app'
                                  userStore.UsersService.checkExitsUserId({
                                    input: {
                                      userId: userId.trim(),
                                      webPortal:
                                        process.env.REACT_APP_ENV === 'Local'
                                          ? 'https://geneflow.limsplussolutions.com'
                                          : window.location.origin,
                                      //   webPortal:
                                      //     'https://www.limsplussolutions.com',
                                    },
                                  }).then(async res => {
                                    if (res.checkUserExitsUserId?.success) {
                                      const { data: user } =
                                        res.checkUserExitsUserId;
                                      if (user) {
                                        localStorage.setItem(
                                          'companyCode',
                                          user?.companyCode,
                                        );
                                        setValue('lab', user?.defaultLab);
                                        clearErrors('lab');
                                        if (user.role.length == 1)
                                          setValue('role', user.role[0].code);

                                        loginStore.updateInputUser({
                                          ...loginStore.inputLogin,
                                          lab: user.defaultLab,
                                          role:
                                            user.role.length == 1
                                              ? user.role[0].code
                                              : '',
                                          userModule: user?.userModule,
                                          companyCode: user?.companyCode,
                                        });
                                        setLabRoleList({
                                          labList: await getLabList(
                                            user?.userModule,
                                            user,
                                          ),
                                          roleList: user.role,
                                        });
                                      }
                                    } else {
                                      Toast.error({
                                        message: `😔 ${res?.checkUserExitsUserId?.message}`,
                                      });
                                    }
                                  });
                                }
                              }}
                            />
                          )}
                          name='userId'
                          rules={{ required: true }}
                          defaultValue={loginStore.inputLogin?.userId}
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <Form.InputPassword
                              label='Password'
                              wrapperStyle={{ color: 'black' }}
                              placeholder={
                                errors.password
                                  ? 'Please enter password'
                                  : 'Password'
                              }
                              hasError={!!errors.password}
                              value={loginStore.inputLogin?.password || ''}
                              onChange={password => {
                                onChange(password);
                                loginStore.updateInputUser({
                                  ...loginStore.inputLogin,
                                  password,
                                });
                              }}
                            />
                          )}
                          name='password'
                          rules={{
                            required: true,
                            pattern: FormHelper.patterns.password,
                          }}
                          defaultValue={loginStore.inputLogin?.password}
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Form.InputWrapper
                              label={
                                loginStore.inputLogin.userModuleCategory ||
                                'Lab'
                              }
                              hasError={!!errors.lab}
                              style={{ color: 'black' }}
                            >
                              <select
                                value={value}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.lab ? 'border-red' : 'border-gray-300'
                                } rounded-md cursor-pointer`}
                                onChange={e => {
                                  const lab = e.target.value;
                                  onChange(lab);
                                  loginStore.updateInputUser({
                                    ...loginStore.inputLogin,
                                    lab,
                                  });
                                }}
                              >
                                <option>
                                  {labRoleList?.labList ? 'Select' : value}
                                </option>
                                {labRoleList?.labList?.map((item: any) => (
                                  <option key={item.code} value={item.code}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='lab'
                          rules={{ required: true }}
                          defaultValue={loginStore.inputLogin?.lab}
                        />
                        <Controller
                          control={control}
                          render={({ field: { onChange } }) => (
                            <Form.InputWrapper
                              label='Role'
                              hasError={!!errors.role}
                              style={{ color: 'black' }}
                            >
                              <select
                                value={loginStore.inputLogin?.role}
                                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                                  errors.role ? 'border-red' : 'border-gray-300'
                                } rounded-md cursor-pointer`}
                                onChange={e => {
                                  const role = e.target.value;
                                  onChange(role);
                                  loginStore.updateInputUser({
                                    ...loginStore.inputLogin,
                                    role,
                                  });
                                }}
                              >
                                <option>Select</option>
                                {labRoleList.roleList.map((item: any) => (
                                  <option key={item.code} value={item.code}>
                                    {item.description}
                                  </option>
                                ))}
                              </select>
                            </Form.InputWrapper>
                          )}
                          name='role'
                          rules={{ required: true }}
                          defaultValue={loginStore.inputLogin?.role}
                        />
                      </List>
                      <br />
                      <List direction='row' space={3} align='center'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          icon={Svg.Check}
                          onClick={handleSubmit(onLogin)}
                          className='cursor-pointer'
                          disabled={loading}
                        >
                          {t('common:login').toString()}
                        </Buttons.Button>
                      </List>
                      <div className='flex p-4 flex-row w-full justify-between gap-4'>
                        <a
                          href='#'
                          onClick={() => setModalForgotPassword({ show: true })}
                          className='text-black text-sm cursor-pointer'
                        >
                          {'Forgot Password'}
                        </a>
                        <a
                          href='privacy-policy'
                          className='text-black text-sm cursor-pointer'
                        >
                          Privacy and Policy
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-4 hidden'>
                  <span className='underline font-bold'>Quick Access :</span>
                  <a
                    href='#'
                    className='flex flex-row items-center gap-2 cursor-pointer'
                  >
                    {' '}
                    1.
                    <Icons.Iconmd.MdPayments size={20} />
                    Online Payment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalNoticeBoard
          {...noticeBoard}
          click={async action => {
            setNoticeBoard({
              ...noticeBoard,
              show: false,
            });
            if (action !== 'login') {
              Toast.warning({
                message: '😔 Please use diff lab',
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else {
              Toast.success({
                message: `😊 Welcome ${noticeBoard.userInfo.fullName}`,
              });
              loginStore.saveLogin(noticeBoard.userInfo);
              loginStore.clearInputUser();
              setTimeout(() => {
                history.push('/dashboard/default');
              }, 1000);
            }
          }}
          onClose={() => {
            setNoticeBoard({
              ...noticeBoard,
              show: false,
            });
          }}
        />
        <ModalForgotPassword
          {...modalForgotPassword}
          onClick={(userInfo: any) => {
            loginStore.LoginService.forgotPassword({
              input: { ...userInfo },
            }).then(res => {
              if (res.userForgotPassword.success) {
                setModalForgotPassword({ show: false });
                loginStore.updateForgotPassword();
                Toast.success({
                  message: `😊 ${res.userForgotPassword.message}`,
                });
              } else {
                Toast.error({
                  message: `😔 ${res.userForgotPassword.message}`,
                });
              }
            });
          }}
          onClose={() => {
            setModalForgotPassword({ show: false });
          }}
        />
        <ModalChangePassword
          {...modalChangePassword}
          onClick={() => {
            const exipreDate = new Date(
              dayjs(new Date()).add(30, 'days').format('YYYY-MM-DD'),
            );
            let body = Object.assign(
              loginStore.inputLogin,
              userStore.changePassword,
            );
            body = {
              ...body,
              exipreDate,
            };
            userStore.UsersService.changePassword({ input: { ...body } }).then(
              res => {
                if (res.userChnagePassword.success) {
                  loginStore.updateLogin({
                    ...loginStore.login,
                    exipreDate,
                    passChanged: true,
                  });
                  userStore.updateChangePassword({
                    ...userStore.changePassword,
                    tempHide: true,
                  });
                  Toast.success({
                    message: `😊 ${res.userChnagePassword.message}`,
                  });
                  setModalChangePassword({ show: false });
                } else {
                  Toast.error({
                    message: `😔 ${res.userChnagePassword.message}`,
                  });
                }
              },
            );
          }}
          onClose={() => {
            loginStore.updateLogin({
              ...loginStore.login,
              passChanged: true,
            });
            userStore.updateChangePassword({
              ...userStore.changePassword,
              tempHide: true,
            });
            setModalChangePassword({ show: false });
          }}
        />
        <ModalSessionAllowed
          {...modalSessionAllowed}
          onClick={(data: any, item: any, index: number) => {
            loginStore.LoginService.sessionAllowedLogout({
              input: {
                _id: item._id,
                userId: loginStore.inputLogin?.userId,
                companyCode: loginStore.inputLogin?.companyCode,
                accessToken: item.user.accessToken,
              },
            }).then(async res => {
              if (res.usersSessionAllowedLogout.success) {
                Toast.success({
                  message: `😊 ${res.usersSessionAllowedLogout.message}`,
                });
                const firstArr = data.slice(0, index) || [];
                const secondArr = data.slice(index + 1) || [];
                const finalArray = [...firstArr, ...secondArr];
                setModalSessionAllowed({
                  show: finalArray.length > 0 ? true : false,
                  data: finalArray,
                });
              }
            });
          }}
          onClose={() => {}}
        />
      </div>
    </>
  );
});

export default Login;
