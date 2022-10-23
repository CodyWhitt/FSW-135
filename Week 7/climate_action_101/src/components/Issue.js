import React from 'react'

export default function Issue(props){
  const { title, description} = props
  return (
    <div className="issue">
      <h1>{ title }</h1>
      <p>{ description }</p>
    </div>
  )
}