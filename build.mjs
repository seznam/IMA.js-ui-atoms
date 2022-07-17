import fs from 'fs';
import { parseArgs } from 'node:util';
import path from 'path';

import swc from '@swc/core';
import chokidar from 'chokidar';
import { globby } from 'globby';
import { preprocess } from 'preprocess';

const {
  values: { watch },
} = parseArgs({
  options: {
    watch: {
      type: 'boolean',
      short: 'w',
    },
  },
});

const inputPipe = async (options) => {
  const { input, output, file, clean } = options;
  const code = await fs.promises.readFile(path.resolve(input, file), 'utf8');

  if (clean && fs.existsSync(output)) {
    fs.rmSync(output, { recursive: true });
  }

  return {
    ...options,
    source: {
      code,
    },
  };
};

const preprocessPipe = async (options) => {
  const { server, client, source } = options;
  const code = preprocess(
    source.code,
    {
      server,
      client,
    },
    'js'
  );

  return {
    ...options,
    source: {
      code,
    },
  };
};

const swcPipe = async (options) => {
  const { source } = options;
  const { code, map } = await swc.transform(source.code, {
    // sourceMaps: true,
    // inlineSourcesContent: true,
    isModule: true,
    jsc: {
      target: 'es2022',
      parser: {
        syntax: 'ecmascript',
        jsx: true,
      },
      transform: {
        react: {
          useBuiltins: true,
          development: watch ? true : false,
        },
      },
    },
  });

  return {
    ...options,
    source: {
      code,
      map,
    },
  };
};

const outputPipe = async (options) => {
  const { file, source, output } = options;
  const outputPath = path.resolve(output, file);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir, { recursive: true });
  }

  await Promise.all([
    fs.promises.writeFile(outputPath, source.code),
    // source && fs.promises.writeFile(`${outputPath}.map`, source.map),
  ]);

  return options;
};

const processPipe = (baseOptions) => (file) => {
  [inputPipe, preprocessPipe, swcPipe, outputPipe].reduce(
    async (options, processor) => {
      options = await processor(await options);

      return options;
    },
    {
      ...baseOptions,
      file,
    }
  );
};

const clientPipe = processPipe({
  // clean: true,
  client: true,
  server: false,
  output: path.resolve('./dist'),
  input: path.resolve('./src'),
});

// const serverPipe = processPipe({
// 	clean: true,
// 	client: false,
// 	server: true,
// 	output: path.resolve('./dist/server'),
// 	input: path.resolve('./src')
// });

if (watch) {
  chokidar
    .watch(['./**/*.(js|jsx)'], {
      ignoreInitial: false,
      cwd: './src',
      ignored: ['**/__tests__'],
    })
    .on('add', clientPipe)
    // .on('add', serverPipe)
    .on('change', clientPipe);
  // .on('change', serverPipe);
} else {
  const files = await globby('./**/*.(js|jsx)', {
    ignore: ['**/__tests__'],
    concurrency: true,
    cwd: './src',
  });

  files.forEach(clientPipe);
  // files.forEach(serverPipe);
}
