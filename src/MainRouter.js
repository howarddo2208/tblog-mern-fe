import React, { useContext, useEffect } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import NewPost from './pages/NewPost/NewPost'
import EditPost from './pages/EditPost/EditPost'
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import UserProfile from './pages/UserProfile/UserProfile'
import EditUserProfile from './pages/EditUserProfile/EditUserProfile'
import Notifications from './pages/Notifications/Notifications'
import Tags from './components/Tags/Tags'
import Tag from './pages/Tag/Tag'
import Post from './pages/Post/Post'
import SearchResults from './pages/SearchResults/SearchResults'
import ReadingList from './pages/ReadingList/ReadingList'
import { AuthContext } from './context/auth'
import { BrowserRouter as Router } from 'react-router-dom'
import Chat from './pages/Chat/Chat'

const MainRouter = ({ token }) => {
  const authContext = useContext(AuthContext)
  useEffect(() => {
    console.log('authContext', authContext)
  }, [authContext])
  return (
    <Router>
      {authContext.isLoggedIn ? (
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/users/:userId" exact>
            <UserProfile />
          </Route>
          <Route path="/users/:userId/edit" exact>
            <EditUserProfile />
          </Route>
          <Route path="/users/:userId/readinglist" exact>
            <ReadingList />
          </Route>
          <Route path="/users/:userId/notifications" exact>
            <Notifications />
          </Route>
          <Route path="/tags" exact>
            <Tags />
          </Route>
          <Route path="/tags/:tagName" exact>
            <Tag />
          </Route>
          <Route path="/search/" exact>
            <SearchResults />
          </Route>
          <Route path="/posts/new" exact>
            <NewPost />
          </Route>
          <Route path="/posts/:titleURL/:postId" exact>
            <Post />
          </Route>
          <Route path="/posts/:titleURL/:postId/edit" exact>
            <EditPost />
          </Route>
          <Route path="/chat" exact>
            <Chat />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth/new-user" exact>
            <Auth newUser={true} />
          </Route>
          <Route path="/auth" exact>
            <Auth newUser={false} />
          </Route>
          <Route path="/tags" exact>
            <Tags />
          </Route>
          <Route path="/tags/:tagName" exact>
            <Tag />
          </Route>
          <Route path="/search/" exact>
            <SearchResults />
          </Route>
          <Route path="/users/:userId" exact>
            <UserProfile />
          </Route>
          <Route path="/posts/:titleURL/:postId" exact>
            <Post />
          </Route>
        </Switch>
      )}
    </Router>
  )
}

export default MainRouter

