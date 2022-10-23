import React from 'react'
import Issue from './Issue.js'

export default function issuesList(props){
  const { issues } = props
  console.log(issues)

  if (issues != ''){
    return (
      <div className="issue-list">
        { issues.map(issue => <Issue {...issue} key={issue._id}/>) }
      </div>
    )
  }
}