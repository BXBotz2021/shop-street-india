
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  filters: {
    category: string;
    priceRange: number[];
    location: string;
    rating: number;
  };
  onFiltersChange: (filters: any) => void;
}

const categories = ["Fruits", "Vegetables", "Groceries", "Clothing", "Electronics", "Home & Garden"];
const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Jaipur"];
const ratings = [4, 3, 2, 1];

export const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: "",
      priceRange: [0, 2000],
      location: "",
      rating: 0
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/*Categories*/}
          <div>
            <Label className="text-sm font-medium mb-3 block">Categories</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filters.category === category ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => updateFilter("category", filters.category === category ? "" : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
            </Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={2000}
              min={0}
              step={50}
              className="mt-2"
            />
          </div>

          {/* Location */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Location</Label>
            <div className="space-y-2">
              {locations.map((location) => (
                <Button
                  key={location}
                  variant={filters.location === location ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => updateFilter("location", filters.location === location ? "" : location)}
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <Button
                  key={rating}
                  variant={filters.rating === rating ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => updateFilter("rating", filters.rating === rating ? 0 : rating)}
                >
                  {rating}+ Stars
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
