import React,{useContext} from 'react'
import CreateGreddiitButton from './CreationForm/CreateGreddiitButton'
import SubGreddiitComponent from './SubGreddiitComponent'
import MySubGreddiitContext from '../../Context/MySubGreddiitContext'

export default function MySubGreddiits() {
  
  const {MySubGreddiitList}=useContext(MySubGreddiitContext)
  
  return (
  <>
    <CreateGreddiitButton />
    {MySubGreddiitList? MySubGreddiitList.map((subreddit)=>
      <SubGreddiitComponent 
        key={subreddit._id}
        id={subreddit._id} 
        name={subreddit.name}
        description={subreddit.description}
        number_of_people={subreddit.number_of_people}
        number_of_posts={subreddit.number_of_posts}
        banned_keywords={subreddit.banned_keywords}
        tags={subreddit.tags}
      />
    ):null}
    <br></br>
  </>
  )
}
