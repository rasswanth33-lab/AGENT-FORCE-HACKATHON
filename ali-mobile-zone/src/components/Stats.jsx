const stats = [
  { value: '98%', label: 'Condition Accuracy' },
  { value: '<24h', label: 'Payout Speed' },
  { value: '12mo', label: 'Warranty Included' },
  { value: '0%', label: 'Seller Fees*' },
]

export default function Stats() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-medium tracking-tight text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
