import { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { selectTheme } from '@/redux/features/curriculumSlice'
import { themes } from './themes.info'
import { PaintBrushIcon } from '@heroicons/react/20/solid'

type RadioInputThemeProps = {
  theme: {
    icon: JSX.Element,
    nameTheme: string
  }
  setShowThemeList: (p: boolean) => void
}

function RadioInputTheme({theme, setShowThemeList}: RadioInputThemeProps) {
  const dispatch = useAppDispatch()

  function handleChange() {
    dispatch(selectTheme({color: theme.nameTheme }))
    setShowThemeList(false)
  }

  return (
    <label htmlFor={"theme" + theme.nameTheme} className="h-8 w-8  flex items-center justify-center">
      {theme.icon}
      <input className="absolute w-0 h-0 opacity-0" type="radio" name={"themes"} id={"theme" + theme.nameTheme} onChange={handleChange}/>
    </label>
  )
}

export default function EditableTheme() {

  const [showThemeList, setShowThemeList] = useState(false)

  return (
    <div className="flex justify-center relative z-10">
      <div className='cursor-pointer' onClick={() => setShowThemeList(true)}>
        <PaintBrushIcon className="w-8 h-8 text-gray-200" />
      </div>
      {showThemeList && (
        <div className='absolute w-80 h-40 bg-blue-700 right-0 translate-x-full'>
          <div className='p-6u bg-white shadow-md h-full grid grid-cols-4 gap-4 justify-center overflow-y-scroll'>
            {themes.map((theme, themeIndex) => (
              <RadioInputTheme setShowThemeList={setShowThemeList} key={"theme" + themeIndex} theme={theme} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
