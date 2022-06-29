import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Tags from './components/Tags/Tags'
import Chat from './pages/Chat/Chat'
import EditPost from './pages/EditPost/EditPost'
import EditUserProfile from './pages/EditUserProfile/EditUserProfile'
import Home from './pages/Home/Home'
import NewPost from './pages/NewPost/NewPost'
import Notifications from './pages/Notifications/Notifications'
import Post from './pages/Post/Post'
import ReadingList from './pages/ReadingList/ReadingList'
import SearchResults from './pages/SearchResults/SearchResults'
import Tag from './pages/Tag/Tag'
import UserProfile from './pages/UserProfile/UserProfile'
import { useAuth } from './state'
import Auth from './pages/Auth/Auth'
import Layout from './components/Layout'

const MainRouter = ({ token }) => {
  const { isLoggedIn } = useAuth()
  return (
    <Router>
      <Layout>
        {isLoggedIn ? (
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
            <Route path="/auth" exact>
              <Auth newUser={false} />
            </Route>
            <Redirect to="/auth" />
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
            <Redirect to="/auth" />
          </Switch>
        )}
      </Layout>
    </Router>
  )
}

export default MainRouter

