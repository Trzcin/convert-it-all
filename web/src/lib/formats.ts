export type FormatCategory = 'image' | 'video' | 'audio' | 'text' | 'application';

export interface Format {
    category: FormatCategory;
    name: string;
    ext: string;
}

export const outputFormats: Format[] = [
    { category: 'image', name: 'jpg', ext: 'jpg'},
    { category: 'image', name: 'webp', ext: 'webp'},
    { category: 'image', name: 'png', ext: 'png'},
    { category: 'image', name: 'gif', ext: 'gif'},
    { category: 'image', name: 'bmp', ext: 'bmp'},
    { category: 'image', name: 'tiff', ext: 'tiff'},
    { category: 'video', name: 'gif', ext: 'gif'},
    { category: 'video', name: 'webp', ext: 'webp'},
    { category: 'video', name: 'webm', ext: 'webm'},
    { category: 'video', name: 'mp4', ext: 'mp4'},
    { category: 'video', name: 'mov', ext: 'mov'},
    { category: 'video', name: 'avi', ext: 'avi'},
    { category: 'video', name: 'Windows Media Video', ext: 'wmv'},
    { category: 'video', name: 'Flash Video', ext: 'flv'},
    { category: 'audio', name: 'mp3', ext: 'mp3'},
    { category: 'audio', name: 'wav', ext: 'wav'},
    { category: 'audio', name: 'MPEG 4', ext: 'm4a'},
    { category: 'audio', name: 'flac', ext: 'flac'},
    { category: 'audio', name: 'Windows Media Audio', ext: 'wma'},
    { category: 'audio', name: 'aac', ext: 'aac'},
    { category: 'application', name: 'json', ext: 'json'},
    { category: 'application', name: 'yaml', ext: 'yml'},
    { category: 'text', name: 'asciidoc', ext: 'adoc'},
    { category: 'text', name: 'beamer', ext: 'tex'},
    { category: 'text', name: 'bibtex', ext: 'tex'},
    { category: 'text', name: 'biblatex', ext: 'tex'},
    { category: 'text', name: 'commonmark', ext: 'md'},
    { category: 'text', name: 'commonmark_x', ext: 'md'},
    { category: 'text', name: 'context', ext: 'tex'},
    { category: 'text', name: 'csljson', ext: 'json'},
    { category: 'text', name: 'docbook', ext: 'xml'},
    { category: 'text', name: 'docbook5', ext: 'xml'},
    { category: 'text', name: 'docx', ext: 'docx'},
    { category: 'text', name: 'dokuwiki', ext: 'xml'},
    { category: 'text', name: 'epub', ext: 'epub'},
    { category: 'text', name: 'epub2', ext: 'epub'},
    { category: 'text', name: 'fb2', ext: 'fb2'},
    { category: 'text', name: 'gfm', ext: 'md'},
    { category: 'text', name: 'haddock', ext: 'txt'},
    { category: 'text', name: 'html', ext: 'html'},
    { category: 'text', name: 'ipynb', ext: 'ipynb'},
    { category: 'text', name: 'jats_archiving', ext: 'xml'},
    { category: 'text', name: 'jats_articleauthoring', ext: 'xml'},
    { category: 'text', name: 'jats_publishing', ext: 'xml'},
    { category: 'text', name: 'jats', ext: 'xml'},
    { category: 'text', name: 'jira', ext: 'md'},
    { category: 'text', name: 'latex', ext: 'tex'},
    { category: 'text', name: 'man', ext: 'txt'},
    { category: 'text', name: 'markdown', ext: 'md'},
    { category: 'text', name: 'markdown_mmd', ext: 'md'},
    { category: 'text', name: 'markdown_phpextra', ext: 'md'},
    { category: 'text', name: 'markdown_strict', ext: 'md'},
    { category: 'text', name: 'markua', ext: 'md'},
    { category: 'text', name: 'mediawiki', ext: 'txt'},
    { category: 'text', name: 'ms', ext: 'txt'},
    { category: 'text', name: 'muse', ext: 'muse'},
    { category: 'text', name: 'odt', ext: 'odt'},
    { category: 'text', name: 'opml', ext: 'txt'},
    { category: 'text', name: 'opendocument', ext: 'odt'},
    { category: 'text', name: 'org', ext: 'org'},
    { category: 'text', name: 'pdf', ext: 'pdf'},
    { category: 'text', name: 'plain', ext: 'txt'},
    { category: 'text', name: 'pptx', ext: 'pptx'},
    { category: 'text', name: 'rst', ext: 'rst'},
    { category: 'text', name: 'rtf', ext: 'rtf'},
    { category: 'text', name: 'texinfo', ext: 'tex'},
    { category: 'text', name: 'textile', ext: 'tex'},
    { category: 'text', name: 'slideous', ext: 'html'},
    { category: 'text', name: 'slidy', ext: 'html'},
    { category: 'text', name: 'dzslides', ext: 'html'},
    { category: 'text', name: 'revealjs', ext: 'html'},
    { category: 'text', name: 's5', ext: 'html'},
    { category: 'text', name: 'tei', ext: 'txt'},
    { category: 'text', name: 'xwiki', ext: 'md'},
    { category: 'text', name: 'zimwiki', ext: 'md'},
];
