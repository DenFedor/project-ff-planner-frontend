import { RegisterForm } from './components/RegisterForm'
import { gooseTrackImage, gooseTrackImage2x } from '../../assets/images'
import { GooseImage } from './components/GooseImage'
import { Wrapper } from './Wrapper.styled'

const RegisterPage = ({}) => {
  return (
    <Wrapper>
      <GooseImage image1x={gooseTrackImage} image2x={gooseTrackImage2x} text='image of goose' />
      <RegisterForm />
    </Wrapper>
  )
}

export default RegisterPage