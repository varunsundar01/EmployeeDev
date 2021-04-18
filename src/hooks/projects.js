export default function createProjectsObj(project) {
    const year = new Date(Date.parse(project.created_at)).getFullYear();
    const month = (
        "0" + (new Date(Date.parse(project.created_at)).getMonth() + 1)).slice(-2);
    const day = (
        "0" + new Date(Date.parse(project.created_at)).getDate()
    ).slice(-2);
    const createdAt = `${month}/${day}/${year}`;

    const projectObj = {
        id: project.id,
        project_name: project.project_name,
        project_slug: project.project_slug,
        problem: project.problem,
        solution: project.solution,
        implementation: project.implementation,
        implementation_cost: project.implementation_cost,
        cost_savings: project.cost_savings,
        time_to_complete: project.time_to_complete,
        createdAt: createdAt,
        employee: `${project.employee.first_name} ${project.employee.last_name}`,
        project_employee_id: `${project.employee.id}`
    };

    return projectObj;
}