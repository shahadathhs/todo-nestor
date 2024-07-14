import TaskList from "@/components/TaskList";

export default function TaskListPage() {
  return (
    <div>
      <p className="text-2xl font-bold mb-4 text-center">
        Tasks in Tabular format
      </p>
      <TaskList />
    </div>
  )
}
