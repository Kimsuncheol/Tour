import Image from 'next/image'

const galleryImages = [
  '/home/grid-1.jpg',
  '/home/grid-2.jpg',
  '/home/grid-3.jpg',
  '/home/grid-4.jpg',
  '/home/dog.jpg',
  '/home/portrait-left.jpg',
  '/home/bali-card.jpg',
  '/home/grid-5.jpg',
  '/home/grid-6.jpg',
]

export default function PostVariationsSection() {
  return (
    <section className="bg-[#fdf9f4] py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-20 px-6 md:grid-cols-2 md:px-10">
        <div className="space-y-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#d57058]">
            Post Variations
          </p>
          <h2 className="text-3xl font-semibold text-[#22201e]">So Many Stunning Post Variations</h2>
          <p className="text-sm text-[#7b746a]">
            Packed with amazing layouts that showcase all kinds of posts straight out of the box.
          </p>
          <ul className="space-y-3 text-sm text-[#7b746a]">
            <li className="flex items-center gap-3">
              <Image src="/home/pin.svg" alt="" width={18} height={18} className="h-4 w-4" />
              Beautiful single post layout set
            </li>
            <li className="flex items-center gap-3">
              <Image src="/home/pin.svg" alt="" width={18} height={18} className="h-4 w-4" />
              A variety of blog list styles
            </li>
            <li className="flex items-center gap-3">
              <Image src="/home/pin.svg" alt="" width={18} height={18} className="h-4 w-4" />
              Eye-catching blog sliders
            </li>
            <li className="flex items-center gap-3">
              <Image src="/home/pin.svg" alt="" width={18} height={18} className="h-4 w-4" />
              Add videos, audio &amp; much more
            </li>
          </ul>
        </div>
        <div className="relative flex justify-center">
          <div className="relative grid grid-cols-3 gap-3 rounded-[28px] border border-[#efe6dc] bg-white p-5 shadow-2xl shadow-[#d5c8ba]/50">
            {galleryImages.map((src) => (
              <div key={src} className="overflow-hidden rounded-[16px]">
                <Image src={src} alt="Post preview" width={160} height={120} className="h-28 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
