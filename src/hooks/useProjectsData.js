import axios from "axios";

export default async function useProjectsData() {
    const projects = [];
    if (!localStorage.getItem("projects")) {
        await axios.get("http://127.0.0.1:8000/api/projects").then(response => {
            const data = response.data;
            for (let value in data) {
                const year = new Date(Date.parse(data[value].created_at)).getFullYear();
                const month = (
                    "0" + new Date(Date.parse(data[value].created_at)).getMonth()
                ).slice(-2);
                const day = (
                    "0" + new Date(Date.parse(data[value].created_at)).getDate()
                ).slice(-2);
                const createdDate = `${month}/${day}/${year}`;
                const ProjectObj = {
                    id: data[value].id,
                    project_name: data[value].project_name,
                    project_slug: data[value].project_slug,
                    problem: data[value].problem,
                    solution: data[value].solution,
                    implementation: data[value].implementation,
                    implementation_cost: data[value].implementation_cost,
                    cost_savings: data[value].cost_savings,
                    time_to_complete: data[value].time_to_complete,
                    createdAt: createdDate,
                };
                projects.push(ProjectObj);
            }
            localStorage.setItem("projects", JSON.stringify(projects));
            return projects;
        });
    }
    return JSON.parse(localStorage.getItem("projects"));
}