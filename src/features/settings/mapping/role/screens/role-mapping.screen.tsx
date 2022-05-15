/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Form,
  List,
  Svg,
  Toast,
  ModalConfirm,
} from '@/library/components';
import {RoleMappingList} from '../components';

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import 'react-dropdown-tree-select/dist/styles.css';
import {dashboardRouter as dashboardRoutes} from '@/routes';
const router = dashboardRoutes;

import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

const grid = 8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

const RoleMapping = observer(() => {
  const {loginStore, roleMappingStore, roleStore, routerStore} = useStores();

  const [hideRole, setHideRole] = useState<boolean>(false);
  const [modalConfirm, setModalConfirm] = useState<any>();
  let roleList: any = roleStore.listRole || [];
  for (const router of roleMappingStore.roleMappingList || []) {
    if (router) {
      roleList = roleList.filter(item => {
        return item.code !== router.role.code;
      });
    }
  }

  const [isModify, setIsModify] = useState<any>({status: false});
  const [hideAddRoleMapping, setHideAddRoleMapping] = useState<boolean>(true);

  const permission = [
    {
      title: 'Add',
      checked: false,
    },
    {
      title: 'View',
      checked: false,
    },
    {
      title: 'Edit/Modify',
      checked: false,
    },
    {
      title: 'Delete',
      checked: false,
    },
  ];

  useEffect(() => {
    const routers: any = router.filter((item: any) => {
      if (item.name !== 'Dashboard') {
        item.toggle = false;
        item.title = item.name;
        item = item.children.filter(childernItem => {
          childernItem.title = childernItem.name;
          childernItem.toggle = false;
          childernItem.permission = permission;
          childernItem.icon = childernItem.icon;
          return childernItem;
        });
        return item;
      }
    });
    if (routers) {
      routerStore.updateRouter(routers);
    }
  }, []);

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      {RouterFlow.checkPermission(toJS(routerStore.userPermission), 'Add') && (
        <Buttons.ButtonCircleAddRemove
          show={hideAddRoleMapping}
          onClick={status => setHideAddRoleMapping(!hideAddRoleMapping)}
        />
      )}
      <div className=' mx-auto  flex-wrap'>
        <div
          className={
            'p-2 rounded-lg shadow-xl ' +
            (hideAddRoleMapping ? 'hidden' : 'shown')
          }
        >
          <Form.InputWrapper label='Role' id='role'>
            <select
              name='defualtLab'
              disabled={hideRole}
              value={roleMappingStore.selectedRole as any}
              className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
              onChange={e => {
                const role = roleList[e.target.value];
                if (role.code !== 'SYSADMIN') {
                  const routers: any = routerStore.router.filter(
                    (item: any) => {
                      const children = item.children.filter(childernItem => {
                        if (
                          childernItem.name !== 'Role' &&
                          childernItem.name !== 'User' &&
                          childernItem.name !== 'Login Activity' &&
                          childernItem.name !== 'Role Mapping' &&
                          childernItem.name !== 'Environment Settings' &&
                          childernItem.name !== 'Notice Boards'
                        ) {
                          childernItem.title = childernItem.name;
                          childernItem.toggle = false;
                          childernItem.permission = permission;
                          childernItem.icon = childernItem.icon;
                          return childernItem;
                        }
                      });
                      item.children = children;
                      return item;
                    },
                  );
                  if (routers) {
                    routerStore.updateRouter(routers);
                  }
                }
                roleMappingStore.updateSelectedRole(toJS(role));
              }}
            >
              <option selected>
                {roleMappingStore.selectedRole
                  ? roleMappingStore.selectedRole.description
                  : `Select`}
              </option>
              {roleList.map((item: any, index: number) => (
                <option key={index} value={index}>
                  {item.description}
                </option>
              ))}
            </select>
          </Form.InputWrapper>

          <div className='mt-4 overflow-auto'>
            {routerStore.router && (
              <DragDropContext
                onDragEnd={(result: any) => {
                  const items = Array.from(routerStore.router || []);
                  const [reorderedItem] = items.splice(result.source.index, 1);
                  items.splice(result.destination.index, 0, reorderedItem);
                  routerStore.updateRouter(items);
                }}
              >
                <Droppable droppableId='parent' direction='vertical'>
                  {(provided, snapshot) => (
                    <ul
                      className='nav nav-stacked characters'
                      id='accordion1'
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {routerStore.router.map((item, index) => (
                        <Draggable
                          key={item.name}
                          draggableId={item.name}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              className='flex flex-col mb-2 ml-2 bg-gray-400 p-2 rounded-md'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {item.toggle ? (
                                <input
                                  type='text'
                                  className='leading-4 p-2 m-2 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-sm'
                                  value={item.title}
                                  onChange={e => {
                                    const title = e.target.value;
                                    const routers = toJS(routerStore.router);
                                    routers[index].title = title;
                                    routerStore.updateRouter(routers);
                                  }}
                                  onBlur={() => {
                                    const routers = toJS(routerStore.router);
                                    routers[index].toggle = false;
                                    routerStore.updateRouter(routers);
                                  }}
                                />
                              ) : (
                                <p
                                  className='font-bold'
                                  onDoubleClick={() => {
                                    const routers = toJS(routerStore.router);
                                    routers[index].toggle = true;
                                    routerStore.updateRouter(routers);
                                  }}
                                >
                                  {item.title}
                                </p>
                              )}
                              {item.children ? (
                                <DragDropContext
                                  onDragEnd={(result: any) => {
                                    const items = Array.from(
                                      item.children || [],
                                    );
                                    const [reorderedItem] = items.splice(
                                      result.source.index,
                                      1,
                                    );
                                    items.splice(
                                      result.destination.index,
                                      0,
                                      reorderedItem,
                                    );
                                    const router = [...routerStore.router];
                                    router[index].children = items;
                                    routerStore.updateRouter(router);
                                  }}
                                >
                                  <Droppable
                                    droppableId='characters'
                                    direction='horizontal'
                                  >
                                    {(provided, snapshot) => (
                                      <ul
                                        className='flex flex-row ml-1 text-white characters'
                                        id={item.name}
                                        style={getListStyle(
                                          snapshot.isDraggingOver,
                                        )}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                      >
                                        {item.children.map(
                                          (children, indexChildren) => (
                                            <Draggable
                                              key={children.name}
                                              draggableId={children.name}
                                              index={indexChildren}
                                            >
                                              {(provided, snapshot) => (
                                                <li
                                                  className='bg-blue-600 ml-4 p-2 rounded-md'
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                >
                                                  {children.toggle ? (
                                                    <input
                                                      type='text'
                                                      className='leading-4 p-2 m-2 focus:outline-none focus:ring block text-black  shadow-sm sm:text-base border border-gray-300 rounded-sm'
                                                      value={children.title}
                                                      onChange={e => {
                                                        const title =
                                                          e.target.value;
                                                        const routers = toJS(
                                                          routerStore.router,
                                                        );
                                                        routers[index].children[
                                                          indexChildren
                                                        ].title = title;
                                                        routerStore.updateRouter(
                                                          routers,
                                                        );
                                                      }}
                                                      onBlur={() => {
                                                        const routers = toJS(
                                                          routerStore.router,
                                                        );
                                                        routers[index].children[
                                                          indexChildren
                                                        ].toggle = false;
                                                        routerStore.updateRouter(
                                                          routers,
                                                        );
                                                      }}
                                                    />
                                                  ) : (
                                                    <p
                                                      className='font-bold'
                                                      onDoubleClick={() => {
                                                        const routers = toJS(
                                                          routerStore.router,
                                                        );
                                                        routers[index].children[
                                                          indexChildren
                                                        ].toggle = true;
                                                        routerStore.updateRouter(
                                                          routers,
                                                        );
                                                      }}
                                                    >
                                                      {children.title}
                                                    </p>
                                                  )}

                                                  <ul className='ml-2'>
                                                    {children.permission.map(
                                                      (
                                                        permission,
                                                        indexPermission,
                                                      ) => (
                                                        <li
                                                          onClick={async () => {
                                                            const routers =
                                                              toJS(
                                                                routerStore.router,
                                                              );
                                                            const modifyPermission =
                                                              item.children[
                                                                indexChildren
                                                              ].permission[
                                                                indexPermission
                                                              ];
                                                            modifyPermission.checked =
                                                              modifyPermission.checked
                                                                ? false
                                                                : true;
                                                            if (
                                                              modifyPermission.title ===
                                                                'Edit/Modify' ||
                                                              modifyPermission.title ===
                                                                'Delete'
                                                            ) {
                                                              routers[
                                                                index
                                                              ].children[
                                                                indexChildren
                                                              ].permission[1].checked =
                                                                true;
                                                            }
                                                            routers[
                                                              index
                                                            ].children[
                                                              indexChildren
                                                            ].permission[
                                                              indexPermission
                                                            ] =
                                                              toJS(
                                                                modifyPermission,
                                                              );
                                                            routerStore.updateRouter(
                                                              routers,
                                                            );
                                                          }}
                                                        >
                                                          <input
                                                            type='checkbox'
                                                            checked={
                                                              permission.checked
                                                            }
                                                            className='m-2 w-4 h-4'
                                                          />
                                                          {permission.title}
                                                        </li>
                                                      ),
                                                    )}
                                                  </ul>
                                                </li>
                                              )}
                                            </Draggable>
                                          ),
                                        )}
                                        {provided.placeholder}
                                      </ul>
                                    )}
                                  </Droppable>
                                </DragDropContext>
                              ) : (
                                <li>{item.title}</li>
                              )}
                            </li>
                          )}
                        </Draggable>
                      ))}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          <br />

          <List direction='row' space={3} align='center'>
            <Buttons.Button
              size='medium'
              type='solid'
              icon={Svg.Save}
              onClick={() => {
                if (
                  roleMappingStore.selectedRole?.description !== undefined &&
                  routerStore.router !== undefined
                ) {
                  let router: any[] = [];
                  routerStore.router.filter(item => {
                    return item.children.filter((childern, indexChildern) => {
                      childern.permission.filter(
                        (permission, indexPermission) => {
                          if (permission.checked) {
                            const isRouter = router.find(
                              routerItem => routerItem.name === item.name,
                            );
                            if (isRouter) {
                              router = router.filter(function (obj) {
                                return obj.name !== item.name;
                              });
                              let children = isRouter.children.concat([
                                toJS(item.children[indexChildern]),
                              ]);
                              children = children.reduce((filtered, item) => {
                                if (
                                  !filtered.some(
                                    filteredItem =>
                                      JSON.stringify(filteredItem) ==
                                      JSON.stringify(item),
                                  )
                                )
                                  //item.icon = item.icon.replace('LibraryComponents.Atoms.', '');
                                  filtered.push(item);
                                return filtered;
                              }, []);
                              router.push({
                                path: item.path,
                                name: item.name,
                                icon: item.icon,
                                title: item.title,
                                toggle: item.toggle,
                                children,
                              });
                            } else {
                              router.push({
                                path: item.path,
                                name: item.name,
                                icon: item.icon,
                                title: item.title,
                                toggle: item.toggle,
                                children: [toJS(item.children[indexChildern])],
                              });
                            }
                          }
                        },
                      );
                    });
                  });
                  isModify.status
                    ? roleMappingStore.roleMappingService
                        .updateRoleMapping({
                          input: {
                            _id: isModify.id,
                            role: roleMappingStore.selectedRole,
                            router: JSON.stringify(router),
                          },
                        })
                        .then(res => {
                          if (res.updateRoleMapping.success) {
                            if (
                              roleMappingStore.selectedRole?.code ===
                              loginStore.login?.role
                            ) {
                              routerStore.updateUserRouter(router);
                            }
                            Toast.success({
                              message: `😊 ${res.updateRoleMapping.message}`,
                            });
                            setTimeout(() => {
                              window.location.reload();
                            }, 2000);
                          } else {
                            alert('Data not update. Please try again');
                          }
                        })
                    : roleMappingStore.roleMappingService
                        .addRoleMapping({
                          input: {
                            role: roleMappingStore.selectedRole,
                            router: JSON.stringify(router),
                          },
                        })
                        .then(res => {
                          if (res.createRoleMapping.success) {
                            Toast.success({
                              message: `😊 ${res.createRoleMapping.message}`,
                            });
                            setTimeout(() => {
                              window.location.reload();
                            }, 2000);
                          } else {
                            alert('Not added data.');
                          }
                        });
                } else {
                  Toast.warning({
                    message: '😔 Please enter all information!',
                  });
                }
              }}
            >
              {isModify.status ? 'Update' : 'Save'}
            </Buttons.Button>
            <Buttons.Button
              size='medium'
              type='outline'
              icon={Svg.Remove}
              onClick={() => {
                window.location.reload();
              }}
            >
              Clear
            </Buttons.Button>
          </List>
        </div>
        <div className='p-2 rounded-lg shadow-xl overflow-auto'>
          <RoleMappingList
            data={roleMappingStore.roleMappingList || []}
            totalSize={roleMappingStore.roleMappingListCount}
            isDelete={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              'Delete',
            )}
            isEditModify={RouterFlow.checkPermission(
              toJS(routerStore.userPermission),
              'Edit/Modify',
            )}
            onDelete={selectedUser => setModalConfirm(selectedUser)}
            onDuplicate={(selectedItem: any) => {
              if (selectedItem.code !== 'SYSADMIN') {
                const routers: any = routerStore.router.filter((item: any) => {
                  const children = item.children.filter(childernItem => {
                    if (
                      childernItem.name !== 'Role' &&
                      childernItem.name !== 'User' &&
                      childernItem.name !== 'Login Activity' &&
                      childernItem.name !== 'Role Mapping' &&
                      childernItem.name !== 'Environment Settings' &&
                      childernItem.name !== 'Notice Boards'
                    ) {
                      return childernItem;
                    }
                  });
                  item.children = children;
                  return item;
                });
                if (routers) {
                  routerStore.updateRouter(routers);
                }
              }
              setHideAddRoleMapping(!hideAddRoleMapping);
              setHideRole(true);
              //console.log({selectedItem});
              roleMappingStore.updateSelectedRole(toJS(selectedItem));
              setIsModify({status: true, id: selectedItem.id});
            }}
            onPageSizeChange={(page, limit) => {
              roleMappingStore.fetchRoleMappingList(page, limit);
            }}
            onFilter={(type, filter, page, limit) => {
              roleMappingStore.roleMappingService.filter({
                input: {type, filter, page, limit},
              });
            }}
          />
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === 'Delete') {
              roleMappingStore.roleMappingService
                .deleteRoleMapping({input: {id: modalConfirm.id}})
                .then((res: any) => {
                  if (res.removeRoleMapping.success) {
                    Toast.success({
                      message: `😊 ${res.removeRoleMapping.message}`,
                    });
                    setModalConfirm({show: false});
                    roleMappingStore.fetchRoleMappingList();
                  }
                });
            }
          }}
          onClose={() => {
            setModalConfirm({
              show: false,
            });
          }}
        />
      </div>
    </>
  );
});

export default RoleMapping;
