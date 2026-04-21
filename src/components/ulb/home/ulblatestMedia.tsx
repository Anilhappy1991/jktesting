const LatestMedia = () => {
  return (
    <div className="socialmedia">
      <h2 className="mb-2 text-2xl font-bold text-white">Latest Media</h2>
      <div className="h-auto overflow-auto sm:h-[400px]">
        <img
          src="/images/latestmedia.png"
          alt="Latest Media"
          className="h-auto w-full object-cover shadow-md"
        />
      </div>
    </div>
  )
}

export default LatestMedia
