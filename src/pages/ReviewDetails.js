import React from 'react'
import { useParams } from 'react-router-dom'
//import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

const REVIEW = gql`
query GetReview($id: ID!) {
  review(id: $id) {
    data {
      id
      attributes{
      title,
        rating,
        body,
        categories {
          data {
            id
            attributes {
              name
            }
          }
        } 
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

  //console.log(data)

  return (
    
    <div className = "review-card">
      <div className = "rating">{data.review.data.attributes.rating}</div>
      <h2>{data.review.data.attributes.title }</h2>

      { data.review.data.attributes.categories.data.map(category => (
            <small key={ category.id }>{ category.attributes.name }</small>
          ))}
      
      <ReactMarkdown children= { data.review.data.attributes.body } />
    </div>
  )
}