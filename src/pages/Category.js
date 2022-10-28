import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORY = gql`
query GetCategory($id: ID!) {
  category(id: $id) {
    data {
      id
      attributes {
        name
        reviews {
          data {
            id
            attributes {
              rating
              title
              body
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
    }
  }
}
`
export default function Category() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error || data.error) return <p>Error :(</p>

  return (
    <div>
      <h2>{ data.category.data.attributes.name }</h2>
      { data.category.data.attributes.reviews.data.map(review => (
        <div key={ review.attributes.id } className="review-card">
          <div class className="rating">{ review.attributes.rating }</div>
          <h2>{ review.attributes.title }</h2>
          
          { review.attributes.categories.data.map(category => (
            <small key={ category.id }>{ category.attributes.name }</small>
          ))}
         
          <p>{review.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}