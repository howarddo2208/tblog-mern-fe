import React, { useContext, useMemo } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import useForm from '../../hooks/useForm';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { newPostForm } from '../../utils/formConfig';
import { appendData, renderRepeatedSkeletons } from '../../utils';
import ErrorModal from '../../components/Modal/ErrorModal';
import SkeletonElement from '../../components/Skeleton/SkeletonElement';
import { useAuth } from '../../state';

const NewPost = () => {
  const auth = useAuth()
  const history = useHistory();
  const { currentUser } = auth;
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { viewFormInputs, viewFormValues, isFormValid } =
    useForm(newPostForm);
  const formValues = useMemo(() => viewFormValues(), [viewFormValues]);
  const formInputs = useMemo(() => viewFormInputs(), [viewFormInputs]);

  const postSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    const formData = appendData(formValues);
    formData.append('author', currentUser.userId);
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      {isLoading ? (
        renderRepeatedSkeletons(<SkeletonElement type='text' />, 20)
      ) : (
        <div className='container-create-page'>
          <form className='form form__create'>
            <h2>Create a new post</h2>
            {formInputs}
            <button
              onClick={postSubmitHandle}
              className='btn'
              disabled={!isFormValid()}
            >
              Submit <span>&rarr;</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewPost;
