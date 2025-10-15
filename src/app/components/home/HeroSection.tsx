import Image from 'next/image'

type HeroSectionProps = {
  scriptFontClass: string
}

export default function HeroSection({ scriptFontClass }: HeroSectionProps) {
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden pb-24 pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f1e6d9] via-[#f8f4ee] to-white" />
        <Image
          src="/home/topography.svg"
          alt=""
          fill
          className="object-cover opacity-30 mix-blend-multiply"
          priority
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 md:px-10">
        <div className="relative flex w-full justify-center">
          <div className="relative flex w-full max-w-5xl flex-col items-center">
            <div className="relative grid w-full gap-10 md:grid-cols-[1fr_1.1fr_1fr]">
              <div className="relative flex flex-col items-start gap-6">
                <div className="relative -ml-6 w-48 -rotate-6 rounded-[28px] border border-white/70 bg-white p-3 text-left shadow-xl shadow-[#c9b09f]/30">
                  <Image
                    src="/home/portrait-left.jpg"
                    alt="Traveler portrait"
                    width={250}
                    height={320}
                    className="h-56 w-full rounded-[22px] object-cover"
                  />
                </div>

                <div className="relative ml-8 w-56 rounded-[30px] border border-white/80 bg-white p-4 text-left shadow-xl shadow-[#d1bfb0]/40">
                  <Image
                    src="/home/venice-card.jpg"
                    alt="Venice postcard"
                    width={280}
                    height={260}
                    className="h-40 w-full rounded-[22px] object-cover"
                  />
                  <div className="mt-4 space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d57058]">
                      Venice
                    </p>
                    <p className="text-sm font-medium text-[#25221f]">
                      Meet the photographer who chases stars
                    </p>
                    <span className="text-xs text-[#9c9289]">Travel Stories</span>
                  </div>
                  <Image
                    src="/home/plane.svg"
                    alt="Plane illustration"
                    width={48}
                    height={48}
                    className="absolute -right-12 top-16 hidden rotate-[22deg] md:block"
                  />
                </div>
              </div>

              <div className="relative flex flex-col items-center justify-start">
                <div className="relative -mt-8 w-80 rounded-[38px] border border-white/70 bg-white p-4 shadow-2xl shadow-[#d6c2b3]/40 md:w-[22rem]">
                  <Image
                    src="/home/beach-air.jpg"
                    alt="Aerial beach"
                    width={520}
                    height={360}
                    className="h-52 w-full rounded-[32px] object-cover"
                  />
                </div>
              </div>

              <div className="relative flex flex-col items-end gap-6">
                <div className="relative w-48 rounded-[30px] border border-white/70 bg-white p-4 text-left shadow-xl shadow-[#c9b4a6]/40">
                  <Image
                    src="/home/eiffel-card.jpg"
                    alt="Eiffel tower postcard"
                    width={240}
                    height={280}
                    className="h-48 w-full rounded-[22px] object-cover"
                  />
                  <div className="mt-4 space-y-1 text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d57058]">
                      Paris
                    </p>
                    <p className="text-sm font-medium text-[#25221f]">
                      How to spend a week in Paris
                    </p>
                  </div>
                </div>

                <div className="relative mr-4 w-48 rounded-[30px] border border-white/70 bg-white p-4 text-left shadow-xl shadow-[#d6c1af]/40">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d57058]">
                      Brazil
                    </p>
                    <span className="text-[10px] uppercase text-[#9c9289]">2.7k Readers</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex size-16 items-center justify-center rounded-full border border-dashed border-[#e7d4c5] bg-[#fdf9f4]">
                      <span className="text-xl">🇧🇷</span>
                    </div>
                    <button className="rounded-full bg-[#f9806f] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-md shadow-[#d3705e]/50">
                      Explore
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-[#9c9289]">Amazon secrets &amp; hidden beaches</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-24 flex flex-col items-center text-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 -rotate-6 text-[10rem] font-semibold uppercase tracking-[0.4em] text-[#ecdccf]/60"
          >
            Discover
          </span>

          <div className="relative inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.5em] text-[#d57058] shadow-sm shadow-[#dac7b6]/60 backdrop-blur">
            For Explorers
          </div>

          <h1
            className={`${scriptFontClass} relative mt-8 text-5xl text-[#1f1c1a] sm:text-6xl md:text-[4.5rem]`}
          >
            Backpack Traveler
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[#7b746a] sm:text-lg">
            For real travel bloggers looking to share their adventure with the world.
          </p>

          <button className="mt-10 rounded-full bg-[#1f1c1a] px-10 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-[#c7b29f]/40 transition hover:bg-[#35312c]">
            Purchase
          </button>
        </div>

        <div className="relative mt-28 flex w-full flex-wrap items-center justify-center gap-10 md:justify-between">
          <div className="relative flex items-center gap-4 rounded-[26px] border border-white/80 bg-white/90 p-5 shadow-xl shadow-[#d9c8b7]/50 backdrop-blur">
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-inner">
              <Image
                src="/home/dog.jpg"
                alt="Dog friendly"
                width={80}
                height={80}
                className="size-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-[#d57058]">Dog-Friendly</p>
              <p className="mt-1 text-sm font-semibold text-[#25221f]">5.7k Readers</p>
            </div>
            <Image
              src="/home/polaroid-camera.jpg"
              alt="Polaroid camera"
              width={80}
              height={80}
              className="absolute -bottom-10 -left-6 w-24 rotate-3 rounded-[18px] border-4 border-white shadow-lg shadow-[#d3c1b1]/40"
            />
          </div>

          <div className="relative flex items-center gap-4 rounded-[26px] border border-white/80 bg-white/90 p-5 text-left shadow-xl shadow-[#d9c8b7]/50 backdrop-blur">
            <Image
              src="/home/beach-couple.jpg"
              alt="Travel couple"
              width={140}
              height={110}
              className="w-32 -rotate-3 rounded-[18px] border-4 border-white shadow-lg shadow-[#d3c1b1]/40"
            />
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full border border-[#f9806f]/40 bg-[#fef5f2]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-4 text-[#f9806f]"
                  >
                    <path
                      d="M12 5v14m7-7H5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d57058]">
                  New Video
                </span>
              </div>
              <p className="text-sm text-[#7b746a]">
                Mobi accumsan ipsum velit, nam nec tellus a odio tincidunt auctor a ornare odio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
