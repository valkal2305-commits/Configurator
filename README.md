# LINK XL System Configurator

Standalone lighting configurator, **v16**. Download [LINK_XL_System_Configurator.html](LINK_XL_System_Configurator.html) and open it in a current Chrome or Edge browser. No build step is required.

- Design profiles, corners, LED modules, blanks and end caps in 2D; inspect the luminaire in 3D.
- Start with **Ready compositions**, choosing the installation/profile system and the exact module or blank for each position.
- Use the optional **LightLab** to explore room layouts, LDT-based light maps, dimming and preliminary UGR. Opening the room alone does not include it in exported documents.
- Find proposal PDFs, **Project presentation**, full project files and A/B snapshots under **Advanced tools**.
- Use **Email** beside **Export** to prepare the drawing PDF, proposal PDF or both. The email draft opens in the user's email application; downloaded PDFs must be attached manually, or shared through a supported native sharing application.

No pricing is included. Lighting calculations provide an initial estimate; their assumptions and limitations accompany LightLab reports. Automatic email delivery is not configured.

## Guides

Start with the [current project guide in Greek](PROJECT_GUIDE.md). Additional guides cover [navigation](NAVIGATION_GUIDE.md), [selection](DESIGN_SELECTION_GUIDE.md), [exports](EXPORT_GUIDE.md), [LDT files](LDT_GUIDE.md), [measurement surfaces](SURFACE_MAP_GUIDE.md), [dimming](DIMMING_GUIDE.md), and [UGR](UGR_GUIDE.md).

The complete HTML is the distributable. Files in [extensions](extensions/README.md) document the inline integrations and retain earlier versions for reference; the v15 Sales guide describes the previous interface.

## Validation

The v16 release passed 32 checks, including 24 composition/installation combinations, project round trips, matching Email/Export PDF rendering, optional LightLab inclusion per A/B snapshot, browser interaction and responsive layouts. See the [validation manifest](validation/v16/manifest.json) and accompanying reports.

The new PDF generators and project presentation bundle their required libraries. Some original exports retain their existing external library loaders.
