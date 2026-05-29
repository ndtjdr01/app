import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Nav from './sections/nav/nav'
import Header from './sections/header/header'
import Footer from './sections/footer/footer'
import Home from './sections/pages/home/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col h-screen bg-[#f6f6f5]'>
      <Nav />
      <Header />
      <div className='content flex-1'>
        <Home />
      </div>
      <Footer />
    </div>
  )
}

export default App
