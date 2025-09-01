import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // 라이브러리 엔트리 포인트
      entry: resolve(__dirname, 'src/index.js'),
      name: 'SculptGL',
      // 파일명 패턴
      fileName: (format) => `sculptgl-core.${format}.js`
    },
    rollupOptions: {
      // 외부 의존성 - 번들에 포함하지 않음
      external: ['gl-matrix', 'file-saver'],
      output: {
        // UMD 빌드에서 전역 변수명 설정
        globals: {
          'gl-matrix': 'glMatrix',
          'file-saver': 'saveAs'
        }
      }
    },
    // 소스맵 생성
    sourcemap: true,
    // 타겟 브라우저
    target: 'es2015',
    // 빌드 최적화
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      // src 디렉토리의 모든 하위 디렉토리를 직접 매핑
      'drawables': resolve(__dirname, 'src/drawables'),
      'editing': resolve(__dirname, 'src/editing'),
      'files': resolve(__dirname, 'src/files'),
      'math3d': resolve(__dirname, 'src/math3d'),
      'mesh': resolve(__dirname, 'src/mesh'),
      'misc': resolve(__dirname, 'src/misc'),
      'render': resolve(__dirname, 'src/render'),
      'states': resolve(__dirname, 'src/states'),
      'worker': resolve(__dirname, 'src/worker'),
      '@': resolve(__dirname, 'src')
    }
  },
  // GLSL 파일 처리를 위한 플러그인
  assetsInclude: ['**/*.glsl'],
  // 개발 서버 설정 (예제 테스트용)
  server: {
    port: 3000,
    open: false
  },
  // 미리보기 서버 설정
  preview: {
    port: 4173
  },
  // 최적화 설정
  optimizeDeps: {
    exclude: ['gl-matrix', 'file-saver']
  },
  // 플러그인 설정
  plugins: [
    // TypeScript 타입 정의 생성
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*']
    }),
    // GLSL 파일을 문자열로 import할 수 있게 해주는 커스텀 플러그인
    {
      name: 'glsl-loader',
      transform(code, id) {
        if (id.endsWith('.glsl')) {
          return `export default ${JSON.stringify(code)};`;
        }
      }
    }
  ]
});
