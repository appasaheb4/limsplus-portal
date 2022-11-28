import React, {useState, useEffect, useRef} from 'react';
import {observer} from 'mobx-react';
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

import {ModalForgotPassword, ModalNoticeBoard} from '../components';
import {Col, Row} from 'reactstrap';
import {Carousel} from 'react-bootstrap';
import dayjs from 'dayjs';
import {useForm, Controller} from 'react-hook-form';
import {FormHelper} from '@/helper';

import {useHistory} from 'react-router-dom';
import {useStores} from '@/stores';
import {t} from '@/localization';
import * as Assets from '@/library/assets';

import packageJson from '../../../../package.json';

export const Login = observer(() => {
  const {
    loading,
    userStore,
    loginStore,
    rootStore,
    labStore,
    roleStore,
    bannerStore,
    lookupStore,
    doctorsStore,
    corporateClientsStore,
    registrationLocationsStore,
  } = useStores();
  const history = useHistory();
  const [noticeBoard, setNoticeBoard] = useState<any>({});
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [labRoleList, setlabRoleList] = useState({labList: [], roleList: []});

  const refUserId = useRef<any>();

  const [modalForgotPassword, setModalForgotPassword] = useState<any>();
  const [modalChangePassword, setModalChangePassword] = useState<any>();
  const [modalSessionAllowed, setModalSessionAllowed] = useState<any>();

  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
    setValue,
    clearErrors,
  } = useForm();

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    bannerStore.fetchListAllBanner();
    // corporateClientsStore.corporateClientsService.listCorporateClients();
    // registrationLocationsStore.registrationLocationsService.listRegistrationLocations();
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
    if (loginFailedCount > 4) {
      loginStore.LoginService.accountStatusUpdate({
        input: {
          userId: loginStore.inputLogin?.userId,
          status: 'D',
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
              setModalChangePassword({show: true});
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
                loginStore.saveLogin(res.login.data.user);
                loginStore.clearInputUser();
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

  const getLabList = async (userModule, userModuleCategory, user) => {
    console.log({user});

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
    return userModuleCategory === 'Lab'
      ? user?.lab
      : userModuleCategory === 'Corporate Clients'
      ? user?.corporateClient[0]?.corporateCode !== '*'
        ? user?.corporateClient?.map(function (obj) {
            return _.mapKeys(obj, function (value, key) {
              return corClientKeys[key];
            });
          })
        : corporateClientsStore.listCorporateClients?.map(function (obj) {
            return _.mapKeys(obj, function (value, key) {
              return corClientKeys[key];
            });
          })
      : userModuleCategory === 'Doctor'
      ? doctorsStore.doctorsService
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
          })
      : user?.registrationLocation?.map(function (obj) {
          return _.mapKeys(obj, function (value, key) {
            return regLocationKeys[key];
          });
        });
  };

  return (
    <>
      <div className='flex h-screen bg-[#394D7F]  w-full  justify-center items-center'>
        <svg
          width='80%'
          height='100%'
          viewBox='0 0 100 100'
          preserveAspectRatio='none'
          style={{position: 'absolute', left: 0, right: 0}}
        >
          <path
            d='M0,0 
           L100,0
           C4,30 130,100 0,120'
            fill='#FF6C99'
          />
        </svg>
        <div
          style={{
            zIndex: 0,
            marginTop: -window.innerHeight / 1.14,
            marginLeft: window.innerWidth / 16,
            position: 'absolute',
          }}
        >
          <img
            src={Assets.images.limsplusTran}
            alt='appIcon'
            style={{width: 200}}
          />
        </div>
        <div
          className='flex flex-row  w-fit m-auto rounded-3xl shadow-lg bg-white items-center absolute  p-2 gap-4 from-blue-600 bg-gradient-to-r'
          style={{minWidth: '70%'}}
        >
          <Col md='6' sm='12' xs='12'>
            <div>
              <div className='flex justify-center items-center'>
                <Carousel
                  style={{width: carouselSize, height: carouselSize}}
                  indicators={false}
                >
                  {bannerStore.listAllBanner.map((item, key) => (
                    <Carousel.Item interval={3000} key={key}>
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
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </Col>
          <Col md='6' sm='12' xs='12'>
            <div className='flex justify-center items-center'>
              <div className='flex flex-col mt-2 rounded-3xl bg-[#F3F6FF] shadow-inner'>
                <span className='font-bold text-lg text-black mt-2 ml-4 underline'>
                  Sign In
                </span>
                {loginStore.inputLogin?.userModule && (
                  <span className='text-center font-bold text-lg text-black mt-2 ml-4 underline'>
                    {loginStore.inputLogin?.userModule}
                  </span>
                )}
                <div className='rounded-2xl bg-white p-4 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]'>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input
                          label='User Id'
                          id='userId'
                          name='userId'
                          inputRef={refUserId}
                          wrapperStyle={{color: 'black'}}
                          placeholder={
                            errors.userId ? 'Please enter userId' : 'UserId'
                          }
                          hasError={!!errors.userId}
                          value={loginStore.inputLogin?.userId}
                          onChange={userId => {
                            onChange(userId);
                            loginStore.updateInputUser({
                              ...loginStore.inputLogin,
                              userId: userId.toUpperCase(),
                            });
                          }}
                          onBlur={async userId => {
                            if (userId) {
                              userStore.UsersService.serviceUser
                                .checkExitsUserId(userId.trim())
                                .then(async res => {
                                  if (res.checkUserExitsUserId?.success) {
                                    const {
                                      data: {user},
                                    } = res.checkUserExitsUserId;
                                    setValue('lab', user.defaultLab);
                                    clearErrors('lab');
                                    if (user.role.length == 1)
                                      setValue('role', user.role[0].code);
                                    clearErrors('role');
                                    let userModuleCategory;
                                    await lookupStore.LookupService.lookupItemsByPathNField(
                                      {
                                        input: {
                                          path: '/settings/users',
                                          field: 'USER_MODULE',
                                        },
                                      },
                                    ).then(res => {
                                      if (
                                        res.lookupItemsByPathNField.success &&
                                        res.lookupItemsByPathNField?.data
                                          ?.length > 0
                                      ) {
                                        userModuleCategory =
                                          res.lookupItemsByPathNField.data[0]?.arrValue.find(
                                            item =>
                                              item.code == user?.userModule,
                                          ).value;
                                      } else {
                                        alert(
                                          'User module not found in lookup',
                                        );
                                      }
                                    });
                                    loginStore.updateInputUser({
                                      ...loginStore.inputLogin,
                                      lab: user.defaultLab,
                                      role:
                                        user.role.length == 1
                                          ? user.role[0].code
                                          : '',
                                      userModule: user?.userModule,
                                      userModuleCategory,
                                    });
                                    // labStore.fetchListLab();
                                    // roleStore.fetchListRole();

                                    setlabRoleList({
                                      labList: await getLabList(
                                        user?.userModule,
                                        userModuleCategory,
                                        user,
                                      ),
                                      roleList: user.role,
                                    });
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
                      rules={{required: true}}
                      defaultValue={loginStore.inputLogin?.userId}
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input
                          type='password'
                          label='Password'
                          wrapperStyle={{color: 'black'}}
                          placeholder={
                            errors.password
                              ? 'Please enter password'
                              : 'Password'
                          }
                          hasError={!!errors.password}
                          value={loginStore.inputLogin?.password}
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
                      render={({field: {onChange}}) => (
                        <Form.InputWrapper
                          label={
                            loginStore.inputLogin.userModuleCategory || 'Lab'
                          }
                          hasError={!!errors.lab}
                          style={{color: 'black'}}
                        >
                          <select
                            value={loginStore.inputLogin?.lab}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.lab ? 'border-red-500' : 'border-gray-300'
                            } rounded-md cursor-pointer `}
                            onChange={e => {
                              const lab = e.target.value;
                              onChange(lab);
                              loginStore.updateInputUser({
                                ...loginStore.inputLogin,
                                lab,
                              });
                            }}
                          >
                            <option>Select</option>
                            {labRoleList?.labList?.map((item: any) => (
                              <option key={item.code} value={item.code}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='lab'
                      rules={{required: true}}
                      defaultValue={loginStore.inputLogin?.lab}
                    />

                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.InputWrapper
                          label='Role'
                          hasError={!!errors.role}
                          style={{color: 'black'}}
                        >
                          <select
                            value={loginStore.inputLogin?.role}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.role ? 'border-red-500' : 'border-gray-300'
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
                            <option selected>Select</option>
                            {labRoleList.roleList.map((item: any) => (
                              <option key={item.code} value={item.code}>
                                {item.description}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='role'
                      rules={{required: true}}
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
                  <div className='flex p-4 flex-row  w-full justify-between gap-4'>
                    <a
                      href='#'
                      onClick={() => setModalForgotPassword({show: true})}
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
            <div className='mt-4'>
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
          </Col>
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
              input: {...userInfo},
            }).then(res => {
              if (res.userForgotPassword.success) {
                setModalForgotPassword({show: false});
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
            setModalForgotPassword({show: false});
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
            userStore.UsersService.changePassword({input: {...body}}).then(
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
                  setModalChangePassword({show: false});
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
            setModalChangePassword({show: false});
          }}
        />
        <ModalSessionAllowed
          {...modalSessionAllowed}
          onClick={(data: any, item: any, index: number) => {
            loginStore.LoginService.sessionAllowedLogout({
              input: {
                _id: item._id,
                userId: loginStore.inputLogin?.userId,
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
