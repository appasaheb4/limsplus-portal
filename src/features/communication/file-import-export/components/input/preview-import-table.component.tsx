import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Table} from 'react-bootstrap';
import _ from 'lodash';
import dayjs from 'dayjs';
import {Buttons, Icons, Tooltip} from '@/library/components';
import {ModalModifyDetails} from '../molecules/modal-modify-details.component';
import {getAgeByAgeObject, getDiffByDate1} from '@/core-utils';
import {useStores} from '@/stores';
import {IoMdCheckmarkCircle, IoIosCloseCircleOutline} from 'react-icons/io';

interface PreviewImportTableProps {
  arrData?: any;
  onUpload: (list: any) => void;
}

export const PreviewImportTable = observer(
  ({arrData, onUpload}: PreviewImportTableProps) => {
    const {
      doctorsStore,
      corporateClientsStore,
      registrationLocationsStore,
      loginStore,
    } = useStores();
    const [modalModifyDetails, setModalModifyDetails] = useState<any>({});
    const [finalOutput, setFinalOutput] = useState<any>([]);
    const [arrKeys, setArrKeys] = useState<Array<string>>([]);

    const loadAsync = async data => {
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
        return item['Corporate Code'];
      });
      corporateCode = _.uniq(corporateCode);
      corporateCode = _.compact(corporateCode);
      console.log({corporateCode});

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
      let collectionCenter = data.map(item => {
        return item['Collection Center'];
      });
      collectionCenter = _.uniq(collectionCenter);
      collectionCenter = _.compact(collectionCenter);
      const collectionCenterList =
        await registrationLocationsStore.registrationLocationsService
          .findByArrayItem({
            input: {
              filter: {
                field: 'locationCode',
                arrItems: collectionCenter,
              },
            },
          })
          .then(res => {
            return res.findByArrayItemsRegistrationLocations?.data;
          });
      let isError = false;
      let errorMsg: any[] = [];
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
            if (!corporateCodeDetails?.isPredefinedPanel) {
              isError = true;
              errorMsg.push('Predefined panel not enable.');
            }
            if (key === 'Panel Code') {
              list.splice(list.map(o => o.field).indexOf('Panel Code'), 1);
              const ccPanelList =
                corporateCodeDetails?.panelList?.map(o => o?.panelCode) || [];
              if (ccPanelList.length == 0) {
                isError = true;
                errorMsg.push('Panel list not found.');
              }
              list.push({
                field: key,
                value: ccPanelList?.join(',')?.toString(),
              });
            }
          } else {
            list.push({field: key, value: item[key]?.toString()});
          }
        });
        if (
          item['Doctor Id'] &&
          !dockerList.some(oe => oe?.doctorCode == item['Doctor Id'])
        ) {
          isError = true;
          errorMsg.push('Doctor Id not found.');
        }
        if (
          item['Corporate Code'] &&
          !corporateCodeList.some(
            oe => oe?.corporateCode == item['Corporate Code'],
          )
        ) {
          isError = true;
          errorMsg.push('Corporate Code not found.');
        }
        if (item.RLAB && item.RLAB != loginStore.login.lab) {
          isError = true;
          errorMsg.push('RLAB not found.');
        }
        if (
          item['Collection Center'] &&
          !collectionCenterList?.some(
            oe => oe?.locationCode == item['Collection Center'],
          )
        ) {
          isError = true;
          errorMsg.push('Collection center not found');
        }
        if (item['Collection Center']) {
          list?.push({
            field: 'Ac Class',
            value: collectionCenterList?.find(
              oe => oe?.locationCode == item['Collection Center'],
            )?.acClass,
          });
          list?.push({
            field: 'Collection Center Name',
            value: collectionCenterList?.find(
              oe => oe?.locationCode == item['Collection Center'],
            )?.locationName,
          });
        }

        errorMsg = _.uniq(errorMsg);
        localFinalOutput.push({
          ...list,
          isError: isError,
          errorMsg: errorMsg?.join(''),
        });
        isError = false;
        errorMsg = [''];
      });
      setFinalOutput(localFinalOutput);
    };

    useEffect(() => {
      loadAsync(arrData);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrData]);

    return (
      <>
        <div className='flex flex-wrap  overflow-scroll'>
          <Table striped bordered>
            <thead>
              <tr>
                <th className='text-white'>Status</th>
                {arrKeys?.map(item => (
                  <th className='text-white'>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {finalOutput?.map((item, itemIndex) => (
                <tr>
                  <td>
                    <>
                      {item?.isError ? (
                        <Tooltip tooltipText={item.errorMsg}>
                          <IoIosCloseCircleOutline color='red' size={20} />
                        </Tooltip>
                      ) : (
                        <IoMdCheckmarkCircle color='green' size={20} />
                      )}{' '}
                    </>
                  </td>
                  {arrKeys?.map((keys, keysIndex) => (
                    <td
                      className='p-2'
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
        <div className='flex flex-col'>
          <span className='text-red'>{'Note:'}</span>
          <span className='text-red ml-4'>
            {'1. All records add date correctly.'}
          </span>{' '}
          <span className='text-red ml-4'>
            {
              '2.If any issue in record then not uploading on server. More details for check status'
            }
          </span>
        </div>
        <div className='flex items-center justify-center mt-2'>
          <Buttons.Button
            size='medium'
            type='solid'
            onClick={() => {
              onUpload(finalOutput?.filter(item => item.isError == false));
              //onUpload(finalOutput);
            }}
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
              const list: any[] = [];
              finalOutput.map(item => {
                const record = {};
                Object.entries(item).map((e: any) => {
                  Object.assign(record, {
                    [e[1]?.field]: e[1]?.value,
                  });
                });
                list.push(record);
              });
              loadAsync(list);
              //setFinalOutput(JSON.parse(JSON.stringify(finalOutput)));
            } else {
              finalOutput.map((item, index) => {
                finalOutput[index][keysIndex].value = value;
                finalOutput[index][arrKeys.indexOf('Age')].value =
                  getAgeByAgeObject(getDiffByDate1(value)).age || 0;
                finalOutput[index][arrKeys.indexOf('Age Unit')].value =
                  getAgeByAgeObject(getDiffByDate1(value)).ageUnit || 0;
              });
              const list: any[] = [];
              finalOutput.map(item => {
                const record = {};
                Object.entries(item).map((e: any) => {
                  Object.assign(record, {
                    [e[1]?.field]: e[1]?.value,
                  });
                });
                list.push(record);
              });
              loadAsync(list);
              //setFinalOutput(JSON.parse(JSON.stringify(finalOutput)));
            }
          }}
        />
      </>
    );
  },
);
