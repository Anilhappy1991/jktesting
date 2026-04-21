import HeaderBottom from "./headerBottom"
import { HeaderMidSection } from "./headerMid"
import HeaderTopSection from "./headerTop"

const Header = () => {
  return (
    <div>
      <HeaderTopSection />
      <HeaderMidSection />
      <HeaderBottom />
    </div>
  )
}

export default Header
