import { useRouter } from "next/router";

export default function EditTaskPage() {
  const { query } = useRouter();
  const { taskId } = query;

  return (
    <div>
      <h2>Edit Task</h2>
    </div>
  );
}
