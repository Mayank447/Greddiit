export default function ForumInput({label, type, handleChange, id, placeholder, value, isRequired}){
  return (
    <>
    <div className="relative mb-5" data-te-input-wrapper-init>
      {label}
      <input type={type} className="peer block min-h-[auto] w-full rounded border-2 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-60"
        id={id} onChange={handleChange} placeholder={placeholder} value={value} required={isRequired}/>

      {/* <label for="exampleInputEmail1" className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[1.4rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-black">
        Email address</label> */}
    </div>
    </>
  )
}