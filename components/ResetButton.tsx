'use client'

import CustomButton from "./CustomButton"
import { deleteSearchParams } from "@/utils"
import { useRouter } from "next/navigation";


const ResetButton = () => {

    const router = useRouter();

    const resetFilter = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete('model')
        searchParams.delete('manufacturer')
        searchParams.delete('fuel')
        searchParams.delete('year')
        searchParams.delete('limit')

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`

        router.push(newPathname, {scroll: false})
    }
  return (
    <CustomButton title="Reset Filter" btnType="button" containerStyles="bg-blue-600 text-white rounded-full
          hover:bg-blue-700 active:transform active:scale-95" handleClick={() => resetFilter()}/>
  )
}

export default ResetButton
