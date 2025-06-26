import fs from 'node:fs/promises';
import path from 'node:path';
import { build, normalizePath } from 'vite';
import { describe, expect, it } from 'vitest';

import shopify from '../src';

describe('tushy-vite-plugin-v2', () => {
  it('builds out .liquid files for production', async () => {
    await build({
      logLevel: 'silent',
      plugins: [
        shopify({
          themeRoot: path.join(__dirname, '__fixtures__'),
          sourceCodeDir: path.join(__dirname, '__fixtures__', 'frontend'),
          snippetFile: 'vite-tag.liquid'
        })
      ],
      resolve: {
        alias: {
          '@@': normalizePath(path.resolve(path.join(__dirname, '__fixtures__', 'resources', 'js')))
        }
      }
    })

    const tagsHtml = await fs.readFile(path.join(__dirname, '__fixtures__', 'snippets', 'vite-tag.liquid'), { encoding: 'utf8' })

    expect(tagsHtml).toMatchSnapshot()
  })
})
