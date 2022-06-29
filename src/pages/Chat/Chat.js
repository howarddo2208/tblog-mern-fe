// import { useEffect } from 'react'
// import Talk from 'talkjs'
// import { useAuth } from '../../state'

// const InboxComponent = () => {
//   const {currentUser} = useAuth()
//   useEffect(() => {
//     Talk.ready.then(() => {
//       var me = new Talk.User({
//         id: currentUser.id,
//         name: currentUser.name,
//         email: currentUser.email,
//         photoUrl: currentUser.photo,
//         welcomeMessage: 'Hey there! How are you? :-)',
//         role: 'default',
//       });
//     });
//   }, [])
// }

// export default Chat


import React from 'react'

function Chat() {
  return (
    <div>Chat</div>
  )
}

export default Chat