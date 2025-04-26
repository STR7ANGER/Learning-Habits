import { useState, useEffect } from "react";
import axios from "axios";

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate?: string;
  createdAt?: string;
  name?: string;
  [key: string]: any;
}

const MyProjects: React.FC = () => {
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

        const learnerResponse = await axios.get(
          `${baseUrl}/api/learner/projects/${learnerId}`
        );

        if (!learnerResponse.data.success) {
          throw new Error(
            learnerResponse.data.message || "Failed to fetch projects"
          );
        }

        const projectIds = learnerResponse.data.data.projects as string[];

        if (!projectIds || projectIds.length === 0) {
          setProjects([]);
          setLoading(false);
          return;
        }

        // Fetch each project's details individually with error handling
        const projectsWithDetails = await Promise.all(
          projectIds.map(async (projectId) => {
            try {
              const projectResponse = await axios.get(
                `${baseUrl}/api/project/${projectId}`
              );

              if (!projectResponse.data.success) {
                console.warn(
                  `Skipping project with ID ${projectId}: ${projectResponse.data.message}`
                );
                return null;
              }

              return projectResponse.data.data as Project;
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded-md">{error}</div>
    );
  }

  if (projects.length === 0) {
    return <div className="text-center p-8">No projects found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              {project.title || project.name}
            </h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Started:{" "}
                {new Date(
                  project.startDate || project.createdAt || Date.now()
                ).toLocaleDateString()}
              </span>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() =>
                  (window.location.href = `/project/${project._id}`)
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
