import { ReactPropTypes } from "react"

export default function FormButton(props){
    return(
        <>
            <button
                type={props.action || 'submit'}
                className="group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                onClick={props.handleSubmit}
                disabled={props.isDisabled}
            >
            {props.text}
            </button>
        </>
    )
}

FormButton.defaultProps={
    type:"submit",
    disabled:true
}