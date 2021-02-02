import React from 'react'
import {TagsContext} from '../../../pages/tags'
import Headings from '../../postComponents/headings'
import Post from '../home/post'
import ButtonLink from '../../buttonLink'
import styled from '@emotion/styled'
import Star from '../../icons/star'

const TagsPage = () => {
  const {tags} = React.useContext(TagsContext)
  const [selectedTag, setSelectedTag] = React.useState(tags[0])

  return (
    <div className="grid grid-cols-3 mt-24 mx-10 md:mx-0">
      <div className="hidden md:block">
        <Headings.h2>Tags</Headings.h2>

        <ul className="mt-12">
          {tags.map((tag, index) => (
            <TagItem
              key={index}
              className={`flex items-center px-4 py-2 mr-14 rounded-lg cursor-pointer ${
                tag.id === selectedTag.id ? 'selected' : ''
              }`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag.featured && (
                <div className="mr-1">
                  <Star />
                </div>
              )}
              {tag.tag}
            </TagItem>
          ))}
        </ul>
      </div>

      <div className="col-span-3 block md:hidden mb-12">
        <div className="flex flex-row items-center">
          <label className="mr-4 font-bold">Selected Tag:</label>

          <Dropdown
            className="rounded-full py-2 pl-6 pr-8"
            onChange={(e) => setSelectedTag(tags[e.target.value])}
          >
            {tags.map((tag, index) => (
              <option value={index} key={index}>
                {tag.tag}
              </option>
            ))}
          </Dropdown>
        </div>
      </div>

      <div className="col-span-3 md:col-span-2">
        <Headings.h2>{selectedTag.tag}</Headings.h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 my-12">
          {selectedTag.posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>

        <ButtonLink href={`/tags/${selectedTag.slug}`}>
          View More Posts
        </ButtonLink>
      </div>
    </div>
  )
}

const TagItem = styled.li`
  background-color: #f1f1f1;
  border: 1px solid #dddddd;
  transition: all 0.25s ease-in-out;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  &:hover {
    color: #6166dc;

    svg {
      fill: #6166dc !important;
      transition: all 0.25s ease-in-out;
    }
  }

  &.selected {
    color: #6166dc;
    background-color: #fff;
    border: 1px solid #6166dc;

    svg {
      fill: #6166dc !important;
    }
  }
`

const Dropdown = styled.select`
  border: 1px solid #dddddd;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent
    url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")
    no-repeat;
  background-position-x: 97%;
  background-position-y: 8px;
`

export default TagsPage
