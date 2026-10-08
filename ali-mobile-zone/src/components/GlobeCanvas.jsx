import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export default function GlobeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let phi = 0
    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: canvas.offsetWidth * 2,
      height: canvas.offsetHeight * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.4, 0.6, 1],
      glowColor: [0.1, 0.1, 0.2],
      opacity: 0.8,
      markers: [
        { location: [37.7595, -122.4367], size: 0.06 },
        { location: [40.7128, -74.006], size: 0.04 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [48.8566, 2.3522], size: 0.04 },
        { location: [35.6762, 139.6503], size: 0.06 },
        { location: [1.3521, 103.8198], size: 0.04 },
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.003
        state.width = canvas.offsetWidth * 2
        state.height = canvas.offsetHeight * 2
      },
    })

    return () => globe.destroy()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="cobe"
      className="transition-opacity duration-1000 opacity-90 w-full h-full absolute top-0 right-0 bottom-0 left-0"
    />
  )
}
