'use client';

import { useState, useEffect } from "react";
import axios from "@/utils/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const POSTS_PER_PAGE = 20;

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTotalPosts();
    fetchPosts();
  }, []);

  const fetchTotalPosts = async () => {
    try {
      const response = await axios.get("/posts");
      setTotalPosts(response.data.length);
    } catch (error) {
      console.error("Error fetching total posts:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/posts?_start=${(currentPage - 1) * POSTS_PER_PAGE}&_limit=${POSTS_PER_PAGE}`);
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (currentPage > 1) {
      fetchPosts();
    }
  }, [currentPage]);

  return (
    <div className="container mx-auto p-4">
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-lg text-gray-600">Discover the latest news and articles from our authors.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="border p-4 rounded shadow-md">
            <CardHeader>
              <CardTitle className="font-semibold">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700">{post.body}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* load more posts */}
      {posts.length < totalPosts && (
        <div className="text-center mt-8">
          <Button onClick={loadMorePosts} disabled={isLoading}>
            {isLoading ? "Loading..." : "See More"}
          </Button>
        </div>
      )}
    </div>
  );
}
