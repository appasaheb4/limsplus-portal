import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Table} from 'react-bootstrap';
import _ from 'lodash';
import dayjs from 'dayjs';
import {Buttons, Icons} from '@/library/components';
import {ModalModifyDetails} from '../molecules/modal-modify-details.component';
import {getAgeByAgeObject, getDiffByDate1} from '@/core-utils';
import {useStores} from '@/stores';
interface PreviewImportTableProps {
  data?: any;
  onUpload: (list: any) => void;
}

export const PreviewImportTable = observer(
  ({data, onUpload}: PreviewImportTableProps) => {
    const {doctorsStore, corporateClientsStore} = useStores();
    const [modalModifyDetails, setModalModifyDetails] = useState<any>({});
    const [finalOutput, setFinalOutput] = useState<any>([]);
    const [arrKeys, setArrKeys] = useState<Array<string>>([]);

    useEffect(() => {
      let localArrKeys: any = [];
      const localFinalOutput: any = [];
      const loadAsync = async () => {
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
        let dockerIds = data.map(item => {
          return item['Doctor Id'];
        });
        dockerIds = _.uniq(dockerIds);
        dockerIds = _.compact(dockerIds);
        const dockerList = await doctorsStore.doctorsService
          .findByArrayItems({
            input: {
              filter: {
                field: 'doctorCode',
                arrItems: dockerIds,
              },
            },
          })
          .then(res => {
            return res.findByArrayItemsDoctor?.data;
          });
        let corporateCode = data.map(item => {
          if (item.Predefined_Panel == 'Y') return item['Corporate Code'];
        });
        corporateCode = _.uniq(corporateCode);
        corporateCode = _.compact(corporateCode);
        const corporateCodeList =
          await corporateClientsStore.corporateClientsService
            .findByArrayItems({
              input: {
                filter: {
                  field: 'corporateCode',
                  arrItems: corporateCode,
                },
              },
            })
            .then(res => {
              return res.findByArrayItemsCorporateCode?.data;
            });
        data.map(function (item) {
          const list: any = [];
          localArrKeys.map(key => {
            // docker details fetch
            if (item['Doctor Id']) {
              const dockerDetails = dockerList?.find(
                o => o?.doctorCode == item['Doctor Id'],
              );
              if (key === 'Doctor Name') {
                list.map(o => o.field).includes('Doctor Name') &&
                  list.splice(list.map(o => o.field).indexOf('Doctor Name'), 1);
                list.push({
                  field: key,
                  value: dockerDetails?.doctorName?.toString(),
                });
              }
              if (key === 'Doctor Mobile Number') {
                list.map(o => o.field).indexOf('Doctor Mobile Number') &&
                  list.splice(
                    list.map(o => o.field).indexOf('Doctor Mobile Number'),
                    1,
                  );
                list.push({
                  field: key,
                  value: dockerDetails?.mobileNo?.toString(),
                });
              } else {
                list.push({field: key, value: item[key]?.toString()});
              }
            }
            if (item.Predefined_Panel == 'Y') {
              const corporateCodeDetails = corporateCodeList.find(
                o => o.corporateCode == item['Corporate Code'],
              );
              if (key === 'Panel Code') {
                list.splice(list.map(o => o.field).indexOf('Panel Code'), 1);
                const ccPanelList = corporateCodeDetails?.panelList
                  ?.map(o => o?.panelCode)
                  .join(',');
                list.push({
                  field: key,
                  value: ccPanelList?.toString(),
                });
              }
            } else {
              list.push({field: key, value: item[key]?.toString()});
            }
          });
          localFinalOutput.push(list);
        });
        setFinalOutput(localFinalOutput);
      };
      loadAsync();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
                      <span>{item[keysIndex]?.value?.toString()}</span>
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
          onUpdate={(
            value,
            inputFormat,
            keys,
            itemIndex,
            keysIndex,
            isUpdateAll,
          ) => {
            console.log({inputFormat, keys});

            setModalModifyDetails({
              show: false,
            });
            if (!isUpdateAll) {
              finalOutput[itemIndex][keysIndex].value = value;
              // birthday to age and age unit update
              if (inputFormat === 'radio' && keys === 'Birthdate') {
                if (
                  dayjs(new Date()).diff(dayjs(value, 'DD-MM-YYYY'), 'hour') <=
                  0
                ) {
                  return alert('Please select correct birth date!!');
                }
                finalOutput[itemIndex][arrKeys.indexOf('Age')].value =
                  getAgeByAgeObject(getDiffByDate1(value)).age || 0;
                finalOutput[itemIndex][arrKeys.indexOf('Age Unit')].value =
                  getAgeByAgeObject(getDiffByDate1(value)).ageUnit || 0;
              }
              setFinalOutput(JSON.parse(JSON.stringify(finalOutput)));
            } else {
              finalOutput.map((item, index) => {
                finalOutput[index][keysIndex].value = value;
                finalOutput[index][arrKeys.indexOf('Age')].value =
                  getAgeByAgeObject(getDiffByDate1(value)).age || 0;
                finalOutput[index][arrKeys.indexOf('Age Unit')].value =
                  getAgeByAgeObject(getDiffByDate1(value)).ageUnit || 0;
              });
              setFinalOutput(JSON.parse(JSON.stringify(finalOutput)));
            }
          }}
        />
      </>
    );
  },
);
