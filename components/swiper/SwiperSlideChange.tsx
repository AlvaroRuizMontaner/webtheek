import { useRef, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid'
import SlideCard from '@/components/team/SlideCard/SlideCard'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editUserFromProject, getUserTeamById } from '@/services/TeamAPI';
import { toast } from 'react-toastify';
import ProjectsLoading from '../loading-templates/ProjectsLoading';
import { Project, User } from '@/types';

type SwiperSlideChangeProps = {
    projectId: Project["_id"]
    userId: User["_id"]
}


export default function SwiperSlideChange({projectId, userId}: SwiperSlideChangeProps) {

    const [slideIndex, setSlideIndex] = useState(1)
    const [swiperInitialized, setSwiperInitialized] = useState(false); // Estado para la inicialización
    const swiperRef = useRef<SwiperType>();

/*     const data = {
        "user": {
            "name": "Saku",
            "email": "davinianp@gmail.com",
            "_id": "1234567896546456" // Mock
        },
        "permissionLevel": 2
    } */

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

    
      if (isLoading) return <ProjectsLoading />
      if (isError) throw new Error("Error");


    if (data) return (
    <div className="mt-10">
      <div className="max-w-[600px] mx-auto flex items-center justify-center h-[260px] relative">
        <div className="swiper-container ml-5 sm:ml-0">
          <Swiper
            initialSlide={data.permissionLevel - 1}
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
                    permissionLevel: e.activeIndex + 1,
                  },
                });
              }
              setSlideIndex(e.activeIndex + 1);
            }}
            onSwiper={(swiper) => {
              setSwiperInitialized(true); // Marcar el Swiper como inicializado
              console.log(swiper);
            }}
          >
            <SwiperSlide className="text-center">
              <SlideCard level={1} />
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <SlideCard level={2} />
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <SlideCard level={3} />
            </SwiperSlide>
          </Swiper>
        </div>

        <button
          className={`absolute left-10 top-1/2 z-10 hidden sm:block ${slideIndex === 1 && "disabled opacity-20"}`}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeftCircleIcon className="w-12 h-12 text-primary-400 " />
        </button>
        <button
          className={`absolute right-10 top-1/2 z-10 hidden sm:block ${slideIndex === 3 && "disabled opacity-20"}`}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRightCircleIcon className="w-12 h-12 text-primary-400 " />
        </button>
      </div>
    </div>
  );
}
