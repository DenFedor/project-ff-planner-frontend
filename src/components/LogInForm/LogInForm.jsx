import { Formik, ErrorMessage } from 'formik'
import { AuthNavigate } from '../AuthNavigate/AuthNavigate'
import { LoginAndRegisterButton } from '../LoginAndRegisterButton/LoginAndRegisterButton'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../navigation/routes'
import { loginFormSchema } from '../../utils/schemas'
import {
  ErrorMessageStyled,
  FormStyled,
  Input,
  NameOfFieldStyled,
  Title,
  LabelStyled,
} from '../RegisterForm/RegisterFormStyled'


const initialValues = {
  email: '',
  password: '',
}

export const LogInForm = () => {
  const { t } = useTranslation()

  const handleSubmit = (values, { resetForm }) => {
    console.log(values)
    resetForm()
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginFormSchema}
    >
      <FormStyled autoComplete='off'>
        <Title>{t('Log in')}</Title>
        <LabelStyled>
          <NameOfFieldStyled>{t('Email')}</NameOfFieldStyled>
          <Input type='email' name='email' placeholder={t('Enter email')} />
          <ErrorMessage
            name='email'
            render={(msg) => <ErrorMessageStyled>{t(msg)}</ErrorMessageStyled>}
          />
        </LabelStyled>
        <LabelStyled>
          <NameOfFieldStyled>{t('Password')}</NameOfFieldStyled>
          <Input type='password' name='password' placeholder={t('Enter password')} />
          <ErrorMessage
            name='password'
            render={(msg) => <ErrorMessageStyled>{t(msg)}</ErrorMessageStyled>}
          />
        </LabelStyled>
        <LoginAndRegisterButton text={t('Log In')} />
        <AuthNavigate text={t('Sign Up')} route={ROUTES.REGISTER} />
      </FormStyled>
    </Formik>
  )
}