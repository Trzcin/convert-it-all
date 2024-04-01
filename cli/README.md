# Convert It All CLI

![Showcase](../git-assets/cli.webp)

## Description

A bash script for converting various file formats. Allows to interactively pick the output format.

## Dependencies

- [fzf](https://github.com/junegunn/fzf) - a terminal fuzzy finder, used for selecting an output format
- [ffmpeg](https://github.com/FFmpeg/FFmpeg) _optional_ - used for multimedia file conversions
- [pandoc](https://github.com/jgm/pandoc) _optional_ - used for document file conversions
- [yq](https://github.com/mikefarah/yq) _optional_ - used for converting between yaml/json

## Usage

### Single file

```bash
convert.sh file.jpg
```

### Mutliple files

```bash
convert.sh *.jpg
convert.sh doc.md doc2.md
```
