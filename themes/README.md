# Theming on angular-seed-advanced-mutuatech

This document explains what problems the theming infrastructure solves, how it solves them and the philosophy behind this architecture, to help shape future features.

## The problem(s)
* Wonderfully rich websites requires more than just CSS customizations. Sometimes they require new images, fonts, javascripts... Putting those things along with the modules and components hurts the good programming practice of decoupling things from one another. It would be nice to program components without having to worry about colors, animation transitions, effects and other things;  
* Adapting themes to use Angular require some effort. It would nice to have a way of reusing themes among different projects instead of having to recode a theme for each one;
* In fact, since we are building a framework, it is essencial it allows us to use several different themes.

## Scope Definition
What we call a "theme" needs some clarification. First, lets define what developers calls a *theme* or a *web template*. Usually, they have:
 * A set of web components (or modules, speaking in Angular terms) visually well integrated;
 * The layout of those components and content;
 * A visual identity: images, typography, icons and, usually, some colors;
 * On modern themes, animations and other visual effects;
 * A suggestion of a navigation map, based on a sample content.

Our themes will have all the items above, except for the first and last. In addition, they have to be supported on mobile apps as well.

## Requisites
* Web, Desktop and Mobile applications must be deployed only with the files they need to work properly -- other theme files should not be budled;
* It should be possible to, transparently, switch between themes on an on going project;
* Web and desktop .js and .css files should be minifyed and included in the bundle (this might be hard), while all other files should be copied as "assets";
* Each supported theme must allow customizations for each of the implemented modules on this project -- for instance: the **m-timeline** module may be presented differently on **theme A** and **theme B**

## Implementation Architecture

## Themes Directory Structure

## Themes List
* [new-age](new-age/README.md)
* [freelancer](freelancer/README.md)

## Workflow
* gulp build.mutua; npm start & while read; do gulp build.mutua; done; echo -en "\n###\nEND\n\n"; fg

## Nice themes for the future
### material (animated) ###
* https://agmstudio.io/themes/material-style/1.3.2/
* http://materialdesignthemes.com/themes/materialkitwp/ (not animated)
* http://materialdesignthemes.com/themes/pluto/
* https://github.com/joashp/material-design-template (github, not animated)
* https://github.com/google/material-design-lite ( github, not animated (material design lite), has some different templates)
* https://github.com/anamhira47/Material-Design-Resume-Template (github, not animated)
* https://github.com/CreativeIT/material-dashboard-lite (github, dashboard)
* https://github.com/felippepuhle/aero-admin (github, dashboard)
* https://github.com/720kb/hubuntu-ui ( "  " )
* https://github.com/Teradata/covalent (angular4, dashboard, ui application framework)
* https://github.com/mseemann/angular2-mdl (angular4, material ui components)
* https://github.com/material-components/material-components-web (themeles, tons of components -- also has versions for ios and android)
* https://github.com/muicss/mui ( idem, but just for web -- has angular and react )
* https://github.com/digicorp/propeller ( bootstrap + material + templates. Maybe the best one )
### bootstrap ###
* https://wrapbootstrap.com/theme/smartadmin-responsive-webapp-WB0573SK0

## Plugins ##
* Presentation Engine -- https://github.com/shower
* 