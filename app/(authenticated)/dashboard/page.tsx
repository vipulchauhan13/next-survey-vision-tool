"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart, FileText, Plus, Upload, Users } from "lucide-react"

// Types
interface DashboardData {
  totalProjects: number;
  totalInterviews: number;
  avgInterviewDuration: number;
  insightsGenerated: number;
  recentActivity: Activity[];
  notifications: Notification[];
}

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  timestamp: string;
}

interface Notification {
  id: string;
  status: 'completed' | 'running';
  projectName: string;
  interviewName: string;
  timestamp: string;
}

// Simulated API call
const fetchDashboardData = async (): Promise<DashboardData> => {
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    totalProjects: 15,
    totalInterviews: 278,
    avgInterviewDuration: 42,
    insightsGenerated: 1567,
    recentActivity: [
      { id: '1', user: { name: 'Olivia Martin', avatar: '/placeholder.svg?height=36&width=36' }, action: 'Added a new interview to Project X', timestamp: '2 minutes ago' },
      { id: '2', user: { name: 'Jackson Lee', avatar: '/placeholder.svg?height=36&width=36' }, action: 'Completed analysis for Project Y', timestamp: '1 hour ago' },
      { id: '3', user: { name: 'Isabella Nguyen', avatar: '/placeholder.svg?height=36&width=36' }, action: 'Created a new project: Customer Feedback 2023', timestamp: '3 hours ago' },
      { id: '4', user: { name: 'William Chen', avatar: '/placeholder.svg?height=36&width=36' }, action: 'Updated Project Z settings', timestamp: '5 hours ago' },
      { id: '5', user: { name: 'Sophia Kim', avatar: '/placeholder.svg?height=36&width=36' }, action: 'Shared insights from Project A', timestamp: '1 day ago' },
    ],
    notifications: [
      { id: '1', status: 'completed', projectName: 'Market Research 2023', interviewName: 'Interview #25', timestamp: '5 minutes ago' },
      { id: '2', status: 'running', projectName: 'Product Feedback', interviewName: 'Interview #12', timestamp: '20 minutes ago' },
      { id: '3', status: 'completed', projectName: 'User Experience Study', interviewName: 'Interview #8', timestamp: '1 hour ago' },
      { id: '4', status: 'running', projectName: 'Competitor Analysis', interviewName: 'Interview #3', timestamp: '2 hours ago' },
      { id: '5', status: 'completed', projectName: 'Customer Satisfaction', interviewName: 'Interview #50', timestamp: '3 hours ago' },
    ]
  };
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Space for sidebar */}
      {/* <div className="w-64 h-full bg-card border-r"></div> */}

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">Loading dashboard data...</div>
          ) : error ? (
            <div className="flex justify-center items-center h-full text-red-500">{error}</div>
          ) : !dashboardData ? (
            <div className="flex justify-center items-center h-full">No dashboard data available.</div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex space-x-4">
                  <Button onClick={() => console.log("Create Project clicked")}>
                    <Plus className="mr-2 h-4 w-4" /> Create Project
                  </Button>
                  <Button onClick={() => console.log("Upload Interview clicked")}>
                    <Upload className="mr-2 h-4 w-4" /> Upload Interview
                  </Button>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.totalProjects}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.totalInterviews}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Interview Duration</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.avgInterviewDuration} min</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Insights Generated</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardData.insightsGenerated}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity and Notifications */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest actions and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {dashboardData.recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-center">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                              <AvatarFallback>{activity.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                              <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {activity.action}
                              </p>
                            </div>
                            <div className="ml-auto font-medium text-sm text-muted-foreground">{activity.timestamp}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Analysis status for your interviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {dashboardData.notifications.map((notification) => (
                          <div key={notification.id} className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{notification.projectName}</span>
                              <Badge
                                variant={notification.status === 'completed' ? 'default' : 'secondary'}
                                className="ml-auto"
                              >
                                {notification.status === 'completed' ? 'Completed' : 'Running'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{notification.interviewName}</span>
                              <span>{notification.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}