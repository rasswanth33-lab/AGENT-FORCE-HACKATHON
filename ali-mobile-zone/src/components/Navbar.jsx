import { useState } from 'react'
import { Icon } from '@iconify/react'

const links = ['Marketplace', 'Trade-In', 'Business', 'Support']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex text-black bg-white w-6 h-6 rounded-full items-center justify-center">
            <Icon icon="solar:smartphone-2-linear" width="16" />
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">
            ALI MOBILE ZONE
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-white/60">
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(' ', '-')}`}
              className="hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Search"
          >
            <Icon icon="solar:magnifer-linear" width="20" />
          </button>
          <a
            href="#sell"
            className="text-xs font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
          >
            Start Selling
          </a>
          <button
            type="button"
            className="md:hidden text-white/70"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon icon={open ? 'solar:close-linear' : 'solar:hamburger-menu-linear'} width="22" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-black/90 px-6 py-4 flex flex-col gap-3 text-sm text-white/70">
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(' ', '-')}`}
              className="hover:text-white"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
