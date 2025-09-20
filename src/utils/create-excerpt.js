// https://www.paulie.dev/posts/2023/09/how-to-create-excerpts-with-astro/

import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

// https://www.paulie.dev/posts/2023/09/how-to-create-excerpts-with-astro/
// export const createExcerpt = (body) => {
//   return parser
//     .render(body)
//     .split('\n')
//     .slice(0, 6)
//     .map((str) => {
//       return str.replace(/<\/?[^>]+(>|$)/g, '').split('\n');
//     })
//     .flat()
//     .join(' ');
// };

export function createExcerpt(body, wordCount = 30) {
    // 1. Render the Markdown body to HTML
    const html = parser.render(body);
    // 2. Remove all HTML tags
    const text = html.replace(/<[^>]*>?/gm, '');
    // 3. Split the text into an array of words
    const words = text.split(/\s+/);
    // 4. Take the first `wordCount` words and join them back into a string
    const excerpt = words.slice(0, wordCount).join(' ');

    // 5. Add an ellipsis if the original text was longer
    return words.length > wordCount ? `${excerpt} ...` : excerpt;
}