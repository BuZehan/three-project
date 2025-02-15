//从 Node.js 的 url 模块中导入 fileURLToPath 和 URL 函数。
//fileURLToPath 用于将文件 URL 转换为文件路径，而 URL 用于创建新的 URL 实例。
import { fileURLToPath, URL } from 'node:url'
//从 Vite 导入 defineConfig 函数。这个函数是一个工具，帮助你定义 Vite 的配置，并提供类型推导的支持（尤其是在 TypeScript 中）。
import { defineConfig } from 'vite'
//导入 Vite 的 Vue 插件 @vitejs/plugin-vue，该插件允许 Vite 处理 Vue 单文件组件（.vue 文件）。
import vue from '@vitejs/plugin-vue'
 
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
//使用 defineConfig 包裹配置对象，并导出为默认模块。这允许 Vite 在解析配置时更好地进行类型检查和智能提示。
export default defineConfig({
  //配置 Vite 插件。在这里，使用 vue() 函数添加 Vue 插件到 Vite 的插件数组中。这使得 Vite 能够处理 Vue 组件的编译和热重载。
  plugins: [
    vue(),
    glsl()
  ],
  //resolve: 这个属性用于配置模块解析。
  resolve: {
    //alias: 该属性允许你创建模块别名，方便在代码中引用。这里将 @ 作为别名指向项目的 src 目录。
    //fileURLToPath(new URL('./src', import.meta.url)): 这段代码将当前模块的 URL 转换为文件路径，并与 ./src 结合，得到 src 目录的绝对路径。这样你在项目中可以使用 @/your-module 的方式来引用 src/your-module。
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //server: Vite 的开发服务器配置选项。
  server: {
      //proxy: 配置反向代理的选项。
      proxy: {
        //'/api': 这是请求的路径前缀。当你在前端发起请求时，如果请求以 /api 开头，代理将拦截并转发请求。
        //target: 目标服务器的地址，你可以将其替换为实际的 API 服务器地址，例如 http://your-target-server.com。
        //changeOrigin: 设置为 true，意味着会改变请求头中的 Origin 字段为目标服务器的地址，这对于某些服务器是必要的。
        //rewrite: 可选的配置，用于重写路径。上面的示例中，所有以 /api 开头的请求会被去掉这个前缀后转发到目标服务器。例如，发送请求到 /api/user 会被重写为 /user。
        '/api': {
          target: 'http://your-target-server.com', // 目标服务器地址
          changeOrigin: true, // 是否改变源
          rewrite: (path) => path.replace(/^\/api/, ''), // 可选，重写路径
        },
      },
  }
})