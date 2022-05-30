import React from 'react';
import {Form} from '@/library/components';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';
import {useForm, Controller} from 'react-hook-form';
interface InputResultProps {
  resultType: string;
  onSelect: (item) => void;
}
export const InputResult = observer(
  ({resultType, onSelect}: InputResultProps) => {
    const {loading, salesTeamStore, routerStore} = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      clearErrors,
    } = useForm();

    return (
      <div className='relative w-full'>
        {resultType === 'V' && (
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <Form.Input
                label=''
                type='text'
                placeholder='Result'
                maxLength={50}
                className={
                  'w-full leading-4 p-2 h-10 focus:outline-none focus:ring block shadow-sm sm:text-base border-2  rounded-md'
                }
                hasError={errors.result}
                onBlur={result => {
                  onChange(result);
                  onSelect(result);
                }}
              />
            )}
            name='result'
            rules={{required: false}}
          />
        )}
        {resultType !== 'V' && <span>development state</span>}
      </div>
    );
  },
);
