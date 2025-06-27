import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CalendarDays, List, Sparkles, Music, Globe, Trophy, Utensils, Palette, Landmark } from "lucide-react";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { useCityStore } from "@/hooks/useCity";

const eventCategories = [
	{ name: "All", value: "" },
	{ name: "Festivals", value: "Festival", icon: "Sparkles" },
	{ name: "Music", value: "Music", icon: "Music" },
	{ name: "Cultural", value: "Cultural", icon: "Globe" },
	{ name: "Sports", value: "Sports", icon: "Trophy" },
	{ name: "Food & Wine", value: "Food", icon: "Utensils" },
	{ name: "Art", value: "Art", icon: "Palette" },
	{ name: "Traditional", value: "Traditional", icon: "Landmark" }
];

export default function Events() {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
	const { selectedCity } = useCityStore();

	const { data: events = [], isLoading } = useQuery({
		queryKey: ["/api/events", selectedCity],
		queryFn: async () => {
			const params = selectedCity ? `?city=${selectedCity}` : "";
			const response = await fetch(`/api/events${params}`);
			if (!response.ok) throw new Error("Failed to fetch events");
			return response.json();
		}
	});

	const filteredEvents = selectedCategory
		? events.filter((event: any) => event.category === selectedCategory)
		: events;

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	return (
		<div className="space-y-4">
			<div className="px-4 py-3">
				{isLoading ? (
					<div className="flex items-center justify-center h-32">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
					</div>
				) : filteredEvents.length === 0 ? (
					<div className="text-center py-8">
						<CalendarDays className="mx-auto h-12 w-12 text-gray-400" />
						<h3 className="mt-2 text-sm font-semibold text-gray-900">No events found</h3>
						<p className="mt-1 text-sm text-gray-500">
							{selectedCategory ? "Try selecting a different category" : "Check back later for upcoming events"}
						</p>
					</div>
				) : (
					<>
						<motion.h2
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xl font-bold text-gray-900 mb-4"
						>
							Upcoming Events
						</motion.h2>
						{/* View Toggle */}
						<div className="flex bg-gray-100 rounded-lg p-1 mb-4">
							<Button
								variant={viewMode === "list" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("list")}
								className="flex-1 h-9"
							>
								<List className="w-4 h-4 mr-2" />
								List View
							</Button>
							<Button
								variant={viewMode === "calendar" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("calendar")}
								className="flex-1 h-9"
							>
								<CalendarDays className="w-4 h-4 mr-2" />
								Calendar
							</Button>
						</div>
						{/* Category Filter */}
						<div className="horizontal-scroll flex space-x-2 mb-4 overflow-x-auto">
							{eventCategories.map((category) => (
								<Button
									key={category.name}
									variant={selectedCategory === category.value ? "default" : "outline"}
									size="sm"
									onClick={() => setSelectedCategory(category.value)}
									className="flex-shrink-0 rounded-full flex items-center gap-2"
								>
									{category.icon && (
										category.icon === "Sparkles" ? <Sparkles className="w-4 h-4" /> :
										category.icon === "Music" ? <Music className="w-4 h-4" /> :
										category.icon === "Globe" ? <Globe className="w-4 h-4" /> :
										category.icon === "Trophy" ? <Trophy className="w-4 h-4" /> :
										category.icon === "Utensils" ? <Utensils className="w-4 h-4" /> :
										category.icon === "Palette" ? <Palette className="w-4 h-4" /> :
										category.icon === "Landmark" ? <Landmark className="w-4 h-4" /> : null
									)}
									{category.name}
								</Button>
							))}
						</div>
					</>
				)}
			</div>

			{/* Events List */}
			<div className="px-4">
				{isLoading ? (
					<div className="space-y-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse" />
						))}
					</div>
				) : filteredEvents.length === 0 ? (
					<div className="text-center py-8">
						<CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Found</h3>
						<p className="text-gray-600">
							{selectedCategory
								? `No ${selectedCategory.toLowerCase()} events available in ${selectedCity}`
								: `No upcoming events in ${selectedCity}`
							}
						</p>
					</div>
				) : (
					<div className="space-y-4">
						{filteredEvents.map((event: any, index: number) => (
							<motion.div
								key={event.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<EventCard event={event} />
							</motion.div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
