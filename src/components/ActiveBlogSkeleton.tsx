export default function ActiveBlogSkeleton() {
    return (
      <div className="animate-pulse flex flex-col">
        <div className="h-72 w-full bg-gray-300" />
  
        <div className="p-6 space-y-4">
          <div className="h-4 w-32 bg-gray-300 rounded" />
          <div className="h-8 w-3/4 bg-gray-300 rounded" />
  
          <div className="grid grid-cols-3 gap-6 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-300 rounded" />
              </div>
            ))}
          </div>
  
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-5/6 bg-gray-300 rounded" />
            <div className="h-4 w-4/6 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    );
  }
  