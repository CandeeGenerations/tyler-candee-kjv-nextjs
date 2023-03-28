import React from 'react'
import Post from './post'
import {GridLayoutContext} from './gridLayout'
import {PostsContext} from '../../../pages'

const HomePosts = ({posts = null, single = false}) => {
  const postsContext = React.useContext(PostsContext)
  const {layout} = React.useContext(GridLayoutContext)

  if (posts === null) {
    posts = postsContext.posts
  }

  if (single) {
    return (
      <div className="grid grid-cols-1 gap-6 px-4 space-y-6">
        {posts.map((post, index) => (
          <Post key={index} data={post} single />
        ))}
      </div>
    )
  }

  if (layout === 'rows') {
    return (
      <div className="grid grid-cols-2 gap-6 lg:gap-0 lg:px-0 px-4">
        {posts.map((post, index) => (
          <Post key={index} data={post} full />
        ))}
      </div>
    )
  }

  const postPairs = posts.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2))
    }

    return result
  }, [])

  return postPairs.map((post, index) => {
    const isEven = index % 2 !== 0
    const isOdd = index % 2 !== 1

    return (
      <div
        key={index}
        className="grid lg:grid-cols-3 grid-cols-2 gap-6 mb-16 lg:px-0 px-4"
      >
        <Post data={post[0]} narrow={isEven} />
        {post.length > 1 && <Post data={post[1]} narrow={isOdd} />}
      </div>
    )
  })
}

export default HomePosts
