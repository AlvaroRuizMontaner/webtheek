import React from 'react'
import "./loading-templates.css"

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
        <section className='loading-text'></section>
        <section className='loading-text'></section>
        <section className='loading-text'></section>
      </div>
      <ul role="list" className="space-y-4 my-10">
        {ProjectsLoadingData.map((project) => (
          <li
            key={project._id}
            className="flex relative justify-between gap-x-6 bg-white shadow-lg loading-bar h-[191px] sm:h-[198px] lg:h-[203px]"
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
