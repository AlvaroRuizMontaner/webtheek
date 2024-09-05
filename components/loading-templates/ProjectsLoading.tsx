import React from 'react'

const ProjectsLoadingData = [
    {
        _id: "string",
        description: "",
        projectName: "",
        clientName: "",
        manager: ""
    },
    {
        _id: "string",
        description: "",
        projectName: "",
        clientName: "",
        manager: ""
    },
    {
        _id: "string",
        description: "",
        projectName: "",
        clientName: "",
        manager: ""
    },
    {
        _id: "string",
        description: "",
        projectName: "",
        clientName: "",
        manager: ""
    }
]

export default function ProjectsLoading() {
  return (
    <div>
      <div className=" h-[159px] sm:h-[174px] lg:h-[189px] mb-12u flex flex-col justify-between">
        <section className='__loading h-[36px] sm:h-[48px] lg:h-[60px] max-w-[300px]'></section>       
        <section className='__loading h-4 max-w-[316px]'></section>
        <section className='__loading rounded-lg h-[48px] max-w-full sm:max-w-[220px]'></section>
      </div>
      <ul role="list" className="space-y-4 my-10">
        {ProjectsLoadingData.map((project, index) => (
          <li
            key={project._id + index}
            className="flex relative justify-between gap-x-6 shadow-lg __loading h-[191px] sm:h-[198px] lg:h-[203px]"
          >
            <div className="flex min-w-0 gap-x-4 pl-6u py-8u overflow-hidden">
              <div className="min-w-0 flex-auto space-y-2u">
                <div>
                  <div className="text-gray-600 cursor-pointer hover:underline headline3 font-bold">
                    {project.projectName}
                  </div>
                </div>
                <p className="text-sm text-gray-400">{project.clientName}</p>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6 w-fit pr-6u py-8u"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
