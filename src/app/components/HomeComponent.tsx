import { Great_Vibes, Poppins } from 'next/font/google'
import FeatureMapSection from './home/FeatureMapSection'
import HeroSection from './home/HeroSection'
import JourneySection from './home/JourneySection'
import DestinationHighlightsSection from './home/DestinationHighlightsSection'
import OnlineStoreSection from './home/OnlineStoreSection'
import PostVariationsSection from './home/PostVariationsSection'

const handwritten = Great_Vibes({ subsets: ['latin'], weight: '400' })
const bodyFont = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

export default function HomeComponent() {
  return (
    <main className={`${bodyFont.className} bg-[#f7f2ea] text-[#3f3d3b]`}>
      <HeroSection scriptFontClass={handwritten.className} />
      <DestinationHighlightsSection />
      <OnlineStoreSection />
      <FeatureMapSection />
      <PostVariationsSection />
      <JourneySection />
    </main>
  )
}
