import { editUserFromProject, getUserTeamById } from '@/services/TeamAPI'
import { Project, User } from '@/types'
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import 'swiper/css';
import { toast } from 'react-toastify';
import SlideCard from '@/components/team/SlideCard';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid';


type UserTeamViewProps = {
    projectId: Project["_id"]
    userId: User["_id"]
}

export default function UserTeamView({projectId, userId}: UserTeamViewProps) {

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
      <h1 className=" text-5xl font-black">Editar usuario del equipo</h1>
      <p className="text-2xl fon-light text-gray-500 mt-5">
        Elige qué permisos debe tener el usuario indicado
      </p>

      <div className='mt-10'>
        <p className='font-bold text-xl'>Usuario: {data.user.name}</p>

        <div className='max-w-96 mx-auto relative'>
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={50}
            slidesPerView={1.2}
            onSlideChange={(e) => {
              mutate({
                projectId,
                userId,
                permissionFormData: {
                    permissionLevel: e.activeIndex + 1
                }
              })
            }}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide className='text-center'><SlideCard level={1} /></SwiperSlide>
            <SwiperSlide className='text-center'><SlideCard level={2} /></SwiperSlide>
            <SwiperSlide className='text-center'><SlideCard level={3} /></SwiperSlide>
            <SwiperSlide className='text-center'><SlideCard level={4} /></SwiperSlide>

            <button className='absolute -left-10 top-1/2' onClick={() => swiperRef.current?.slidePrev()}>
              <ArrowLeftCircleIcon className='w-6 h-6 text-green-500 ' />
            </button>
            <button className='absolute -right-10 top-1/2' onClick={() => swiperRef.current?.slideNext()}>
              <ArrowRightCircleIcon className='w-6 h-6 text-green-500 ' />
            </button>
          </Swiper>
        </div>
      </div>
    </>
  );
}
