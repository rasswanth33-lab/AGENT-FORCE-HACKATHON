import { Icon } from '@iconify/react'

const columns = [
  {
    title: 'Platform',
    links: ['Buy Phones', 'Sell Phones', 'Enterprise', 'Pricing Data'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Press'],
  },
  {
    title: 'Legal',
    links: ['Terms', 'Privacy', 'Warranty'],
  },
]

export default function Footer() {
  return (
    <footer id="support" className="border-t border-white/10 pt-16 pb-8 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="solar:smartphone-2-linear" className="text-white" />
              <span className="text-sm font-semibold tracking-tight text-white">
                NEXUS
              </span>
            </div>
            <p className="text-xs text-white/40 max-w-xs leading-relaxed">
              Redefining the secondary mobile market through technology,
              transparency, and trust.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-2 text-xs text-white/50">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#marketplace" className="hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <p className="text-[10px] text-white/30">
            © {new Date().getFullYear()} Nexus Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-white/40">
            <a href="https://x.com" aria-label="Twitter" className="hover:text-white">
              <Icon icon="solar:brand-twitter-linear" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
              <Icon icon="solar:brand-instagram-linear" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">
              <Icon icon="solar:brand-linkedin-linear" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
