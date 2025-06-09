"use client"

import * as React from "react"
import "./index.css"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Moon,
  Sun,
  Bell,
  Search,
  Settings,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Plus,
  Trash2,
  Check,
  Circle,
  ListTodo,
  Filter,
} from "lucide-react"

interface Task {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

type FilterType = "all" | "active" | "completed"

export default function ModernUI() {
  const [isDark, setIsDark] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [filter, setFilter] = useState<FilterType>("all")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const savedTasks = localStorage.getItem("todo-tasks")
    const savedTheme = localStorage.getItem("theme")

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }))
      setTasks(parsedTasks)
    }

    if (savedTheme === "dark") {
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task: Task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTasks([...tasks, task])
      setNewTask("")
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const stats = [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign, color: "text-green-600" },
    { title: "Active Users", value: "2,350", change: "+180.1%", icon: Users, color: "text-blue-600" },
    { title: "Sales", value: "12,234", change: "+19%", icon: TrendingUp, color: "text-purple-600" },
    { title: "Performance", value: "573", change: "+201", icon: Activity, color: "text-orange-600" },
  ]

  const activities = [
    { user: "Alex Johnson", action: "completed a project", time: "2 minutes ago", avatar: "AJ" },
    { user: "Sarah Chen", action: "joined the team", time: "1 hour ago", avatar: "SC" },
    { user: "Mike Wilson", action: "updated the design", time: "3 hours ago", avatar: "MW" },
    { user: "Emma Davis", action: "shared a document", time: "5 hours ago", avatar: "ED" },
  ]

  const activeTasks = tasks.filter((task) => !task.completed).length
  const completedTasks = tasks.filter((task) => task.completed).length

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "active":
        return !task.completed
      case "completed":
        return task.completed
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ListTodo className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Todo List</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stay organized and productive</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <Switch checked={isDark} onCheckedChange={toggleTheme} />
                <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{tasks.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <ListTodo className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Tasks</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{activeTasks}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Circle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedTasks}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Task Section */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={addTask}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filter Section */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                All ({tasks.length})
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                onClick={() => setFilter("active")}
                className={filter === "active" ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                Active ({activeTasks})
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                onClick={() => setFilter("completed")}
                className={filter === "completed" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Completed ({completedTasks})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              {filter === "all" && "All Tasks"}
              {filter === "active" && "Active Tasks"}
              {filter === "completed" && "Completed Tasks"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ListTodo className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                  {filter === "all" && "No tasks yet"}
                  {filter === "active" && "No active tasks"}
                  {filter === "completed" && "No completed tasks"}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  {filter === "all" && "Add your first task to get started!"}
                  {filter === "active" && "All tasks are completed!"}
                  {filter === "completed" && "Complete some tasks to see them here."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${task.completed
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTask(task.id)}
                      className={`p-2 rounded-full ${task.completed
                        ? "text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30"
                        : "text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                    >
                      {task.completed ? <Check className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </Button>

                    <div className="flex-1">
                      <p
                        className={`text-lg ${task.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : "text-gray-900 dark:text-white"
                          }`}
                      >
                        {task.text}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Created: {task.createdAt.toLocaleDateString()} at {task.createdAt.toLocaleTimeString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant={task.completed ? "default" : "secondary"}
                        className={
                          task.completed
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                        }
                      >
                        {task.completed ? "Completed" : "Active"}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
