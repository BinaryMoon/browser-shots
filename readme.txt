=== Browser Screenshots ===
Contributors: BinaryMoon, kevinlearynet, ronalfy
Tags: screenshot, browser, browser shot, blocks, generator, tool, automatic, shortcode, automate, screenshots, shots, web browser, window, snap, website, website screenshot, website preview
Requires at least: 4.0
Tested up to: 5.2
Stable tag: 1.7.3

Automate the process of taking website screenshots.

== Description ==

Use the `[browser-shot]` shortcode to automate the process of taking website screenshots. An icon is also added to the TinyMCE editor to make the shortcode creation process easy.

= Shortcode Preview =

`// basic shot 600px wide
[browser-shot url="http://link-to-website" width="600"]

// shot with link to other website
[browser-shot url="http://link-to-website" width="700" link="http://www.binarymoon.co.uk/"]

// shot with caption (uses default WordPress caption styles)
[browser-shot url="http://link-to-website" width="700"]Add Caption[/browser-shot]`

= Available Parameters =

* *url (required)* - the url of the link to shorten
* *width* - the width of the image
* *height* - the height of the image
* *alt* - the image alt text
* *link* - where the image links. Left blank it will point to the website where the screenshot is being taken. Use _PERMALINK_ to use the path for the current page or post.
* *target* - browser target. Set to _blank to open in a new window
* *class* - add a class to the browsershots wrapper
* *image_class* - change the default browsershots image class from alignnone to your chosen class
* *display_link* - (true or false - default true) to display a link in your screenshot

= Multisite Compatibility =

The *Browser Shots* plugin is compatibly with WordPress Multisite, just use the [Network Activate](http://codex.wordpress.org/Create_A_Network#WordPress_Plugins) feature to enable the shortcode on every site. If you only want to enable the shortcode for a specific site, activate the plugin for that site only.

= More... =

* The code can be found on [Github](https://github.com/BinaryMoon/browser-shots)
* You can reach out to me with questions or problems on [Twitter](https://twitter.com/binarymoon)

== Installation ==

1. Install easily with the WordPress plugin control panel or manually download the plugin and upload the folder `browser-shots` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress

== Screenshots ==

1. New Gutenberg block.
2. A view from inside of the WordPress TinyMCE editor.
3. The formatted front-end view of generated screenshots.

== Changelog ==

= 1.7.4 - 27th June 2019 =
* Add a $shortcode parameter to the shortcode_atts function call so that the shortcode properties can be filtered.

= 1.7.3 - 12th June 2019 =
* Add PERMALINK as a link property. If you set the link url to PERMALINK then the url will point to the currrent page or post.
* Improve the default alt text. Previously it would display the url for the screenshot, but this could be messy, and is not actually useful. Now displays "Screenshot from domain-name".

= 1.7.2 - 11th June 2019 =
* Ensuring display_link is a boolean in the shortcode.
* Code formatting and cleanup.

= 1.7.1 - 11th June 2019 =
* Add a new parameter display_link that allows you to disable the link around the screenshot. Defaults to true. Set to false to remove the link.
* Add some placeholder text to the input fields to make it clearer what is expected.
* Change the rel link property to a toggle for one click changes.

= 1.7 - 8th June 2019 =
* Add Gutenberg block for including Browser Shots.
* Fix image alignment so that it works properly :).

= 1.6 - 30th May 2019 =
* Add rel property to shortcode so that links can include rel="nofollow" or similar.
* Fix output of target attribute.
* Tidy codes.

= 1.5.2 - 7th January 2017 =
* Improve output html to reduce likelihood of html being modified by a plugin
* Swap urlencode for rawurlencode
* Switch to yoda conditions

= 1.5.1 =
* add two new class properties. One for the container, one for the image
* lots of code tidying, and refactoring. Simpler, faster, and more secure
* new tinymce icon that fits the style of the editor much better :)

= 1.5 =
* update localisation strings so that things can be translated more easily

= 1.4 =
* Update the website screen capture path. This ensures the code will work properly on secure domains
* Add some additional value escaping for extra security

= 1.3.2 =
* Fix a couple of small javascript bugs (thanks again to Ciprian Dracea)

= 1.3.1 =
* Fix a couple of small bugs with the visual editor and add support for all shortcode parameters

= 1.3 =
* Make the visual editor work again (thanks to Ciprian Dracea for the report and the code help!)
* add a new pop up box for the shortcode properties in visual editor mode

= 1.2 =
* Add 'link' attribute. Allows you to change the url that the screenshot links to
* Sanitize the height attribute and fix a small height related PHP error
* Add support for captions
* Add target attribute for opening links in new windows

= 1.1 =
* Add 'height' attribute to the TinyMCE prompts
* Allow users to override 'height' attribute in [browser-shot] shortcode

= 1.0 =
* Initial public release to the WordPress plugin repository

== Upgrade Notice ==

= 1.7.2 =
* Ensuring display_link is a boolean in the shortcode.

= 1.7 =
Add Gutenberg block for including Browser Shots.