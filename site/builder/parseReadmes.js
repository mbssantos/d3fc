import { parserFor, htmlFor, ruleOutput } from 'simple-markdown';
import XRegExp from 'xregexp';

const any = '\\n|\\r|.';
const title = `(.+)`;
const hashes = level => Array(level).fill('#').join('');
const createBlockPattern = (level) => new RegExp(
  `(${hashes(level)}\\s${title}(?:${any})+?` +
  `(?=(?:\\n${hashes(level)}\\s))|` +
  `${hashes(level)}\\s${title}(?:${any})+?\\n$)`,
  'g'
);

function parseBlock(level, content, title, options) {
  // console.log(level, content, title, options);
  let match, firstChildIndex;
  const children = [];
  const regex = createBlockPattern(level);

  if (level <= options.maxDepth) {
    while ((match = regex.exec(content)) !== null) {
      const childContent = match[0];
      const childTitle = match[2] || match[3];
      children.push(parseBlock(level + 1, childContent, childTitle, options));
      if (!firstChildIndex) {
        firstChildIndex = match.index;
      }
    }
  }

  if (level === 1) {
    return children;
  } else {
    const block = {
      content: (
        children.length
          ? content.substr(0, firstChildIndex)
          : content
      ).replace(new RegExp(`${hashes(level - 1)} ${title}(\n|\r)+`), ''),
      level: level - 1,
      title
    };
    if (children.length) {
      block.children = children;
    }
    return block;
  }
}

function parseReadme(readme) {
  return parseBlock(1, readme.contents, null, { maxDepth: 2 });
}

export default (readmes) =>
  new Promise((resolve, reject) => {
    console.log('PARSING READMES');
    const structures = readmes.map(parseReadme);
    console.log('DONE PARSING READMES');

    resolve(structures);
  });
