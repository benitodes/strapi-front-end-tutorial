import React from 'react'
import { useParams } from 'react-router-dom'
//import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client'

const REVIEW = gql`
query GetReview($id: ID!) {
  review(id: $id) {
    data {
      id
      attributes{
      title,
        rating,
        body
      }
    }
  }
}
`

export default function ReviewDetails() {
  const { id } = useParams()
  //const { loading, error, data } = useFetch('http://localhost:1337/api/reviews/' + id)
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id }
  })


  if (loading) return <p>Loading...</p>
  if (error || data.error) return <p>Error :(</p>

  console.log(data)

  return (
    <div >
      <h3>{data.review.data.attributes.rating}</h3>
      <h2>{data.review.data.attributes.title }</h2>
      <small>Console List</small>
      <p> {data.review.data.attributes.body} </p>
     </div>
  )
}