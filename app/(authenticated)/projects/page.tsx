"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal } from "lucide-react"
import { format } from 'date-fns'

// Types
interface Project {
  id: number;
  name: string;
  interviews: number;
  createdDate: string;
}

// This would typically come from an API or database
const fetchProjects = async (): Promise<Project[]> => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: "Market Research 2023", interviews: 25, createdDate: "2023-06-15T10:30:00Z" },
    { id: 2, name: "Product Feedback Analysis", interviews: 50, createdDate: "2023-08-22T14:45:00Z" },
    { id: 3, name: "User Experience Study", interviews: 30, createdDate: "2023-10-05T09:15:00Z" },
    { id: 4, name: "Competitor Analysis", interviews: 15, createdDate: "2023-11-12T11:00:00Z" },
    { id: 5, name: "Customer Satisfaction Survey", interviews: 100, createdDate: "2023-12-01T16:20:00Z" },
  ];
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNewProject = () => {
    // Implement new project creation logic here
    console.log('Creating new project');
  }

  const handleGroupAnalysis = (projectId: number) => {
    // Implement group analysis logic here
    console.log(`Starting group analysis for project ${projectId}`);
  }

  const handleAddInterview = (projectId: number) => {
    // Implement add interview logic here
    console.log(`Adding interview to project ${projectId}`);
  }

  const handleDeleteProject = (projectId: number) => {
    // Implement project deletion logic here
    console.log(`Deleting project ${projectId}`);
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
              <p>Loading projects...</p>
            </div>
          ) : error ? (
            <div className="p-6 text-red-500">{error}</div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold">Projects</h2>
                  <p className="text-muted-foreground">Manage and analyze your research projects</p>
                </div>
                <Button onClick={handleNewProject}>
                  <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
              </div>
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-8"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
                      <CardDescription className="text-xs">
                        Created on {format(new Date(project.createdDate), 'MMM d, yyyy')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-xl font-bold">{project.interviews}</p>
                      <p className="text-sm text-muted-foreground">Interviews</p>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex justify-between items-center w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGroupAnalysis(project.id)}
                        >
                          Group Analysis
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleAddInterview(project.id)}>
                              Add Interview
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              Delete Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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