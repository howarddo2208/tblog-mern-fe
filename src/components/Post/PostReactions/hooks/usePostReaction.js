import { useContext, useState } from 'react'
import { SocketContext } from '../../../../context/socket'
import useHttpClient from '../../../../hooks/useHttpClient'
import { useAuth } from '../../../../stateManagements'
import { checkInArray } from '../../../../utils'

const usePostReaction = (likes, unicorns, bookmarks, id, author) => {
  const { currentUser } = useAuth()
  const currentUserId = currentUser && currentUser.userId
  const { current } = useContext(SocketContext).socket

  const { sendReq } = useHttpClient()

  const [state, setState] = useState({
    isLiked: checkInArray(likes, currentUserId),
    isUnicorned: checkInArray(unicorns, currentUserId),
    isBookmarked: checkInArray(bookmarks, currentUserId),
  })

  const reactOnPost = async (action, postId) => {
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}/${action}`,
        'PUT',
        JSON.stringify({ userId: currentUser.userId, postId }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        }
      )
    } catch (err) {}
  }

  const updateReactionArr = (arr, effect) => {
    if (effect === 'negative') {
      arr.splice(arr.indexOf(currentUser.userId), 1)
    } else {
      arr.push(currentUser.userId)
    }
  }

  const handleReaction = async (action, effect, arr, stateKey) => {
    updateReactionArr(arr, effect)
    if (action === 'like' && current) {
      current.emit('like', {
        like: true,
        sender: currentUser,
        postId: id,
        receiver: author,
      })
    }
    setState((state) => ({ ...state, [stateKey]: !state[stateKey] }))
    reactOnPost(action, id)
  }

  return {
    state,
    handleReaction,
  }
}

export default usePostReaction

