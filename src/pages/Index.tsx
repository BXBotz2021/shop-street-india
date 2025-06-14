import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Filter, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CartSidebar } from "@/components/CartSidebar";
import { Header } from "@/components/Header";
import { FilterSidebar } from "@/components/FilterSidebar";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "Fresh Organic Apples",
    price: 120,
    originalPrice: 150,
    image: "/placeholder.svg",
    store: "Green Valley Fruits",
    rating: 4.5,
    reviews: 23,
    stock: 50,
    category: "Fruits",
    location: "Mumbai, Maharashtra"
  },
  {
    id: 2,
    name: "Basmati Rice 5kg",
    price: 450,
    originalPrice: 500,
    image: "/placeholder.svg",
    store: "Sharma Groceries",
    rating: 4.8,
    reviews: 156,
    stock: 25,
    category: "Groceries",
    location: "Delhi, Delhi"
  },
  {
    id: 3,
    name: "Handwoven Cotton Kurta",
    price: 899,
    originalPrice: 1200,
    image: "/placeholder.svg",
    store: "Traditional Threads",
    rating: 4.3,
    reviews: 67,
    stock: 15,
    category: "Clothing",
    location: "Jaipur, Rajasthan"
  },
  {
    id: 4,
    name: "Fresh Vegetables Combo",
    price: 250,
    originalPrice: 300,
    image: "/placeholder.svg",
    store: "Local Farm Fresh",
    rating: 4.6,
    reviews: 89,
    stock: 30,
    category: "Vegetables",
    location: "Pune, Maharashtra"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 2000],
    location: "",
    rating: 0
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.store.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesRating = product.rating >= filters.rating;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Local Stores, Online Shopping
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover amazing products from local stores across India
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for products, stores, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg rounded-full text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Products ({filteredProducts.length})
              </h2>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LocalMart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Support Local Business</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Shop directly from local stores and support your community's economy
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Fresh & Quality Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get fresh produce and quality items directly from trusted local vendors
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quick delivery from nearby stores, often within hours of ordering
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateCart={setCartItems}
      />

      {/* Mobile Filter Sidebar */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" onClick={() => setIsFilterOpen(false)}>×</Button>
            </div>
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
