import AllGreddiitTextComponent from './AllGreddiitTextComponent'
import AllGreddiitNumberComponent from './AllGreddiitNumberComponent'
import JoinGreddiit from '../../actions/JoinGreddiit'
import {useContext} from 'react'
import GreddiitsContext from '../../Context/GreddiitsContext'

export default function GreddiitViewerComponent({id, name, description, number_of_people, number_of_posts, banned_keywords}) {

  const Greddiits=JSON.parse(sessionStorage.getItem("all-greddiits"))

  const Joingreddiit=async()=>{
    await JoinGreddiit({id});
  }

  return (
    <>
        <div className="flex justify-center mx-4 my-8">
        <div className="block w-11/12 rounded-lg shadow-lg bg-white">
            
          <div className="border-b-2 border-neutral-200 py-3 px-6">
            <h5 className="mb-1 text-xl font-medium leading-tight text-neutral-800">
            {name}
            </h5>
          </div>

          <div className="p-3">
            <AllGreddiitTextComponent header="Description:"
            text={description}/>
            <AllGreddiitTextComponent header="Banned Keywords:" text={banned_keywords} />
            <AllGreddiitNumberComponent header="No. of members" text={number_of_people} />
            <AllGreddiitNumberComponent header="No. of posts" text={number_of_posts} />
            
          </div>
          
          <div className="justify-left border-t-2 border-neutral-200 py-3 px-6">
            <button type="button" className="inline-block rounded mr-5 bg-red-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              onClick={Joingreddiit}>
                Join
            </button>
          </div>
        </div>
        </div>
    </>
  )
}
