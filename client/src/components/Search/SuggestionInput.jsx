import React, { useState, useEffect, useRef } from 'react';
import { searchService } from '../../services/searchService';

export default function SuggestionInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  icon = '⌖',
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (!value || value.length < 1) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchService.getSuggestions(value);
        setSuggestions(results || []);
      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (item) => {
    const formatted = `${item.city} (${item.code})`;
    onChange(formatted);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative bg-[#FFFAF0] rounded-2xl p-3 border border-luxury-beige focus-within:border-luxury-brown transition-colors">
      <label className="block text-[10px] font-bold uppercase tracking-wider text-luxury-brownLight mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-semibold text-luxury-dark focus:outline-none placeholder:text-gray-400"
        required={required}
        autoComplete="off"
      />
      <span className="absolute right-3 top-4 text-luxury-brown text-xs">{icon}</span>

      {/* Suggestion Dropdown */}
      {isOpen && (suggestions.length > 0 || loading) && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#E8DCCF] rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto divide-y divide-[#F5E6D3]/60 animate-fade-in">
          {loading && (
            <div className="p-3 text-xs text-luxury-muted text-center flex items-center justify-center gap-2">
              <span className="animate-spin text-luxury-brown">✦</span>
              <span>Locating global private ports & airports...</span>
            </div>
          )}
          {!loading && suggestions.map((item) => (
            <button
              key={`${item.code}-${item.city}`}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left p-3 hover:bg-[#FFFAF0] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-luxury-cream border border-luxury-beige flex items-center justify-center text-xs text-luxury-brown font-mono font-bold">
                  {item.code}
                </span>
                <div>
                  <p className="text-xs font-bold text-luxury-dark group-hover:text-luxury-brown transition-colors">
                    {item.city}, {item.country}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate max-w-[200px]">
                    {item.name}
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-luxury-gold px-2 py-0.5 rounded-full bg-luxury-cream border border-luxury-beige">
                {item.isIndia ? '🇮🇳 India' : item.type === 'airport' ? 'Flight Hub' : 'Resort'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
