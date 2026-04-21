import UlbHeaderBottom from "./ulbHeaderBottom"
import { HeaderMidSection } from "./ulbHeaderMid"
import HeaderTopSection from "./ulbHeaderTop"

const UlbHeader = () => {
  return (
    <div>
      <HeaderTopSection leftText="JAMMU MUNICIPAL CORPORATION" />
      <HeaderMidSection
        leftLogoSrc="/images/jmc-logo.jpg"
        leftLogoAlt="JMC Logo"
        title1="जम्मू नगर निगम"
        title2="JAMMU MUNICIPAL CORPORATION"
        subtitle="keen to serve you better..."
      />

      <UlbHeaderBottom />
    </div>
  )
}

export default UlbHeader
