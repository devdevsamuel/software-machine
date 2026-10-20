import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 antialiased">
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
