"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cloud, File, X } from "lucide-react"

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [projectName, setProjectName] = useState('')
  const [interviewName, setInterviewName] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove))
  }

  const handleUpload = () => {
    // Here you would typically send the files to your server
    console.log('Uploading files:', files)
    console.log('Project Name:', projectName)
    console.log('Interview Name:', interviewName)
    // Reset the form after upload
    setFiles([])
    setProjectName('')
    setInterviewName('')
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Space for sidebar */}
      {/* <div className="w-64 h-full bg-card border-r"></div> */}

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Upload Interview</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Drag and Drop</CardTitle>
              <CardDescription>Upload your interview files here</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer ${
                  isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                <Cloud className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drag and drop your files here, or click to select files</p>
                <Button className="mt-4">Browse your files</Button>
                <p className="mt-2 text-xs text-gray-500">
                  Files Supported: Audio, Video, Doc, Excel, Presentation, PDF
                </p>
              </div>
            </CardContent>
          </Card>

          {files.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                      <div className="flex items-center">
                        <File className="h-5 w-5 mr-2 text-gray-500" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
              <CardDescription>Provide information about the uploaded interview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Select onValueChange={setProjectName} value={projectName}>
                  <SelectTrigger id="project-name">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market-research-2023">Market Research 2023</SelectItem>
                    <SelectItem value="product-feedback">Product Feedback</SelectItem>
                    <SelectItem value="user-experience-study">User Experience Study</SelectItem>
                    <SelectItem value="new-project">Create New Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {projectName === 'new-project' && (
                <div className="space-y-2">
                  <Label htmlFor="new-project-name">New Project Name</Label>
                  <Input
                    id="new-project-name"
                    placeholder="Enter new project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="interview-name">Interview Name</Label>
                <Input
                  id="interview-name"
                  placeholder="Enter interview name"
                  value={interviewName}
                  onChange={(e) => setInterviewName(e.target.value)}
                />
              </div>
              <Button onClick={handleUpload} disabled={files.length === 0 || !projectName || !interviewName}>
                Upload
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}