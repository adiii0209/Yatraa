import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Percent, Copy, Calendar, Hotel, UtensilsCrossed, Map, Plane, Sparkles, Mountain, Coffee, ShoppingBag, Utensils, Bus, Train, Car, Bike, Camera, Music, Ticket, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";

const offerCategories = [
	{
		name: "Featured",
		value: "",
		icon: "Sparkles",
		gradient: "from-purple-500 to-purple-600",
	},
	{
		name: "Hotel deals",
		value: "Hotels",
		icon: "Hotel",
		gradient: "from-blue-500 to-blue-600",
	},
	{
		name: "Restaurants",
		value: "Restaurants",
		icon: "Utensils",
		gradient: "from-red-500 to-red-600",
	},
	{
		name: "Cafes",
		value: "Cafes",
		icon: "Coffee",
		gradient: "from-amber-500 to-amber-600",
	},
	{
		name: "Shopping",
		value: "Shopping",
		icon: "ShoppingBag",
		gradient: "from-pink-500 to-pink-600",
	},
	{
		name: "Food & Dining",
		value: "Food",
		icon: "UtensilsCrossed",
		gradient: "from-orange-500 to-orange-600",
	},
	{
		name: "Tours & Activities",
		value: "Tours",
		icon: "Map",
		gradient: "from-green-500 to-green-600",
	},
	{
		name: "Spa & Wellness",
		value: "Wellness",
		icon: "Sparkles",
		gradient: "from-purple-500 to-purple-600",
	},
	{
		name: "Adventure",
		value: "Adventure",
		icon: "Mountain",
		gradient: "from-yellow-500 to-yellow-600",
	},
	{
		name: "Local Transport",
		value: "LocalTransport",
		icon: "Bus",
		gradient: "from-cyan-500 to-cyan-600",
	},
	{
		name: "Train Travel",
		value: "Train",
		icon: "Train",
		gradient: "from-slate-500 to-slate-600",
	},
	{
		name: "Car Rental",
		value: "CarRental",
		icon: "Car",
		gradient: "from-zinc-500 to-zinc-600",
	},
	{
		name: "Bike Rental",
		value: "BikeRental",
		icon: "Bike",
		gradient: "from-lime-500 to-lime-600",
	},
	{
		name: "Photography",
		value: "Photography",
		icon: "Camera",
		gradient: "from-rose-500 to-rose-600",
	},
	{
		name: "Entertainment",
		value: "Entertainment",
		icon: "Music",
		gradient: "from-violet-500 to-violet-600",
	},
	{
		name: "Events",
		value: "Events",
		icon: "Ticket",
		gradient: "from-emerald-500 to-emerald-600",
	},
	{
		name: "Air Travel",
		value: "AirTravel",
		icon: "Plane",
		gradient: "from-sky-500 to-sky-600",
	},
	{
		name: "Seasonal",
		value: "Seasonal",
		icon: "Calendar",
		gradient: "from-red-400 to-red-500",
	},
];

