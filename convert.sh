#!/usr/bin/env bash

formats="
image/jpg/jpg
image/webp/webp
image/png/png
video/webm/webm
video/mp4/mp4
text/markdown/md
text/tex/tex
text/org/org
text/html/html
text/pdf/pdf
text/docx/docx
data/json/json
data/yaml/yml
"

ext=$(echo "$1" | cut -d '.' -f 2)
input_category=$(echo "$formats" | grep "$ext" | cut -d '/' -f 1)
matching_formats=$(echo "$formats" | grep "$input_category")
matching_formats=$(echo "$matching_formats" | grep -v "$ext")
matching_formats=$(echo "$matching_formats" | cut -d '/' -f 2)

selected=$(echo "$matching_formats" | fzf)
# shellcheck disable=SC2181
if [ $? -ne 0 ]; then
    exit
fi
category=$(echo "$formats" | grep "/$selected" | cut -d '/' -f 1)
format=$(echo "$formats" | grep "/$selected" | cut -d '/' -f 3)

for arg in "$@"
do
    name=$(echo "$arg" | cut -d '.' -f 1)

    if [ "$category" = "text" ]; then
        pandoc -s "$arg" -o "${name}.${format}"
    elif [ "$category" = "data" ]; then
        yq -o="$selected" "$arg" > "${name}.${format}"
    else
        ffmpeg -i "$arg" "${name}.${format}"
    fi
done
