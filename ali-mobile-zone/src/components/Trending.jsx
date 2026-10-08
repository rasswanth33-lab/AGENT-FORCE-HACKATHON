import { useState } from 'react'

const products = [
  {
    name: 'iPhone 15 Pro',
    spec: 'Titanium • 256GB',
    price: '$920',
    grade: 'MINT',
    gradeClass:
      'bg-green-500/20 text-green-400 border-green-500/20',
    image:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Pixel 8 Pro',
    spec: 'Bay • 128GB',
    price: '58000PKR',
    grade: 'GOOD',
    gradeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff23?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Galaxy S24',
    spec: 'Onyx • 512GB',
    price: '$750',
    grade: 'FAIR',
    gradeClass: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
    image:
      'https://images.unsplash.com/photo-1610945265064-f45a70262b6f?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'iPhone 14',
    spec: 'Midnight • 128GB',
    price: '$540',
    grade: 'MINT',
    gradeClass:
      'bg-green-500/20 text-green-400 border-green-500/20',
    image:
      'https://images.unsplash.com/photo-1664478546384-d57ffe74a797?q=80&w=800&auto=format&fit=crop',
  },
]

export default function Trending() {
  const [mode, setMode] = useState('buy')

  return (
    <section id="marketplace" className="border-white/5 border-t pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-medium tracking-tight text-white">
            Trending Devices
          </h2>

          <div
            id="trade-in"
            className="flex items-center gap-3 bg-white/5 p-1 rounded-lg border border-white/10"
          >
            {['buy', 'sell'].map((option) => (
              <button
                key={option}
                type="button"
                id={option === 'sell' ? 'sell' : undefined}
                onClick={() => setMode(option)}
                className={`px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  mode === option
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <article
              key={product.name}
              className="group relative rounded-xl bg-white/[0.02] border border-white/5 p-4 hover:border-white/20 transition-all hover:-translate-y-1"
            >
              <div className="aspect-[4/5] bg-black rounded-lg mb-4 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />
                <div
                  className={`absolute top-2 right-2 backdrop-blur-md text-[10px] font-medium px-2 py-0.5 rounded border shadow-lg ${product.gradeClass}`}
                >
                  {product.grade}
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-medium text-white">{product.name}</h3>
                  <p className="text-[10px] text-white/40">{product.spec}</p>
                </div>
                <span className="text-sm font-medium text-white">
                  {mode === 'sell' ? `Offer ${product.price}` : product.price}
                </span>
              </div>
              <button
                type="button"
                className="w-full mt-2 py-2 rounded-lg bg-white text-black text-xs font-medium opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
              >
                {mode === 'sell' ? 'Get Offer' : 'View Details'}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
