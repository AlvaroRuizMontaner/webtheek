import { editUserFromProject, getUserTeamById } from '@/services/TeamAPI'
import { Project, User } from '@/types'
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import 'swiper/css';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import SlideCard from '@/components/team/SlideCard/SlideCard';


type UserTeamViewProps = {
    projectId: Project["_id"]
    userId: User["_id"]
}

export default function UserTeamView({projectId, userId}: UserTeamViewProps) {
  const [slideIndex, setSlideIndex] = useState(1)
  const [swiperInitialized, setSwiperInitialized] = useState(false); // Estado para la inicialización

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTeam", projectId],
    queryFn: () => getUserTeamById({projectId, userId}),
    retry: false,
  });

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: editUserFromProject,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ["userTeam", projectId]})
    }
  })

  const swiperRef = useRef<SwiperType>();

  if (isLoading) return "Cargando...";
  if (isError) throw new Error("Error");
  if (data) return (
    <>
      <h1 className=" font-black headline2">Editar permisos de <span className='text-accent-700'>{data.user.name}</span></h1>

      <div className='mt-10'>
        <div className='max-w-[600px] mx-auto flex items-center justify-center h-[260px] relative'>
          <div className='swiper-container ml-5 sm:ml-0'>
            <Swiper
              initialSlide={data.permissionLevel-1}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={50}
              slidesPerView={1.2}
              onSlideChange={(e) => {
                if (swiperInitialized) {
                  mutate({
                    projectId,
                    userId,
                    permissionFormData: {
                        permissionLevel: e.activeIndex + 1
                    }
                  })
                }
                setSlideIndex(e.activeIndex + 1)
              }}
              onSwiper={(swiper) => {
                setSwiperInitialized(true); // Marcar el Swiper como inicializado
                console.log(swiper);
              }}
            >
              <SwiperSlide className='text-center'><SlideCard level={1} /></SwiperSlide>
              <SwiperSlide className='text-center'><SlideCard level={2} /></SwiperSlide>
              <SwiperSlide className='text-center'><SlideCard level={3} /></SwiperSlide>
            </Swiper>
          </div>

          <button className={`absolute left-10 top-1/2 z-10 hidden sm:block ${slideIndex === 1 && "disabled opacity-20"}`} onClick={() => swiperRef.current?.slidePrev()}>
            <ArrowLeftCircleIcon className='w-12 h-12 text-gray-400 ' />
          </button>
          <button className={`absolute right-10 top-1/2 z-10 hidden sm:block ${slideIndex === 3 && "disabled opacity-20"}`} onClick={() => swiperRef.current?.slideNext()}>
            <ArrowRightCircleIcon className='w-12 h-12 text-gray-400 ' />
          </button>
        </div>
      </div>
    </>
  );
}
