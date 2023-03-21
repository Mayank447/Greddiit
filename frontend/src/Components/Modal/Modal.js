import PopupElements from "./PopupElements"

export default function Modal({visible=true, onClose, Modal_title}){
    if(!visible) return null

    const handleOnClose=(e)=>{
        if(e.target.id==='container') onClose()
    }

    return(
        <>        
        <div onClick={handleOnClose} className="inset-0 fixed bg-black bg-opacity-10 backdrop-blur-sm justify-center items-center" id="exampleModalScrollable" tabindex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
            <div className="flex overflow-y-auto relative w-1/2 h-4/5 pointer-events-none">
                <div className="border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800">
                        {Modal_title}
                        </h5>
                    <button onClick={onClose} type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close">X</button>
                </div>
                <div className="modal-body relative p-4">
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                    <PopupElements Username="Mayank" remove="UNFOLLOW"/>
                </div>
                {/* <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <a className="justify-start">Mayank</a>
                <button type="button" className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">
                unfollow
                </button>
                </div> */}

                </div>
            </div>
        </div>
        </>
    )
}