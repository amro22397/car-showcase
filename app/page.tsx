
import React from 'react'
import Hero from '../components/Hero'
import SearchBar from '@/components/SearchBar'
import CustomFilter from '@/components/CustomFilter'
import { fetchCars } from '@/utils'
import CarCard from '@/components/CarCard'
import ShowMore from '@/components/ShowMore'
import CustomButton from '@/components/CustomButton'
import ResetButton from '@/components/ResetButton'

import { fuels, yearsOfProduction } from '@/constants'

const page = async ({ searchParams }: HomeProps) => {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  
  return (
    <div className='overflow-hidden'>

      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id='discover'>
      <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className='home__filter-container'>
          <CustomFilter title='fuel' options={fuels} />
          <CustomFilter title='year' options={yearsOfProduction} />

          <ResetButton />
          </div>          
        </div>

        {!isDataEmpty ? (
          
          <section className="pt-14">
            <span className="text-[16px] font-bold mx-auto text-center text-gray-800 mx-3
      ">Car images can't be shown now.. We'll try to fix this soon...</span>

            <div className="home__cars-wrapper">
              {allCars?.map(car => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams?.limit || 10) / 10}
              isNext={(searchParams?.limit || 10) > allCars.length}
            /> 

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
