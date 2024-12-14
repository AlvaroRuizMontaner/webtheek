import React, { useRef, useState } from 'react'
import EditableName from './EditableName'
import EditableCharge from './EditableCharge'
import EditableBirthday from './EditableBirthday'
import { CameraIcon } from '@heroicons/react/20/solid'

type HeaderProps = {
  name?: string
  charge?: string
  birthday?: string
}

export default function Header({name="", charge="", birthday=""}: HeaderProps) {
/*   const [selectedFile, setSelectedFile] = useState<File | null>(null); */
  const [preview, setPreview] = useState<string | null>(null);
  const [showCam, setShowCam] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const photoURL = 'https://i.imgur.com/5H0KCsy.png' // "https://imagizer.imageshack.com/img923/7400/eoTc6E.png"

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      fetching()
      console.log("fetching")

      // Limpia la URL cuando ya no sea necesaria
      //return () => URL.revokeObjectURL(url);
    }
  };

/*   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      fetching()

      reader.onerror = () => {
        console.error("Error al leer el archivo.");
      };
    }
  }; */

  const fetching = () => {
    const formData = new FormData();
    const imageFile = inputRef.current?.files?.[0]
    if(imageFile) {
      formData.append('image', imageFile);
      formData.append('album', 'ShBFecvIzWtNoIS');
    
      fetch('https://api.imgur.com/3/image', {
        //mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: 'Client-ID 9949aebac6be83c',
        },
        body: formData
      }).then((data) => data.json()).then((data) => {
        setPreview(data.link)
        console.log(data)
      }) 
      .catch(error => {
        console.error(error);
        //alert('Upload failed: ' + error);
      });
    }
  }

  
/*   useEffect(() => {
    if(values.request === true) {
      setValues({...values, request: false})
      addTask(values)
    }
  },[values.data]) */

  return (
    <div className='flex flex-col justify-center gap-3 p-[1.25rem] bg-indigo-800 text-white'>
      <div className='flex justify-center'>
        <div className='relative w-[130px]' /* onMouseOut={() => setShowCam(false)} */  onMouseOver={() => setShowCam(true)}>
          <input onChange={handleFileChange} className='absolute block opacity-0 w-0' ref={inputRef} accept="image/*" type="file" name="" id="icon-button-file" />
          <img className='w-[130px]' src={preview || photoURL} alt="" />
          {showCam && <label className='absolute right-0 bottom-0 cursor-pointer' htmlFor="icon-button-file">
            <CameraIcon className='w-8 h-8 text-blue-500' />
          </label>}
        </div>
      </div>

      {/* <h1 className=' text-2xl text-center font-bold'>{name}</h1> */}
      <EditableName name={name} />

      {/* <p className='text-center text-gray-400'>{charge}</p> */}
      <EditableCharge charge={charge} />
      <EditableBirthday birthday={birthday} />
      {/* <p className='text-center text-gray-400 h-[20px]'>{birthday}</p> */}
    </div>
  )
}
