import React, { useRef, useState } from 'react'
import EditableName from './EditableName'
import EditableCharge from './EditableCharge'
import EditableBirthday from './EditableBirthday'
import { CameraIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'
import { useUploadImageMutation } from '@/redux/services/hostImage'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { editPhotoUrl } from '@/redux/features/curriculumSlice'

type HeaderProps = {
  name?: string
  charge?: string
  birthday?: string
  photoUrl?: string
  isEditable: boolean
}

export default function Header({name="", charge="", birthday="", photoUrl="", isEditable}: HeaderProps) {
/*   const [selectedFile, setSelectedFile] = useState<File | null>(null); */
  //const [preview, setPreview] = useState<string | undefined>(undefined);
  const [showCam, setShowCam] = useState<boolean>(false)
  const themeName = useAppSelector((state) => state.curriculumReducer).themeName
  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement>(null)

  const defaultPhotoURL = 'https://i.imgur.com/5H0KCsy.png' // "https://imagizer.imageshack.com/img923/7400/eoTc6E.png"

  const [uploadImage, /* { isLoading, error } */] = useUploadImageMutation();

 const handleEditPhotoUrl = (url: string) => {
    dispatch(editPhotoUrl({         
      pageNumber: 0, 
      photoUrl: url
    }))
  }
  
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append('image', file);
      formData.append('album', 'ShBFecvIzWtNoIS');

      try {
        //setPreview(url);
        handleEditPhotoUrl(url)

        const result = await uploadImage(formData)
        const {data} = result
        if(data && data.data) {
          //setPreview(data.data?.link)
          handleEditPhotoUrl(data.data?.link)
        } else {
          toast.warning("La imagen no será guardable en base de datos")
        }
        console.log(result)
      } catch (error) {
        toast.error("No se ha podido cargar la imagen")
      }

      // Limpia la URL cuando ya no sea necesaria
      return () => URL.revokeObjectURL(url);
    }
  }

/*   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      
      fetching()
      console.log("fetching")

      // Limpia la URL cuando ya no sea necesaria
      return () => URL.revokeObjectURL(url);
    }
  }; */

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

/*   const fetching = () => {
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
        setPreview(data.data.link)
        console.log(data)
      }) 
      .catch(error => {
        console.error(error);
        //alert('Upload failed: ' + error);
      });
    }
  } */

  
/*   useEffect(() => {
    if(values.request === true) {
      setValues({...values, request: false})
      addTask(values)
    }
  },[values.data]) */

  return (
    <div className={`flex flex-col justify-center gap-3 p-[1.25rem] header ${themeName} text-white`}>
      <div className='flex justify-center'>
        <div className='relative w-[130px]' onMouseOut={() => setShowCam(false)}  onMouseOver={() => setShowCam(true)}>
          <input onChange={handleUpload} className='absolute block opacity-0 w-0' ref={inputRef} accept="image/*" type="file" name="" id="icon-button-file" />
          <img className='w-[130px] block min-h-10' src={photoUrl || defaultPhotoURL} alt="" />
          {showCam && isEditable && <label className='absolute right-0 bottom-0 cursor-pointer' htmlFor="icon-button-file">
            <CameraIcon className='w-8 h-8 text-blue-500' />
          </label>}
        </div>
      </div>

      {/* <h1 className=' text-2xl text-center font-bold'>{name}</h1> */}
      <EditableName isEditable={isEditable} name={name} />

      {/* <p className='text-center text-gray-400'>{charge}</p> */}
      <EditableCharge isEditable={isEditable} charge={charge} />
      <EditableBirthday isEditable={isEditable} birthday={birthday} />
      {/* <p className='text-center text-gray-400 h-[20px]'>{birthday}</p> */}
    </div>
  )
}
