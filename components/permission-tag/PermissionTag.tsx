import React from 'react'
import "./permission-tag.css"

type PermissionTagProps = {
    isManager: boolean
    permissionLevel?: number
}

export default function PermissionTag({isManager, permissionLevel}: PermissionTagProps) {
    const classNames = "font-bold text-xs uppercase border-sm inline-block py-1u px-10 mb-2"

    const numberTagClassNames: Record<number, string> = {
      1: "bg-primary-300 text-accent-700 border-t-primary-500 border-b-primary-500",
      2: "bg-primary-300 text-accent-warning-700 border-t-primary-500 border-b-primary-500",
      3: "bg-primary-300 text-accent-danger-700 border-t-primary-500 border-b-primary-500",
    }

    const dualTagTSX = (
      <>
      {isManager ? (
        <p
          className={`${classNames} bg-primary-300 text-primary-700 border-t-primary-500 border-b-primary-500`}
        >
          Manager
        </p>
      ) : (
        <p
        className={`${classNames} bg-primary-300 text-accent-800 border-t-primary-500 border-b-primary-500`}
        >
          Colaborador
        </p>
      )}
    </>
    )

    const numberTagTSX = (
        <p className={`${classNames} ${numberTagClassNames[permissionLevel as number]}`}
        >
          Nivel {" "}{permissionLevel}
        </p>
    );


    return (
    <div className='permissionTag'>
      {!permissionLevel ? dualTagTSX : numberTagTSX}
    </div>
  );
}
