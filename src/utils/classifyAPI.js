import { imageIsExplicit } from "./detect"

export const sendClassifyRq = async (postId, isToxic, part) => {
  try {
    await fetch(`${process.env.REACT_APP_BASE_URL}/posts/classify${part}`,
      {
        method: 'POST',
        body: JSON.stringify({ postId, isToxic }),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  } catch (err) {
    alert('Error while sending request to server')
  }
}

