import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft, Heart, Share2, Phone, Mail, MapPin, Bed, Bath, Car, Square, Calendar, Eye, Star, ChevronLeft, ChevronRight, Home, TrendingUp, Shield, Users } from 'lucide-react';

interface Property {
  id: string;
  address: string;
  price: number;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  car_spaces: number;
  features: string[];
  images: string[];
  agent_contact: string;
  suburb: string;
  state: string;
  postcode: string;
  description: string;
  size: number;
  year_built: number;
  listing_date: string;
  views: number;
  match_score?: number;
  agent_name: string;
  agent_phone: string;
  agent_email: string;
  agent_rating: number;
  agent_sales: number;
}

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock property data - in real app, this would come from API
  const mockProperty: Property = {
    id: "prop_001",
    address: "123 Collins Street, Melbourne VIC 3000",
    price: 1200000,
    property_type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    car_spaces: 1,
    features: ["City views", "Balcony", "Gym", "Pool", "Concierge", "Air conditioning", "Dishwasher", "Built-in wardrobes"],
    images: ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"],
    agent_contact: "Sarah Johnson - 0400 123 456",
    suburb: "Melbourne",
    state: "VIC",
    postcode: "3000",
    description: "Stunning modern apartment in the heart of Melbourne CBD with panoramic city views and premium amenities. This beautifully designed 2-bedroom apartment offers the perfect blend of luxury and convenience. The open-plan living area flows seamlessly to a private balcony with breathtaking city views. The modern kitchen features high-end appliances and stone benchtops, while the master bedroom includes a walk-in wardrobe and ensuite bathroom. Building amenities include a state-of-the-art gym, swimming pool, and 24/7 concierge service.",
    size: 85,
    year_built: 2018,
    listing_date: "2024-01-15",
    views: 1247,
    match_score: 95,
    agent_name: "Sarah Johnson",
    agent_phone: "0400 123 456",
    agent_email: "sarah.johnson@propertymatch.com",
    agent_rating: 4.9,
    agent_sales: 127
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperty(mockProperty);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <button
            onClick={() => router.back()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{property.address} - PropertyMatch Pro</title>
        <meta name="description" content={property.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg font-bold">🏠</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">PropertyMatch Pro</h1>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-lg transition-colors ${
                    isSaved ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <div className="h-96 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="text-center text-white z-10">
                      <div className="text-8xl mb-4">🏠</div>
                      <div className="text-lg font-semibold opacity-90">Property Image {currentImageIndex + 1}</div>
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.address}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      {property.suburb}, {property.state} {property.postcode}
                    </div>
                    <div className="text-4xl font-bold text-indigo-600 mb-4">
                      {formatPrice(property.price)}
                    </div>
                  </div>
                  {property.match_score && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                      {property.match_score}% AI Match
                    </div>
                  )}
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Bed className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Bath className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Car className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.car_spaces}</div>
                    <div className="text-sm text-gray-600">Car Spaces</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Square className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.size}</div>
                    <div className="text-sm text-gray-600">m²</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-indigo-50 rounded-lg">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Information</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex justify-between">
                        <span>Property Type:</span>
                        <span className="font-medium capitalize">{property.property_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Year Built:</span>
                        <span className="font-medium">{property.year_built}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="font-medium">{property.size} m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Listed:</span>
                        <span className="font-medium">{new Date(property.listing_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Viewing Information</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex justify-between">
                        <span>Views:</span>
                        <span className="font-medium">{property.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-medium text-green-600">Available</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inspection:</span>
                        <span className="font-medium">By Appointment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">SJ</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{property.agent_name}</h4>
                  <p className="text-gray-600">Senior Property Consultant</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{property.agent_rating}</span>
                    <span className="text-sm text-gray-500">({property.agent_sales} sales)</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Phone className="h-5 w-5" />
                    <span>Call Now</span>
                  </button>
                  <button className="w-full border-2 border-indigo-200 text-indigo-600 py-3 px-4 rounded-xl font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Send Email</span>
                  </button>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <span className="text-2xl">🤖</span>
                  <span>AI Insights</span>
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Why This Property Matches You</h4>
                    <p className="text-sm text-gray-600">
                      This property scores 95% match based on your preferences for modern apartments, city views, and premium amenities.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Market Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Properties in this area have increased 8.5% in value over the past year, making it a strong investment opportunity.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Similar Properties</h4>
                    <p className="text-sm text-gray-600">
                      We found 3 similar properties in your price range that you might also be interested in.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                    Schedule Inspection
                  </button>
                  <button className="w-full border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Get Pre-approval
                  </button>
                  <button className="w-full border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Calculate Repayments
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
