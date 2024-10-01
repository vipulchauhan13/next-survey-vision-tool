"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreHorizontal, Loader2, Check, ChevronRight } from "lucide-react"
import { format } from 'date-fns'

// Types
interface Interview {
  id: number;
  name: string;
  duration: number;
  date: string;
  status: 'Analyzed' | 'Analyzing...' | 'Not Started';
}

interface Project {
  id: number;
  name: string;
}

// Simulated API calls
const fetchProject = async (projectId: number): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { id: projectId, name: "New Product Launch" };
};

const fetchInterviews = async (projectId: number): Promise<Interview[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: "Interview with John Doe", duration: 45, date: "2023-09-15T10:30:00Z", status: "Analyzed" },
    { id: 2, name: "Focus Group A Discussion", duration: 60, date: "2023-09-22T14:00:00Z", status: "Analyzing..." },
    { id: 3, name: "User Testing Session 1", duration: 30, date: "2023-10-05T09:15:00Z", status: "Not Started" },
    { id: 4, name: "Interview with Jane Smith", duration: 40, date: "2023-10-10T11:00:00Z", status: "Analyzed" },
    { id: 5, name: "Customer Feedback Call", duration: 35, date: "2023-10-15T13:30:00Z", status: "Analyzing..." },
  ];
};

export default function ProjectInterviewsPage() {
  const params = useParams()
  const projectId = Number(params.projectId)

  const [searchTerm, setSearchTerm] = useState('')
  const [project, setProject] = useState<Project | null>(null)
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProjectAndInterviews = async () => {
      try {
        setIsLoading(true);
        const [projectData, interviewsData] = await Promise.all([
          fetchProject(projectId),
          fetchInterviews(projectId)
        ]);
        setProject(projectData);
        setInterviews(interviewsData);
        setError(null);
      } catch (err) {
        setError('Failed to load project data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectAndInterviews();
  }, [projectId]);

  const filteredInterviews = interviews.filter(interview =>
    interview.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNewInterview = () => {
    // Implement new interview creation logic here
    console.log('Creating new interview for project', projectId);
  }

  const handleAnalyzeInterview = (interviewId: number) => {
    // Implement interview analysis logic here
    console.log(`Analyzing interview ${interviewId} for project ${projectId}`);
  }

  const handleDeleteInterview = (interviewId: number) => {
    // Implement interview deletion logic here
    console.log(`Deleting interview ${interviewId} from project ${projectId}`);
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Space for sidebar */}
      {/* <div className="w-64 h-full bg-card border-r"></div> */}

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading project data...</span>
            </div>
          ) : error ? (
            <div className="p-6 text-red-500">{error}</div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-6">
                <Link href="/projects" className="hover:underline">Projects</Link>
                <ChevronRight className="inline-block mx-1 h-4 w-4" />
                <span>{project?.name}</span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold">Interviews</h2>
                  <p className="text-muted-foreground">Manage and analyze interviews for {project?.name}</p>
                </div>
                <Button onClick={handleNewInterview}>
                  <Plus className="mr-2 h-4 w-4" /> New Interview
                </Button>
              </div>
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-8"
                    placeholder="Search interviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredInterviews.map((interview) => (
                  <Card key={interview.id} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg leading-tight">{interview.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {format(new Date(interview.date), 'MMM d, yyyy')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xl font-bold">{interview.duration} min</p>
                          <p className="text-sm text-muted-foreground">Duration</p>
                        </div>
                        <Badge
                          variant={interview.status === 'Analyzed' ? 'default' : interview.status === 'Analyzing...' ? 'secondary' : 'outline'}
                          className="flex items-center"
                        >
                          {interview.status === 'Analyzed' && <Check className="mr-1 h-3 w-4" />}
                          {interview.status}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAnalyzeInterview(interview.id)}
                        disabled={interview.status === 'Analyzing...'}
                      >
                        {interview.status === 'Analyzed' ? 'View Analysis' : 'Analyze'}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => console.log(`Edit interview ${interview.id}`)}>
                            Edit Interview
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteInterview(interview.id)}
                          >
                            Delete Interview
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}