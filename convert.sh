#!/usr/bin/env bash

input_formats="
image/jpg/jpg
image/webp/webp
image/png/png
image/gif/gif
image/bmp/bmp
image/tiff/tiff
video/webm/webm
video/mp4/mp4
video/mov/mov
video/avi/avi
video/Windows Media Video/wmv
video/Flash Video/flv
audio/mp3/mp3
audio/wav/wav
audio/MPEG 4/m4a
audio/flac/flac
audio/Windows Media Audio/wma
audio/aac/aac
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
image/gif/gif
image/bmp/bmp
image/tiff/tiff
video/webm/webm
video/mp4/mp4
video/mov/mov
video/avi/avi
video/Windows Media Video/wmv
video/Flash Video/flv
audio/mp3/mp3
audio/wav/wav
audio/MPEG 4/m4a
audio/flac/flac
audio/Windows Media Audio/wma
audio/aac/aac
data/json/json
data/yaml/yml
text/asciidoc/adoc
text/beamer/tex
text/bibtex/tex
text/biblatex/tex
text/commonmark/md
text/commonmark_x/md
text/context/tex
text/csljson/json
text/docbook/xml
text/docbook5/xml
text/docx/docx
text/dokuwiki/xml
text/epub/epub
text/epub2/epub
text/fb2/fb2
text/gfm/md
text/haddock/txt
text/html/html
text/ipynb/ipynb
text/jats_archiving/xml
text/jats_articleauthoring/xml
text/jats_publishing/xml
text/jats/xml
text/jira/md
text/latex/tex
text/man/txt
text/markdown/md
text/markdown_mmd/md
text/markdown_phpextra/md
text/markdown_strict/md
text/markua/md
text/mediawiki/txt
text/ms/txt
text/muse/muse
text/odt/odt
text/opml/txt
text/opendocument/odt
text/org/org
text/pdf/pdf
text/plain/txt
text/pptx/pptx
text/rst/rst
text/rtf/rtf
text/texinfo/tex
text/textile/tex
text/slideous/html
text/slidy/html
text/dzslides/html
text/revealjs/html
text/s5/html
text/tei/txt
text/xwiki/md
text/zimwiki/md
"

input_format=""
ext=""
if [ "$1" == "-i" ]; then
    input_format="$2"
    ext=$(basename "$3" | cut -d '.' -f 2)
else
    ext=$(basename "$1" | cut -d '.' -f 2)
    input_format=$(echo "$input_formats" | grep "/$ext" | head -n 1 | cut -d '/' -f 2)
fi
input_category=$(echo "$input_formats" | grep "/$input_format/" | cut -d '/' -f 1)
matching_formats=$(echo "$output_formats" | grep "$input_category/")
matching_formats=$(echo "$matching_formats" | grep -v "/$ext")
matching_formats=$(echo "$matching_formats" | cut -d '/' -f 2)

selected=$(echo "$matching_formats" | fzf)
# shellcheck disable=SC2181
if [ $? -ne 0 ]; then
    exit
fi
selected_category=$(echo "$output_formats" | grep "/$selected/" | cut -d '/' -f 1)
selected_ext=$(echo "$output_formats" | grep "/$selected/" | cut -d '/' -f 3)

arg_start="1"
if [ "$1" == "-i" ]; then
    arg_start="3"
fi
for i in "${@:"$arg_start"}"
do
    arg="$i"
    name=$(echo "$arg" | cut -d '.' -f 1)

    case $selected_category in
        text)
            if [ "$1" == "-i" ]; then
                pandoc -s "$arg" -f "$2" -t "$selected" -o "${name}.${selected_ext}"
            else
                pandoc -s "$arg" -t "$selected" -o "${name}.${selected_ext}"
            fi
            ;;
        data) yq -o="$selected" "$arg" > "${name}.${selected_ext}" ;;
        image | video | audio) ffmpeg -i "$arg" "${name}.${selected_ext}" ;;
    esac
done
