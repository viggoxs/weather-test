// 定义OpenWeatherMap API的天气数据类型
export interface OpenWeatherData {
  cityName: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: Date;
  sunset: Date;
}

// 定义搜索城市的参数
export interface CitySearchParams {
  cityName?: string;
  lat?: number;
  lon?: number;
}

// 获取OpenWeatherMap API的天气数据
export async function fetchOpenWeatherData(params: CitySearchParams): Promise<OpenWeatherData> {
  // 这里需要替换为您的API Key
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenWeatherMap API Key未设置');
  }
  
  let url = 'https://api.openweathermap.org/data/2.5/weather?';
  
  if (params.cityName) {
    url += `q=${encodeURIComponent(params.cityName)}`;
  } else if (params.lat !== undefined && params.lon !== undefined) {
    url += `lat=${params.lat}&lon=${params.lon}`;
  } else {
    throw new Error('必须提供城市名称或经纬度');
  }
  
  url += `&appid=${apiKey}&units=metric&lang=zh_cn`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '获取天气数据失败');
    }
    
    const data = await response.json();
    
    return {
      cityName: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000)
    };
  } catch (error) {
    console.error('获取OpenWeatherMap数据出错:', error);
    throw error;
  }
}

// 获取天气图标URL
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
} 