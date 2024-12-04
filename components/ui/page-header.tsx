import { ArrowLeft } from 'lucide-react'
import Link from "next/link"

interface PageHeaderProps {
  title: React.ReactNode
  rightContent?: React.ReactNode
}

export function PageHeader({ title, rightContent }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b pb-5">
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:opacity-75">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      {rightContent}
    </div>
  )
}

