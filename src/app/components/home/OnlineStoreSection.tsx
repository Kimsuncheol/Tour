import Image from 'next/image'

export default function OnlineStoreSection() {
  return (
    <section className="bg-[#fdf9f4] py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-20 px-6 md:grid-cols-2 md:px-10">
        <div className="space-y-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#d57058]">Online Store</p>
          <h2 className="text-3xl font-semibold text-[#22201e]">Online Store</h2>
          <p className="text-sm text-[#7b746a]">
            Get all the templates you need to launch your online store in minutes and display your
            travel finds in the best light.
          </p>
          <p className="text-sm text-[#7b746a]">
            Fully compatible with the most popular plugins, including WooCommerce for a seamless
            shopping experience.
          </p>
          <button className="mt-6 inline-flex items-center rounded-full border border-[#dcd3c9] px-8 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#7b746a] transition hover:border-[#f9806f] hover:text-[#f9806f]">
            Explore
          </button>
        </div>
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[440px] rounded-[34px] border border-[#efe6dc] bg-white p-6 shadow-2xl shadow-[#d5c8ba]/50">
            <Image
              src="/home/store-page.jpg"
              alt="Store page"
              width={560}
              height={360}
              className="w-full rounded-[24px] object-cover"
            />
            <span className="absolute -top-6 right-8 rounded-full bg-[#8a4fff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-[#bda3ff]/60">
              Woo
            </span>
            <div className="absolute -right-16 top-12 w-36 rounded-[24px] border border-[#efe6dc] bg-white p-4 shadow-2xl shadow-[#d6c2b3]/50">
              <Image
                src="/home/book-blue.jpg"
                alt="Almost fearless travel book"
                width={140}
                height={180}
                className="h-40 w-full rounded-[18px] object-cover"
              />
              <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-[#d57058]">
                Buy for $59
              </p>
              <div className="mt-2 flex justify-center gap-1 text-[#f6c35e]">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <div className="absolute -left-10 bottom-12 w-32 rounded-[24px] border border-[#efe6dc] bg-white p-4 shadow-xl shadow-[#d6c2b3]/50">
              <Image
                src="/home/book-gray.jpg"
                alt="501 Places guide"
                width={120}
                height={160}
                className="h-32 w-full rounded-[18px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
