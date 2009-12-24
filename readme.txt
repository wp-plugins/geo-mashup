=== Geo Mashup ===
Contributors: cyberhobo
Donate Link: http://www.cyberhobo.net/downloads/geo-mashup-plugin/
Tags: map, maps, google maps, google map, mapping, mashup, geo, google, geocms
Requires at least: 2.6
Tested up to: 2.9
Stable tag: trunk

Include Google maps in posts and pages, and map posts and pages on global maps. Make WordPress into a GeoCMS.

== Description ==

This plugin allows you to include Google maps in WordPress posts and pages, and
map posts and pages on global maps.

= Upgrading =

In WordPress 2.7 and higher, you can upgrade to a new stable version right
from the Plugins list via the "upgrade automatically" link. *This will delete
files you've created in the geo-mashup folder, like custom.js, or
info-window.php.* If you have files like these, please look at the 
[upgrade considerations](http://code.google.com/p/wordpress-geo-mashup/wiki/UpgradeConsiderations)
for the best way to keep your custom files safe moving forward.

= Features =

The number of features has grown beyond the limits of a short list. If you need
features that are aren't listed here, check [the documentation](http://code.google.com/p/wordpress-geo-mashup/wiki/Documentation) 
and the [tag reference](http://code.google.com/p/wordpress-geo-mashup/wiki/TagReference). 
Some popular features are:

* Once you have a [Google Maps API key](http://www.google.com/apis/maps/signup.html), 
  you're ready to put maps just about anywhere on your site.

* Global maps can present your posts in many ways

	They can show just one category, for example

	Context-sensitive template maps show the markers of currently displayed posts

	Clicking on a post marker shows a customizable summary of the post or page in an info window 

* A small search map on the post editing page lets you easily add location to posts

* Location can also be embedded in post content for mobile blogging

* Support for both standard WordPress shortcodes and template tags to add maps to your site.

* GeoRSS automatically added to feeds

* Attach KML files to posts and pages

* Connect category markers with a colored line

* Many more [enhancement requests][enh] implemented and underway.

[enh]: http://code.google.com/p/wordpress-geo-mashup/issues/list?can=2&amp;q=type:Enhancement&amp;colspec=ID%20Type%20Status%20Priority%20Milestone%20Owner%20Summary 

= Translations =

* Belorussian by [FatCow](http://www.fatcow.com) added in version 1.2.8
* French added in version 1.1
* German by Michel Honold added in version 1.1.3

= Beta Features = 

There are often two versions of the plugin available, stable and beta. The beta
version includes all the stable version features, and also new features that
need further testing. See the current 
[Beta Documentation](http://code.google.com/p/wordpress-geo-mashup/wiki/BetaDocumentation)
for more.

= Mashup Ingredients =

Geo Mashup combines WordPress, [Google Maps](http://maps.google.com), and [GeoNames](http://geonames.org) 
to create a GeoCMS that puts you in control of all your content, including geographic data.

= The Future =

I would like to make WordPress a first-class GeoCMS, and also make working with
maps in your blog as easy as working with images.

Geo Mashup has made it this far on the [customization work](http://www.cyberhobo.net/hire-me/) 
and [donations](http://www.cyberhobo.net/downloads/geo-mashup-plugin) it has
brought my way. As a freelance web developer I spend time on Geo Mashup when I
can, and look for work elsewhere when I must.

== Installation ==

See [the documentation](http://code.google.com/p/wordpress-geo-mashup/wiki/Documentation).

== Change Log ==

= 1.2.8 =
[list](http://code.google.com/p/wordpress-geo-mashup/issues/list?can=1&q=Milestone%3D1.2.8)

= 1.2.7 =
Fixed:

* [Issue 228][228] Inline location (geo_mashup_save_location) not working
* [Issue 219][219] locate_template() undefined in WordPress 2.6
* Adjusted sub-cat titles in the tabbed index control to show only when they have located children

[228]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=228
[219]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=219

= 1.2.6 =
Fixed:

* [Issue 226][226] Wrong icons in the visible post list
* [Issue 227][227] No info window for future posts

[226]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=226
[227]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=227

= 1.2.5 =
Fixed:

* [Issue 208][208] Category lines gone crazy
* [Issue 199][199] Upgrades overwrite custom files

[208]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=208
[199]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=199

= 1.2.4 =
Fixed:

* [Issue 194][194] Post locations not saving

[194]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=194

= 1.2.3 = 
Fixed:

* [Issue 185][185] Sticky posts appear in all info windows
* [Issue 183][183] Percentage not allowed for width settings

[185]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=185
[183]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=183

= 1.2.2 = 
Fixed:

* [Issue 181][181] Marker is not showing up after update
* [Issue 177][177] Info window for post not loading (spinning wait icon) 

[181]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=181
[177]: http://code.google.com/p/wordpress-geo-mashup/issues/detail?id=177

= 1.2.1 =
Fixed:

* MySQL 4 incompatibilities

= 1.2 =

* [New features][ddoc12beta1] and 
* [more new features][ddoc12beta2].

[ddoc12beta1]: http://code.google.com/p/wordpress-geo-mashup/wiki/DocChangesForOneTwoBetaOne
[ddoc12beta2]: http://code.google.com/p/wordpress-geo-mashup/wiki/DocChangesForOneTwoBetaTwo#New_Features

