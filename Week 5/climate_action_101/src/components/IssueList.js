import React from 'react'
import Issue from './Issue.js'

export default function issuesList(props){
  const { issues } = props
  return (
    <div className="issue-list">

      THIS PART OF THE SITE IS STILL UNDER MAINT.
      { issues.map(issue => <Issue {...issue} key={issue._id}/>) }
    </div>
  )
}