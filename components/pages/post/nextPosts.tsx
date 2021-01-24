import React from 'react'
import {PostContext} from '../../../pages/[slug]'
import Post from '../home/post'

const NextPosts = () => {
  const {nextPosts} = React.useContext(PostContext)
  const postPairs = nextPosts.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2))
    }

    return result
  }, [])

  return postPairs.map((post, index) => {
    const isEven = index % 2 !== 0
    const isOdd = index % 2 !== 1

    return (
      <div key={index} className="grid lg:grid-cols-3 grid-cols-1 gap-6 mb-16">
        <Post data={post[0]} narrow={isEven} />

        {post.length > 1 && (
          <Post className="lg:block hidden" data={post[1]} narrow={isOdd} />
        )}
      </div>
    )
  })
}

export default NextPosts
