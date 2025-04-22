import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type TabsProps = {
    tabs:  {   
        name: string;
        href: string;
        icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
            title?: string | undefined;
            titleId?: string | undefined;
        } & RefAttributes<SVGSVGElement>>;
    }[]
}

export default function Tabs({tabs}: TabsProps) {
    const router = useRouter()
    const path = usePathname()
    const currentTab = tabs.filter(tab => tab.href === path)[0].href
    
    return (
        <div className='mb-10'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-primary-800 focus:ring-primary-800"
                    onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => router.push(e.target.value) }
                    value={currentTab}
                >
                    {tabs.map((tab) => {
                        return (
                            <option 
                                value={tab.href}
                                key={tab.name}>{tab.name}</option>
                        )
                    })}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    path === tab.href
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-600 hover:border-gray-400 hover:text-gray-800',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        path === tab.href ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-600',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}