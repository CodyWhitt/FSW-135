import React, {useState, useEffect} from 'react'
import IssueList from './IssueList.js'
import axios from 'axios'

export default function Public(){
  const [issues, setIssues] = useState('')

  useEffect(() => {
    async function getIssuesData() {
      await axios.get('/issue')
        .then(res => {
          setIssues(res.data)
        })
      } getIssuesData()
  }, [])
  
  return (
    <div className="public">
      <IssueList issues={issues}/>
    </div>
  )
}