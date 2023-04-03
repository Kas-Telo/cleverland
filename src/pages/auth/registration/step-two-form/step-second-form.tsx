import { useForm } from 'react-hook-form';

import { ROUTES } from '../../../../common/enums-and-constants/routes-enum';
import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { ArrowLink } from '../../../../components/arrow-link/arrow-link';
import { Modal } from '../../../../components/modal/modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { TextField } from '../../../../components/text-field/text-field';
import { Button } from '../../../../ui';
import { BodyTypography, Subtitle } from '../../../../ui/typography';
import { StepSecondDataType } from '../registration';

import style from '../../auth-form.module.css';

type Props = {
  addData: (data: StepSecondDataType) => void;
};

export const StepSecondForm = ({ addData }: Props) => {
  const size: Size = useWindowSize();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (data: StepSecondDataType) => {
    addData(data);
  };

  return (
    <Modal positionContent='start'>
      <div>
        <h4 className={style.titleRegistration}>Регистрация</h4>
        <Subtitle size='small'>шаг 2 из 3</Subtitle>
      </div>
      <MyForm data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          positionHint='absolute'
          type='text'
          register={register}
          name='firstName'
          fieldError={errors.firstName}
          defaultValue={watch('firstName')}
          disabled={false}
          placeholder='Имя'
        />
        <TextField
          positionHint='absolute'
          type='text'
          register={register}
          name='lastName'
          fieldError={errors.lastName}
          defaultValue={watch('lastName')}
          disabled={false}
          placeholder='Фамилия'
        />
        <div className={style.fullWidthContainer}>
          <Button
            block={true}
            className={style.submitButton}
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variant='primary'
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            submit={true}
            disabled={!!errors.firstName || !!errors.lastName || !watch('firstName') || !watch('lastName')}
          >
            Последний шаг
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
