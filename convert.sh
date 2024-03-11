#!/usr/bin/env bash

formats="
image/jpg
image/webp
image/png
video/webm
video/mp4
"

selected=$(echo "$formats" | fzf)
format=$(echo "$selected" | sed 's/.\+\/\(.\+\)/\1/')

for arg in "$@"
do
    # shellcheck disable=SC2001
    name=$(echo "$arg" | sed 's/\(.\+\)\..\+/\1/')
    ffmpeg -i "$arg" "${name}.${format}"
done