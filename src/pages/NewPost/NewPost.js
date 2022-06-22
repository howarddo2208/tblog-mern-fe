import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import ErrorModal from '../../components/Modal/ErrorModal'
import SkeletonElement from '../../components/Skeleton/SkeletonElement'
import useForm from '../../hooks/useForm'
import { useHttpClient } from '../../hooks/useHttpClient'
import { useAuth } from '../../stateManagements'
import { appendData, renderRepeatedSkeletons } from '../../utils'
import { newPostForm } from '../../utils/formConfig'

const NewPost = () => {
  const auth = useAuth()
  const history = useHistory()
  const { currentUser } = auth
  const { isLoading, sendReq, error, clearError } = useHttpClient()
  const {
    viewFormInputs: renderFormInputs,
    viewFormValues: renderFormValues,
    isFormValid,
  } = useForm(newPostForm)
  const formValues = renderFormValues()
  const formInputs = renderFormInputs()
  const [submitting, setSubmitting] = useState(false)

  const postSubmitHandle = async (evt) => {
    setSubmitting(true)
    evt.preventDefault() //otherwise, there will be a reload
    const formData = appendData(formValues)
    const body = formData.get('body')
    const title = formData.get('title')

    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      )
      history.push('/')
      setSubmitting(false)
    } catch (err) {}
  }

  return (
    <Layout>
      <ErrorModal error={error} onClose={clearError} />
      {isLoading ? (
        renderRepeatedSkeletons(<SkeletonElement type="text" />, 20)
      ) : (
        <>
          <form className="form form__create">
            <h1>Create a new post</h1>
            {formInputs}
            {submitting ? (
              <button className="btn btn--primary" disabled>
                Submitting...
              </button>
            ) : (
              <button
                onClick={postSubmitHandle}
                style={{
                  backgroundColor: isFormValid() ? '#4caf50' : '#e0e0e0',
                  height: '40px',
                  borderRadius: '5px',
                  width: '100%',
                  border: 'none',
                }}
                disabled={!isFormValid()}
              >
                Submit <span>&rarr;</span>
              </button>
            )}
          </form>
        </>
      )}
    </Layout>
  )
}

export default NewPost

