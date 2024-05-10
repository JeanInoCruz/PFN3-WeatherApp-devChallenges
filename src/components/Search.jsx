import { useState, useEffect } from 'react'
import { ExitIcon, RightIcon, SearchIcon } from './Icons'
import { getPlacesFromLocalStorage } from '../utils/storage'

export function Search ({ inputSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchPlace, setSearchPlace] = useState('')
  const [places, setPlaces] = useState(null)

  const toggleMenu = () => {
    if (isMenuOpen) {
      document.body.classList.remove('no-scrollbar')
    } else {
      document.body.classList.add('no-scrollbar')
    }
    setIsMenuOpen(prev => !prev)
  }

  const search = (event, place) => {
    event.preventDefault()
    if (place.trim() !== '' && !places.map(p => p.toLowerCase()).includes(place.trim().toLowerCase())) {
      inputSearch(place)
      toggleMenu()
    }
  }

  useEffect(() => {
    setPlaces(getPlacesFromLocalStorage())
  }, [])

  const defaultPlaces = ['London', 'Barcelona', 'Long beach']

  return (
    <header className='bg-blue-1'>
      <div className='absolute top-[18px] md:top-[42px] md:left-[46px] left-3'>
        <button
          className='py-2 px-5 bg-gray-3 text-base'
          onClick={toggleMenu}
        >Seach for places
        </button>
      </div>
      <nav className={`${isMenuOpen ? 'fixed' : 'hidden'} top-0 left-0 right-0 h-[672px] md:h-full md:py-3 md:px-[46px] drop-shadow-2xl md:w-[459px] bg-blue-1 text-center items-center justify-center z-50 overflow-auto no-scrollbar p-3 `}>
        <button
          className='flex ml-auto pb-6 md:pb-[38px]'
          onClick={toggleMenu}
        ><ExitIcon />
        </button>
        <form className='flex gap-3' onSubmit={(e) => search(e, searchPlace)}>
          <div className='flex items-center gap-3 border w-full border-gray-1 pl-3 p-1'>
            <SearchIcon />
            <input
              className='bg-transparent w-full py-2 focus:outline-none placeholder-gray-4'
              placeholder='search location'
              type='text'
              value={searchPlace}
              onChange={(event) => setSearchPlace(event.target.value)}
            />
          </div>
          <button type='submit' className='bg-blue-3 text-base px-5 py-3'>Search</button>
        </form>
        <div className='flex flex-col py-10 gap-3'>
          {defaultPlaces.map((place, index) => (
            <button
              className='flex w-full px-3 py-[18px] border hover:border border-transparent hover:border-gray-4 group'
              key={index}
              onClick={(e) => search(e, place)}
            >
              <p className='text-base'>{place}</p>
              <span className='ml-auto hidden group-hover:block'><RightIcon /></span>
            </button>
          ))}
          {
            places?.map(place => (
              <button
                className='flex w-full px-3 py-[18px] border hover:border border-transparent hover:border-gray-4 group'
                key={place}
                onClick={() => search(null, place)}
              >
                <p className='text-base'>{place}</p>
                <span className='ml-auto hidden group-hover:block'><RightIcon /></span>
              </button>
            ))
          }
        </div>
      </nav>
    </header>

  )
}
