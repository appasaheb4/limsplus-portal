/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {observer} from 'mobx-react';
import {useHistory} from 'react-router-dom';

import {Badge, Collapse} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {Icons, AutocompleteGroupBy} from '@/library/components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import * as Assets from '@/library/assets';

import {stores, useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toggleSidebar} from '@/redux/actions/sidebar-action';

const initOpenRoutes = location => {
  /* Open collapse element that matches current url */
  const pathName = location.pathname;
  let _routes = {};
  if (stores.routerStore.userRouter)
    stores.routerStore.userRouter.forEach((route: any, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === '/' ? true : false;
      _routes = Object.assign({}, _routes, {
        [index]: isActive || isOpen || isHome,
      });
    });
  return _routes;
};

const SidebarCategory = withRouter(
  ({
    title,
    badgeColor,
    badgeText,
    isOpen,
    children,
    onClick,
    icon,
    location,
    to,
  }) => {
    const getSidebarItemClass = path => {
      return location.pathname.includes(path) ||
        (location.pathname === '/' && path === '/dashboard')
        ? 'active'
        : '';
    };
    const Icon = icon;
    return (
      <li className={'sidebar-item ' + getSidebarItemClass(to)}>
        <span
          data-toggle='collapse'
          className={
            'flex items-center sidebar-link ' + (!isOpen ? 'collapsed' : '')
          }
          onClick={onClick}
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          {icon !== undefined ? (
            <Icons.IconContext color='#ffffff'>
              <Icon />
            </Icons.IconContext>
          ) : null}
          <span className='align-middle'>{title}</span>
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className='sidebar-badge'>
              {badgeText}
            </Badge>
          ) : null}
        </span>
        {isOpen && (
          <ul
            id='item'
            className={`sidebar-dropdown list-unstyled ${
              title === 'MASTER SETUP' ? 'overflow-y-scroll h-80' : ''
            }`}
          >
            <div>{children}</div>
          </ul>
        )}
      </li>
    );
  },
);

interface SidebarItemProps {
  name: string;
  category: string;
  title: string;
  badgeColor: string;
  badgeText: string;
  icon: any;
  location: any;
  to: string;
  onChangeItem: (category: string, item: string) => void;
}

const SidebarItem = withRouter((props: SidebarItemProps) => {
  const getSidebarItemClass = path => {
    return props.location.pathname === path ? 'active' : '';
  };

  return (
    <li
      className={'sidebar-item ' + getSidebarItemClass(props.to)}
      onClick={() => {
        props.onChangeItem && props.onChangeItem(props.category, props.name);
      }}
    >
      <NavLink to={props.to} className='sidebar-link' activeClassName='active'>
        <span className='flex items-center'>
          {props.icon ? (
            <Icons.IconContext color='#ffffff'>
              <props.icon />
            </Icons.IconContext>
          ) : null}
          {props.title}
        </span>
        {props.badgeColor && props.badgeText ? (
          <Badge color={props.badgeColor} size={18} className='sidebar-badge'>
            {props.badgeText}
          </Badge>
        ) : null}
      </NavLink>
    </li>
  );
});

