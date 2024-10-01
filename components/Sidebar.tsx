import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, FolderOpen, Users, BarChart2, Upload, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/authContext'

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="w-64 bg-white text-black h-screen flex flex-col border-r border-gray-200">
      <div className="p-4">
        <Link href="/dashboard" className="block">
          <Image
            src="/images/image.png"
            alt="next-logo"
            width={192}
            height={32}
            priority
          />
        </Link>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          <li>
            <Link 
              href="/dashboard" 
              className={`flex items-center space-x-2 p-2 rounded ${
                pathname === '/dashboard' ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/projects" 
              className={`flex items-center space-x-2 p-2 rounded ${
                pathname === '/projects' ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              <FolderOpen size={20} />
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/interviews" 
              className={`flex items-center space-x-2 p-2 rounded ${
                pathname === '/interviews' ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              <span>Interviews</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/interview-analysis" 
              className={`flex items-center space-x-2 p-2 rounded ${
                pathname === '/interview-analysis' ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              <BarChart2 size={20} />
              <span>Analysis</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/upload" 
              className={`flex items-center space-x-2 p-2 rounded ${
                pathname === '/upload' ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              <Upload size={20} />
              <span>Upload</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 space-y-2">
        <Link 
          href="/settings" 
          className={`flex items-center space-x-2 p-2 rounded ${
            pathname === '/settings' ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <button 
          onClick={logout}
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full"
        >
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}