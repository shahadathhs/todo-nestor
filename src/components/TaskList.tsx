'use client';

import { useState, useEffect } from "react";
import axios from "@/utils/api";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import EditTaskModal from "./EditTaskModal";
import Swal from 'sweetalert2'

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TASKS_PER_PAGE = 5;

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/todos");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (taskId: number) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          await axios.delete(`/todos/${taskId}`);
          setTasks(tasks.filter(task => task.id !== taskId));
          Swal.fire({
            title: "Deleted!",
            text: "Your TODO has been deleted.",
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };  

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = async (updatedTask: Task) => {
    try {
      await axios.put(`/todos/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
      setEditingTask(null);
      Swal.fire({
        title: "Updated!",
        text: "Your TODO has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK"
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const paginatedTasks = tasks.slice((currentPage - 1) * TASKS_PER_PAGE, currentPage * TASKS_PER_PAGE);
  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  return (
    <div>
      <div className="max-w-2xl mx-auto px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.completed ? "Completed" : "Incomplete"}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline"><CiMenuKebab /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem 
                        onClick={() => handleEdit(task)}
                        className="flex items-center gap-2"
                      >
                        Edit <FaRegEdit />
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(task.id)}
                        className="flex items-center gap-2"
                      >
                        Delete <MdDelete />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                className={currentPage === 1 ? 'disabled' : ''}
              />
            </PaginationItem>
            {/* {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))} */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                className={currentPage === totalPages ? 'disabled' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <EditTaskModal
        task={editingTask}
        onSave={handleSaveEdit}
        onClose={() => setEditingTask(null)}
      />
    </div>
  );
}