export default function Offers() {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [showDetails, setShowDetails] = useState(false);

	const handleViewDetails = () => {
		setShowDetails(true);
	};

	const handleCloseDetails = () => {
		setShowDetails(false);
	};
	const { toast } = useToast();

	const { data: offers = [], isLoading } = useQuery({
		queryKey: ["/api/offers/active"],
		queryFn: async () => {
			const response = await fetch("/api/offers/active");
			if (!response.ok) throw new Error("Failed to fetch active offers");
			return response.json();
		},
	});

	const filteredOffers = selectedCategory
		? offers.filter((offer: any) => offer.category === selectedCategory)
		: offers;

	const bengalOffers = [
		{
			id: 'hotel-1',
			title: 'Winter offer at Grand Millennium Kolkata',
			description: 'Luxury stay with complimentary breakfast and spa access',
			category: 'Hotels',
			image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/32092064.jpg?k=dd24bc3c456f4e487e5841a7beb32c25bb11b7ae676b0ddb566423682675bf0e&o=&hp=1',
			validUntil: '2025-12-31',
			code: 'WINTER25',
			discount: '25% OFF'
		},
		{
			id: 'restaurant-1',
			title: 'Bengali Cuisine Festival',
			description: 'Traditional Bengali thali with special festive menu',
			category: 'Restaurants',
			image: 'https://im.idiva.com/content/2019/May/iDiva_AtoZ_Bengali_Food_lead_5cee1bba2e585.png',
			validUntil: '2024-03-31',
			code: 'BENGALI30',
			discount: '30% OFF'
		},
		{
			id: 'tour-1',
			title: 'Sundarbans Explorer Package',
			description: 'All-inclusive mangrove forest tour with boat safari',
			category: 'Tours',
			image: 'https://i.ytimg.com/vi/5zqCChpY5Ng/maxresdefault.jpg',
			validUntil: '2024-06-30',
			code: 'SUNDERBAN20',
			discount: '20% OFF'
		},
		{
			id: 'cafe-1',
			title: 'Heritage Coffee Trail',
			description: 'Experience Kolkata\'s historic cafes with special discounts',
			category: 'Cafes',
			image: 'https://images.squarespace-cdn.com/content/v1/578753d7d482e9c3a909de40/1605622055045-Y4YVEB3IZWMR2AB7USZW/indiacoffeehouselead1-1024x576.jpg?format=2500w',
			validUntil: '2024-04-30',
			code: 'COFFEE25',
			discount: '25% OFF'
		},
		{
			id: 'shopping-1',
			title: 'New Market Shopping Festival',
			description: 'Special discounts at Kolkata\'s iconic shopping destination',
			category: 'Shopping',
			image: 'https://www.treebo.com/blog/wp-content/uploads/2018/03/Shopping-Places-in-Kolkata.jpg',
			validUntil: '2024-03-15',
			code: 'MARKET40',
			discount: '40% OFF'
		},
		{
			id: 'adventure-1',
			title: 'Darjeeling Adventure Week',
			description: 'Special rates on trekking and adventure activities',
			category: 'Adventure',
			image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/5c/2f.jpg',
			validUntil: '2024-05-31',
			code: 'TREK30',
			discount: '30% OFF'
		}
	];

	const displayOffers = selectedCategory
		? bengalOffers.filter(offer => {
			const categoryMap: { [key: string]: string } = {
				'Hotels': 'Hotels',
				'Restaurants': 'Restaurants',
				'Cafes': 'Cafes',
				'Shopping': 'Shopping',
				'Tours': 'Tours',
				'Adventure': 'Adventure'
			};
			return offer.category === categoryMap[selectedCategory];
		})
		: bengalOffers;

	const copyCode = (code: string) => {
		navigator.clipboard.writeText(code);
		toast({
			title: "Code Copied!",
			description: `Promo code ${code} copied to clipboard`,
		});
	};

	const getGradientClass = (backgroundColor: string) => {
		const gradientMap: { [key: string]: string } = {
			"from-blue-500 to-blue-600": "gradient-blue",
			"from-red-500 to-red-600": "gradient-red",
			"from-amber-500 to-amber-600": "gradient-amber",
			"from-pink-500 to-pink-600": "gradient-pink",
			"from-orange-500 to-orange-600": "gradient-orange",
			"from-green-500 to-green-600": "gradient-green",
			"from-purple-500 to-purple-600": "gradient-purple",
			"from-yellow-500 to-yellow-600": "gradient-yellow",
			"from-cyan-500 to-cyan-600": "gradient-cyan",
			"from-slate-500 to-slate-600": "gradient-slate",
			"from-zinc-500 to-zinc-600": "gradient-zinc",
			"from-lime-500 to-lime-600": "gradient-lime",
			"from-rose-500 to-rose-600": "gradient-rose",
			"from-violet-500 to-violet-600": "gradient-violet",
			"from-emerald-500 to-emerald-600": "gradient-emerald",
			"from-sky-500 to-sky-600": "gradient-sky",
			"from-red-400 to-red-500": "gradient-red-light",
		};
		return gradientMap[backgroundColor] || "gradient-blue";
	};

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);

	return (
		<div className="space-y-4 pb-20">
			<div className="px-4 py-3 bg-white sticky top-0 z-10">
				{isLoading ? (
					<div className="flex items-center justify-center h-32">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
					</div>
				) : filteredOffers.length === 0 ? (
					<div className="text-center py-8">
						<Percent className="mx-auto h-12 w-12 text-gray-400" />
						<h3 className="mt-2 text-sm font-semibold text-gray-900">
							No offers available
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							{selectedCategory
								? "Try selecting a different category"
								: "Check back later for new offers"}
						</p>
					</div>
				) : (
					<>
						{/* Category Filter */}
						<div className="horizontal-scroll flex space-x-2 mb-4 overflow-x-auto">
							{offerCategories.map((category) => (
								<Button
									key={category.name}
									variant={
										selectedCategory === category.value
											? "default"
											: "outline"
									}
									size="sm"
									onClick={() => setSelectedCategory(category.value)}
									className="flex-shrink-0 rounded-full flex items-center gap-2"
								>
									{category.icon && (
										category.icon === "Percent" ? (
											<Percent className="w-4 h-4" />
										) : category.icon === "Hotel" ? (
											<Hotel className="w-4 h-4" />
										) : category.icon === "Utensils" ? (
											<Utensils className="w-4 h-4" />
										) : category.icon === "Coffee" ? (
											<Coffee className="w-4 h-4" />
										) : category.icon === "ShoppingBag" ? (
											<ShoppingBag className="w-4 h-4" />
										) : category.icon === "UtensilsCrossed" ? (
											<UtensilsCrossed className="w-4 h-4" />
										) : category.icon === "Map" ? (
											<Map className="w-4 h-4" />
										) : category.icon === "Sparkles" ? (
											<Sparkles className="w-4 h-4" />
										) : category.icon === "Mountain" ? (
											<Mountain className="w-4 h-4" />
										) : category.icon === "Bus" ? (
											<Bus className="w-4 h-4" />
										) : category.icon === "Train" ? (
											<Train className="w-4 h-4" />
										) : category.icon === "Car" ? (
											<Car className="w-4 h-4" />
										) : category.icon === "Bike" ? (
											<Bike className="w-4 h-4" />
										) : category.icon === "Camera" ? (
											<Camera className="w-4 h-4" />
										) : category.icon === "Music" ? (
											<Music className="w-4 h-4" />
										) : category.icon === "Ticket" ? (
											<Ticket className="w-4 h-4" />
										) : category.icon === "Plane" ? (
											<Plane className="w-4 h-4" />
										) : category.icon === "Calendar" ? (
											<Calendar className="w-4 h-4" />
										) : null
									)}
									{category.name}
								</Button>
							))}
						</div>
					</>
				)}
			</div>



			{/* Featured Offers */}
      <div className="px-4">
        <div className="space-y-4">
          {displayOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className=""
            >
              <div
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer card-hover"
                tabIndex={0}
                aria-label={offer.title}
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                  onError={e => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/placeholder-event.jpg';
                    img.onerror = null;
                  }}
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{offer.title}</h3>
                      <p className="text-sm text-gray-600">{offer.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">
                        {offer.validUntil ? format(parseISO(offer.validUntil), "MMM dd") : null}
                      </p>
                      <p className="text-xs text-gray-500">
                        {offer.validUntil ? format(parseISO(offer.validUntil), "yyyy") : null}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span>{offer.description}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{offer.discount}</span>
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium"
                      onClick={() => copyCode(offer.code)}
                    >
                      {offer.code}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {isLoading ? (
					<div className="space-y-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="h-32 bg-gray-200 rounded-xl animate-pulse"
							/>
						))}
					</div>
				) : filteredOffers.length === 0 ? (
					<div className="text-center py-8">
						<Percent className="w-12 h-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							No Offers Available
						</h3>
						<p className="text-gray-600">
							{selectedCategory
								? `No ${selectedCategory.toLowerCase()} offers available right now`
								: "No active offers available right now"}
						</p>
					</div>
				) : (
					<div className="space-y-4">
						{filteredOffers.map((offer: any, index: number) => (
							<motion.div
								key={offer.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
							>
								<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/20 to-transparent pointer-events-none" />
								<img
									src={
										offer.image ||
										`https://source.unsplash.com/800x600/?${offer.category?.toLowerCase() || 'hotel'}`
									}
									alt={offer.title}
									className="w-full h-48 object-cover"
								/>
								<div className="absolute top-4 right-4">
									<Button
										variant="ghost"
										size="icon"
										className="bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 rounded-full"
									>
										<Heart className="w-4 h-4" />
									</Button>
								</div>
								<div className="p-4">
									<h3 className="font-bold text-lg text-gray-900 mb-2">
										{offer.title}
									</h3>
									<p className="text-sm text-gray-600 mb-4">
										{offer.description}
									</p>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center text-sm text-gray-500">
											<Calendar className="w-4 h-4 mr-1" />
											<span>
												{format(
													parseISO(offer.validUntil),
													"MMM dd, yyyy"
												)}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Button
												size="sm"
												variant="outline"
												onClick={() => copyCode(offer.code)}
												className="text-gray-600"
											>
												{offer.code}
											</Button>
										</div>
									</div>
									<Button
										size="sm"
										className="w-full bg-blue-500 hover:bg-blue-600 text-white"
									>
										View Details
									</Button>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
