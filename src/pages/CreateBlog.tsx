import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function CreateBlog() {
    const queryClient = useQueryClient()
    const [title, setTitle] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const postBlog = async () => {
        const res = await fetch("http://localhost:3001/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            coverImage,
            category: category.split(",").map((cat) => cat.trim()),
            description,
            content,
            date: new Date().toISOString(),
          }),
        });
      
        if (!res.ok) {
          throw new Error("Failed to create blog");
        }
      
        return res.json();
      };
     

      const createBlogMutation = useMutation({
        mutationFn: postBlog,
        onSuccess: () => {
            alert("Blog Created Successfully");
            setCategory("");
            setContent("");
            setCoverImage("");
            setDescription("");
            setTitle("");

          queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
      });
      
    
  return (
    <div className="flex flex-col max-w-3xl mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-semibold mx-auto">Create Blog</h1>
      <form onSubmit={()=>createBlogMutation.mutate()} className="flex flex-col gap-4 mt-6">
        <Label htmlFor="title">Title</Label>
        <Input onChange={(e)=>setTitle(e.target.value)} value={title} id="title" type="text" placeholder="Blog Title" />
        <Label htmlFor="cover">Cover Image</Label>
        
        <Input onChange={(e)=>setCoverImage(e.target.value)} value={coverImage} id="cover" type="text" placeholder="Image Link" />
        <Label htmlFor="category">Categories</Label>

        <Input onChange={(e)=>setCategory(e.target.value)} value={category} id="category" type="text" placeholder="Category" />
        <Label htmlFor="description">Description</Label>
        <Input onChange={(e)=>setDescription(e.target.value)}  value={description} id="description" type="text" placeholder="Blog Description" />
        <Label htmlFor="content">Content</Label>
        <Textarea
        onChange={(e)=>setContent(e.target.value)} value={content}
          id="content"
          placeholder="Blog Content"
          className="min-h-60"
          rows={10}
        />
        <Button type="submit" size={"lg"} className="text-2xl">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateBlog;
