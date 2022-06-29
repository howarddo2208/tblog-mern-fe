import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Welcome from '../../components/Auth/Welcome'
import ErrorModal from '../../components/Modal/ErrorModal'
import useForm from '../../hooks/useForm'
import { useHttpClient } from '../../hooks/useHttpClient'
import { useAuth } from '../../state'
import { appendData } from '../../utils'
import { loginForm, signupForm } from '../../utils/formConfig'
import './Auth.css'

const Auth = ({ newUser }) => {
  const {
    viewFormInputs: ViewFormInputs,
    viewFormValues: ViewFormValues,
    isFormValid,
    setForm,
  } = useForm(signupForm)

  useEffect(() => {
    if (!newUser) {
      setForm(loginForm)
    } else {
      setForm(signupForm)
    }
  }, [newUser, setForm])

  const formValues = ViewFormValues()
  const formInputs = ViewFormInputs()

  const { login } = useAuth()
  const history = useHistory()

  const { sendReq, error, clearError } = useHttpClient()

  const handleAuthSubmit = async (evt) => {
    evt.preventDefault()
    try {
      let responseData
      if (newUser) {
        const formData = appendData(formValues)
        responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/signup`,
          'POST',
          formData
        )
      } else {
        responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/login`,
          'POST',
          JSON.stringify(formValues),
          {
            'Content-Type': 'application/json',
          }
        )
      }
      login(responseData.user)
      history.push('/')
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div className="container container-auth">
        <Welcome />

        <form className="form__auth">
          <div className="form__options">
            <h2>
              {newUser
                ? 'Create a New Account'
                : 'Log in using an Existing Account'}
            </h2>
            {formInputs}

            <button
              onClick={handleAuthSubmit}
              className="btn btn__auth btn__auth--mode"
              disabled={!isFormValid()}
            >
              {newUser ? 'Create account' : 'Login'}
            </button>
            <Link
              className="btn btn__auth btn__auth--switch"
              to={newUser ? '/auth' : '/auth/new-user'}
            >
              {newUser ? 'Login' : 'Create account'}
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Auth

