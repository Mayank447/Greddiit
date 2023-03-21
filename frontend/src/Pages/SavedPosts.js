import React,{useState, useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar';
import SavedPostContext from '../Context/SavedPostContext'
import LoadSavedPosts from '../actions/LoadSavedPosts';
import SavedPostslist from '../Components/SavedPosts/SavedPostsList';

export default function SavedPosts() {

    const [PostsSaved,updatePostsSaved]=useState({})
    const [loading,changeLoading]=useState(true)

    useEffect(()=>{
        const func = async () => {
            LoadSavedPosts()
            updatePostsSaved(JSON.parse(sessionStorage.getItem("savedposts")))
            changeLoading(false);            
        };
        func();
    },[])

    if(loading) return <div>Loading...</div>

  return (
    <>
      <Navbar />
      <SavedPostContext.Provider value={{PostsSaved, updatePostsSaved}}>
        <SavedPostslist />
      </SavedPostContext.Provider>
    </>
  )
}
