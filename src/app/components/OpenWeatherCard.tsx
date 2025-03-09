'use client';

import { useState, useEffect } from 'react';
import { OpenWeatherData, CitySearchParams, fetchOpenWeatherData, getWeatherIconUrl } from '../services/openWeatherService';

export default function OpenWeatherCard() {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const fetchWeather = async (params: CitySearchParams) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOpenWeatherData(params);
      setWeatherData(data);
      
      // 添加到搜索历史
      if (params.cityName && !searchHistory.includes(params.cityName)) {
        setSearchHistory(prev => [params.cityName!, ...prev].slice(0, 5));
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '获取天气数据失败，请稍后再试';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeather({ cityName: searchCity.trim() });
    }
  };

  const handleHistoryClick = (city: string) => {
    setSearchCity(city);
    fetchWeather({ cityName: city });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (err) => {
          setError('获取位置信息失败: ' + err.message);
          setLoading(false);
        }
      );
    } else {
      setError('您的浏览器不支持地理位置功能');
    }
  };

  useEffect(() => {
    // 默认获取北京的天气
    fetchWeather({ cityName: '北京' });
  }, []);

  // 格式化日期时间
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      <div className="mb-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="输入城市名称..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            搜索
          </button>
        </form>
        <button
          onClick={handleGetCurrentLocation}
          className="mt-2 w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          获取当前位置天气
        </button>
      </div>

      {searchHistory.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">搜索历史:</p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((city, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(city)}
                className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {error ? (
        <div className="text-center p-4 text-red-500">{error}</div>
      ) : weatherData && (
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {weatherData.cityName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{weatherData.country}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-800 dark:text-white">
                {Math.round(weatherData.temperature)}°C
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                体感温度: {Math.round(weatherData.feelsLike)}°C
              </p>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <img 
              src={getWeatherIconUrl(weatherData.icon)} 
              alt={weatherData.description} 
              className="w-16 h-16"
            />
            <div className="ml-2">
              <p className="text-lg font-medium text-gray-800 dark:text-white capitalize">
                {weatherData.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">湿度</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">{weatherData.humidity}%</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">风速</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">{weatherData.windSpeed} m/s</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">气压</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">{weatherData.pressure} hPa</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">日出/日落</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {formatTime(weatherData.sunrise)} / {formatTime(weatherData.sunset)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 