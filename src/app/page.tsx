import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center  max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-4">Welcome to  Todo Nestor</h1>
      <p className="text-lg mb-8 text-center">
        Manage your tasks efficiently with Todo Nestor. Create, edit, and keep track of your tasks easily.
      </p>
      <Button>
        <Link href="/tasks" >
          Go to Task List
        </Link>
      </Button>
      
      <p className="text-xl my-8 text-center ">
        You can read our posts too.
      </p>
      <Button variant="outline">
        <Link href="/posts" >
          Go to posts
        </Link>
      </Button>
    </div>
  );
}
