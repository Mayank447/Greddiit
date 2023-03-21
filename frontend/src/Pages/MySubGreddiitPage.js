import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SubGreddiitList from '../Components/MySubGreddiits/SubGreddiitList'
import MySubGreddiitContext from '../Context/MySubGreddiitContext'
import LoadMySubGreddiits from '../actions/LoadMySubGreddiits';

export default function MySubGreddiitPage() {
  
  const [MySubGreddiitList,setMySubGreddiitList]=useState([]);
  const [loading,changeLoading]=useState(true)

  const func = async () => {
      await LoadMySubGreddiits()
      setMySubGreddiitList(JSON.parse(sessionStorage.getItem("mysubgreddiit")))
      changeLoading(false);           
  };

  useEffect(()=>{
    func();
  },[])

  if (loading) return <>Loading...</>
  
  return (
    <>
      <div className='bg-gray-200 h-full w-full'>      
      <Navbar />
      <MySubGreddiitContext.Provider value={{MySubGreddiitList,setMySubGreddiitList}}>
        <SubGreddiitList />
      </MySubGreddiitContext.Provider>
      </div>
    </>
  )
}
