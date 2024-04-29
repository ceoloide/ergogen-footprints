# @ceoloide's ergogen PCB footprints

> [!WARNING]
> These footprints have only been partially tested and are still under active development. Use them at your own risk.

1. [How to use these footprints in Ergogen](#how-to-use-these-footprints-in-ergogen)
1. [Installation](#installation)
    1. [How to add the footprints as a local git submodule](#how-to-add-the-footprints-as-a-local-git-submodule)
    1. [How to add the footprints as a GitHub Codespaces git submodule](#how-to-add-the-footprints-as-a-github-codespaces-git-submodule)
    1. [How to use the footprints in your ergogen config](#how-to-use-the-footprints-in-your-ergogen-config)
    1. [How to clone your ergogen repo](#how-to-clone-your-ergogen-repo)
    1. [How to update footprints dependencies](#how-to-update-footprints-dependencies)
    1. [How to remove footprints dependencies](#how-to-remove-footprints-dependencies)
1. [How to design or modify ergogen footprints](#how-to-design-or-modify-ergogen-footprints)
1. [Licenses and recognition](#licenses-and-recognition)

## How to use these footprints in Ergogen

> [!WARNING]
> These footprints have been upgraded to KiCad 8 and are only compatible with Ergogen v4.1.0 and above. Make sure to set the `template: kicad8` option in each PCB definition:

```yaml
meta:
  engine: 4.1.0 # Min Ergogen version for KiCad 8 footprints
[...]
pcbs:
  main_pcb:
    template: kicad8 # Required, since footprints are KiCad 8 only
    outlines:
      [...]
    footprints:
      [...]
```

> [!NOTE]
> You can directly use these custom footprints in the experimental GUI at [ergogen.ceoloide.com](https://ergogen.ceoloide.com). Just refer to them as `ceoloide/[footprint_filename]`, for example: `ceoloide/switch_mx`.

Using custom footprints with a local Ergogen setup is relatively straightforward. You can follow the steps outlined in [this amazing guide](https://flatfootfox.com/ergogen-part4-footprints-cases/) if you want an easy tutorial.

If you are already comfortable running Ergogen locally, you just need to:

1. rename your Ergogen YAML file to `config.yaml`,
1. create a `footprints` folder alongside it
1. clone this repo into the `footprints` folder using a folder name of your choice (see instructions below)
1. now run Ergogen by passing a folder instead of a YAML file, for example `ergogen .`

## Installation

### How to add the footprints as a local git submodule

> [!WARNING]
> If you are using GitHub Codespaces, skip the following instructions and go to the next section.

If you have git setup on your local environment with SSH credentials, you can add the library as a
git submodule. To use custom footprint, ergogen requires them to be located under a folder named
`footprints` placed alongside a `config.yaml` file containing the board definition.

Assuming the above files are located at `./ergogen` from the git folder root, then you can use this
command to add the footprints into a `ceoloide` folder in the right location:

```bash
git submodule add git@github.com:ceoloide/ergogen-footprints.git ergogen/footprints/ceoloide
```

Note that you can customize `ceoloide` to be whatever name you choose. Just make sure to refer to the custom
name in your YAML file.

### How to add the footprints as a GitHub Codespaces git submodule

Due to the limitations on how GitHub Codespaces handle submodules, use this command instead of the one above:

```bash
git submodule add https://github.com/ceoloide/ergogen-footprints.git ergogen/footprints/ceoloide
```

### How to use the footprints in your ergogen config

Assuming you used `ergogen/footprints/ceoloide` as the destination folder for the submodule, you will be able
to refer to any footprint contained in that folder as `ceoloide/[footprint_filename]`, which would look something like this:

```yaml
meta:
  engine: 4.1.0 # Min Ergogen version for KiCad 8 footprints
[...]
pcbs:
  your_keyboard:
    template: kicad8 # Required, since footprints are KiCad 8 only
    outlines:
      [...]
    footprints:
      nice_nano:
        what: ceoloide/switch_mx
        [...]
```

### How to clone your ergogen repo

Users who clone your ergogen repo, must also include the submodule. So you should instruct them to clone with `--recursive` mode:

```bash
git clone --recursive git@github.com:your-user/your-keyboard.git
```

Alternative they can init and update the submodules in a repo that was already cloned without the `--recursive` argument:

```bash
git submodule update --init --recursive --remote
```

### How to update footprints dependencies

When you add a submodule, it won't automatically be updated, meaning that you will maintain files as long as you don't take specific actions. This is great to avoid having to deal with unforseen changes in the source.

Should you however want to update your footprint dependencies, you can run the following command:

```bash
git submodule update --recursive --remote
```

This will fetch and checkout the latest commits in the source repo and pull the files so they are available.

Be aware that you will need to commit the submodule update change, or it will revert with a subsequent pull. To do so you can run these commands:

```bash
# First add the updated submodule to the staged files
git add ergogen/footprints/ceoloide
# Then commit the staged files to persist the update
git commit -m "Update footprint submodule"
```

### How to remove footprints dependencies

If you do not longer need the footprint submodule and want to remove it from your repository, you can simply run this command:

```bash
git rm ergogen/footprints/ceoloide
```

This will update the `.gitmodules` file to remove the submodule reference and remove the submodule directory. Make sure to commit and push the
change for it to be persisted and propagated, or it will revert with a subsequent pull:

```bash
git commit -m "Remove footprint submodule"
```

## How to design or modify ergogen footprints

[@infused-kim](https://github.com/infused-kim) wrote a [guide on how to convert KiCad footprints to ergogen](https://www.notion.so/nilnil/Convert-Kicad-Footprint-to-Ergogen-8340ce87ad554c69af4e3f92bc9a0898?pvs=4), which
has been extensively used to create original ergogen footprints in this repository.

## Licenses and recognition

All original footprints and those copied from [@MrZealot](https://github.com/mrzealot), [@TildeWill](https://github.com/tildewill), and [@virginia2244](https://github.com/virginia2244) are licensed under [MIT License][mit]. I also extensively used and modified footprints created by [@infused-kim](https://github.com/infused-kim), which are licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

Furthermore, all of the work I've done wouldn't have been possible without the inspiration or direct reference to the work done by:

- [@foostan](https://github.com/foostan) for the original [Corne keyboard](https://github.com/foostan/crkbd)
- [@flatfootfox](https://github.com/flatfootfox) for the [Ergogen v4 introductory articles](https://flatfootfox.com/ergogen-introduction/)
- [@infused-kim](https://github.com/infused-kim) for the [amazing work done with the footprints](https://github.com/infused-kim/kb_ergogen_fp) I ~stole from~ got inspired by
- [@MrZealot](https://github.com/mrzealot) / [@ergogen](https://github.com/ergogen) for the [amazing tool](https://github.com/ergogen/ergogen) and [amazing community](https://discord.gg/Tj2TUaUW)
- [@virginia2244](https://github.com/virginia2244) for the [incredible work on MCU footprints](https://github.com/Virginia2244/ergogen_footprints)
- [@benvallack](https://github.com/benvallack) for the [great video content on YouTube](https://www.youtube.com/watch?v=UKfeJrRIcxw) and getting me started on the Ergogen journey

[mit]: https://opensource.org/license/mit/
[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
