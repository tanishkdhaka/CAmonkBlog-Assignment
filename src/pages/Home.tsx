import {


    useQuery,
  } from "@tanstack/react-query";
  import type { Blog } from "../types/Blog";
  import { useState } from "react";
  import BlogListSkeleton from "../components/BlogListSkeleton";
  import ActiveBlogSkeleton from "../components/ActiveBlogSkeleton";
function Home() {
 
  
    const [activeBlogId, setActiveBlogId] = useState("1");
  
    const getBlogs = async () => {
      const res = await fetch("http://localhost:3001/blogs");
      return res.json();
    };
    const getActiveBlog = async () => {
      const res = await fetch(`http://localhost:3001/blogs/${activeBlogId}`);
  
      return res.json();
    };
    const {
      data: blogs,
      isPending,
      isError,
      error,
    } = useQuery<Blog[]>({
      queryKey: ["blogs"],
      queryFn: getBlogs,
    });
  
    const {
      data: activeBlog,
      isPending: activeBlogLoading,
      isError: activeBlogError,
      error: activeBlogErrorObj,
    } = useQuery<Blog>({
      queryKey: ["activeBlog", activeBlogId],
      queryFn: getActiveBlog,
      enabled: !!activeBlogId,
    });
  
   
    if (activeBlogError)
      return <div>{activeBlogErrorObj.message}:-Something went wrong</div>;
  
    if (isError) return <div>{error.message}:-Something went wrong</div>;
  
    console.log(activeBlog);
    console.log(blogs);
    return (
      <div className="flex gap-3 flex-col min-h-screen">
        {/* Hero section */}
        <div className="flex flex-col items-center justify-center gap-6 h-60 ">
          <h1 className="text-6xl font-semibold font-serif tracking-wide">
            CA Monk Blogs
          </h1>
          <p className="text-xl tracking-wider max-w-3xl text-gray-500 ">
            Stay updated with the latest trends in finance, accounting, and career
            growth
          </p>
        </div>
        {/* Blog section */}
        <div className="flex p-6 bg-gray-100 min-h-screen">
          {/* All Blogs cards here */}
          <div className="w-[35%] p-3">
            <div className="flex flex-col   gap-4  ">
              <h1 className="text-xl font-bold mb-5 tracking-wide">
                Latest Articles
              </h1>
              <div className="flex flex-col gap-4 w-full overflow-y-scroll h-[80vh]">
                {isPending? (<BlogListSkeleton/>):( blogs.map((blog: Blog) => (
                  <div
                    onClick={() => {
                      setActiveBlogId(blog.id);
                    }}
                    key={blog.id}
                    className={
                      activeBlogId == blog.id
                        ? "border-l-6 gap-1 border-primary cursor-pointer flex py-3 px-5 flex-col bg-white rounded-2xl"
                        : "cursor-pointer flex py-3 gap-1 px-5 flex-col bg-white rounded-2xl"
                    }
                  >
                    <div className="flex justify-between items-center g text-sm upper">
                      {" "}
                      <h3
                        className={
                          activeBlogId == blog.id
                            ? "text-sm text-primary"
                            : "text-sm"
                        }
                      >
                        {blog.category[0]}
                      </h3>{" "}
                      <span className="text-gray-500">{daysAgo(blog.date)}</span>
                    </div>
                    <h1 className="text-lg font-bold">{blog.title}</h1>
                    <p className="text-sm text-gray-500"> {blog.description}</p>
                  </div>)
                ))}
              </div>
            </div>
          </div>
  
          {/* Blog details page */}
          <div className="w-[65%] rounded-2xl overflow-hidden bg-white  ml-6 flex flex-col ">
           {
            activeBlogLoading|| !activeBlog ? (<ActiveBlogSkeleton/>):(
              <>
              <img
                src={activeBlog.coverImage}
                alt="okay"
                className="w-full h-130"
              />
              <div className="flex flex-col gap-3 p-6">
                <div className="flex gap-3 items-center">
                <span className="text-primary font-semibold tracking-wider">{activeBlog.category}</span>
                <span>*</span>
                <span className="text-gray-400  capitalize">{Math.floor(activeBlog.content.length/238 )} Mins</span>
                </div>
                <h1 className="text-4xl font-bold tracking-wider">{activeBlog.title}</h1>
    
               {/*category date read time  */}
    
                <div className="grid  grid-cols-3 gap-6 mt-4 bg-gray-100 p-4 rounded-lg">
                  <div className="flex text-gray-500  flex-col gap-1 border-r-2 pr-4 items-center"> 
                    <h3>CATEGORY</h3>
                    <p className=" text-black capitalize">{activeBlog.category.join(", ")}</p>
                  </div>
                  <div className="flex text-gray-500  flex-col gap-1 border-r-2 pr-4 items-center"> 
                    <h3>READ TIME</h3>
                    <p className="text-black capitalize">{Math.floor(activeBlog.content.length/238 )} Mins</p>
                  </div>
                  <div className="flex text-gray-500  flex-col gap-1  pr-4 items-center"> 
                    <h3>DATE</h3>
                    <p className="text-black capitalize">{activeBlog.date.slice(0,10)}</p>
                  </div>
    
                </div>
    
    
                {/* descscription */}
    
                <div>
                  <p className="text-gray-700 leading-7 tracking-wide">
                    {activeBlog.description}
                  </p>
                </div>
    
                {/* content */}
    
                <div>
                  <p>{activeBlog.content}</p>
                </div>
              </div>
              </>
            )
           }
          </div>
        </div>
      </div>
    );
  }
  function daysAgo(createdAt: string | Date) {
    const createdDate = new Date(createdAt);
    const now = new Date();
  
    const diffInMs = now.getTime() - createdDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  }
  export default Home;