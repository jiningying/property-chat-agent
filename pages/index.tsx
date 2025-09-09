import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropertyChatWidget from '../components/PropertyChatWidget';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>realestate.com.au - Find Your Dream Home with AI</title>
        <meta name="description" content="Discover your perfect property with AI-powered search and personalized recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E31E24 0%, #C41E3A 100%)',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite'
        }}></div>

        {/* Header */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#E31E24',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                🏠
              </div>
              <div>
                <h1 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: isScrolled ? '#1f2937' : 'white',
                  margin: 0
                }}>
                  realestate.com.au
                </h1>
                <p style={{
                  fontSize: '12px',
                  color: isScrolled ? '#6b7280' : 'rgba(255,255,255,0.8)',
                  margin: 0
                }}>
                  AI-Powered Property Search
                </p>
              </div>
            </div>
            
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="#search" style={{
                color: isScrolled ? '#6b7280' : 'white',
                textDecoration: 'none',
                fontWeight: '500'
              }}>Buy</a>
              <a href="#featured" style={{
                color: isScrolled ? '#6b7280' : 'white',
                textDecoration: 'none',
                fontWeight: '500'
              }}>Rent</a>
              <a href="#how-it-works" style={{
                color: isScrolled ? '#6b7280' : 'white',
                textDecoration: 'none',
                fontWeight: '500'
              }}>Sold</a>
              <a href="#agents" style={{
                color: isScrolled ? '#6b7280' : 'white',
                textDecoration: 'none',
                fontWeight: '500'
              }}>Find Agents</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{
          paddingTop: '120px',
          paddingBottom: '80px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '2rem'
              }}>
                ✨ Powered by Advanced AI Technology
              </div>
              <h1 style={{
                fontSize: '4rem',
                fontWeight: '900',
                marginBottom: '2rem',
                background: 'linear-gradient(45deg, #fff, #e0e7ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Find Your Dream Home
                <br />
                <span style={{
                  background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  with AI Intelligence
                </span>
              </h1>
              <p style={{
                fontSize: '1.5rem',
                marginBottom: '3rem',
                opacity: 0.9,
                maxWidth: '800px',
                margin: '0 auto 3rem auto'
              }}>
                Discover your perfect property with our revolutionary AI-powered search. Get personalized recommendations, 
                market insights, and expert guidance to find the home that matches your exact needs and budget.
              </p>
            </div>
            
            {/* Search Bar */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              maxWidth: '800px',
              margin: '0 auto 4rem auto',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}>
              <input
                type="text"
                placeholder="Search by suburb, postcode, or property type..."
                style={{
                  flex: 1,
                  border: 'none',
                  padding: '16px 20px',
                  fontSize: '18px',
                  outline: 'none',
                  background: 'transparent'
                }}
              />
              <select style={{
                border: 'none',
                padding: '16px',
                fontSize: '16px',
                outline: 'none',
                background: 'transparent',
                color: '#6b7280'
              }}>
                <option>Property Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Townhouse</option>
              </select>
              <select style={{
                border: 'none',
                padding: '16px',
                fontSize: '16px',
                outline: 'none',
                background: 'transparent',
                color: '#6b7280'
              }}>
                <option>Price Range</option>
                <option>$0 - $500k</option>
                <option>$500k - $750k</option>
                <option>$750k - $1M</option>
                <option>$1M+</option>
              </select>
              <button style={{
                background: '#E31E24',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '6px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                🔍 Search
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem', color: 'white' }}>50K+</div>
                <div style={{ fontSize: '1rem', opacity: 0.8, color: 'white' }}>Properties Listed</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem', color: 'white' }}>10K+</div>
                <div style={{ fontSize: '1rem', opacity: 0.8, color: 'white' }}>Happy Customers</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem', color: 'white' }}>28 days</div>
                <div style={{ fontSize: '1rem', opacity: 0.8, color: 'white' }}>Average Time to Sell</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem', color: 'white' }}>95%</div>
                <div style={{ fontSize: '1rem', opacity: 0.8, color: 'white' }}>Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Instructions */}
        <section style={{
          background: 'white',
          padding: '80px 0',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: '900',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Try Our AI Assistant
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              Click the red chat button in the bottom right corner to get started. Our AI assistant can help you find properties based on your budget, location, and preferences.
            </p>
            <div style={{
              background: '#F5F5F5',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                Try asking:
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <div style={{
                  background: '#E31E24',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  "Show me apartments under $800k"
                </div>
                <div style={{
                  background: '#E31E24',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  "I want a 3 bedroom house"
                </div>
                <div style={{
                  background: '#E31E24',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  "What's available in Melbourne?"
                </div>
                <div style={{
                  background: '#E31E24',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  "Help me find investment properties"
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          background: '#1f2937',
          color: 'white',
          padding: '60px 0 30px 0'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#E31E24',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                🏠
              </div>
              <div>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>realestate.com.au</h4>
                <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>AI-Powered Property Discovery</p>
              </div>
            </div>
            <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
              Revolutionizing real estate with cutting-edge AI technology. Find your perfect property with personalized recommendations and transparent explanations.
            </p>
            <div style={{
              textAlign: 'center',
              paddingTop: '2rem',
              borderTop: '1px solid #374151',
              color: '#9ca3af'
            }}>
              <p>&copy; 2024 realestate.com.au. Powered by Parlant AI Technology.</p>
            </div>
          </div>
        </footer>

        {/* Property Chat Widget */}
        <PropertyChatWidget
          userId="demo_user"
          initialMessage="Hi! I'm your realestate.com.au property assistant. I can help you find the perfect property based on your needs and budget. What type of property are you looking for?"
          onPropertySelect={(property) => {
            console.log('Selected property:', property);
            alert(`You selected: ${property.address} - ${property.price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}`);
          }}
          onSaveProperty={(propertyId) => {
            console.log('Saved property:', propertyId);
            alert(`Property ${propertyId} saved to your favorites!`);
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </>
  );
}