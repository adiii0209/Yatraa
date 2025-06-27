import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import AttractionDetails from "@/components/AttractionDetails";

export default function ShopDetail() {
  const { id } = useParams();
  const { data: shop, isLoading } = useQuery({
    queryKey: [`/api/shops/${id}`],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/shops/${id}`);
      if (!response.ok) throw new Error("Failed to fetch shop");
      return response.json();
    }
  });

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

  if (!shop) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Shop Not Found</h3>
          <p className="text-gray-600">The shop you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <AttractionDetails attraction={shop} />;
}
