import { ForwardedRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import { authRegexp } from '../../../../common/enums-and-constants/regexp-constants';
import { ROUTES } from '../../../../common/enums-and-constants/routes-enum';
import { usePhoneMask } from '../../../../common/hooks/use-phone-mask';
import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { ArrowLink } from '../../../../components/arrow-link/arrow-link';
import { Modal } from '../../../../components/modal/modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { Hint } from '../../../../components/text-field/errors/hint/hint';
import { TextField } from '../../../../components/text-field/text-field';
import { Button } from '../../../../ui';
import { Input } from '../../../../ui/input/input';
import { BodyTypography, Subtitle } from '../../../../ui/typography';
import { StepFinalDataType } from '../registration';

import style from '../../auth-form.module.css';

type Props = {
  addData: (data: StepFinalDataType) => void;
};

export const StepFinalForm = ({ addData }: Props) => {
  const size: Size = useWindowSize();
  const maskFunction = usePhoneMask();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      phone: '',
      email: '',
    },
  });

  const onSubmit = (data: StepFinalDataType) => {
    addData(data);
  };

  return (
    <Modal positionContent='start'>
      <div>
        <h4 className={style.titleRegistration}>Регистрация</h4>
        <Subtitle size='small'>шаг 3 из 3</Subtitle>
      </div>
      <MyForm data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
        <div className={style.fullWidthContainer}>
          <Controller
            name='phone'
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <MaskedInput
                mask={maskFunction(value[6])}
                placeholderChar='x'
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                render={(ref, props) => (
                  <Input
                    placeholder='Номер телефона'
                    name='phone'
                    ref={ref as ForwardedRef<HTMLInputElement>}
                    type='tel'
                    isError={!!errors.phone}
                    {...props}
                  />
                )}
              />
            )}
            rules={{
              required: 'Поле не может быть пустым',
              pattern: authRegexp.phone,
            }}
          />
          <div className={style.hintContainer}>
            <Hint type='phone' error={errors.phone} isFocused={true} />
          </div>
        </div>
        <TextField
          positionHint='absolute'
          type='email'
          register={register}
          name='email'
          defaultValue={watch('email')}
          disabled={false}
          fieldError={errors.email}
          placeholder='E-mail'
        >
          <Hint type='email' error={errors.email} isFocused={true} />
        </TextField>
        <div className={style.fullWidthContainer}>
          <Button
            block={true}
            className={style.submitButton}
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variant='primary'
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            submit={true}
            disabled={!!errors.email || !!errors.phone || !watch('email') || !watch('phone')}
          >
            Зарегистрироваться
          </Button>
          <div className={style.linkBlock}>
            <BodyTypography className={style.linkDescription} size='large'>
              Есть учётной записи?
            </BodyTypography>
            <ArrowLink path={ROUTES.AUTH} positionArrow='after'>
              Войти
            </ArrowLink>
          </div>
        </div>
      </MyForm>
    </Modal>
  );
};
