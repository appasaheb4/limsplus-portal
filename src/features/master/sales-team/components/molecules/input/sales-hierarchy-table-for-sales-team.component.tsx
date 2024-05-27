import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'reactstrap';
import { Icons, Buttons, Form } from '@/library/components';
import { observer } from 'mobx-react';
import { useStores } from '@/stores';
import { useForm, Controller } from 'react-hook-form';
import { IconContext } from 'react-icons';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
interface SalesHierarchyTableForSalesTeamProps {
  rowStatus?: boolean;
  data?: any;
  onUpdate?: (item: any) => void;
}

export const SalesHierarchyTableForSalesTeam = observer(
  ({ rowStatus, data, onUpdate }: SalesHierarchyTableForSalesTeamProps) => {
    const { loading, userStore, salesTeamStore, routerStore } = useStores();

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
    } = useForm();
    const salesHierarchy = useRef(data);
    const [reload, setReload] = useState(false);
    const [employeeList, setEmployeeList] = useState<any>();
    const [displaySalesHierarchy, setDisplaySalesHierarchy] = useState('');
    const loadEmployee = () => {
      userStore.UsersService.findByFields({
        input: { filter: { role: 'SALES' } },
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
      <div className='flex flex-col gap-2 items-center overflow-auto'>
        <Table striped bordered>
          <thead>
            <tr className='p-0 text-xs'>
              <th className='text-white '>Employee</th>
              <th className='text-white '>Designation</th>
              <th className='text-white sticky right-0 flex flex-row gap-2'>
                Level
                <Buttons.ButtonIcon
                  icon={
                    <IconContext.Provider value={{ color: '#ffffff' }}>
                      <BsFillArrowUpCircleFill />
                    </IconContext.Provider>
                  }
                  title=''
                  onClick={() => {
                    setDisplaySalesHierarchy('');
                  }}
                />
                <Buttons.ButtonIcon
                  icon={
                    <IconContext.Provider value={{ color: '#ffffff' }}>
                      <BsFillArrowDownCircleFill />
                    </IconContext.Provider>
                  }
                  title=''
                  onClick={() => {
                    setDisplaySalesHierarchy('display');
                  }}
                />
              </th>
            </tr>
          </thead>
          {displaySalesHierarchy && (
            <tbody className='text-xs'>
              {salesHierarchy?.current?.map((item, index) => (
                <tr>
                  <td>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.Input disabled={true} value={`${item.empCode}`} />
                      )}
                      name='designation'
                      rules={{ required: false }}
                      defaultValue={employeeList}
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.Input disabled={true} value={item.designation} />
                      )}
                      name='designation'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.Input disabled={true} value={item.level} />
                      )}
                      name='level'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          {salesHierarchy.current?.length === 0 && rowStatus && (
            <Buttons.Button
              size='small'
              type='outline'
              onClick={handleSubmit(addItem)}
            >
              <Icons.EvaIcon icon='plus-circle-outline' color='#000000' />
            </Buttons.Button>
          )}
        </Table>
        {/* {displaySalesHierarchy && (
          <Buttons.Button
            size="small"
            type="solid"
            onClick={() => onUpdate && onUpdate(salesHierarchy.current)}
          >
            Update
          </Buttons.Button>
        )} */}
      </div>
    );
  },
);
