import WeatherCard from './components/WeatherCard';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">全球天气</h1>
        <p className="text-gray-600 dark:text-gray-300">探索世界各地的实时天气状况</p>
      </header>
      
      <main className="w-full max-w-md">
        <WeatherCard />
        
        <div className="mt-8 text-center">
          <Link 
            href="/openweather" 
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            使用 OpenWeatherMap API 查询天气
          </Link>
        </div>
      </main>
      
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>数据来源: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">Open-Meteo API</a></p>
        <p className="mt-1">© {new Date().getFullYear()} 全球天气应用</p>
      </footer>
    </div>
  );
}
