import React, { useContext, useState } from 'react'
import { useHttpClient } from '../../hooks/useHttpClient'
import useForm from '../../hooks/useForm'
import { AuthContext } from '../../context/auth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { newPostForm } from '../../utils/formConfig'
import { appendData, renderRepeatedSkeletons } from '../../utils'
import ErrorModal from '../../components/Modal/ErrorModal'
import SkeletonElement from '../../components/Skeleton/SkeletonElement'
import Layout from '../../components/Layout'
import { classifyToxicity } from '../../utils/toxicClassify'
import { toast } from 'react-toastify'

const NewPost = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { currentUser } = auth
  const { isLoading, sendReq, error, clearError } = useHttpClient()
  const { renderFormInputs, renderFormValues, isFormValid } =
    useForm(newPostForm)
  const formValues = renderFormValues()
  const formInputs = renderFormInputs()
  const [submitting, setSubmitting] = useState(false)

  const postSubmitHandle = async (evt) => {
    setSubmitting(true)
    evt.preventDefault() //otherwise, there will be a reload
    const formData = appendData(formValues)
    const body = formData.get('body')
    const title = formData.get('title')

    const predictions = await classifyToxicity(`${title} ${body}`)
    if (predictions[6].results[0].match) {
      toast.error('This post contains toxic content!')
      setSubmitting(false)
      return
    }

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
            <h2>Create a new post</h2>
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

