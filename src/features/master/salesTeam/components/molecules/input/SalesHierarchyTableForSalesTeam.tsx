/* eslint-disable */
import React, {useEffect, useRef, useState} from 'react';
import {Table} from 'reactstrap';
import {
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  Icons,
  Buttons,
  Form,
  Toast,
} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import _ from 'lodash';
import {useForm, Controller} from 'react-hook-form';
import {toJS} from 'mobx';
import {lookupItems, lookupValue} from '@/library/utils';
import {IconContext} from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
interface SalesHierarchyTableForSalesTeamProps {
  data?: any;
  onUpdate?: (item: any) => void;
}

export const SalesHierarchyTableForSalesTeam = observer(
  ({data, onUpdate}: SalesHierarchyTableForSalesTeamProps) => {
    const {loading, userStore, salesTeamStore, routerStore} = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      clearErrors,
    } = useForm();
    const salesHierarchy = useRef(data);
    const [reload, setReload] = useState(false);
    const [employeeList, setEmployeeList] = useState<any>();
    const [displaySalesHierarchy, setDisplaySalesHierarchy] = useState('');
    const loadEmployee = () => {
      userStore.UsersService.findByFields({
        input: {filter: {role: 'SALES'}},
      }).then(res => {
        if (!res.findByFieldsUser.success)
          return alert(res.findByFieldsUser.message);
        setEmployeeList(res.findByFieldsUser.data);
      });
    };

    useEffect(() => {
      loadEmployee();
    }, []);

    const addItem = () => {
      salesHierarchy.current.push({
        id: salesHierarchy.current.length + 1,
      });
      // let salesHierarchy = salesTeamStore.salesTeam?.salesHierarchy;
      // salesHierarchy.push({
      //   id: salesTeamStore.salesTeam?.salesHierarchy.length + 1,
      // });
      // salesTeamStore.updateSalesTeam({
      //   ...salesTeamStore.salesTeam,
      //   salesHierarchy,
      // });
    };

    const removeItem = (index: number) => {
      const firstArr =
        salesTeamStore.salesTeam?.salesHierarchy?.slice(0, index) || [];
      const secondArr =
        salesTeamStore.salesTeam?.salesHierarchy?.slice(index + 1) || [];
      const finalArray = [...firstArr, ...secondArr];
      salesHierarchy.current = finalArray;
      setReload(!reload);
      // salesTeamStore.updateSalesTeam({
      //   ...salesTeamStore.salesTeam,
      //   salesHierarchy: finalArray,
      // });
    };

    return (
      <div className="flex flex-col gap-2 items-center overflow-auto">
        <Table striped bordered>
          <thead>
            <tr className="p-0 text-xs">
              <th className="text-white" style={{minWidth: 150}}>
                Employee
              </th>
              <th className="text-white" style={{minWidth: 150}}>
                Designation
              </th>
              <th className="text-white" style={{minWidth: 150}}>
                Level
              </th>
              <th className="text-white sticky right-0 flex flex-row gap-2">
                Action
                <Buttons.ButtonIcon
                  icon={
                    <IconContext.Provider value={{color: '#ffffff'}}>
                      <BsFillArrowUpCircleFill />
                    </IconContext.Provider>
                  }
                  title=""
                  onClick={() => {
                    setDisplaySalesHierarchy('');
                  }}
                />
                <Buttons.ButtonIcon
                  icon={
                    <IconContext.Provider value={{color: '#ffffff'}}>
                      <BsFillArrowDownCircleFill />
                    </IconContext.Provider>
                  }
                  title=""
                  onClick={() => {
                    setDisplaySalesHierarchy('display');
                  }}
                />
              </th>
            </tr>
          </thead>
          {displaySalesHierarchy && (
            <tbody className="text-xs">
              {salesHierarchy?.current?.map((item, index) => (
                <tr>
                  <td>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          posstion="sticky"
                          loader={loading}
                          placeholder="Search by Employee Code"
                          data={{
                            list: employeeList,
                            displayKey: ['empCode', 'fullName'],
                          }}
                          hasError={errors.empCode}
                          displayValue={item?.empCode}
                          onFilter={(value: string) => {
                            userStore.UsersService.filter({
                              input: {
                                type: 'filter',
                                filter: {
                                  empCode: value,
                                  role: 'SALES',
                                },
                                page: 0,
                                limit: 10,
                              },
                            }).then(res => {
                              if (!res.filterUsers.success)
                                return loadEmployee();
                              setEmployeeList(res.filterUsers.data);
                            });
                          }}
                          onSelect={item => {
                            onChange(item.priceGroup);
                            // const salesHierarchy = toJS(
                            //   salesTeamStore.salesTeam?.salesHierarchy,
                            // );
                            if (
                              _.findIndex(salesHierarchy, o => {
                                return _.isMatch(o, {empCode: item.empCode});
                              }) >= 0
                            ) {
                              removeItem(index);
                              Toast.warning({
                                message: '😔 Already exists same record found!',
                              });
                            } else {
                              salesHierarchy.current[index] = {
                                ...salesHierarchy.current[index],
                                empCode: item.empCode,
                                fullName: item.fullName,
                                designation: item.deginisation,
                              };
                              // salesTeamStore.updateSalesTeam({
                              //   ...salesTeamStore.salesTeam,
                              //   salesHierarchy,
                              // });
                            }
                            salesTeamStore.updateSalesTeamList(
                              salesTeamStore.listSalesTeamCopy,
                            );
                          }}
                        />
                      )}
                      name="priceGroup"
                      rules={{required: false}}
                      defaultValue={employeeList}
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <Form.Input disabled={true} value={item.designation} />
                      )}
                      name="designation"
                      rules={{required: false}}
                      defaultValue=""
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({field: {onChange}}) => (
                        <select
                          value={item.level}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                          onChange={e => {
                            const level = e.target.value;
                            onChange(level);
                            // const salesHierarchy = toJS(
                            //   salesTeamStore.salesTeam?.salesHierarchy,
                            // );
                            salesHierarchy.current[index] = {
                              ...salesHierarchy.current[index],
                              level,
                            };
                            // salesTeamStore.updateSalesTeam({
                            //   ...salesTeamStore.salesTeam,
                            //   salesHierarchy,
                            // });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(routerStore.lookupItems, 'LEVEL').map(
                            (item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ),
                          )}
                        </select>
                      )}
                      name="level"
                      rules={{required: false}}
                      defaultValue=""
                    />
                  </td>
                  <td className="sticky right-0 z-10 bg-gray-500">
                    <div className="flex flex-col gap-1">
                      <Buttons.Button
                        size="small"
                        type="outline"
                        onClick={() => {
                          removeItem(index);
                        }}
                      >
                        <Icons.EvaIcon
                          icon="minus-circle-outline"
                          color="#fff"
                        />
                      </Buttons.Button>
                      <Buttons.Button
                        size="small"
                        type="outline"
                        onClick={handleSubmit(addItem)}
                      >
                        <Icons.EvaIcon
                          icon="plus-circle-outline"
                          color="#fff"
                        />
                      </Buttons.Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {salesHierarchy.current?.length === 0 && (
            <Buttons.Button
              size="small"
              type="outline"
              onClick={handleSubmit(addItem)}
            >
              <Icons.EvaIcon icon="plus-circle-outline" color="#000" />
            </Buttons.Button>
          )}
        </Table>
        {displaySalesHierarchy && (
          <Buttons.Button
            size="small"
            type="solid"
            onClick={() => onUpdate && onUpdate(salesHierarchy.current)}
          >
            Update
          </Buttons.Button>
        )}
      </div>
    );
  },
);
