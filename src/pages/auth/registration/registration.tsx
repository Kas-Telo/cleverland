import { Fragment, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegistrationRequestType } from '../../../api/auth/auth-api-types';
import { ROUTES } from '../../../common/enums-and-constants/routes-enum';
import { useActions } from '../../../common/hooks/use-actions';
import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { Modal } from '../../../components/modal/modal';
import { asyncAuthActions, syncAuthActions } from '../../../store/auth';
import { authSelectors } from '../../../store/auth/selectors';
import { Button } from '../../../ui';
import { BodyTypography } from '../../../ui/typography';

import { StepFinalForm } from './step-final-form/step-final-form';
import { StepFirstForm } from './step-first-form/step-first-form';
import { StepSecondForm } from './step-two-form/step-second-form';

import style from '../auth-form.module.css';

export type StepStatusType = 'first' | 'second' | 'final' | 'data-collected';

export type StepFirstDataType = {
  username: string;
  password: string;
};
export type StepSecondDataType = {
  firstName: string;
  lastName: string;
};
export type StepFinalDataType = {
  phone: string;
  email: string;
};

type AddDataActionType = {
  type: 'ADD_DATA';
  payload: StepFirstDataType | StepSecondDataType | StepFinalDataType;
};
const reducer = (state: RegistrationRequestType, action: AddDataActionType): RegistrationRequestType => {
  switch (action.type) {
    case 'ADD_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const Registration = () => {
  const navigate = useNavigate();
  const [registrationData, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [stepStatus, setStepStatus] = useState<StepStatusType>('first');

  const isAuth = useAppSelector(authSelectors.selectIsAuth);
  const responseInfo = useAppSelector(authSelectors.selectAuthInfo);
  const successfulRegistration = useAppSelector(authSelectors.selectSuccessfulRegistration);

  const { setAuthInfo } = useActions(syncAuthActions);
  const { registration } = useActions(asyncAuthActions);

  const addData = (data: StepFirstDataType | StepSecondDataType | StepFinalDataType) => {
    dispatch({ type: 'ADD_DATA', payload: data });
    if (stepStatus === 'first') setStepStatus('second');
    if (stepStatus === 'second') setStepStatus('final');
    if (stepStatus === 'final') setStepStatus('data-collected');
  };

  const onClickModalButton = () => {
    if (successfulRegistration) {
      navigate(ROUTES.AUTH);
    } else {
      setStepStatus('first');
    }

    setAuthInfo({ status: null, info: null });
  };

  useEffect(() => {
    if (isAuth) {
      navigate(`${ROUTES.BOOKS}/all`);
    }
    if (stepStatus === 'data-collected') {
      setAuthInfo({ status: null, info: null });
      registration(registrationData);
    }
  }, [isAuth, navigate, registration, registrationData, setAuthInfo, stepStatus]);

  return (
    <div>
      {responseInfo.info ? (
        <Modal dataTestIdModal='status-block' type='info'>
          <h4>{`${successfulRegistration ? 'Регистрация успешна' : 'Данные не сохранились'}`}</h4>
          <BodyTypography size='large'>{responseInfo.info}</BodyTypography>
          <Button
            submit={false}
            variant='primary'
            size='large'
            sizeTypography='large'
            className={style.infoButton}
            variantTypography='desktop'
            onClick={onClickModalButton}
          >
            {`${successfulRegistration ? 'Вход' : responseInfo.status === 400 ? 'Назад к регистрации' : 'Повторить'}`}
          </Button>
        </Modal>
      ) : (
        <Fragment>
          {stepStatus === 'first' && <StepFirstForm addData={addData} />}
          {stepStatus === 'second' && <StepSecondForm addData={addData} />}
          {stepStatus === 'final' && <StepFinalForm addData={addData} />}
        </Fragment>
      )}
    </div>
  );
};
