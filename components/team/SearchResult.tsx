import { addUserToProject } from '@/services/TeamAPI'
import { addUserToQuiz } from '@/services/QuizTeamAPI'
import { Project, TeamMember, ToolType } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'

type SearchResultProps = {
    user: TeamMember
    toolId: Project["_id"]
    reset: () => void
    queryKey: string
    tool: ToolType
}

export function getMutationFn(tool: ToolType) {
    return tool === "projects" ? addUserToProject : addUserToQuiz
}

export default function SearchResult({user, toolId, reset, queryKey, tool}: SearchResultProps) {
    
    const queryClient = useQueryClient()
    
    const {mutate} = useMutation({
        mutationFn: getMutationFn(tool),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey: [queryKey, toolId]})
        }
    })

    const handleAddUserToProject = () => {
        const data = {
            toolId,
            id: user._id
        }
        mutate(data)
    }

  return (
    <>
        <p className='mt-10 text-center font-bold'>Resultado:</p>
        <div className='flex justify-between items-center'>
            <p>{user.name}</p>
            <button
                onClick={handleAddUserToProject}
                className='text-primary-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer'
            >
                Agregar al Equipo
            </button>
        </div>
    </>
  )
}
