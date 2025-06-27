import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import AttractionDetails from "@/components/AttractionDetails";

export default function DetailPage() {
  const { id } = useParams();

  const { data: item, isLoading } = useQuery({
    queryKey: [`/api/categories/item/${id}`],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/categories/item/${id}`);
      if (!response.ok) throw new Error("Failed to fetch item");
      return response.json();
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-64 bg-gray-200 animate-pulse" />
        <div className="px-4 space-y-3">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Item Not Found</h3>
          <p className="text-gray-600">The item you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <AttractionDetails attraction={item} />;
}