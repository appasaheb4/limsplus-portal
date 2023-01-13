/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {observer} from 'mobx-react';
import dayjs from 'dayjs';

import {toggleSidebar} from '../../redux/actions/sidebar-action';
import {useHistory} from 'react-router-dom';
import {stores, useStores} from '@/stores';

import * as Assets from '@/library/assets';
import {
  Buttons,
  Tooltip,
  Icons,
  Toast,
  ModalChangePassword,
  ModalSessionAllowed,
} from '@/library/components';
import {ModalAccount} from '.';

import {RouterFlow} from '@/flows';

import {
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Button,
  CardBody,
  Card,
} from 'reactstrap';

const NavbarComponent = observer(({dispatch}) => {
  const [userId, serUserId] = useState<string>('');
  const {appStore, userStore, routerStore, loginStore} = useStores();
  const history = useHistory();
  const [modalAccount, setModalAccount] = useState<any>();
  const [modalChangePassword, setModalChangePassword] = useState<any>();
  const [modalSessionAllowed, setModalSessionAllowed] = useState<any>();
  // buz navbar items not display
  useEffect(() => {
    setTimeout(() => {
      serUserId(loginStore.login.userId);
    }, 100);
  }, [loginStore.login]);
  return (
    <>
      <Navbar
        style={{
          backgroundColor:
            appStore.applicationSetting?.shortCutBarColor || 'white',
        }}
        light
        expand
        className='flex flex-row w-full xl:pr-5 sm:p-0'
      >
        <div className='flex w-8 sm:ml-4'>
          <span
            className='sidebar-toggle d-flex mr-2'
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <i className='hamburger align-self-center' />
          </span>
        </div>
        <div className='flex flex-3  scrollbar-hide overflow-x-scroll '>
          {/* overflow-auto */}
          <Form inline>
            <div className='flex flex-row'>
              <div className='ml-1 m-0.5'>
                <Buttons.Button
                  size='medium'
                  type='outline'
                  onClick={() => {
                    window.location.href = '/dashboard/default';
                  }}
                >
                  <Tooltip tooltipText='Dashboard'>
                    <Icons.IconContext color='#000' size='22'>
                      {Icons.getIconTag(Icons.IconRi.RiDashboardFill)}
                    </Icons.IconContext>
                  </Tooltip>
                </Buttons.Button>
              </div>

              {loginStore.login?.shortcutMenu &&
                loginStore.login?.shortcutMenu[loginStore.login.role || ''] &&
                loginStore.login?.shortcutMenu[loginStore.login.role || ''].map(
                  item => (
                    <>
                      <div className='ml-2'>
                        <Buttons.Button
                          size='medium'
                          type='outline'
                          onClick={async () => {
                            const {permission, selectedComp} =
                              await RouterFlow.updateSelectedCategory(
                                item.category,
                                item.name,
                              );
                            routerStore.updateSelectedComponents(selectedComp);
                            routerStore.updateUserPermission(permission);
                            history.push(item.path);
                          }}
                        >
                          <div style={{position: 'relative', zIndex: 999}}>
                            <Tooltip tooltipText={item.title}>
                              <Icons.IconContext color='#000' size='22'>
                                {Icons.getIconTag(
                                  Icons.getIcons(item.icon) ||
                                    Icons.IconBs.BsList,
                                )}
                              </Icons.IconContext>
                            </Tooltip>
                          </div>
                        </Buttons.Button>
                      </div>
                    </>
                  ),
                )}
            </div>
          </Form>
        </div>
        <div className='flex-1 ml-2 d-none d-sm-inline-block'>
          <div className='flex right-0'>
            <Nav className='ml-auto items-center' navbar>
              <Buttons.Button
                size='medium'
                type='outline'
                onClick={() => {
                  const elem: any = document.body;
                  function openFullscreen() {
                    appStore.updateApplicationSetting({
                      ...appStore.applicationSetting,
                      isExpandScreen: true,
                    });
                    if (elem.requestFullscreen) {
                      elem.requestFullscreen();
                    } else if (elem.webkitRequestFullscreen) {
                      /* Safari */
                      elem.webkitRequestFullscreen();
                    } else if (elem.msRequestFullscreen) {
                      /* IE11 */
                      elem.msRequestFullscreen();
                    }
                  }
                  function closeFullscreen() {
                    if (document.fullscreenElement) {
                      if (document.exitFullscreen) {
                        appStore.updateApplicationSetting({
                          ...appStore.applicationSetting,
                          isExpandScreen: false,
                        });
                        document.exitFullscreen();
                      }
                    }
                  }
                  openFullscreen();
                  closeFullscreen();
                }}
              >
                <Tooltip
                  tooltipText={
                    appStore.applicationSetting?.isExpandScreen
                      ? 'Collapse'
                      : 'Expand'
                  }
                >
                  <Icons.IconContext color='#000' size='22'>
                    {Icons.getIconTag(
                      appStore.applicationSetting?.isExpandScreen
                        ? Icons.IconCg.CgMinimize
                        : Icons.Iconai.AiOutlineExpand,
                    )}
                  </Icons.IconContext>
                </Tooltip>
              </Buttons.Button>
              <div className='ml-2' />
              <Buttons.Button
                size='medium'
                type='outline'
                onClick={() => {
                  // userStore.UsersService.loginActivityList({
                  //   input: {
                  //     userId: loginStore.login.userId,
                  //     loginActivityId: loginStore.login.loginActivityId,
                  //   },
                  // }).then((res) => {
                  //   if (!res.success) alert(res.message)
                  //   else {
                  //     loginStore.updateLogin({
                  //       ...loginStore.login,
                  //       loginActivityList: res.data.loginActivityList,
                  //       sessionAllowed: res.data.sessionAllowed,
                  //     })

                  //   }
                  // })
                  if (loginStore.login.loginActivityList.length > 0) {
                    setModalSessionAllowed({
                      show: true,
                      data: loginStore.login.loginActivityList,
                    });
                  } else {
                    Toast.warning({
                      message: `😊 Single system login.`,
                    });
                  }
                }}
              >
                <label
                  className='inline w-8 text-center'
                  style={{width: '40px'}}
                >
                  {loginStore.login?.sessionAllowed}
                </label>
              </Buttons.Button>
            </Nav>
          </div>
        </div>
        <UncontrolledDropdown nav inNavbar className='flex'>
          <span>
            <DropdownToggle nav>
              <div className='flex flex-row'>
                <img
                  className='rounded-circle mr-3'
                  src={loginStore.login?.picture || Assets.defaultAvatar}
                  alt={loginStore.login?.fullName}
                  width='40'
                  height='40'
                />
                <span className='text-dark sm:mt-4 d-none d-sm-inline-block '>
                  {loginStore.login?.fullName}
                </span>
              </div>
            </DropdownToggle>
          </span>
          <DropdownMenu right>
            <DropdownItem onClick={() => setModalAccount({show: true})}>
              Account
            </DropdownItem>
            <DropdownItem onClick={() => setModalChangePassword({show: true})}>
              Change Password
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                loginStore
                  .removeUser()
                  .then(res => {
                    if (res.logout.success) {
                      Toast.success({
                        message: `😊 ${res.logout.message}`,
                      });
                      history.push('/');
                    }
                  })
                  .catch(() => {
                    alert('Please try again');
                  });
              }}
            >
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>
      <ModalAccount
        {...modalAccount}
        onClose={() => setModalAccount({show: false})}
      />
      <ModalChangePassword
        {...modalChangePassword}
        onClick={() => {
          const exipreDate = new Date(
            dayjs(new Date()).add(30, 'days').format('YYYY-MM-DD HH:mm'),
          );
          let body: any = Object.assign(
            loginStore.login,
            userStore.changePassword,
          );
          body = {
            userId: body.userId,
            oldPassword: body.oldPassword,
            newPassword: body.confirmPassword,
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
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
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
              userId: loginStore.login?.userId,
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
              loginStore.updateLogin({
                ...loginStore.login,
                sessionAllowed:
                  res.usersSessionAllowedLogout.data.sessionAllowed,
                loginActivityList: finalArray,
              });
            }
          });
        }}
        onClose={() => {
          setModalSessionAllowed({show: false});
        }}
      />
    </>
  );
});

export default connect((store: any) => ({
  app: store.app,
}))(NavbarComponent);
