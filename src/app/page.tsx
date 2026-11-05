import { Banner } from "@/components/banner";
import { BrowseCategories } from "@/components/browse-categories";
import { FeaturedStudios } from "@/components/featured-studios";
import { HowBookingWorks } from "@/components/how-booking-works";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Banner />
      <FeaturedStudios />
      <BrowseCategories />
      <HowBookingWorks />
    </div>
  );
}
