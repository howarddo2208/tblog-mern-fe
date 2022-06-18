import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import ErrorModal from '../../components/Modal/ErrorModal'
import SkeletonForm from '../../components/Skeleton/SkeletonForm'
import { AuthContext } from '../../context/auth'
import useForm from '../../hooks/useForm'
import { useHttpClient } from '../../hooks/useHttpClient'
import { appendData } from '../../utils'
import { editPostForm, prefillEditPostForm } from '../../utils/formConfig'

const EditPost = () => {
  const { sendReq, isLoading, error, clearError } = useHttpClient()
  const { currentUser } = useContext(AuthContext)
  const [loadedPost, setLoadedPost] = useState({})
  const { postId, titleURL } = useParams()
  const history = useHistory()
  const {
    viewFormInputs: viewFormInputs,
    viewFormValues: viewFormValues,
    setForm,
    isFormValid,
  } = useForm(editPostForm)
  let formValues = viewFormValues()
  let formInputs = viewFormInputs()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/${titleURL}/${postId}`
        )
        prefillEditPostForm(responseData.post)
        if (currentUser.userId !== responseData.post.author.id) {
          history.push('/')
        }
        setLoadedPost(responseData.post)
        await setForm(editPostForm)
      } catch (err) {}
    }
    fetchPost()
  }, [sendReq, postId, titleURL, setForm, currentUser, history])

  const postSubmitHandle = async (evt) => {
    evt.preventDefault()
    const formData = appendData(formValues)
    formData.append('author', currentUser.userId)
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts/${titleURL}/${postId}`,
        'PATCH',
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      )
      history.push(`/posts/${titleURL}/${postId}`)
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />

      <Layout>
        {isLoading ? (
          <SkeletonForm />
        ) : (
          <form className="form form__edit">
            <h2>Edit Post</h2>
            {!isLoading && loadedPost.image && loadedPost.body && formInputs}
            <button
              type="button"
              onClick={postSubmitHandle}
              className="btn btn-submit"
              disabled={!isFormValid()}
            >
              Update Post
            </button>
          </form>
        )}
      </Layout>
    </>
  )
}

export default EditPost

