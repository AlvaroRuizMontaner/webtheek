import React from 'react'

type PermissionProps = {
    isManager: boolean
}

export default function Permission({isManager}: PermissionProps) {
    const classNames = "font-bold text-xs uppercase border-sm inline-block py-1u px-10 mb-2"
    return (
    <div>
      {isManager ? (
        <p
          className={`${classNames} bg-primary-100 text-primary-700 border-t-primary-500 border-b-primary-500`}
        >
          Manager
        </p>
      ) : (
        <p
        className={`${classNames} bg-accent-100 text-accent-700 border-t-accent-500 border-b-accent-500`}
        >
          Colaborador
        </p>
      )}
    </div>
  );
}
