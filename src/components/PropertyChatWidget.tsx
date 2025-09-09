import React, { useState, useRef, useEffect } from 'react';

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
  description?: string;
  size?: number;
  year_built?: number;
  listing_date?: string;
  views?: number;
  match_score?: number;
}

interface PropertyChatWidgetProps {
  userId: string;
  initialMessage: string;
  onPropertySelect: (property: Property) => void;
  onSaveProperty: (propertyId: string) => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  recommendations?: Property[];
  type?: string;
}

const PropertyChatWidget: React.FC<PropertyChatWidgetProps> = ({
  userId,
  initialMessage,
  onPropertySelect,
  onSaveProperty
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: initialMessage,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/parlant-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          userId: userId,
          context: {}
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
        recommendations: data.recommendations || [],
        type: data.type
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const quickActions = [
    "Show me apartments under $800k",
    "I'm looking for a 3 bedroom house",
    "What's available in Melbourne?",
    "Help me find investment properties"
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#E31E24', // realestate.com.au red
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(227, 30, 36, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(227, 30, 36, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(227, 30, 36, 0.4)';
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '400px',
            height: '600px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1001,
            border: '1px solid #E5E5E5'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#E31E24',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}
              >
                🏠
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                  realestate.com.au
                </h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
                  Property Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
                padding: '4px'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                    marginBottom: '8px'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      background: message.isUser ? '#E31E24' : '#F5F5F5',
                      color: message.isUser ? 'white' : '#333333',
                      fontSize: '14px',
                      lineHeight: '1.4'
                    }}
                  >
                    {message.text}
                  </div>
                </div>

                {/* Property Recommendations */}
                {message.recommendations && message.recommendations.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    {message.recommendations.map((property) => (
                      <div
                        key={property.id}
                        style={{
                          border: '1px solid #E5E5E5',
                          borderRadius: '8px',
                          padding: '16px',
                          marginBottom: '12px',
                          background: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#E31E24';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(227, 30, 36, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E5E5E5';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        onClick={() => onPropertySelect(property)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#333333' }}>
                            {property.address}
                          </h4>
                          {property.match_score && (
                            <span style={{
                              background: '#E31E24',
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}>
                              {property.match_score}% match
                            </span>
                          )}
                        </div>
                        
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#E31E24', marginBottom: '8px' }}>
                          {formatPrice(property.price)}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#666666', marginBottom: '8px' }}>
                          <span>🛏️ {property.bedrooms} bed</span>
                          <span>🚿 {property.bathrooms} bath</span>
                          <span>🚗 {property.car_spaces} car</span>
                          {property.size && <span>📐 {property.size}m²</span>}
                        </div>
                        
                        <div style={{ fontSize: '12px', color: '#666666' }}>
                          📍 {property.suburb}, {property.state} {property.postcode}
                        </div>
                        
                        {property.description && (
                          <p style={{ fontSize: '12px', color: '#666666', margin: '8px 0 0 0', lineHeight: '1.3' }}>
                            {property.description}
                          </p>
                        )}
                        
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                          <button
                            style={{
                              flex: 1,
                              background: '#E31E24',
                              color: 'white',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onPropertySelect(property);
                            }}
                          >
                            View Details
                          </button>
                          <button
                            style={{
                              padding: '8px 12px',
                              border: '1px solid #E5E5E5',
                              borderRadius: '6px',
                              background: 'white',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSaveProperty(property.id);
                            }}
                          >
                            💾 Save
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '18px',
                    background: '#F5F5F5',
                    color: '#333333',
                    fontSize: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{ width: '6px', height: '6px', background: '#E31E24', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out' }}></div>
                      <div style={{ width: '6px', height: '6px', background: '#E31E24', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out 0.2s' }}></div>
                      <div style={{ width: '6px', height: '6px', background: '#E31E24', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out 0.4s' }}></div>
                    </div>
                    <span>Searching properties...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div style={{ padding: '0 20px 16px 20px' }}>
              <p style={{ fontSize: '12px', color: '#666666', margin: '0 0 8px 0' }}>Quick actions:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(action)}
                    style={{
                      background: '#F5F5F5',
                      border: '1px solid #E5E5E5',
                      borderRadius: '16px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: '#333333',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#E31E24';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = '#E31E24';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#F5F5F5';
                      e.currentTarget.style.color = '#333333';
                      e.currentTarget.style.borderColor = '#E5E5E5';
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} style={{ padding: '16px 20px', borderTop: '1px solid #E5E5E5' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about properties..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #E5E5E5',
                  borderRadius: '24px',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#F9F9F9'
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                style={{
                  background: '#E31E24',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  opacity: inputValue.trim() && !isLoading ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}
              >
                ➤
              </button>
            </div>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default PropertyChatWidget;