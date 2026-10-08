import { Icon } from '@iconify/react'
import GlobeCanvas from './GlobeCanvas'

export default function Hero() {
  return (
    <section className="overflow-hidden pt-32 pb-20 relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] tracking-wide text-blue-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            GLOBAL SHIPPING LIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[1.1] mb-6 gradient-text">
            The borderless <br /> device market.
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light mb-8 max-w-md leading-relaxed">
            Buy and sell premium mobile devices instantly. Verified quality,
            insured logistics, and instant payouts worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#marketplace"
              className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Browse Devices
              <Icon icon="solar:arrow-right-linear" />
            </a>
            <a
              href="#support"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white/80 border border-white/10 hover:bg-white/5 transition-colors"
            >
              <Icon icon="solar:play-circle-linear" width="18" />
              How it works
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {['JP', 'US', 'EU'].map((code, i) => (
                <div
                  key={code}
                  className={`w-8 h-8 rounded-full border border-black flex items-center justify-center text-[10px] text-white ${
                    ['bg-gray-800', 'bg-gray-700', 'bg-gray-600'][i]
                  }`}
                >
                  {code}
                </div>
              ))}
            </div>
            <div className="text-xs text-white/40">
              Trusted by 10k+ sellers <br /> across 40 countries.
            </div>
          </div>
        </div>

        <div className="relative h-[500px] w-full flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-md glass-panel rounded-3xl overflow-hidden shadow-2xl">
            <GlobeCanvas />

            <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <div className="flex items-center gap-2 mb-1">
                <Icon icon="solar:globe-linear" className="text-blue-400" />
                <span className="text-xs font-medium text-white tracking-wide">
                  LIVE NETWORK
                </span>
              </div>
              <div className="text-[10px] text-white/50">Real-time transactions</div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                    <Icon icon="solar:box-linear" />
                  </div>
                  <div>
                    <div className="text-xs text-white">iPhone 15 Pro Max</div>
                    <div className="text-[10px] text-white/50">Sold in San Francisco</div>
                  </div>
                </div>
                <span className="text-xs text-green-400 font-medium">+$980</span>
              </div>
            </div>
          </div>

          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
