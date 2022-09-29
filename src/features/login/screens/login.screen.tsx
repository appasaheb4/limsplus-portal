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
import {Col, Container, Row} from 'reactstrap';
import {logo, images} from '@/library/assets';
import {Carousel} from 'react-bootstrap';
import dayjs from 'dayjs';
import {useForm, Controller} from 'react-hook-form';
import {FormHelper} from '@/helper';

import {useHistory} from 'react-router-dom';
import {useStores} from '@/stores';
import {t} from '@/localization';

export const Login = observer(() => {
  const {userStore, loginStore, rootStore, labStore, roleStore, bannerStore} =
    useStores();
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

  return (
    <>
      <Container
        fluid
        className='h-screen from-blue-600 bg-gradient-to-r w-full  block'
      >
        <svg
          width='60%'
          height='100%'
          viewBox='0 0 100 100'
          preserveAspectRatio='none'
          style={{position: 'absolute'}}
        >
          <path
            d='M0,0 
           L100,0
           C4,20 200,100 0,120'
            fill='#2563EB'
          />
        </svg>
        <Row className='h-screen items-center pt-4 mb-4'>
          <Col md='7'>
            <div className='flex flex-col justify-center items-center -ml-20'>
              <div className='mt-10'>
                <Carousel>
                  {bannerStore.listAllBanner.map((item, key) => (
                    <Carousel.Item interval={5000} key={key}>
                      <img
                        key={key}
                        src={item.image}
                        className='img-thumbnail img-fluid'
                        alt={key.toString()}
                        style={{
                          width: width <= 768 ? 400 : 600,
                          height: width <= 768 ? 300 : 500,
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </Col>
          <Col md='5'>
            <div className='flex flex-col items-center'>
              <img src={logo} className='w-20 h-15  self-center' alt='logo' />
              <div className='flex flex-col p-3 mt-2 rounded-lg bg-white shadow-sm w-fit'>
                <div className='flex mt-2 justify-center items-center'>
                  <label className='font-bold text-3xl text-black'>Login</label>
                </div>
                <div>
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
                          onBlur={userId => {
                            if (userId) {
                              userStore.UsersService.serviceUser
                                .checkExitsUserId(userId.trim())
                                .then(res => {
                                  if (res.checkUserExitsUserId.success) {
                                    const {
                                      data: {user},
                                    } = res.checkUserExitsUserId;
                                    setValue('lab', user.defaultLab);
                                    clearErrors('lab');
                                    if (user.role.length == 1)
                                      setValue('role', user.role[0].code);
                                    clearErrors('role');
                                    loginStore.updateInputUser({
                                      ...loginStore.inputLogin,
                                      lab: user.defaultLab,
                                      role:
                                        user.role.length == 1
                                          ? user.role[0].code
                                          : '',
                                    });
                                    labStore.fetchListLab();
                                    roleStore.fetchListRole();
                                    setlabRoleList({
                                      labList: user.lab,
                                      roleList: user.role,
                                    });
                                  } else {
                                    Toast.error({
                                      message: `😔 ${res.checkUserExitsUserId.message}`,
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
                          label='Lab'
                          hasError={!!errors.lab}
                          style={{color: 'black'}}
                        >
                          <select
                            value={loginStore.inputLogin?.lab}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.lab ? 'border-red-500' : 'border-gray-300'
                            } rounded-md`}
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
                            } rounded-md`}
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
                    >
                      {t('common:login').toString()}
                    </Buttons.Button>
                    <Buttons.Button
                      size='medium'
                      type='solid'
                      icon={Svg.Remove}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Clear
                    </Buttons.Button>
                  </List>
                  <h4 className='text-center text-black mt-2 text-sm'>
                    In that case contact the Support Team.
                  </h4>
                </div>
                <div className='flex p-4 flex-row  w-full justify-between gap-4'>
                  <a
                    href='#'
                    onClick={() => setModalForgotPassword({show: true})}
                    className='text-black text-sm'
                  >
                    {'Forgot Password'}
                  </a>
                  <a href='privacy-policy' className='text-black text-sm'>
                    Privacy and Policy
                  </a>
                </div>
              </div>
            </div>
          </Col>
          {/* <button className='m-4 p-1 rounded-full from-rose-400 via-fuchsia-500 to-indigo-500 bg-gradient-to-r'>
            <span className='block text-black px-4 py-2 font-semibold rounded-full bg-white'>
              Follow Me
            </span>
          </button> */}
        </Row>
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
            loginStore.LoginService.forgotPassword({input: {...userInfo}}).then(
              res => {
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
              },
            );
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
      </Container>
    </>
  );
});

export default Login;
