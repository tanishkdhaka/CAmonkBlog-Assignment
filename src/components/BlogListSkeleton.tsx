export default function BlogListSkeleton() {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 space-y-3"
          >
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="h-5 w-full bg-gray-300 rounded" />
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    );
  }
  