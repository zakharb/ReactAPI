import React, {useMemo} from 'react'

export const useSortedComment = (comments, sort) => {

  const sortedComments = useMemo(() => {
    if(sort) {
      return [...comments].sort((a,b) => a[sort].localeCompare(b[sort]))
    }
    return comments;
  }, [sort, comments])

  return sortedComments
}

export const useComments = (comments, sort, query) => {
  const sortedComments = useSortedComment(comments, sort)
  const sortedAndSearchedComments = useMemo(() => {
    return sortedComments.filter(comment => comment.value.toLowerCase().includes(query.toLowerCase()))
  }, [query, sortedComments])

  return sortedAndSearchedComments
}