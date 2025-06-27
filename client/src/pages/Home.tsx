import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import HorizontalScroll from "@/components/HorizontalScroll";
import AttractionCard from "@/components/AttractionCard";
import { Church, Utensils, Coffee, Beer, Camera, Ticket, Hotel, Plane, Bus } from "lucide-react";
import { useCityStore } from "@/hooks/useCity";
import { useLocation } from "wouter";
import { useEffect } from "react";

const categories = [
	{
		id: "tourist-spots",
		name: "Tourist Spots",
		description: "Attractions & sights",
		icon: Camera,
		gradient: "gradient-blue",
	},
	{
		id: "food-and-drinks",
		name: "Food & Drinks",
		description: "Restaurants & dining",
		icon: Utensils,
		gradient: "gradient-orange",
	},
	{
		id: "cafes",
		name: "Cafes",
		description: "Coffee & snacks",
		icon: Coffee,
		gradient: "gradient-green",
	},
	{
		id: "pubs-and-bars",
		name: "Shopping",
		description: "Malls and shops",
		icon: Beer,
		gradient: "gradient-purple",
	},
	{
		id: "entertainment",
		name: "Entertainment",
		description: "Shows & activities",
		icon: Ticket,
		gradient: "gradient-pink",
	},
	{
		id: "hotels",
		name: "Hotels",
		description: "Places to stay",
		icon: Hotel,
		gradient: "gradient-yellow",
	},
];

