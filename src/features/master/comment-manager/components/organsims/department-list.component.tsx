import React, {useState} from 'react';
import {stores} from '@/stores';
interface DepartmentListProps {
  row: any;
  onUpdate: (value: string) => void;
}

const DepartmentList = ({row, onUpdate}: DepartmentListProps) => {
  const [departmentList, setDepartmentList] = useState([]);
  return (
    <div>
      <select
        value={row.department}
        onClick={() => {
          stores.departmentStore.DepartmentService.findByFields({
            input: {filter: {lab: row?.lab}},
          }).then(res => {
            if (res.findByFieldsDepartments.success) {
              setDepartmentList(res.findByFieldsDepartments?.data);
            }
          });
        }}
        className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
        onChange={e => {
          const department = e.target.value;
          onUpdate(department);
        }}
      >
        <option selected>Select</option>
        {[{name: '', code: 'Default'}]
          .concat(departmentList)
          ?.map((item: any, index: number) => (
            <option key={index} value={item.code}>
              {item.code != 'Default'
                ? item?.name + ' - ' + item?.code
                : item.code}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DepartmentList;
