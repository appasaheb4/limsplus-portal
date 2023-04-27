import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import _ from 'lodash';
import {Buttons, Icons} from '@/library/components';
import {ModalModifyDetails} from '../molecules/modal-modify-details.component';
interface PreviewImportTableProps {
  data?: any;
  onUpload: (list: any) => void;
}

export const PreviewImportTable = ({
  data,
  onUpload,
}: PreviewImportTableProps) => {
  const [reload, setReload] = useState(false);
  const [modalModifyDetails, setModalModifyDetails] = useState<any>({});
  const [finalOutput, setFinalOutput] = useState<any>([]);
  const [arrKeys, setArrKeys] = useState([]);

  useEffect(() => {
    let localArrKeys: any = [];
    const localFinalOutput: any = [];
    data.map(function (item) {
      const localKeys: any = [];
      for (const [key, value] of Object.entries(item as any)) {
        localKeys.push(key);
      }
      localArrKeys.push(...localKeys);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    localArrKeys = _.uniq(localArrKeys);
    localArrKeys = _.remove(localArrKeys, item => {
      return item != 'elementSequence';
    });
    setArrKeys(localArrKeys);
    data.map(function (item) {
      const list: any = [];
      localArrKeys.map(key => {
        list.push({field: key, value: item[key]});
      });
      localFinalOutput.push(list);
    });
    setFinalOutput(localFinalOutput);
  }, [data]);

  return (
    <>
      <div className='flex flex-wrap  overflow-scroll'>
        <Table striped bordered>
          <thead>
            <tr>
              {arrKeys?.map(item => (
                <th className='text-white'>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {finalOutput?.map((item, itemIndex) => (
              <tr>
                {arrKeys?.map((keys, keysIndex) => (
                  <td
                    onDoubleClick={() => {
                      setModalModifyDetails({
                        show: true,
                        keys,
                        itemIndex,
                        keysIndex,
                      });
                    }}
                  >
                    <span>{item[keysIndex].value}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className='flex items-center justify-center mt-2'>
        <Buttons.Button
          size='medium'
          type='solid'
          onClick={() => onUpload(finalOutput)}
        >
          <Icons.EvaIcon icon='plus-circle-outline' />
          {'Upload'}
        </Buttons.Button>
      </div>
      <ModalModifyDetails
        {...modalModifyDetails}
        onClose={() => {
          setModalModifyDetails({
            show: false,
          });
        }}
        onUpdate={(value, keys, itemIndex, keysIndex, isUpdateAll) => {
          setModalModifyDetails({
            show: false,
          });
          if (!isUpdateAll) {
            finalOutput[itemIndex][keysIndex].value = value;
            setFinalOutput(JSON.parse(JSON.stringify(finalOutput)));
          } else {
            finalOutput.map((item, index) => {
              finalOutput[index][keysIndex].value = value;
            });
            setFinalOutput(JSON.parse(JSON.stringify(finalOutput)));
          }
        }}
      />
    </>
  );
};
