export default function EditProfileElement({Label, placeholder, type, id, value, handleChange}) {
  
  return (
    <>
    <div className="flex items-center border-b py-2">
    <span className="flex-shrink-0 text-sm text-black py-1 px-2 rounded">
      {Label}
    </span>
    <input className="peer appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
    id={id} onChange={handleChange} type={type} placeholder={placeholder} value={value} required aria-label="Full name"></input>
    {/* <p className="invisible peer-invalid:visible text-red-700 font-light">This field is required</p> */}
  </div>
    </>
  )
}
