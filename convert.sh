#!/usr/bin/env bash

input_formats="
image/jpg/jpg
image/webp/webp
image/png/png
video/webm/webm
video/mp4/mp4
data/json/json
data/yaml/yml
text/bibtex/tex
text/bits/xml
text/commonmark/md
text/commonmark_x/md
text/creole/creole
text/csljson/json
text/csv/csv
text/tsv/tsv
text/djot/dj
text/docbook/xml
text/docx/docx
text/dokuwiki/xml
text/endnotexml/xml
text/epub/epub
text/fb2/fb2
text/gfm/md
text/haddock/txt
text/html/html
text/ipynb/ipynb
text/jats/xml
text/Confluence wiki markup/jira/txt
text/json/json
text/latex/tex
text/markdown/md
text/markdown_mmd/md
text/markdown_phpextra/md
text/markdown_strict/md
text/mediawiki/txt
text/man/txt
text/muse/muse
text/odt/odt
text/opml/opml
text/org/org
text/ris/ris
text/rtf/rtf
text/rst/rst
text/t2t/txt
text/textile/txt
text/tikiwiki/txt
text/twiki/txt
text/typst/qmd
text/vimwiki/md
"

output_formats="
image/jpg/jpg
image/webp/webp
image/png/png
video/webm/webm
video/mp4/mp4
data/json/json
data/yaml/yml
text/asciidoc/txt
text/beamer/txt
text/bibtex/txt
text/biblatex/txt
text/commonmark/txt
text/commonmark_x/txt
text/context/txt
text/csljson/txt
text/docbook/txt
text/docbook5/txt
text/docx/txt
text/dokuwiki/txt
text/epub/txt
text/epub2/txt
text/fb2/txt
text/gfm/txt
text/haddock/txt
text/html/txt
text/icml/txt
text/ipynb/txt
text/jats_archiving/txt
text/jats_articleauthoring/txt
text/jats_publishing/txt
text/jats/txt
text/jira/txt
text/json/txt
text/latex/txt
text/man/txt
text/markdown/txt
text/markdown_mmd/txt
text/markdown_phpextra/txt
text/markdown_strict/txt
text/markua/txt
text/mediawiki/txt
text/ms/txt
text/muse/txt
text/native/txt
text/odt/txt
text/opml/txt
text/opendocument/txt
text/org/txt
text/pdf/txt
text/plain/txt
text/pptx/txt
text/rst/txt
text/rtf/txt
text/texinfo/txt
text/textile/txt
text/slideous/txt
text/slidy/txt
text/dzslides/txt
text/revealjs/txt
text/s5/txt
text/tei/txt
text/xwiki/txt
text/zimwiki/txt
"

input_format="$1"
input_category=$(echo "$input_formats" | grep "$input_format" | cut -d '/' -f 1)
matching_formats=$(echo "$formats" | grep "$input_category")
matching_formats=$(echo "$matching_formats" | grep -v "$ext")
matching_formats=$(echo "$matching_formats" | cut -d '/' -f 2)

selected=$(echo "$matching_formats" | fzf)
# shellcheck disable=SC2181
if [ $? -ne 0 ]; then
    exit
fi
selected_category=$(echo "$formats" | grep "/$selected" | cut -d '/' -f 1)
selected_ext=$(echo "$formats" | grep "/$selected" | cut -d '/' -f 3)

for i in "${@:2}"
do
    arg="$i"
    name=$(echo "$arg" | cut -d '.' -f 1)

    case $category in
        text) pandoc -s "$arg" -o "${name}.${selected_ext}" ;;
        data) yq -o="$selected" "$arg" > "${name}.${selected_ext}" ;;
        image | video) ffmpeg -i "$arg" "${name}.${selected_ext}" ;;
    esac
done
