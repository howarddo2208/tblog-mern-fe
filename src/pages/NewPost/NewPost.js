import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ErrorModal from '../../components/Modal/ErrorModal'
import { useHttpClient } from '../../hooks/useHttpClient'
import { useAuth } from '../../stateManagements'
import { TextField } from '@mui/material'

const NewPost = () => {
    const auth = useAuth()
    const history = useHistory()
    const { currentUser } = auth
    const { isLoading, sendReq, error, clearError } = useHttpClient()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    const [submitting, setSubmitting] = useState(false)

    // const postSubmitHandle = async (evt) => {
    //   setSubmitting(true)
    //   evt.preventDefault()
    //   console.log('value')
    //   // const formData = appendData(formValues)
    //   // formData.append('author', currentUser.userId)

    //   // try {
    //   //   await sendReq(
    //   //     `${process.env.REACT_APP_BASE_URL}/posts`,
    //   //     'POST',
    //   //     formData,
    //   //     {
    //   //       Authorization: `Bearer ${currentUser.token}`,
    //   //     }
    //   //   )
    //   //   history.push('/')
    //   // } catch (err) {
    //   //   console.log('err', err)
    //   // } finally {
    //   //   setSubmitting(false)
    //   // }
    // }

    return (
        <>
            <ErrorModal error={error} onClose={clearError} />
            {!isLoading && (
                <>
                    <form
                        onSubmit={handleSubmit()}
                        className="form form__create"
                    >
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                    </form>
                </>
            )}
        </>
    )
}

export default NewPost
