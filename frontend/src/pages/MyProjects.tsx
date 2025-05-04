import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Folder, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate?: string;
  createdAt?: string;
  name?: string;
  [key: string]: any;
}

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async (): Promise<void> => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) throw new Error("User not found in local storage");

        const user = JSON.parse(userStr);
        const learnerId = user._id;
        if (!learnerId) throw new Error("User ID (_id) not found");

        const baseUrl = import.meta.env.VITE_API_URL;

        // Using fetch instead of axios
        const learnerResponse = await fetch(
          `${baseUrl}/api/learner/projects/${learnerId}`
        );
        const learnerData = await learnerResponse.json();

        if (!learnerData.success) {
          throw new Error(learnerData.message || "Failed to fetch projects");
        }

        const projectIds = learnerData.data.projects as string[];

        if (!projectIds || projectIds.length === 0) {
          setProjects([]);
          setLoading(false);
          return;
        }

        // Fetch each project's details individually with error handling
        const projectsWithDetails = await Promise.all(
          projectIds.map(async (projectId) => {
            try {
              const projectResponse = await fetch(
                `${baseUrl}/api/project/${projectId}`
              );
              const projectData = await projectResponse.json();

              if (!projectData.success) {
                console.warn(
                  `Skipping project with ID ${projectId}: ${projectData.message}`
                );
                return null;
              }

              return projectData.data as Project;
            } catch (err) {
              console.warn(`Error fetching project ${projectId}:`, err);
              return null;
            }
          })
        );

        // Filter out any null projects (failed requests)
        const validProjects = projectsWithDetails.filter(
          (project): project is Project => project !== null
        );

        setProjects(validProjects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Format date to a nicer format
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mx-auto max-w-2xl mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and explore your current projects
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-muted/30 rounded-lg border border-dashed">
          <Folder className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium">No projects found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Projects you create or join will appear here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="overflow-hidden hover:shadow-lg transition-all"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">
                  {project.title || project.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description || "No description provided"}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-24">
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {project.description || "No description provided"}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-4 bg-muted/10">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>
                    Started:{" "}
                    {formatDate(project.startDate || project.createdAt)}
                  </span>
                </div>
                <Button
                  onClick={() =>
                    (window.location.href = `/project/${project._id}`)
                  }
                  size="sm"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjects;
