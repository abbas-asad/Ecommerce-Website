interface loadingMessageProp {
  paraName: string;
}

const Loadingmessage = (props: loadingMessageProp) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-[30vh] text-center">
      <p className="text-gray-500">Loading your {props.paraName}...</p>
    </div>
  )
}

export default Loadingmessage