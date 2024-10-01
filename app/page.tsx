import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-4xl font-bold mb-6">Welcome to next survey analytics</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Analyze and visualize your focus group interviews with ease. Uncover insights and patterns in your qualitative data.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Automated transcription and analysis</li>
          <li>Interactive semantic maps</li>
          <li>Collaborative project management</li>
          <li>Customizable reporting</li>
        </ul>
      </div>
    </div>
  )
}