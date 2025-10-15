import Image from 'next/image'

const journeyImages = [
  '/home/inner-page-top.jpg',
  '/home/world-map.jpg',
  '/home/inner-page-bottom.jpg',
  '/home/bali-card.jpg',
  '/home/store-page.jpg',
  '/home/beach-air.jpg',
  '/home/venice-card.jpg',
  '/home/grid-4.jpg',
  '/home/portrait-left.jpg',
]

export default function JourneySection() {
  return (
    <section className="border-t border-white/70 bg-white py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 text-center md:px-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#d57058]">
            Journey Begins
          </p>
          <h2 className="text-3xl font-semibold text-[#22201e]">Journey Begins</h2>
          <p className="mx-auto max-w-2xl text-sm text-[#7b746a]">
            Compatible with both WPBakery and Elementor, featuring dozens of homepage variations to
            launch your travel story instantly.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {journeyImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="group overflow-hidden rounded-[26px] border border-[#efe6dc] bg-white shadow-lg shadow-[#d9c9b9]/40 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d4c4b4]/60"
            >
              <Image
                src={src}
                alt="Homepage variation"
                width={320}
                height={220}
                className="h-52 w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="border-t border-[#efe6dc] px-4 py-4">
                <p className="text-sm font-semibold text-[#25221f]">Homepage #{index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
