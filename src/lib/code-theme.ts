import type { ThemeRegistration } from 'shiki';

/**
 * Custom "claude-guide" syntax theme used across the entire site.
 * Light blue keys, light green symbols, purple values.
 */
export const claudeGuideTheme: ThemeRegistration = {
  name: 'claude-guide',
  type: 'dark',
  colors: {
    'editor.background': '#1e1e1e',
    'editor.foreground': '#d4d4d4',
  },
  tokenColors: [
    {
      name: 'Strings (values)',
      scope: ['string', 'string.quoted'],
      settings: { foreground: '#c792ea' }, // purple
    },
    {
      name: 'Property keys',
      scope: ['support.type.property-name', 'string.json support.type.property-name'],
      settings: { foreground: '#89ddff' }, // light blue
    },
    {
      name: 'Object keys generic',
      scope: ['meta.object-literal.key', 'entity.name.tag', 'variable.other.property'],
      settings: { foreground: '#89ddff' }, // light blue
    },
    {
      name: 'Punctuation and symbols',
      scope: [
        'punctuation',
        'meta.brace',
        'punctuation.definition.block',
        'punctuation.separator',
        'punctuation.definition.string',
        'punctuation.definition.dictionary',
        'punctuation.support.type.property-name',
      ],
      settings: { foreground: '#7ec699' }, // light green
    },
    {
      name: 'Keywords',
      scope: ['keyword', 'storage'],
      settings: { foreground: '#89ddff' }, // light blue
    },
    {
      name: 'Constants and numbers',
      scope: ['constant', 'constant.numeric', 'constant.language'],
      settings: { foreground: '#c792ea' }, // purple
    },
    {
      name: 'Variables',
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#d4d4d4' },
    },
    {
      name: 'Functions',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#82aaff' }, // blue
    },
    {
      name: 'Comments',
      scope: ['comment'],
      settings: { foreground: '#637777', fontStyle: 'italic' },
    },
    {
      name: 'Operators',
      scope: ['keyword.operator'],
      settings: { foreground: '#7ec699' }, // light green
    },
  ],
};
