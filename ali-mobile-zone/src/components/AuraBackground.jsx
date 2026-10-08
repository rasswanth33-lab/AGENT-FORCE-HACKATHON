import { useEffect } from 'react'

export default function AuraBackground() {
  useEffect(() => {
    if (window.UnicornStudio?.isInitialized) return

    window.UnicornStudio = window.UnicornStudio || { isInitialized: false }
    const script = document.createElement('script')
    script.src =
      'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js'
    script.async = true
    script.onload = () => {
      if (!window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init()
        window.UnicornStudio.isInitialized = true
      }
    }
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div
      className="aura-background-component fixed top-0 w-full h-screen -z-10 hue-rotate-90 brightness-125"
      data-alpha-mask="80"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
      }}
    >
      <div
        data-us-project="bmaMERjX2VZDtPrh4Zwx"
        className="absolute w-full h-full left-0 top-0 -z-10"
      />
    </div>
  )
}
