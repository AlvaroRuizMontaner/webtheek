import Loading from '@/components/loading-templates/Loading';
import EditProjectForm from '@/components/projects/EditProjectForm';
import { getProjectById } from '@/services/ProjectAPI';
import { Project } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function EditProjectView({projectId}:{projectId: Project["_id"]}) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    });

    if(isLoading) return <Loading />
    if(isError) throw new Error(error.message);

    if(data) return <EditProjectForm data={data} projectId={projectId} />
}
