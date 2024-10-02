import { Project, TaskProject, TeamMember } from "@/types";

export type GroupedTasks = {
    [key: string]: TaskProject[]
}
  
const initialStatusGroups: GroupedTasks = {
backlog: [],
pending: [],
onHold: [],
inProgress: [],
underReview: [],
completed: []
}

export const isManager = (managerId: Project["manager"], userId: TeamMember["_id"]) => managerId === userId

export const havePermission = (team: Project["team"], userId: TeamMember["_id"], permissionRequired: number) => {
    const teamMember = team.find((member) => member.user === userId)
    if(teamMember) return teamMember.permissionLevel >= permissionRequired
    else return false
}

export const groupTasksByBacklog = (tasks: Project["tasks"]) => {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
      }, initialStatusGroups);
    
      const backlogGroupedTasks = groupedTasks["backlog"];

    return backlogGroupedTasks
}

export const groupTasks = (tasks: Project["tasks"]) => {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
      }, initialStatusGroups);
    
      const fieldGroupedTasks = Object.entries(groupedTasks).filter(([status]) => status !== "backlog")

    return fieldGroupedTasks
}
