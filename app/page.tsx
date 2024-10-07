import React from 'react'
import Hero from '../components/Hero'
import SearchBar from '@/components/SearchBar'
import CustomFilter from '@/components/CustomFilter'
import { fetchCars } from '@/utils'
import CarCard from '@/components/CarCard'

const page = async () => {
  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <div className='overflow-hidden'>
      <pre className='hidden'>{JSON.stringify(allCars, null, 2)}</pre>

      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id='discover'>
      <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className='home__filter-container'>
            {/*
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
            */}
          </div>          
        </div>

        {!isDataEmpty ? (
          <section className="">
            <div className="home__cars-wrapper">
              {allCars?.map(car => (
                <CarCard car={car} />
              ))}
            </div>
          </section>
        ): (
          <div className="home_error-container">
            <h2 className="text-black text-xl font-bold">
              Oops, no result
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
