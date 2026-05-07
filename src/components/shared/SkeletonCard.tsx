export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden animate-pulse">
      <div className="aspect-square bg-[#F3F4F6]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#F3F4F6] rounded w-3/4" />
        <div className="h-3 bg-[#F3F4F6] rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-5 bg-[#F3F4F6] rounded w-20" />
          <div className="h-5 bg-[#F3F4F6] rounded w-16" />
        </div>
        <div className="h-3 bg-[#F3F4F6] rounded w-24" />
      </div>
    </div>
  );
}
