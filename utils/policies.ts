import { Project, TeamMember } from "@/types";

export const isManager = (managerId: Project["manager"], userId: TeamMember["_id"]) => managerId === userId

export const havePermission = (team: Project["team"], userId: TeamMember["_id"], permissionRequired: number) => {
    const teamMember = team.find((member) => member.user === userId)
    if(teamMember) return teamMember.permissionLevel >= permissionRequired
    else return false
}
