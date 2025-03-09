'use client';

import { useState, useEffect } from 'react';
import { WeatherData, getWeatherInfo, getRandomCityWeather } from '../services/weatherService';

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomCityWeather();
      setWeatherData(data);
    } catch (err) {
      setError('获取天气数据失败，请稍后再试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button 
            onClick={fetchRandomWeather}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const weatherInfo = getWeatherInfo(weatherData.weatherCode);

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {weatherData.city.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{weatherData.city.country}</p>
        </div>
        <div className="text-5xl">{weatherInfo.icon}</div>
      </div>

      <div className="mb-6">
        <div className="flex items-end">
          <span className="text-5xl font-bold text-gray-800 dark:text-white">
            {Math.round(weatherData.temperature)}°C
          </span>
          <span className="ml-2 text-xl text-gray-600 dark:text-gray-300">
            {weatherInfo.description}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-sm">湿度</p>
          <p className="text-gray-800 dark:text-white font-medium">{weatherData.humidity}%</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-sm">风速</p>
          <p className="text-gray-800 dark:text-white font-medium">{weatherData.windSpeed} km/h</p>
        </div>
      </div>

      <button 
        onClick={fetchRandomWeather}
        className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
      >
        查看其他城市
      </button>
    </div>
  );
} 