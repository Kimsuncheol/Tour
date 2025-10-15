import Image from 'next/image'

export default function DestinationHighlightsSection() {
  return (
    <section className="border-t border-white/60 bg-white py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 md:px-10">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <div className="space-y-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#d57058]">
              Destination Posts
            </p>
            <h2 className="text-3xl font-semibold text-[#22201e]">Destination Posts</h2>
            <p className="text-sm text-[#7b746a]">
              Bundled with an awe-inspiring set of destination layouts. Present detailed write-ups
              about places you visited and let visitors explore categories or custom lists with one
              click.
            </p>
            <button className="mt-6 inline-flex items-center rounded-full border border-[#dcd3c9] px-8 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#7b746a] transition hover:border-[#f9806f] hover:text-[#f9806f]">
              Explore
            </button>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[430px] rounded-[34px] border border-[#efe6dc] bg-white p-6 shadow-2xl shadow-[#d5c8ba]/40">
              <Image
                src="/home/uk-map.jpg"
                alt="United Kingdom map"
                width={520}
                height={360}
                className="w-full rounded-[24px] object-cover"
              />
              <Image src="/home/pin.svg" alt="" width={32} height={32} className="absolute left-24 top-20" />
              <Image src="/home/pin.svg" alt="" width={32} height={32} className="absolute right-28 top-28" />
              <Image
                src="/home/uk-bus.svg"
                alt="London bus illustration"
                width={120}
                height={80}
                className="absolute -bottom-10 left-1/2 w-32 -translate-x-1/2 drop-shadow-lg"
              />
              <div className="absolute -top-10 left-8 flex flex-col items-center gap-2">
                <Image
                  src="/home/venice-card.jpg"
                  alt="Buckingham"
                  width={140}
                  height={100}
                  className="h-24 w-36 rounded-[18px] border-4 border-white object-cover shadow-lg shadow-[#d9c8bb]/40"
                />
                <span className="rounded-full bg-[#1d9bf0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-md shadow-[#97ccef]/40">
                  Discover
                </span>
              </div>
              <div className="absolute -top-6 right-6 rounded-[20px] border border-white/60 bg-white p-3 shadow-lg shadow-[#d7c8bb]/50">
                <Image
                  src="/home/bali-card.jpg"
                  alt="London bridge"
                  width={140}
                  height={110}
                  className="h-24 w-32 rounded-[14px] object-cover"
                />
                <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d57058]">
                  United Kingdom
                </p>
              </div>
              <p className="absolute -bottom-16 right-12 text-sm font-semibold text-[#1f1c1a]">
                United Kingdom
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative rounded-[30px] border border-[#efe6dc] bg-white p-4 shadow-xl shadow-[#d7c6b5]/50">
                <Image
                  src="/home/inner-page-top.jpg"
                  alt="Inner page preview"
                  width={520}
                  height={340}
                  className="h-48 w-full rounded-[22px] object-cover"
                />
                <div className="absolute -top-10 right-0 rounded-full border-4 border-white bg-[#1d9bf0] px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-[#a9d6f7]/50">
                  Twitter
                </div>
                <div className="absolute -bottom-10 left-0 rounded-full border-4 border-white bg-[#e60023] px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-[#eeb1c3]/50">
                  Pinterest
                </div>
              </div>
              <div className="absolute -right-8 top-16 w-full max-w-sm rounded-[30px] border border-[#efe6dc] bg-white p-4 shadow-2xl shadow-[#d2c1af]/60">
                <Image
                  src="/home/inner-page-bottom.jpg"
                  alt="Inner pages gallery"
                  width={520}
                  height={340}
                  className="h-48 w-full rounded-[22px] object-cover"
                />
                <div className="absolute -right-10 -top-8 rounded-full border-4 border-white bg-[#3b5998] px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-xl shadow-[#9cb6e6]/60">
                  Facebook
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#d57058]">
              Practical Inner Pages
            </p>
            <h2 className="text-3xl font-semibold text-[#22201e]">Practical Inner Pages</h2>
            <p className="text-sm text-[#7b746a]">
              Backpack Traveler comes with an amazing array of ready-to-use inner page templates,
              perfect for presenting yourself and letting everyone know what you do.
            </p>
            <p className="text-sm text-[#7b746a]">
              Highlight every place you have visited or wrote about with destination maps, photo
              galleries, and contact layouts crafted for storytelling.
            </p>
            <button className="mt-6 inline-flex items-center rounded-full border border-[#dcd3c9] px-8 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#7b746a] transition hover:border-[#f9806f] hover:text-[#f9806f]">
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
