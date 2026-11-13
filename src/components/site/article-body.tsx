import ReactMarkdown from 'react-markdown';
export function ArticleBody({ body }: { body: string }) {
  return <div className="space-y-5 text-lg leading-8 [&_h2]:pt-5 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h3]:pt-3 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_img]:max-w-full [&_pre]:overflow-x-auto [&_pre]:bg-muted [&_pre]:p-4"><ReactMarkdown skipHtml>{body}</ReactMarkdown></div>;
}