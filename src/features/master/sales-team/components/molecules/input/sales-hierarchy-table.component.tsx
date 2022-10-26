import React, {useEffect, useState} from 'react';
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

interface SalesHierarchyTableProps {
  list: any;
}

export const SalesHierarchyTable = observer(
  ({list}: SalesHierarchyTableProps) => {
    const {loading, userStore, salesTeamStore, routerStore} = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      clearErrors,
    } = useForm();

    const [employeeList, setEmployeeList] = useState<any>();

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addItem = () => {
      const salesHierarchy = salesTeamStore.salesTeam?.salesHierarchy;
      salesHierarchy.push({
        id: salesTeamStore.salesTeam?.salesHierarchy.length + 1,
      });
      salesTeamStore.updateSalesTeam({
        ...salesTeamStore.salesTeam,
        salesHierarchy,
      });
    };

    const removeItem = (index: number) => {
      const firstArr =
        salesTeamStore.salesTeam?.salesHierarchy?.slice(0, index) || [];
      const secondArr =
        salesTeamStore.salesTeam?.salesHierarchy?.slice(index + 1) || [];
      const finalArray = [...firstArr, ...secondArr];
      salesTeamStore.updateSalesTeam({
        ...salesTeamStore.salesTeam,
        salesHierarchy: finalArray,
      });
    };

    return (
      <div className='flex flex-row gap-2 items-center max-w-fit'>
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs'>
              <th className='text-white w-2/3'>Employee</th>
              <th className='text-white w-1/3'>Designation</th>
              <th className='text-white w-1/3'>Level</th>
              {/* <th className="text-white sticky right-0 z-10">Action</th> */}
            </tr>
          </thead>
          <tbody className='text-xs max-w-fit'>
            {list?.map((item, index) => (
              <tr>
                <td>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      // <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                      //   loader={loading}
                      //   placeholder="Search by priceGroup or description"
                      //   data={{
                      //     list: employeeList,
                      //     displayKey: ['empCode', 'fullName'],
                      //   }}
                      //   hasError={!!errors.empCode}
                      //   displayValue={item?.empCode}
                      //   onFilter={(value: string) => {
                      //     userStore.UsersService.filter({
                      //       input: {
                      //         type: 'filter',
                      //         filter: {
                      //           empCode: value,
                      //           role: 'SALES',
                      //         },
                      //         page: 0,
                      //         limit: 10,
                      //       },
                      //     }).then(res => {
                      //       if (!res.filterUsers.success) return loadEmployee();
                      //       setEmployeeList(res.filterUsers.data);
                      //     });
                      //   }}
                      //   onSelect={item => {
                      //     onChange(item.priceGroup);
                      //     const salesHierarchy = toJS(
                      //       salesTeamStore.salesTeam?.salesHierarchy,
                      //     );
                      //     if (
                      //       _.findIndex(salesHierarchy, o => {
                      //         return _.isMatch(o, {empCode: item.empCode});
                      //       }) >= 0
                      //     ) {
                      //       removeItem(index);
                      //       Toast.warning({
                      //         message: '😔 Already exists same record found!',
                      //       });
                      //     } else {
                      //       salesHierarchy[index] = {
                      //         ...salesHierarchy[index],
                      //         empCode: item.empCode,
                      //         fullName: item.fullName,
                      //         designation: item.deginisation,
                      //       };
                      //       salesTeamStore.updateSalesTeam({
                      //         ...salesTeamStore.salesTeam,
                      //         salesHierarchy,
                      //       });
                      //     }
                      //     salesTeamStore.updateSalesTeamList(
                      //       salesTeamStore.listSalesTeamCopy,
                      //     );
                      //   }}
                      // />

                      <Form.Input
                        disabled={true}
                        value={`${item.empCode} - ${item.fullName}`}
                      />
                    )}
                    name='empCode'
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
                    name='designation'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </td>
                <td>
                  <Controller
                    control={control}
                    render={({field: {onChange}}) => (
                      // <select
                      //   value={item.level}
                      //   className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                      //   onChange={e => {
                      //     const level = e.target.value;
                      //     onChange(level);
                      //     const salesHierarchy = toJS(
                      //       salesTeamStore.salesTeam?.salesHierarchy,
                      //     );
                      //     salesHierarchy[index] = {
                      //       ...salesHierarchy[index],
                      //       level,
                      //     };
                      //     salesTeamStore.updateSalesTeam({
                      //       ...salesTeamStore.salesTeam,
                      //       salesHierarchy,
                      //     });
                      //   }}
                      // >
                      //   <option selected>Select</option>
                      //   {lookupItems(routerStore.lookupItems, 'LEVEL').map(
                      //     (item: any, index: number) => (
                      //       <option key={index} value={item.code}>
                      //         {lookupValue(item)}
                      //       </option>
                      //     ),
                      //   )}
                      // </select>
                      <Form.Input disabled={true} value={item.level} />
                    )}
                    name='level'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </td>
                {/* <td className="sticky right-0 z-10 bg-gray-500">
                <div className="flex flex-col gap-1">
                  <Buttons.Button
                    size="small"
                    type="outline"
                    onClick={() => {
                      removeItem(index);
                    }}
                  >
                    <Icons.EvaIcon icon="minus-circle-outline" color="#fff" />
                  </Buttons.Button>
                  <Buttons.Button
                    size="small"
                    type="outline"
                    onClick={handleSubmit(addItem)}
                  >
                    <Icons.EvaIcon icon="plus-circle-outline" color="#fff" />
                  </Buttons.Button>
                </div>
              </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  },
);
