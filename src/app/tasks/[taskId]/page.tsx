import { useRouter } from "next/router";

export default function TaskDetailsPage() {
  const { query } = useRouter();

  return (
    <div>
      <p>Task details</p>
    </div>
  );
}
