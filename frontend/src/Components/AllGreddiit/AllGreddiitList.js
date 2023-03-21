import React,{useContext} from 'react'
import GreddiitsContext from '../../Context/GreddiitsContext'
import GreddiitJoinedComponent from './GreddiitJoinedComponent'
import GreddiitModeratorComponent from './GreddiitModeratorComponent'
import GreddiitViewerComponent from './GreddiitViewerComponent'

export default function AllGreddiitList() {
  
  const Greddiits=JSON.parse(sessionStorage.getItem("all-greddiits"))
  
  return (
  <>
    {Greddiits.moderator.sub_greddiit ? Greddiits.moderator.sub_greddiit.map((subreddit)=>
      <GreddiitModeratorComponent 
        key={subreddit._id}
        id={subreddit._id} 
        name={subreddit.name}
        description={subreddit.description}
        number_of_people={subreddit.number_of_people}
        number_of_posts={subreddit.number_of_posts}
        banned_keywords={subreddit.banned_keywords}
      />
    ):null}
    {Greddiits.joined.greddiit ? Greddiits.joined.greddiit.map((subreddit)=>
      <GreddiitJoinedComponent 
        key={subreddit._id}
        id={subreddit._id} 
        name={subreddit.name}
        description={subreddit.description}
        number_of_people={subreddit.number_of_people}
        number_of_posts={subreddit.number_of_posts}
        banned_keywords={subreddit.banned_keywords}
      />
    ):null}
    {Greddiits.greddiits ? Greddiits.greddiits.map((subreddit)=>
      <GreddiitViewerComponent 
        key={subreddit._id}
        id={subreddit._id} 
        name={subreddit.name}
        description={subreddit.description}
        number_of_people={subreddit.number_of_people}
        number_of_posts={subreddit.number_of_posts}
        banned_keywords={subreddit.banned_keywords}
      />
    ):null}
  </>
  )
}
