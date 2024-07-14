import { ModeToggle } from "../ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="flex justify-between p-2 md:px-4">
      <div>
        <Image src="/check-circle.png" alt="logo image" width={45} height={45} className="bg-white rounded-full" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/" >Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/tasks" >Tasks</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </div>
    </div>
  )
}
