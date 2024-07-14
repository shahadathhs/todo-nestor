'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface EditTaskModalProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
}

export default function EditTaskModal({ task, onSave, onClose }: EditTaskModalProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      onSave({ ...task, title });
    }
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-96">
        <h2 className="text-xl mb-4 font-bold">Edit Title</h2>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="destructive" onClick={onClose} >Cancel</Button>
          <Button onClick={handleSave} >Save</Button>
        </div>
      </div>
    </div>
  );
}
