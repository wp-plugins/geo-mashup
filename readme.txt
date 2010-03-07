=== Geo Mashup ===
Contributors: cyberhobo
Donate Link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=11045324
Tags: map, maps, google maps, google map, mapping, mashup, geo, google, geocms
Requires at least: 2.8
Tested up to: 2.9.2
Stable tag: 1.3.2

Include Google maps in posts and pages, and map posts, pages, and other objects on global maps. Make WordPress into a GeoCMS.

== Description ==

This plugin lets you save location information with posts, pages, and other WordPress objects. 
These objects can then be presented on interactive Google maps in many ways.

= Examples =

There's a community sourced [list of examples in action](http://groups.google.com/group/wordpress-geo-mashup-plugin/web/examples-in-action).
People do all kinds of amazing things with Geo Mashup.

= Features =

Geo Mashup, like WordPress, has a simple interface for basic features, templates for control of 
output, and APIs for endless customization options.  Some popular features are:

* Once you have a [Google Maps API key](http://www.google.com/apis/maps/signup.html), 
  you're ready to put maps just about anywhere on your site.

* Global maps can present your posts in many ways

	They can show just one category, for example

	Context-sensitive template maps show the markers of currently displayed posts

	Clicking on a post marker shows a customizable summary of the post or page in an info window 

* Location can be saved for posts, pages, users, and comments

* Location can also be embedded in post content for mobile blogging

* Reverse geocoding to fill in address information for locations

* Support for both standard WordPress shortcodes and template tags to add maps to your site.

* GeoRSS automatically added to feeds

* Attach KML files to posts and pages

* Connect category markers with a colored line

* Many more [enhancement requests][enh] implemented and underway.

[enh]: http://code.google.com/p/wordpress-geo-mashup/issues/list?can=2&amp;q=type:Enhancement

If you need features that are aren't listed here, check 
[the documentation](http://code.google.com/p/wordpress-geo-mashup/wiki/Documentation) 
and the [tag reference](http://code.google.com/p/wordpress-geo-mashup/wiki/TagReference). 

= Translations =

* German by [Thomas Morvay](http://morvay.biz)] added in version 1.3.2
* Italian by [Stefan Des](http://www.stefandes.com/) added in version 1.2.9
* Belorussian by [FatCow](http://www.fatcow.com) added in version 1.2.8
* French added in version 1.1

Please contact the author if you'd like to add or update a translation.

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

Geo Mashup endures because it supplies me with [customization work](http://www.cyberhobo.net/hire-me/).
If you are a developer interested in this kind of work, [contact me](http://groups.google.com/groups/profile?enc_user=uBuY-RQAAACbQmFlLULeJFU8ITpJlc8IOPANdqfI6prRsqjc7uCt1A). 
More of us can make Geo Mashup better, which will in turn supply us with more work.

[Donations](http://www.cyberhobo.net/downloads/geo-mashup-plugin) have also encouraged me keep
developing - thanks to those who have donated.

== Installation ==

There shouldn't be anything too unusual, but there is 
[detailed documentation](http://code.google.com/p/wordpress-geo-mashup/wiki/Documentation#First_Time_Installation).

== Upgrade Notice ==

The automatic upgrade is fine for most people, but
if you've added or changed things in the Geo Mashup plugin folder, please look at the 
[upgrade considerations](http://code.google.com/p/wordpress-geo-mashup/wiki/UpgradeConsiderations)
for the best way to keep your custom files safe moving forward.

== Change Log ==

= 1.3.2 =
[milestone 1.3.2 changes](http://code.google.com/p/wordpress-geo-mashup/issues/list?can=1&q=Milestone%3D1.3.2)

= 1.3.1 =
[milestone 1.3.1 changes](http://code.google.com/p/wordpress-geo-mashup/issues/list?can=1&q=Milestone%3D1.3.1)

= 1.3 =
[milestone 1.3 changes](http://code.google.com/p/wordpress-geo-mashup/issues/list?can=1&q=Milestone%3D1.3)

= 1.2.10 =
[milestone 1.2.10 changes](http://code.google.com/p/wordpress-geo-mashup/issues/list?can=1&q=Milestone%3D1.2.10)

= 1.2.9 =
[milestone 1.2.9 changes](http://code.google.com/p/wordpress-geo-mashup/issues/list?can=1&q=Milestone%3D1.2.9)

= 1.2.8 =
[milestone 1.2.8 changes](http://code.google.com/p/wordpress-geo-mashup/issues/list?can=1&q=Milestone%3D1.2.8)

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

