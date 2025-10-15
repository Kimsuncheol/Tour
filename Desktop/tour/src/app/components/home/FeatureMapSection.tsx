import Image from 'next/image'

export default function FeatureMapSection() {
  return (
    <section className="border-t border-white/70 bg-white py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-20 px-6 md:grid-cols-2 md:px-10">
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-[460px] rounded-[34px] border border-[#efe6dc] bg-white p-6 shadow-2xl shadow-[#d5c8ba]/50">
            <Image
              src="/home/world-map.jpg"
              alt="Feature destinations map"
              width={640}
              height={400}
              className="w-full rounded-[24px] object-cover"
            />
            <Image src="/home/pin.svg" alt="" width={28} height={28} className="absolute left-24 top-24" />
            <Image src="/home/pin.svg" alt="" width={28} height={28} className="absolute right-24 top-20" />
            <Image src="/home/pin.svg" alt="" width={28} height={28} className="absolute left-16 bottom-24" />
            <div className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-white/70 bg-white p-3 shadow-lg shadow-[#d7c7b6]/50">
              <Image
                src="/home/portrait-left.jpg"
                alt="Vienna highlight"
                width={120}
                height={100}
                className="h-20 w-full rounded-[16px] object-cover"
              />
              <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-[#d57058]">
                Vienna
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#d57058]">
            Feature Destinations
          </p>
          <h2 className="text-3xl font-semibold text-[#22201e]">Feature Destinations on the Map</h2>
          <p className="text-sm text-[#7b746a]">
            Integrate interactive maps on any page and let visitors pin the destinations from your
            posts right onto the world map with ease.
          </p>
          <p className="text-sm text-[#7b746a]">
            Customize markers, highlight hotspots, and guide your audience through every adventure
            you&apos;ve taken.
          </p>
          <div className="inline-flex items-center gap-3 rounded-full border border-[#dcd3c9] px-6 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#7b746a]">
            <Image src="/home/google.svg" alt="Google Maps" width={26} height={26} className="h-6 w-6" />
            Google Maps
          </div>
        </div>
      </div>
    </section>
  )
}
