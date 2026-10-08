import AuraBackground from './components/AuraBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Features from './components/Features'
import Trending from './components/Trending'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top" className="relative min-h-screen">
      <AuraBackground />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Trending />
      <Footer />
    </div>
  )
}
