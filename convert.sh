#!/usr/bin/env bash

formats="
image/jpg
image/webp
image/png
video/webm
video/mp4
text/md
text/tex
text/org
text/html
text/pdf
text/docx
"

ext=$(echo "$1" | cut -d '.' -f 2)
input_category=$(echo "$formats" | grep "$ext" | cut -d '/' -f 1)
matching_formats=$(echo "$formats" | grep "$input_category")
matching_formats=$(echo "$matching_formats" | grep -v "$ext")

selected=$(echo "$matching_formats" | fzf)
# shellcheck disable=SC2181
if [ $? -ne 0 ]; then
    exit
fi
category=$(echo "$selected" | cut -d '/' -f 1)
format=$(echo "$selected" | cut -d '/' -f 2)

for arg in "$@"
do
    name=$(echo "$arg" | cut -d '.' -f 1)

    if [ "$category" = "text" ]; then
        pandoc -s "$arg" -o "${name}.${format}"
    else
        ffmpeg -i "$arg" "${name}.${format}"
    fi
done
