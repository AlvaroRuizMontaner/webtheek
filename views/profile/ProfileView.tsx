import ProjectsLoading from '@/components/loading-templates/ProjectsLoading'
import ProfileForm from '@/components/profile/ProfileForm'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

export default function ProfileView() {

    const { data, isLoading } = useAuth()

    if(isLoading) return <ProjectsLoading />
    if(data) return <ProfileForm data={data} />
}
