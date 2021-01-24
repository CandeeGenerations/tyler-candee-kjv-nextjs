import React from 'react'
import styled from '@emotion/styled'
import {range} from '../../helpers'
import PageButton from './pageButton'

const Pagination = ({context, route = '', center = false}) => {
  const {count, page} = React.useContext(context)
  const parentRoute = route ? `/${route}` : ''

  if (count <= 6) {
    return null
  }

  // current === page
  // count === pages
  // maxPages === 3
  const pages = Math.ceil(count / 6)
  const maxPages = 3

  // `page` is the page we're on
  // We want to show `page` - 1, `page`, `page` + 1
  // Of course if we're on page 1, we don't want a page 0
  const previousPage = page === 1 ? page : page - 1

  // Now create a range of numbers from the previousPage to the total pages (`pages`)
  const pagesRange = range(previousPage, pages + 1 - previousPage)

  // We might need to truncate that pagesRange if it's
  // more than the max pages we wish to display (3)
  const truncatedRange: Array<number | null> = pagesRange.slice(0, maxPages)

  // Throughout this function we might add a null to our pages range.
  // When it comes to rendering our range if we find a null we'll add a spacer.

  // We might need a spacer at the start of the pagination e.g. 1 ... 3 4 5 etc.
  // If we're after the second page, we need a ... spacer (3 and up)
  if (pagesRange[0] > 2) {
    truncatedRange.unshift(null)
  }

  // If we're after the first page, we need page 1 to appear (2 and up)
  if (pagesRange[0] > 1) {
    truncatedRange.unshift(1)
  }

  // If we're on the final page, then there won't be a "next" page and
  // the pagination will end up looking a bit short (e.g. on 8 pages ... 7, 8)
  // Push to the end an extra page maxPages from the end
  if (pagesRange[0] + 1 === pages && pagesRange[0] - 1 > 0) {
    truncatedRange.splice(
      pagesRange.length - 1 - maxPages,
      0,
      pagesRange[0] - 1,
    )
  }

  // We might need a spacer at the end of the pagination e.g. 4 5 6 ... 8
  // If we're before the penultimate page, we need a ... spacer
  if (pagesRange[0] + maxPages < pages) {
    truncatedRange.push(null)
  }

  // If we're before the last page, we need page <last> to appear
  if (pagesRange[0] + maxPages - 1 < pages) {
    truncatedRange.push(pages)
  }

  const pagesSet = [...new Set(truncatedRange)]

  return (
    <div className={`mt-24 lg:px-0 px-4 ${center ? 'text-center' : ''}`}>
      <PaginationWrapper className="relative inline-flex items-center">
        {page > 1 && (
          <PageButton
            href={`${parentRoute}${page - 1 === 1 ? '/' : `/page/${page - 1}`}`}
            number={false}
          >
            Prev
          </PageButton>
        )}

        {pagesSet.map((p: number | null, i) =>
          p === null ? (
            // If you find a null in the truncated array then add a spacer
            <Spacer
              key={`spacer_${i}`}
              className="opacity-30 leading-none items-center justify-center tabular-nums lg:inline-block hidden"
            />
          ) : (
            // Otherwise render a PageButton
            <PageButton
              key={`link_${p}`}
              style={{opacity: page === p ? 1 : 0.3}}
              href={p === 1 ? `${parentRoute}/` : `${parentRoute}/page/${p}`}
              className="lg:inline-block hidden"
            >
              {p}
            </PageButton>
          ),
        )}

        <span className="inline-block lg:hidden">
          {page} of {pages}
        </span>

        {page < pages && (
          <PageButton href={`${parentRoute}/page/${page + 1}`} number={false}>
            Next
          </PageButton>
        )}
      </PaginationWrapper>
    </div>
  )
}

const PaginationWrapper = styled.nav`
  z-index: 1;
`

const Spacer = styled.span`
  color: #000;

  @media (min-width: 1024px) {
    display: block;
    width: auto;
    height: auto;
    padding: 2rem 2rem 2rem 0;

    &:before {
      content: '...';
    }
  }
`

export default Pagination
