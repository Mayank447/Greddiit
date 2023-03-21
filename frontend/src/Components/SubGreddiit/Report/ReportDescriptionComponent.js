export default function ReportDescriptionComponent({header, text}) {
  return (
    <>
        <h5 className="mb-2 pt-1 font-medium leading-tight text-neutral-800">
            {header}
        </h5>
        <p className="mb-2 max-h-24 overflow-y-scroll text-base text-neutral-600">
            {text}
        </p>
    </>
  )
}