export default function Home() {
	const { selectedCity } = useCityStore();
	const [, setLocation] = useLocation();

	// Scroll to top on mount
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	const { data: trendingAttractions = [], isLoading: loadingTrending } = useQuery({
		queryKey: ["/api/attractions/trending", selectedCity],
		queryFn: async () => {
			const params = selectedCity ? `?city=${selectedCity}` : "";
			const response = await fetch(`/api/attractions/trending${params}`);
			if (!response.ok) throw new Error("Failed to fetch trending attractions");
			return response.json();
		},
	});

	const { data: featuredAttractions = [], isLoading: loadingFeatured } = useQuery({
		queryKey: ["/api/attractions/featured", selectedCity],
		queryFn: async () => {
			const params = selectedCity ? `?city=${selectedCity}` : "";
			const response = await fetch(`/api/attractions/featured${params}`);
			if (!response.ok) throw new Error("Failed to fetch featured attractions");
			return response.json();
		},
	});

	return (
		<div className="space-y-6">
			{/* Search Bar */}
			<div className="px-4 py-3 bg-white">
				<SearchBar city={selectedCity} />
			</div>

			{/* Hero Section - Now Scrollable */}
			<div className="space-y-3">
				<div className="px-4">
					<h3 className="text-lg font-semibold text-gray-900">Discover West Bengal</h3>
				</div>

				<HorizontalScroll className="px-4">
					{[
						{
							title: "Rich Cultural Heritage",
							subtitle: "Explore ancient temples & monuments",
							image: "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						},
						{
							title: "Natural Beauty",
							subtitle: "Tea gardens & mangrove forests",
							image: "https://images.unsplash.com/photo-1744340004493-c0f843bdf271?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						},
						{
							title: "Vibrant Festivals",
							subtitle: "Experience Durga Puja & more",
							image: "https://images.unsplash.com/photo-1728531149421-fbddbd127982?q=80&w=1063&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						},
						{
							title: "Spiritual Harmony",
							subtitle: "A land of temples, mosques & monasteries",
							image: "https://s7ap1.scene7.com/is/image/incredibleindia/tharpa-choling-2-kalimpong-wb-attr-hero?qlt=82&ts=1726645040969",
						},
						{
							title: "Culinary Journey",
							subtitle: "From street food to royal feasts",
							image: "https://i0.wp.com/pikturenama.com/wp-content/uploads/2019/09/DP-2019-Marriott-Kolkata-2.jpg?fit=900%2C600&ssl=1",
						},
						{
							title: "Art & Handicrafts",
							subtitle: "Terracotta, textiles & folk art",
							image: "https://s7ap1.scene7.com/is/image/incredibleindia/pattachitra-paintings-kolkata-wb-blog-art-hero?qlt=82&ts=1726644744900",
						},
						{
							title: "Adventure & Nature",
							subtitle: "Trekking, rivers, forests & wildlife",
							image: "https://images.unsplash.com/photo-1501703979959-797917eb21c8?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0",
						},
						{
							title: "Melodies of Bengal",
							subtitle: "Baul songs, Rabindra Sangeet & more",
							image: "https://gostops.com/blog/wp-content/uploads/2016/09/Baul-3.jpg",
						},
						{
							title: "Timeless Traditions",
							subtitle: "Folk dances, rituals & rural life",
							image: "https://static2.tripoto.com/media/filter/tst/img/224284/TripDocument/1501243827_16795556445_500db97db8_b.jpg",
						},
						{
							title: "Warm Hospitality",
							subtitle: "Smiles that make you feel at home",
							image: "https://lp-cms-production.imgix.net/2019-09/GettyImages-1137456204.jpg?auto=compress&format=auto&fit=crop&q=50&w=1200&h=800",
						},
					].map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							className="flex-shrink-0 w-80 h-48 relative rounded-2xl overflow-hidden shadow-lg"
							style={{
								backgroundImage: `url('${item.image}')`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<div className="absolute bottom-4 left-4 text-white">
								<h2 className="text-xl font-bold mb-1">{item.title}</h2>
								<p className="text-sm opacity-90">{item.subtitle}</p>
							</div>
						</motion.div>
					))}
				</HorizontalScroll>
			</div>

			{/* Trending Now Section */}
			<div className="space-y-3">
				<div className="px-4">
					<h3 className="text-lg font-semibold text-gray-900">Trending Now</h3>
				</div>

				{loadingTrending ? (
					<div className="px-4">
						<div className="flex space-x-4">
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="flex-shrink-0 w-64 h-40 bg-gray-200 rounded-xl animate-pulse" />
							))}
						</div>
					</div>
				) : (
					<HorizontalScroll className="px-4">
						{trendingAttractions.map((attraction: any, index: number) => (
							<motion.div
								key={attraction.id}
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<AttractionCard attraction={attraction} variant="compact" />
							</motion.div>
						))}
					</HorizontalScroll>
				)}
			</div>

			{/* Curated for You Section */}
			<div className="space-y-3">
				<div className="px-4">
					<h3 className="text-lg font-semibold text-gray-900">Curated for You</h3>
				</div>

				<HorizontalScroll className="px-4">
					{[
						{
							id: 1,
							name: "Kolkata Food Trail",
							shortDescription: "Experience authentic Bengali cuisine with local food experts",
							category: "Food & Drinks",
							city: "Kolkata",
							imageUrl: "https://www.financialexpress.com/wp-content/uploads/2017/04/bengali-reu-L.jpg",
							rating: "4.8",
							reviewCount: 2,
							entryFee: "₹999/person",
							location: "Kolkata, West Bengal",
						},
						{
							id: 2,
							name: "Sundarbans Adventure",
							shortDescription: "Explore the mystical mangrove forests and spot Royal Bengal Tigers",
							category: "Nature",
							city: "Sundarbans",
							imageUrl: "https://i.ytimg.com/vi/5zqCChpY5Ng/maxresdefault.jpg",
							rating: "4.9",
							reviewCount: 3,
							entryFee: "₹2499/person",
							location: "Sundarbans, West Bengal",
						},
						{
							id: 3,
							name: "Heritage Walk",
							shortDescription: "Discover the rich colonial architecture and history of Kolkata",
							category: "Culture",
							city: "Kolkata",
							imageUrl: "https://media.istockphoto.com/id/1203104555/vector/outline-kolkata-india-city-skyline-with-historic-buildings-isolated-on-white.jpg?s=612x612&w=0&k=20&c=SC37XfqjYqYRyUhjMdfWzo6EbjybDoJBYrCkmqs5wE0=",
							rating: "4.7",
							reviewCount: 1,
							entryFee: "₹499/person",
							location: "Kolkata, West Bengal",
						},
						{
							id: 4,
							name: "Darjeeling Tea Gardens",
							shortDescription: "Visit scenic tea plantations and learn about tea processing",
							category: "Nature",
							city: "Darjeeling",
							imageUrl: "https://traveleva.gumlet.io/activities/1202/1202_2021-06-07things10-45-49.jpg?w=1244&h=312",
							rating: "4.9",
							reviewCount: 2,
							entryFee: "₹1499/person",
							location: "Darjeeling, West Bengal",
						},
					].map((attraction, index) => (
						<motion.div
							key={attraction.id}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<AttractionCard
								attraction={attraction}
								variant="compact"
								className="border border-gray-100 hover:border-primary/20 transition-colors"
							/>
						</motion.div>
					))}
				</HorizontalScroll>
			</div>

						{/* Categories Grid */}
			<div className="px-4 space-y-3">
			<h3 className="text-lg font-semibold text-gray-900">Explore Categories</h3>
			<div className="grid grid-cols-2 gap-3">
				{categories.map((category, index) => {
				const Icon = category.icon;
				return (
					<motion.div
					key={category.name}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => setLocation(`/category/${category.id}`)} // 👈 click action added
					className={`${category.gradient} rounded-xl p-4 text-white cursor-pointer`}
					>
					<Icon className="w-6 h-6 mb-2" />
					<h4 className="font-semibold text-sm mb-1">{category.name}</h4>
					<p className="text-xs opacity-90">{category.description}</p>
					</motion.div>
				);
				})}
			</div>
			</div>


			{/* Featured Attractions */}
			<div className="px-4 space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-gray-900">Featured Attractions</h3>
						<p className="text-sm text-gray-500 mt-0.5">Handpicked places to visit</p>
					</div>
					<button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">
						View All
					</button>
				</div>

				{loadingFeatured ? (
					<div className="space-y-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse">
								<div className="flex h-full">
									<div className="w-32 bg-gray-200 rounded-l-xl" />
									<div className="flex-1 p-3 space-y-2">
										<div className="w-2/3 h-4 bg-gray-200 rounded" />
										<div className="w-1/2 h-3 bg-gray-200 rounded" />
										<div className="flex justify-between">
											<div className="w-1/3 h-3 bg-gray-200 rounded" />
											<div className="w-1/4 h-3 bg-gray-200 rounded" />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="space-y-4">
						{featuredAttractions.map((attraction: any, index: number) => (
							<motion.div
								key={attraction.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="transform transition-transform hover:-translate-y-1"
							>
								<AttractionCard
									attraction={attraction}
									variant="horizontal"
									className="border border-gray-100 hover:border-primary/20 transition-colors"
								/>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
