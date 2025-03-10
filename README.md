# 全球天气应用

这是一个使用Next.js构建的天气应用，可以随机展示世界各地的天气情况，并支持使用OpenWeatherMap API查询特定城市的天气。

## 功能特点

- 随机展示全球20个主要城市的实时天气（使用Open-Meteo API）
- 支持通过OpenWeatherMap API查询特定城市的天气
- 支持获取当前位置的天气
- 显示温度、天气状况、湿度、风速等详细信息
- 响应式设计，适配各种设备
- 支持深色模式
- 使用免费的Open-Meteo API和OpenWeatherMap API获取天气数据

## 技术栈

- [Next.js](https://nextjs.org/) - React框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式
- [Open-Meteo API](https://open-meteo.com/) - 随机天气数据
- [OpenWeatherMap API](https://openweathermap.org/) - 城市天气查询.

## 开始使用

### 前提条件

- Node.js 18.0.0或更高版本
- npm或yarn
- OpenWeatherMap API Key（用于城市天气查询功能）

### 安装

1. 克隆仓库
```bash
git clone <仓库URL>
cd weather-test
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 设置环境变量
   - 复制`.env.local.example`文件并重命名为`.env.local`
   - 在[OpenWeatherMap](https://openweathermap.org/)注册并获取API Key
   - 将API Key填入`.env.local`文件中的`NEXT_PUBLIC_OPENWEATHER_API_KEY`变量

```bash
cp .env.local.example .env.local
# 然后编辑.env.local文件，填入你的API Key
```

4. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 构建生产版本

```bash
npm run build
npm run start
# 或
yarn build
yarn start
```

## 项目结构

```
weather-test/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── WeatherCard.tsx     # 随机天气卡片组件
│   │   │   └── OpenWeatherCard.tsx # OpenWeatherMap天气卡片组件
│   │   ├── services/
│   │   │   ├── weatherService.ts    # Open-Meteo天气数据服务
│   │   │   └── openWeatherService.ts # OpenWeatherMap天气数据服务
│   │   ├── openweather/
│   │   │   └── page.tsx            # OpenWeatherMap天气页面
│   │   ├── page.tsx                # 主页面
│   │   ├── layout.tsx              # 应用布局
│   │   └── globals.css             # 全局样式
├── public/                         # 静态资源
├── .env.local.example              # 环境变量示例
├── package.json                    # 项目依赖
└── README.md                       # 项目说明
```

## 许可证

MIT
