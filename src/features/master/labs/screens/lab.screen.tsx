import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import dayjs from 'dayjs';
import {
  Toast,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
  MainPageHeading,
  ModalPostalCode,
} from '@/library/components';
import { LabList, PriceListTable } from '../components';
import { lookupItems, lookupValue } from '@/library/utils';
import { useForm, Controller } from 'react-hook-form';
import { LabHoc } from '../hoc';
import { useStores } from '@/stores';
import { FormHelper } from '@/helper';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetLab } from '../startup';
import * as XLSX from 'xlsx';

const Lab = LabHoc(
  observer(() => {
    const {
      labStore,
      salesTeamStore,
      routerStore,
      administrativeDivisions,
      loading,
      loginStore,
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();

    const [priceGroupItems, setPriceGroupItems] = useState<any>();
    const [priceListItems, setPriceListItems] = useState<any>();
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);
    const [isPostalCode, setIsPostalCodeData] = useState(false);
    const [isExistsRecord, setIsExistsRecord] = useState<boolean>(false);

    useEffect(() => {
      (async function () {
        try {
          await RouterFlow.getLookupValuesByPathNField(
            '/collection/price-list',
            'PRICE_GROUP',
          ).then(async res => {
            if (res?.length > 0) {
              setPriceGroupItems(res.filter(item => item.code !== 'CSP'));
              await RouterFlow.getLookupValuesByPathNField(
                '/collection/price-list',
                'PRICE_LIST',
              ).then(items => {
                if (items?.length > 0) {
                  setPriceListItems(items);
                }
              });
            }
          });
        } catch (e) {
          console.error(e);
        }
      })();
    }, []);

    useEffect(() => {
      setValue('code', labStore.labs?.code);
      setValue('name', labStore.labs?.name);
      setValue('defaultLab', labStore.labs?.defaultLab);
      setValue('version', labStore.labs?.version);
      setValue('status', labStore.labs?.status);
      setValue('country', labStore.labs?.country);
      setValue('state', labStore.labs?.state);
      setValue('district', labStore.labs?.district);
      setValue('city', labStore.labs?.city);
      setValue('area', labStore.labs?.area);
      setValue('labType', labStore.labs?.labType);
      setValue('openingTime', labStore.labs?.openingTime);
      setValue('closingTime', labStore.labs?.closingTime);
      setValue('reportFormat', labStore.labs?.reportFormat);
      setValue('specificFormat', labStore.labs?.specificFormat);
      setValue('priceList', labStore.labs?.priceList);
      setValue('postalCode', labStore.labs?.postalCode);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labStore.labs]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!hideAddLab && !labStore.labs.postalCode && event.key === 'F5') {
          event.preventDefault();
          setIsPostalCodeData(true);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideAddLab]);

    const onSubmitLab = async () => {
      if (!isExistsRecord) {
        const uniqueItem: any = [];
        if (isImport) {
          for (let i = 0; i < arrImportRecords?.length; i++) {
            const isExists = await checkExistsRecords(arrImportRecords[i]);
            if (!isExists) uniqueItem.push(arrImportRecords[i]);
            else
              Toast.error({
                message: `😔 Same record exists: ${arrImportRecords[i].code} - ${arrImportRecords[i].name}`,
              });
          }
          if (uniqueItem?.length > 0) {
            labStore.LabService.addLab({
              input: { isImport, arrImportRecords: uniqueItem },
            }).then(res => {
              if (res.createLab.success) {
                Toast.success({
                  message: `😊 ${res.createLab.message}`,
                });
                setArrImportRecords([]);
                setIsImport(false);
              }
            });
          }
        } else {
          if (!_.isEmpty(labStore.labs.existsRecordId)) {
            const isExists = await checkExistsRecords();
            if (isExists) {
              return;
            }
          }
          if (
            labStore.labs?.priceList?.filter(item => {
              return (
                // eslint-disable-next-line no-prototype-builtins
                item.hasOwnProperty('priceGroup') &&
                // eslint-disable-next-line no-prototype-builtins
                item.hasOwnProperty('priority')
              );
            }).length > 0
          ) {
            labStore.LabService.addLab({
              input: { isImport, ...labStore.labs },
            }).then(res => {
              if (res.createLab.success) {
                Toast.success({
                  message: `😊 ${res.createLab.message}`,
                });
              }
            });
          } else {
            return Toast.error({
              message: '😔 Price list min 1 record required.',
            });
          }
        }
        setHideAddLab(true);
        setIsVersionUpgrade(false);
        reset();
        resetLab();
      } else {
        Toast.warning({
          message: '😔 Duplicate record found',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <LabList
          data={labStore.listLabs || []}
          totalSize={labStore.listLabsCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listAdministrativeDiv:
              administrativeDivisions.listAdministrativeDiv,
          }}
          isView={RouterFlow.checkPermission(
            routerStore.userPermission,
            'View',
          )}
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isUpdate={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Update',
          )}
          isExport={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Export',
          )}
          isVersionUpgrade={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Version Upgrade',
          )}
          isDuplicate={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Duplicate',
          )}
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'Delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Do you want to delete selected record?',
            });
          }}
          onUpdateFileds={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateFileds',
              data: { fileds, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: { value, dataField, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onUpdateFields={(fileds: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateFileds',
              data: { fileds, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onUpdateImage={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'UpdateImage',
              data: { value, dataField, id },
              title: 'Are you sure?',
              body: 'Do you want to update  the image of this record?',
            });
          }}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to upgrade version for this record?',
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to duplicate this record?',
            });
          }}
          onPageSizeChange={(page, limit) => {
            labStore.fetchListLab(page, limit);
            global.filter = {
              mode: 'pagination',
              page,
              limit,
            };
          }}
          onFilter={(type, filter, page, limit) => {
            labStore.LabService.filter({
              input: { type, filter, page, limit },
            });
            global.filter = {
              mode: 'filter',
              filter,
              type,
              page,
              limit,
            };
          }}
          onApproval={async records => {
            const isExists = await checkExistsRecords({
              ...records,
              status: 'A',
            });
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: { value: 'A', dataField: 'status', id: records._id },
                title: 'Are you sure?',
                body: 'Do you want to approved records?',
              });
            }
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [labStore.listLabs],
    );

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });
        const list = data.map((item: any) => {
          return {
            code: item?.Code?.toUpperCase(),
            name: item?.Name?.toUpperCase(),
            country: item?.Country?.toUpperCase(),
            state: item?.State?.toUpperCase(),
            district: item?.District?.toUpperCase(),
            city: item?.City?.toUpperCase(),
            area: item?.Area?.toUpperCase(),
            postalCode: item['Postal Code'],
            address: item?.Address,
            deliveryType: item.DeliveryType,
            salesTerritory: item['Sales Territory'],
            labLicence: item['Lab Licence'],
            director: item.Director,
            physician: item.Physician,
            mobileNo: item['Mobile No'],
            contactNo: item['Contact No'],
            speciality: item.Speciality,
            labType: item['Lab Type'],
            defaultLab: item['Default Lab'],
            openingTime: item['Opening Time'],
            closingTime: item['Closing Time'],
            email: item.Email,
            web: item.Web,
            registeredOffice: item['Registered Office'],
            customerCare: item['Customer Care'],
            corporateOffice: item['Corporate Office'],
            gst: item.Gst,
            sacCode: item['Sac Code'],
            cinNo: item['CIN No'],
            labLog: undefined,
            image: undefined,
            environment: item?.Environment,
            requireReceveInLab:
              item['Require Receve In Lab'] === 'Yes' ? true : false,
            requireScainIn: item['Require Scain In'] === 'Yes' ? true : false,
            routingDept: item['Routing Dept'] === 'Yes' ? true : false,
            reportFormat: item['Report Format'] === 'Yes' ? true : false,
            printLable: item['Print Lable'] === 'Yes' ? true : false,
            fyiLine: item['Fyi Line'],
            workLine: item['Work Line'],
            priceList: undefined,
            specificFormat: item['Specific Format'] === 'Yes' ? true : false,
            companyCode: item['Company Code'],
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecords = async (
      fields: any = labStore.labs,
      isSingleCheck = false,
    ) => {
      const requiredFields = ['code', 'name', 'defaultLab', 'status'];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields }[item])) return item;
      });
      if (isEmpty && !isSingleCheck) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      return labStore.LabService.findByFields({
        input: {
          filter: isSingleCheck
            ? { ...fields }
            : {
                ..._.pick({ ...fields }, requiredFields),
              },
        },
      }).then(res => {
        if (res.findByFieldsLabs?.success) {
          setIsExistsRecord(true);
          Toast.error({
            message: '😔 Already some record exists.',
          });
          return true;
        } else {
          setIsExistsRecord(false);
          return false;
        }
      });
    };

    const getPriceListTable = useMemo(
      () => (
        <PriceListTable
          priceGroup={priceGroupItems}
          priceList={priceListItems}
        />
      ),
      [priceGroupItems, priceListItems],
    );

    return (
      <>
        <MainPageHeading
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />
        <div
          className='flex justify-end'
          style={{
            position: 'fixed',
            right: '30px',
            top: '135px',
            zIndex: 9999,
          }}
        >
          {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
            <Buttons.ButtonCircleAddRemoveBottom
              show={hideAddLab}
              onClick={() => setHideAddLab(!hideAddLab)}
            />
          )}
        </div>
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
              isImport={isImport}
              isImportDisable={
                !RouterFlow.checkPermission(
                  toJS(routerStore.userPermission),
                  'Import',
                )
              }
              onClick={flag => {
                setIsImport(flag);
              }}
            />
            {!isImport ? (
              <>
                <Grid cols={3}>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Code'
                          id='code'
                          disabled={isVersionUpgrade}
                          hasError={!!errors.code}
                          placeholder={
                            errors.code ? 'Please Enter Code' : 'Code'
                          }
                          value={value}
                          onChange={code => {
                            onChange(code);
                            labStore.updateLabs({
                              ...labStore.labs,
                              code: code.toUpperCase(),
                            });
                          }}
                          onBlur={code => {
                            if (code) checkExistsRecords({ code }, true);
                          }}
                        />
                      )}
                      name='code'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    {labStore.checkExitsEnvCode && (
                      <span className='text-red-600 font-medium relative'>
                        Code already exits. Please use other code.
                      </span>
                    )}
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Name'
                          name='name'
                          hasError={!!errors.name}
                          placeholder={
                            errors.name ? 'Please Enter Name' : 'Name'
                          }
                          value={value}
                          onChange={name => {
                            onChange(name);
                            labStore.updateLabs({
                              ...labStore.labs,
                              name: name.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='name'
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Postal Code'
                          hasError={!!errors.postalCode}
                          placeholder='Search....'
                          value={value}
                          //disabled={true}
                          onChange={postalCode => {
                            onChange(postalCode);
                            if (postalCode?.length == 6) {
                              labStore.LabService?.getAddressDetailsByPincode(
                                postalCode,
                              );
                              labStore.updateLabs({
                                ...labStore.labs,
                                postalCode,
                              });
                              setIsPostalCodeData(true);
                            }
                          }}
                        />
                      )}
                      name='postalCode'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Country'
                          hasError={!!errors.country}
                          placeholder='Country'
                          value={value}
                          disabled={true}
                          onChange={country => {
                            onChange(country);
                            labStore.updateLabs({
                              ...labStore.labs,
                              country: country?.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='country'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='State'
                          hasError={!!errors.state}
                          placeholder='State'
                          value={value}
                          disabled={true}
                          onChange={state => {
                            onChange(state);
                            labStore.updateLabs({
                              ...labStore.labs,
                              state: state?.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='state'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='District'
                          hasError={!!errors.district}
                          placeholder='District'
                          value={value}
                          disabled={true}
                          onChange={district => {
                            onChange(district);
                            labStore.updateLabs({
                              ...labStore.labs,
                              district: district?.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='district'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='City'
                          hasError={!!errors.city}
                          placeholder='City'
                          value={value}
                          disabled={true}
                          onChange={city => {
                            onChange(city);
                            labStore.updateLabs({
                              ...labStore.labs,
                              city: city?.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='city'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Area'
                          hasError={!!errors.area}
                          placeholder='Area'
                          value={value}
                          disabled={true}
                          onChange={area => {
                            onChange(area);
                            labStore.updateLabs({
                              ...labStore.labs,
                              area: area?.toUpperCase(),
                            });
                          }}
                        />
                      )}
                      name='area'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.MultilineInput
                          rows={2}
                          label='Address'
                          placeholder={
                            errors.address ? 'Please enter address' : 'Address'
                          }
                          hasError={!!errors.address}
                          value={value}
                          onChange={address => {
                            onChange(address);
                            labStore.updateLabs({
                              ...labStore.labs,
                              address,
                            });
                          }}
                        />
                      )}
                      name='address'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Sales Territory'
                          hasError={!!errors.salesTerritory}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.salesTerritory
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const salesTerritory = e.target.value;
                              onChange(salesTerritory);
                              labStore.updateLabs({
                                ...labStore.labs,
                                salesTerritory,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {salesTeamStore.listSalesTeam &&
                              _.union(
                                _.map(
                                  salesTeamStore.listSalesTeam,
                                  'salesTerritory',
                                ),
                              ).map((item: any, index: number) => (
                                <option key={index} value={item}>
                                  {`${item}`}
                                </option>
                              ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='salesTerritory'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Lab Licence'
                          placeholder={
                            errors.labLicence
                              ? 'Please Enter labLicence'
                              : 'Lab Licence'
                          }
                          hasError={!!errors.labLicence}
                          value={value}
                          onChange={labLicence => {
                            onChange(labLicence);
                            labStore.updateLabs({
                              ...labStore.labs,
                              labLicence,
                            });
                          }}
                        />
                      )}
                      name='labLicence'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                  </List>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Director'
                          placeholder={
                            errors.director
                              ? 'Please Enter director'
                              : 'Director'
                          }
                          hasError={!!errors.director}
                          value={value}
                          onChange={director => {
                            onChange(director);
                            labStore.updateLabs({
                              ...labStore.labs,
                              director,
                            });
                          }}
                        />
                      )}
                      name='director'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Physician'
                          placeholder={
                            errors.physician
                              ? 'Please Enter physician'
                              : 'Physician'
                          }
                          hasError={!!errors.physician}
                          value={value}
                          onChange={physician => {
                            onChange(physician);
                            labStore.updateLabs({
                              ...labStore.labs,
                              physician,
                            });
                          }}
                        />
                      )}
                      name='physician'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          type='number'
                          label='Mobile Number'
                          placeholder={
                            errors.mobileNo
                              ? 'Please Enter mobileNo'
                              : 'Mobile Number'
                          }
                          maxLength={10}
                          pattern={FormHelper.patterns.mobileNo}
                          hasError={!!errors.mobileNo}
                          value={value}
                          onChange={mobileNo => {
                            onChange(mobileNo);
                            labStore.updateLabs({
                              ...labStore.labs,
                              mobileNo,
                            });
                          }}
                          onBlur={mobileNo => {
                            if (mobileNo && mobileNo.length === 10) {
                              labStore.updateLabs({
                                ...labStore.labs,
                                mobileNo,
                              });
                            } else if (mobileNo) {
                              // Show an error message only if the input has a value (not empty)
                              Toast.error({
                                message:
                                  'Mobile Number should be exactly 10 digits',
                              });
                            }
                          }}
                        />
                      )}
                      name='mobileNo'
                      rules={{
                        required: false,
                        pattern: FormHelper.patterns.mobileNo,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          type='number'
                          label='Contact Number'
                          placeholder={
                            errors.contactNo
                              ? 'Please Enter contactNo'
                              : 'Contact Number'
                          }
                          maxLength={10}
                          pattern={FormHelper.patterns.mobileNo}
                          hasError={!!errors.contactNo}
                          value={value}
                          onChange={contactNo => {
                            onChange(contactNo);
                            labStore.updateLabs({
                              ...labStore.labs,
                              contactNo,
                            });
                          }}
                          onBlur={contactNo => {
                            if (contactNo && contactNo?.length === 10) {
                              labStore.updateLabs({
                                ...labStore.labs,
                                contactNo,
                              });
                            } else if (contactNo) {
                              // Show an error message only if the input has a value (not empty)
                              Toast.error({
                                message:
                                  'Contact Number should be exactly 10 digits',
                              });
                            }
                          }}
                        />
                      )}
                      name='contactNo'
                      rules={{
                        required: false,
                        pattern: FormHelper.patterns.mobileNo,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Speciality'
                          hasError={!!errors.speciality}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.speciality
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const speciality = e.target.value;
                              onChange(speciality);
                              labStore.updateLabs({
                                ...labStore.labs,
                                speciality,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'SPECIALITY',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='speciality'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Lab type'
                          hasError={!!errors.labType}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.labType
                                ? 'border-red  '
                                : 'border-gray-300'
                            } rounded-md`}
                            onChange={e => {
                              const labType = e.target.value;
                              onChange(labType);
                              labStore.updateLabs({
                                ...labStore.labs,
                                labType,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'LAB_TYPE',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='labType'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Default Lab'
                          hasError={!!errors.defaultLab}
                        >
                          <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                            loader={loading}
                            placeholder='Search by code or name'
                            data={{
                              list: _.uniqBy(
                                labStore?.listLabs?.filter(
                                  item => item.status == 'A',
                                ),
                                'code',
                              ),
                              displayKey: ['code', 'name'],
                            }}
                            hasError={!!errors.defaultLab}
                            onFilter={(value: string) => {
                              labStore.LabService.filterByFields({
                                input: {
                                  filter: {
                                    fields: ['code', 'name'],
                                    srText: value,
                                  },
                                  page: 0,
                                  limit: 10,
                                },
                              });
                            }}
                            displayValue={value}
                            onSelect={item => {
                              onChange(item.code);
                              labStore.updateLabs({
                                ...labStore.labs,
                                defaultLab: item.code,
                              });
                              labStore.updateLabList(labStore.listLabsCopy);
                            }}
                          />
                        </Form.InputWrapper>
                      )}
                      name='defaultLab'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Clock
                          label='Opening Time'
                          hasError={!!errors.openingTime}
                          value={value}
                          onChange={openingTime => {
                            onChange(openingTime);
                            labStore.updateLabs({
                              ...labStore.labs,
                              openingTime,
                            });
                          }}
                        />
                      )}
                      name='openingTime'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Clock
                          label='Closing Time'
                          hasError={!!errors.closingTime}
                          value={value}
                          onChange={closingTime => {
                            onChange(closingTime);
                            labStore.updateLabs({
                              ...labStore.labs,
                              closingTime,
                            });
                          }}
                        />
                      )}
                      name='closingTime'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Email'
                          placeholder={
                            errors.email ? 'Please Enter Email' : 'Email'
                          }
                          hasError={!!errors.email}
                          value={value}
                          onChange={email => {
                            onChange(email);
                            labStore.updateLabs({
                              ...labStore.labs,
                              email,
                            });
                          }}
                          onBlur={email => {
                            if (FormHelper.isEmailValid(email)) {
                              labStore.updateLabs({
                                ...labStore.labs,
                                email,
                              });
                            } else if (email) {
                              return Toast.error({
                                message: 'Please enter a valid email address.',
                              });
                            }
                          }}
                        />
                      )}
                      name='email'
                      rules={{
                        required: false,
                        pattern: FormHelper.patterns.email,
                      }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Web'
                          placeholder='Web'
                          hasError={!!errors.web}
                          value={value}
                          onChange={web => {
                            onChange(web);
                            labStore.updateLabs({
                              ...labStore.labs,
                              web,
                            });
                          }}
                        />
                      )}
                      name='web'
                      rules={{ required: false }}
                      defaultValue=''
                    />

                    <Grid cols={3}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Report Format'
                            hasError={!!errors.reportFormat}
                            value={value}
                            onChange={reportFormat => {
                              onChange(reportFormat);
                              labStore.updateLabs({
                                ...labStore.labs,
                                reportFormat,
                              });
                            }}
                          />
                        )}
                        name='reportFormat'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Print Label'
                            hasError={!!errors.printLable}
                            value={value}
                            onChange={printLable => {
                              onChange(printLable);
                              labStore.updateLabs({
                                ...labStore.labs,
                                printLable,
                              });
                            }}
                          />
                        )}
                        name='printLable'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Require Reveiving in Lab'
                            hasError={!!errors.requireReceveInLab}
                            value={value}
                            onChange={requireReceveInLab => {
                              onChange(requireReceveInLab);
                              labStore.updateLabs({
                                ...labStore.labs,
                                requireReceveInLab,
                              });
                            }}
                          />
                        )}
                        name='requireReceveInLab'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                    </Grid>
                  </List>
                  <List direction='col' space={4} justify='stretch' fill>
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Registered Office'
                          placeholder='Registered Office'
                          hasError={!!errors.registeredOffice}
                          value={value}
                          onChange={registeredOffice => {
                            onChange(registeredOffice);
                            labStore.updateLabs({
                              ...labStore.labs,
                              registeredOffice,
                            });
                          }}
                        />
                      )}
                      name='registeredOffice'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Customer Care'
                          placeholder='Customer Care'
                          hasError={!!errors.customerCare}
                          value={value}
                          onChange={customerCare => {
                            onChange(customerCare);
                            labStore.updateLabs({
                              ...labStore.labs,
                              customerCare,
                            });
                          }}
                        />
                      )}
                      name='customerCare'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Corporate Office'
                          placeholder='Corporate Office'
                          hasError={!!errors.corporateOffice}
                          value={value}
                          onChange={corporateOffice => {
                            onChange(corporateOffice);
                            labStore.updateLabs({
                              ...labStore.labs,
                              corporateOffice,
                            });
                          }}
                        />
                      )}
                      name='corporateOffice'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='GST'
                          placeholder='GST'
                          hasError={!!errors.gst}
                          value={value}
                          onChange={gst => {
                            onChange(gst);
                            labStore.updateLabs({
                              ...labStore.labs,
                              gst,
                            });
                          }}
                        />
                      )}
                      name='gst'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='Sac Code'
                          placeholder='Sac Code'
                          hasError={!!errors.sacCode}
                          value={value}
                          onChange={sacCode => {
                            onChange(sacCode);
                            labStore.updateLabs({
                              ...labStore.labs,
                              sacCode,
                            });
                          }}
                        />
                      )}
                      name='sacCode'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.Input
                          label='CIN No'
                          placeholder='CIN No'
                          hasError={!!errors.cinNo}
                          value={value}
                          onChange={cinNo => {
                            onChange(cinNo);
                            labStore.updateLabs({
                              ...labStore.labs,
                              cinNo,
                            });
                          }}
                        />
                      )}
                      name='cinNo'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputFile
                          label='Lab logo'
                          placeholder={
                            errors.labLog ? 'Please Enter labLog' : 'LabLog'
                          }
                          value={value ? value?.filename : ''}
                          hasError={!!errors.labLog}
                          onChange={e => {
                            const labLog = e.target.files[0];
                            onChange(labLog);
                            labStore.updateLabs({
                              ...labStore.labs,
                              labLog,
                            });
                          }}
                        />
                      )}
                      name='labLog'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.MultilineInput
                          rows={2}
                          label='FYI line'
                          placeholder={
                            errors.fyiLine ? 'Please Enter fyiLine' : 'FYI Line'
                          }
                          hasError={!!errors.fyiLine}
                          value={value}
                          onChange={fyiLine => {
                            onChange(fyiLine);
                            labStore.updateLabs({
                              ...labStore.labs,
                              fyiLine,
                            });
                          }}
                        />
                      )}
                      name='fyiLine'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.MultilineInput
                          rows={2}
                          label='Work line'
                          placeholder={
                            errors.workLine
                              ? 'Please Enter workLine'
                              : 'WorkLine'
                          }
                          hasError={!!errors.workLine}
                          value={value}
                          onChange={workLine => {
                            onChange(workLine);
                            labStore.updateLabs({
                              ...labStore.labs,
                              workLine,
                            });
                          }}
                        />
                      )}
                      name='workLine'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { value } }) => (
                        <Form.Input
                          label='Version'
                          placeholder={
                            errors.version ? 'Please Enter Version' : 'Version'
                          }
                          hasError={!!errors.version}
                          value={value}
                          disabled={true}
                        />
                      )}
                      name='version'
                      rules={{ required: false }}
                      defaultValue=''
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Form.InputWrapper
                          label='Status'
                          hasError={!!errors.status}
                        >
                          <select
                            value={value}
                            className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                              errors.status ? 'border-red  ' : 'border-gray-300'
                            } rounded-md`}
                            disabled={isVersionUpgrade}
                            onChange={e => {
                              const status = e.target.value;
                              onChange(status);
                              labStore.updateLabs({
                                ...labStore.labs,
                                status,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(routerStore.lookupItems, 'STATUS').map(
                              (item: any, index: number) => (
                                <option key={index} value={item.code}>
                                  {lookupValue(item)}
                                </option>
                              ),
                            )}
                          </select>
                        </Form.InputWrapper>
                      )}
                      name='status'
                      rules={{ required: true }}
                      defaultValue=''
                    />

                    <Grid cols={4}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Require Scain In'
                            hasError={!!errors.requireScainIn}
                            value={value}
                            onChange={requireScainIn => {
                              onChange(requireScainIn);
                              labStore.updateLabs({
                                ...labStore.labs,
                                requireScainIn,
                              });
                            }}
                          />
                        )}
                        name='requireScainIn'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Routing Dept'
                            hasError={!!errors.routingDept}
                            value={value}
                            onChange={routingDept => {
                              onChange(routingDept);
                              labStore.updateLabs({
                                ...labStore.labs,
                                routingDept,
                              });
                            }}
                          />
                        )}
                        name='routingDept'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Form.Toggle
                            label='Specific Format'
                            hasError={!!errors.specificFormat}
                            value={value}
                            onChange={specificFormat => {
                              onChange(specificFormat);
                              labStore.updateLabs({
                                ...labStore.labs,
                                specificFormat,
                              });
                            }}
                          />
                        )}
                        name='specificFormat'
                        rules={{ required: false }}
                        defaultValue=''
                      />
                    </Grid>
                  </List>
                </Grid>
                <List direction='row' space={3} align='center'>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Price List'
                        hasError={!!errors.priceList}
                      >
                        {getPriceListTable}
                      </Form.InputWrapper>
                    )}
                    name='priceList'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                </List>
              </>
            ) : (
              <>
                {arrImportRecords?.length > 0 ? (
                  <StaticInputTable data={arrImportRecords} />
                ) : (
                  <ImportFile
                    onClick={file => {
                      handleFileUpload(file[0]);
                    }}
                  />
                )}
              </>
            )}

            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitLab)}
              >
                Save
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
            {tableView}
          </div>
          <ModalPostalCode
            postalCode={labStore?.labs?.postalCode}
            show={isPostalCode}
            data={
              labStore?.labs?.postalCode
                ? labStore?.addressDetails
                : [
                    {
                      Pincode: '',
                      Country: '',
                      State: '',
                      District: '',
                      Block: '',
                      Name: '',
                    },
                  ]
            }
            onSelectedRow={item => {
              labStore.updateLabs({
                ...labStore.labs,
                country: item?.Country?.toUpperCase(),
                state: item?.State?.toUpperCase(),
                district: item?.District?.toUpperCase(),
                city: item?.Block?.toUpperCase(),
                area: item?.Name?.toUpperCase(),
                postalCode: item?.Pincode,
              });
              setIsPostalCodeData(false);
            }}
            close={() => {
              labStore.updateLabs({
                ...labStore.labs,
                country: '',
                state: '',
                district: '',
                city: '',
                area: '',
                postalCode: '',
              });
              setIsPostalCodeData(false);
            }}
          />
          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              setModalConfirm({ show: false });
              switch (action) {
                case 'Delete': {
                  labStore.LabService.deleteLab({
                    input: { id: modalConfirm.id },
                  }).then((res: any) => {
                    if (res.removeLab.success) {
                      Toast.success({
                        message: `😊 ${res.removeLab.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        labStore.fetchListLab(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        labStore.LabService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else labStore.fetchListLab();
                    }
                  });

                  break;
                }
                case 'Update': {
                  labStore.LabService.updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  }).then((res: any) => {
                    if (res.updateLab.success) {
                      Toast.success({
                        message: `😊 ${res.updateLab.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        labStore.fetchListLab(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        labStore.LabService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else labStore.fetchListLab();
                    }
                  });
                  break;
                }
                case 'UpdateFileds': {
                  labStore.LabService.updateSingleFiled({
                    input: {
                      ...modalConfirm.data.fileds,
                      _id: modalConfirm.data.id,
                    },
                  }).then((res: any) => {
                    if (res.updateLab.success) {
                      Toast.success({
                        message: `😊 ${res.updateLab.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        labStore.fetchListLab(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        labStore.LabService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else labStore.fetchListLab();
                    }
                  });
                  break;
                }
                case 'versionUpgrade': {
                  labStore.updateLabs({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    image: undefined,
                    labLog: undefined,
                    priceList: modalConfirm.data?.priceList || [
                      { id: 0, maxDis: 0 },
                    ],
                    __v: undefined,
                    version: Number.parseInt(modalConfirm.data.version + 1),
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
                    ),
                  });
                  setHideAddLab(false);
                  setIsVersionUpgrade(true);
                  break;
                }
                case 'duplicate': {
                  labStore.updateLabs({
                    ...modalConfirm.data,
                    _id: undefined,
                    existsVersionId: undefined,
                    image: undefined,
                    labLog: undefined,
                    priceList: modalConfirm.data?.priceList || [
                      { id: 0, maxDis: 0 },
                    ],
                    __v: undefined,
                    existsRecordId: modalConfirm.data._id,
                    version: 1,
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD'),
                    ),
                  });
                  setHideAddLab(false);
                  break;
                }
                default: {
                  labStore.LabService.updateLabImages({
                    input: {
                      _id: modalConfirm.data.id,
                      labLog: modalConfirm.data.value,
                    },
                  }).then((res: any) => {
                    if (res.updateLabImages.success) {
                      Toast.success({
                        message: `😊 ${res.updateLabImages.message}`,
                      });
                      if (global?.filter?.mode == 'pagination')
                        labStore.fetchListLab(
                          global?.filter?.page,
                          global?.filter?.limit,
                        );
                      else if (global?.filter?.mode == 'filter')
                        labStore.LabService.filter({
                          input: {
                            type: global?.filter?.type,
                            filter: global?.filter?.filter,
                            page: global?.filter?.page,
                            limit: global?.filter?.limit,
                          },
                        });
                      else labStore.fetchListLab();
                    }
                  });
                }
              }
            }}
            onClose={() => {
              setModalConfirm({ show: false });
            }}
          />
        </div>
      </>
    );
  }),
);

export default Lab;
