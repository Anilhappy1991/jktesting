import InfoCard from "./ulbInfoCard"

interface UlbAboutData {
  titlePrefix: string
  titleHighlight: string
  // subtitle: string
  paragraphs: string[]
}

const dummyApiData: UlbAboutData = {
  titlePrefix: "Welcome To",
  titleHighlight: "Jammu Municipal Corporation",
  // subtitle: "Affordable Shelter For All",
  paragraphs: [
    "Jammu Municipal Corporation, the erstwhile Jammu Municipality was established after the reforms under taken by Lord Rippan in the first quarter of 19th Century. The Provision of elective element in the Municipalities was introduced in the Year 1930. Next step towards the development of Municipality in the state was the passage of J & K Municipal Act 1941.",
    "In the 51st year of Republic of India, the State Legislature passed the J & K Municipal Corporation Act 2000, giving it status of Jammu Municipal Corporation. With the upgradation to the Status of Jammu Municipal Corporation. The city has been divided into 75 wards with an approximately area of 240 sq. km.",
  ],
}

export default function About() {
  const data = dummyApiData

  return (
    <section className="relative w-full px-4 py-12 sm:px-6 lg:px-10 xl:px-20">
      <div className="relative container mx-auto grid-cols-3 sm:grid">
        {/* ── Left Content Area ── */}
        <div className="relative col-span-2 container mx-auto sm:pr-4 md:pr-8">
          <div className="max-w-4xl py-2">
            <p className="mb-2 text-xs font-semibold tracking-widest text-orange-500 uppercase">
              About Us
            </p>
            <h2 className="text-2xl font-bold text-[#1f4e79] md:text-3xl">
              {data.titlePrefix}{" "}
              <span className="font-bold text-[#1f4e79]">
                {data.titleHighlight}
              </span>
            </h2>

            {/* Subheading */}
            {/* {data.subtitle && (
              <p className="mt-2 text-lg text-gray-600">{data.subtitle}</p>
            )} */}

            {/* Decorative Underline */}
            <div className="mt-3 mb-6 h-[3px] w-12 bg-[#1f4e79]" />

            {/* Dynamic Content Paragraphs */}
            <div className="space-y-4">
              {data.paragraphs.map((text, idx) => (
                <p
                  key={idx}
                  className="text-justify text-[15px] leading-8 text-gray-700 md:text-base"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 mt-8 sm:mt-0">
          <InfoCard />
        </div>
      </div>
    </section>
  )
}
