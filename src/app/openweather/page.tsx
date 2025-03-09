import OpenWeatherCard from '../components/OpenWeatherCard';
import Link from 'next/link';

export default function OpenWeatherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">OpenWeather 天气</h1>
        <p className="text-gray-600 dark:text-gray-300">使用OpenWeatherMap API查询全球天气</p>
        <Link href="/" className="mt-2 inline-block text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          返回首页
        </Link>
      </header>
      
      <main className="w-full max-w-md">
        <OpenWeatherCard />
      </main>
      
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>数据来源: <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">OpenWeatherMap API</a></p>
        <p className="mt-1">© {new Date().getFullYear()} 全球天气应用</p>
      </footer>
    </div>
  );
} 