const Sidebar = observer(({location, sidebar, layout, dispatch}) => {
  const {routerStore} = useStores();
  const history = useHistory();
  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes(location));

  useEffect(() => {
    setOpenRoutes(initOpenRoutes(location));
  }, [stores.routerStore.userRouter]);

  const toggle = index => {
    for (const item of Object.keys(openRoutes))
      openRoutes[index] ||
        setOpenRoutes(openRoutes =>
          Object.assign({}, openRoutes, {[item]: false}),
        );
    // Toggle selected element
    setOpenRoutes(openRoutes =>
      Object.assign({}, openRoutes, {[index]: !openRoutes[index]}),
    );
  };

  return (
    <>
      <nav
        className={
          'sidebar' +
          (!sidebar.isOpen ? ' toggled' : '') +
          (sidebar.isSticky ? ' sidebar-sticky' : '')
        }
        style={{
          backgroundColor: `${stores.appStore.applicationSetting?.sideBarColor}`,
          backgroundImage: `url(${stores.appStore.applicationSetting?.imageSideBarBgImage})`,
          backgroundSize: '100% 100%',
        }}
      >
        <div className='sidebar-content'>
          <PerfectScrollbar>
            <a className='flex sidebar-brand items-center' href='/'>
              <img
                src={Assets.images.limsplusTran}
                alt='appIcon'
                style={{width: '100%'}}
              />
            </a>
            <div className='p-2'>
              <AutocompleteGroupBy
                data={stores.routerStore.userRouter}
                onChange={async (item: any, children: any) => {
                  const {permission, selectedComp} =
                    await RouterFlow.updateSelectedCategory(
                      item.name,
                      children.name,
                    );
                  routerStore.updateSelectedComponents(selectedComp);
                  routerStore.updateUserPermission(permission);
                  history.push(children.path);
                }}
              />
            </div>
            {stores.routerStore.userRouter && (
              <ul className='sidebar-nav'>
                {stores.routerStore.userRouter.map((category: any, index) => {
                  return (
                    <React.Fragment key={index}>
                      {category.children ? (
                        <SidebarCategory
                          name={category.name}
                          title={category.title}
                          badgeColor={category.badgeColor}
                          badgeText={category.badgeText}
                          icon={
                            Icons.getIcons(category.icon) || Icons.IconBs.BsList
                          }
                          to={category.path}
                          isOpen={openRoutes[index]}
                          onClick={() => toggle(index)}
                        >
                          {category?.children?.map((route, index) => (
                            <>
                              <SidebarItem
                                key={index}
                                category={category.name}
                                name={route.name}
                                title={route.title}
                                to={route.path}
                                badgeColor={route.badgeColor}
                                badgeText={route.badgeText}
                                icon={
                                  Icons.getIcons(route.icon) ||
                                  Icons.IconBs.BsList
                                }
                                onChangeItem={async (category, item) => {
                                  const {permission, selectedComp} =
                                    await RouterFlow.updateSelectedCategory(
                                      category,
                                      item,
                                    );
                                  routerStore.updateSelectedComponents(
                                    selectedComp,
                                  );
                                  routerStore.updateUserPermission(permission);
                                  if (!sidebar.isOpen) {
                                    dispatch(toggleSidebar());
                                  }
                                }}
                              />
                            </>
                          ))}
                        </SidebarCategory>
                      ) : (
                        <>
                          <h1>secound</h1>
                          <SidebarItem
                            name={category.name}
                            title={category.title}
                            to={category.path}
                            icon={Icons.getIcons(category.icon)}
                            badgeColor={category.badgeColor}
                            badgeText={category.badgeText}
                            onChangeItem={async (category, item) => {
                              const {permission, selectedComp} =
                                await RouterFlow.updateSelectedCategory(
                                  category,
                                  item,
                                );
                              routerStore.updateSelectedComponents(
                                selectedComp,
                              );
                              routerStore.updateUserPermission(permission);
                            }}
                          />
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </ul>
            )}
            {!layout.isBoxed && !sidebar.isSticky ? (
              <div className='sidebar-bottom d-none d-lg-block'>
                <div className='media'>
                  <img
                    className='rounded-circle mr-3'
                    src={
                      stores.loginStore.login?.picture || Assets.defaultAvatar
                    }
                    alt={stores.loginStore.login?.fullName}
                    width='40'
                    height='40'
                  />
                  <div className='media-body'>
                    <h5 className='mb-1'>
                      {stores.loginStore.login?.fullName}
                    </h5>
                    <div>
                      <FontAwesomeIcon
                        icon={faCircle as any}
                        className='text-success'
                      />{' '}
                      Online
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </PerfectScrollbar>
        </div>
      </nav>
    </>
  );
});

export default withRouter(
  connect((store: any) => ({
    sidebar: store.sidebar,
    layout: store.layout,
    app: store.app,
  }))(Sidebar),
);
