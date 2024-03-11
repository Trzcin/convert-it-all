#!/usr/bin/env bash

formats="
image/jpg
image/webp
image/png
video/webm
video/mp4
text/markdown
text/tex
text/org
text/html
text/pdf
text/docx
"

selected=$(echo "$formats" | fzf)
format=$(echo "$selected" | sed 's/.\+\/\(.\+\)/\1/')
category=$(echo "$selected" | sed 's/\(.\+\)\/.\+/\1/')

for arg in "$@"
do
    # shellcheck disable=SC2001
    name=$(echo "$arg" | sed 's/\(.\+\)\..\+/\1/')
    if [ "$category" = "text" ]; then
        pandoc -s "$arg" -o "${name}.${format}"
    else
        ffmpeg -i "$arg" "${name}.${format}"
    fi
done