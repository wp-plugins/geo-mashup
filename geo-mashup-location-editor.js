/**
 * The default Geo Mashup location editor AJAX interface.
 *
 * @package GeoMashup
 * @subpackage Client
 */ 

/*global jQuery */
/*global google */

/*global GeoMashupLocationEditor */
var GeoMashupLocationEditor;

/**
 * Manage the location editing interface with jQuery.
 *
 * The interface was not initially implemented with jQuery,
 * it's being migrated.
 *
 * Variables holding a jQuery object are named with a $.
 *
 * @uses edit-form.php
 */
jQuery( function( $ ) {
	var 
		// Private variables 
		geo_mashup_url_path = $( '#geo_mashup_url_path' ).val(),
		ajax_url = $( '#geo_mashup_ajax_url' ).val(),
		object_id = $( '#geo_mashup_object_id' ).val(),
		have_unsaved_changes = false,
		red_icon,
		green_icon,
		selected_marker,
		map,
		kml,

		// jQuery elements
		$busy_icon,
		$inline_help_link = $('#geo-mashup-inline-help-link'),
		$add_button = $( '#geo_mashup_add_location' ),
		$update_button = $( '#geo_mashup_update_location' ),
		$delete_button = $( '#geo_mashup_delete_location' ),
		$changed_input = $( '#geo_mashup_changed' ),
		$location_name_input = $( '#geo_mashup_location_name' ),
		$location_input = $( '#geo_mashup_location' ),
		$location_id_input = $( '#geo_mashup_location_id' ),
		$geoname_input = $( '#geo_mashup_geoname' ),
		$address_input = $( '#geo_mashup_address' ),
		$postal_code_input = $( '#geo_mashup_postal_code' ),
		$country_code_input = $( '#geo_mashup_country_code' ),
		$admin_code_input = $( '#geo_mashup_admin_code' ),
		$admin_name_input = $( '#geo_mashup_admin_name' ),
		$sub_admin_code_input = $( '#geo_mashup_sub_admin_code' ),
		$sub_admin_name_input = $( '#geo_mashup_sub_admin_name' ),
		$kml_url_input = $( '#geo_mashup_kml_url' ),
		$locality_name_input = $( '#geo_mashup_locality_name' ),
		$display = $( '#geo_mashup_display' ),
		$info_display = $display.find( '.geo-mashup-info' ),
		$address_display = $display.find( '.geo-mashup-address' ),
		$coordinate_display = $display.find( '.geo-mashup-coordinates' ),
		$saved_name_ui = $( '#geo_mashup_saved_name_ui' ),
		$date_ui = $( '#geo_mashup_date_ui' ),
		$ajax_message = $( '#geo_mashup_ajax_message' ),

		/**
		 * An object prototype for managing data associated with a location.
		 */
		GeoAddress = function (init_data) {
			this.id = null;
			this.title = '';
			this.geoname = '';
			this.country_code = '';
			this.admin_code = '';
			this.admin_name = '';
			this.sub_admin_code = '';
			this.sub_admin_name = '';
			this.postal_code = '';
			this.locality_name = '';
			this.address = '';

			this.definedValue = function( val, alt ) {
				if ( typeof val === 'undefined' ) {
					return alt;
				} else {
					return val;
				}
			}

			this.subValue = function(obj, keys, default_value) {
				var key;
				if (typeof default_value !== 'string') {
					default_value = '';
				}
				if (typeof obj !== 'object') {
					return default_value;
				}
				if (typeof keys !== 'object') {
					return default_value;
				}
				if (typeof keys.length !== 'number') {
					return default_value;
				}
				key = keys.shift();
				if (typeof obj[key] === 'undefined') {
					return default_value;
				}
				if (keys.length === 0) {
					return obj[key];
				}
				return this.subValue(obj[key], keys, default_value);
			};

			this.set = function (data) {
				if (typeof data === 'string') {
					if (isNaN(data)) {
						this.title = data;
					} else {
						this.id = data;
					}
				} else if (typeof data === 'number') {
					this.id = data;
				} else if (typeof data === 'object') {
					if (typeof data.location_id === 'string') {
						this.id = data.location_id;
						this.title = data.name;
						this.address = data.address;
					} else if (typeof data.name === 'string') { 
						this.id = '';
						this.title = data.name;
						this.geoname = data.name; 
						this.country_code = this.definedValue( data.countryCode, '' );
						this.admin_code = this.definedValue( data.adminCode1, '' );
						this.admin_name = this.definedValue( data.adminName1, '' );
						this.sub_admin_code = this.definedValue( data.adminCode2, '' );
						this.sub_admin_name = this.definedValue( data.adminName2, '' );
					} else if (typeof data.address === 'string') {
						this.title = data.address;
						this.address = data.address;
						this.country_code = this.subValue(data, ['AddressDetails','Country','CountryNameCode']);
						this.admin_code = this.subValue(data, ['AddressDetails','Country','AdministrativeArea','AdministrativeAreaName']);
						this.sub_admin_name = this.subValue(data, ['AddressDetails','Country','AdministrativeArea','SubAdministrativeArea','SubAdministrativeAreaName']);
						if (this.sub_admin_name) {
							this.locality_name = this.subValue(data, ['AddressDetails','Country','AdministrativeArea','SubAdministrativeArea','Locality','LocalityName']);
							this.postal_code = this.subValue(data, ['AddressDetails','Country','AdministrativeArea','SubAdministrativeArea','Locality','PostalCode','PostalCodeNumber']);
						} else if (this.admin_code) {
							this.locality_name = this.subValue(data, ['AddressDetails','Country','AdministrativeArea','Locality','LocalityName']);
							this.postal_code = this.subValue(data, ['AddressDetails','Country','AdministrativeArea','Locality','PostalCode','PostalCodeNumber']);
						}
						// Difficult to distinguish admin code from a name - but try
						if ( this.admin_code.length > 20 || this.admin_code.indexOf(' ') >= 0 ) {
							this.admin_name = this.admin_code;
							this.admin_code = '';
						}
					}
				}
			};

			if (init_data) {
				this.set(init_data);
			}
		},

		/**
		 * An object to manage the saved location select box.
		 */
		saved_selector = function() {
			var $select = $( '#geo_mashup_select' ),
				select = $select.get( 0 ),
				selected_latlng = null,
				selected_location = null,

				/**
				 * Parse out a new selected location.
				 */
				updateSelection = function() {
					var option, saved_location;

					if  (select.selectedIndex > 0) {
						option = select.options[select.selectedIndex];
						saved_location = option.value.split( '|' );
						if ( saved_location.length > 2 ) {
							selected_location = { 
								location_id: saved_location[0],
								name: option.text,
								address: saved_location[3]
							};
							selected_latlng = new google.maps.LatLng( saved_location[1], saved_location[2] );
							$location_name_input.val( option.text );
						}
					}
				};

			$select.change( function() {
				selected_location = selected_latlng = null;
				updateSelection();
				addSelectedMarker( selected_latlng, selected_location );
			} );

			return {
				/**
				 * Get the selected ID, if any.
				 * 
				 * @return string The selected ID, or null if none selected.
				 */
				getSelectedID: function() {
					if ( selected_location ) {
						return selected_location.location_id;
					} else {
						return null;
					}
				 },

				/**
				 * Get the selected latitude and longitude, if any.
				 * 
				 * @return GLatLng The selected latitude and longitude, or null if none selected.
				 */
				getSelectedLatLng: function() {
					 return selected_latlng;
				 },

				/**
				 * Get the selected location, if any.
				 * 
				 * @return string The selected ID, or null if none selected.
				 */
				getSelectedLocation: function() {
					 return selected_location;
				 },

				/**
				 * Reset the state to no location selected.
				 */
				selectNone: function() {
					 select.selectedIndex = 0;
				 },

				/**
				 * Select an item by ID.
				 *
				 * @param string id The location id of the item to select.
				 * @return bool Whether an item was selected.
				 */
				selectByID: function( id ) {
					var i;

					if ( ! select.options || ! select.options.length ) {
						return false;
					}

					for( i = 1; i < select.options.length; i += 1 ) {
						if ( i !== select.selectedIndex && select.options[i].value.indexOf( id + '|') === 0 ) {
							select.selectedIndex = i;
							updateSelection();
							return true;
						}
					}
					this.selectNone();
					return false;
				},

				/**
				 * Select an item by name.
				 *
				 * @param string text The name of the item to select.
				 * @return bool Whether an item was selected.
				 */
				selectByText: function( text ) {
					var i;

					if ( ! select.options || ! select.options.length ) {
						return false;
					}

					for( i = 1; i < select.options.length; i += 1 ) {
						if ( i !== select.selectedIndex && select.options[i].text == text ) {
							select.selectedIndex = i;
							updateSelection();
							return true;
						}
					}
					this.selectNone();
					return false;
				}
			};
		}(),

		/**
		 * Initialize the interface when the document and Maps API
		 * are ready.
		 */
		init = function() {
			var latlng_array, latlng, container;

			red_icon = new google.maps.Icon();
			red_icon.image = geo_mashup_url_path + '/images/mm_20_red.png';
			red_icon.shadow = geo_mashup_url_path + '/images/mm_20_shadow.png';
			red_icon.iconSize = new google.maps.Size(12, 20);
			red_icon.shadowSize = new google.maps.Size(22, 20);
			red_icon.iconAnchor = new google.maps.Point(6, 20);
			red_icon.infoWindowAnchor = new google.maps.Point(5, 1);

			green_icon = new google.maps.Icon(red_icon);
			green_icon.image = geo_mashup_url_path + '/images/mm_20_green.png';

			container = $( '#geo_mashup_map' ).get( 0 );
			map = new google.maps.Map2( container, {draggableCursor:'pointer'} );
			map.setCenter(new google.maps.LatLng(0,0),1);
			map.setUIToDefault();

			// Create the loading spinner icon and show it
			$busy_icon = $( '<div id="gm-loading-icon" style="-moz-user-select: none; z-index: 100; position: absolute; left: ' +
				( map.getSize().width / 2 ) + 'px; top: ' + ( map.getSize().height / 2 ) + 'px;">' +
				'<img style="border: 0px none ; margin: 0px; padding: 0px; width: 16px; height: 16px; -moz-user-select: none;" src="' +
				geo_mashup_url_path + '/images/busy_icon.gif"/></a></div>' );
			container.appendChild( $busy_icon.get( 0 ) );
			GeoMashupLocationEditor.showBusyIcon();
			google.maps.Event.bind( map, 'tilesloaded', GeoMashupLocationEditor, GeoMashupLocationEditor.hideBusyIcon );

			if ( $kml_url_input.val().length > 0 ) {
				GeoMashupLocationEditor.loadKml( $kml_url_input.val() );
			}
			if ( $location_input.val().indexOf( ',' ) > 0 ) {
				// There are coordinates in the location input
				latlng_array = $location_input.val().split( ',' );
				if ( latlng_array.length > 1 ) {
					latlng = new google.maps.LatLng( latlng_array[0], latlng_array[1] );
					addSelectedMarker( latlng, { location_id: $location_id_input.val(), name: $location_name_input.val() } );
				}
			}

			google.maps.Event.addListener( map, 'click', function( overlay, latlng ) { 
				handleClick( overlay, latlng ); 
			} );
		},

		/**
		 * Update form elements with current location information.
		 *
		 * @param GLatLng latlng The current location coordinates.
		 * @param GeoMashupLocation loc The related Geo Mashup location info.
		 */
		setInputs = function (latlng, loc) {
			var latlng_string = latlng.lat() + ',' + latlng.lng();
			if (($location_id_input.val() !== loc.id) || ($location_input.val() !== latlng_string)) {
				if ( saved_selector.getSelectedID()!== loc.id ) {
					saved_selector.selectByID( loc.id );
				}
				$location_id_input.val( ( loc.id ? loc.id : '' ) );
				$location_input.val( latlng_string );
				$geoname_input.val( loc.geoname );
				$address_input.val( loc.address );
				$postal_code_input.val( loc.postal_code );
				$country_code_input.val( loc.country_code );
				$admin_code_input.val( loc.admin_code );
				$admin_name_input.val( loc.admin_name );
				$sub_admin_code_input.val( loc.sub_admin_code );
				$sub_admin_name_input.val( loc.sub_admin_name );
				$locality_name_input.val( loc.locality_name );

				// Update the display
				$address_display.text( loc.address )
				$coordinate_display.text( latlng.toUrlValue() )
				$info_display.addClass( 'ui-state-highlight' );
				GeoMashupLocationEditor.setHaveUnsavedChanges();
			}
		},

		/**
		 * Create a new marker and select it if there is no selected marker.
		 *
		 * @param GLatLng latlng The coordinates of the marker.
		 * @param GeoMashupAddress loc The related Geo Mashup location info.
		 */
		createMarker = function(latlng, loc) {
			var marker, marker_opts = {title:loc.title};
			if ( !selected_marker ) {
				marker_opts.icon = green_icon;
				marker_opts.draggable = true;
			} else {
				marker_opts.icon = red_icon;
			}
			marker = new google.maps.Marker(latlng,marker_opts);
			marker.geo_mashup_location = loc;
			if ( !selected_marker ) {
				selected_marker = marker;
				map.setCenter(latlng);
				setInputs(latlng, loc);

				google.maps.Event.addListener(marker,'dragend',function () { 
					// Dragging will create a new location under the hood
					loc.id = '';
					setInputs(marker.getPoint(), loc);
					map.setCenter(marker.getPoint());
				});
			}
			return marker;
		},

		/**
		 * Select a marker as the desired location.
		 *
		 * @param GMarker marker The marker to select.
		 */
		selectMarker = function(marker) {
			var new_marker, deselected_marker;
			if (marker !== selected_marker) {
				deselected_marker = createMarker( selected_marker.getPoint(), selected_marker.geo_mashup_location );
				map.removeOverlay( selected_marker );
				map.addOverlay(deselected_marker);
				selected_marker = null;

				// The new marker will be selected on creation
				new_marker = createMarker( marker.getPoint(), marker.geo_mashup_location );
				map.removeOverlay(marker);
				map.addOverlay( new_marker );
				map.setCenter( new_marker.getPoint() );
			} else {
				map.setCenter(marker.getPoint());
			}
		},
		
		/**
		 * Add a marker and select it.
		 * 
		 * @param GLatLng latlng The coordinates for the marker.
		 * @param object selection Optional init data for a GeoAddress.
		 */
		addSelectedMarker = function(latlng, selection) {
			var marker = createMarker(latlng, new GeoAddress(selection));
			map.addOverlay(marker);
			selectMarker(marker);
		},

		/**
		 * Create a marker for a loaded KML object.
		 */
		addKml = function() {
			if ( kml && kml.hasLoaded() && $location_input.val().length == 0 ) {

				// There are no coordinates in the location input,
				// so use KML center 
				addSelectedMarker( kml.getDefaultCenter(), $location_name_input.val() );
			}
		},

		/**
		 * Handle a click on the map.
		 *
		 * @param GOverlay overlay If a marker was clicked, it's passed here.
		 * @param GLatLng latlng The location of a non-overlay click.
		 */
		handleClick = function(overlay, latlng) {
			if (overlay) {
				selectMarker(overlay);
			} else if (latlng) {
				searchForLocations( latlng.toUrlValue() );
				addSelectedMarker( latlng );
			}
		},

		/**
		 * Display the results of a Google geocode request.
		 *
		 * @param object response The query response data.
		 */
		showAddresses = function(response) {
			var i, latlng, marker;
			if ( response && response.Status.code == 200 && response.Placemark && response.Placemark.length > 0 ) {

				for (i=0; i<response.Placemark.length && i<20 && response.Placemark[i]; i += 1) {
					latlng = new google.maps.LatLng(
						response.Placemark[i].Point.coordinates[1],
						response.Placemark[i].Point.coordinates[0]);
					marker = createMarker(latlng, new GeoAddress(response.Placemark[i]));
					map.addOverlay(marker);
				}

			} else {

				// Do a GeoNames search as backup
				geonames_request_url = 'http://ws.geonames.org/search?type=json&maxRows=20&style=full&callback=?&name=' + 
					encodeURIComponent(search_text);
				jQuery.getJSON( geonames_request_url, function(data) { showGeoNames( data ); } );
				GeoMashupLocationEditor.showBusyIcon();

			}
		},

		/**
		 * Display the results of a Geonames search request.
		 *
		 * @param object data The query response data.
		 */
		showGeoNames = function (data) {
			var i, result_latlng, marker;
			if (data) {
				for (i=0; i<data.totalResultsCount && i<100 && data.geonames[i]; i += 1) {
					result_latlng = new google.maps.LatLng(data.geonames[i].lat, data.geonames[i].lng);
					marker = createMarker(result_latlng, new GeoAddress(data.geonames[i]));
					map.addOverlay(marker);
				}
				GeoMashupLocationEditor.hideBusyIcon();
			}
		},

		/**
		 * Use the Google geocoder to search for a location.
		 * The search map is cleared and loaded with results.
		 *
		 * @param string search_text Name, address, coordinates, etc.
		 */
		searchForLocations = function( search_text ) {
			var geocoder, geonames_request_url;

			// Clear current locations
			map.clearOverlays();
			selected_marker = null;
			$location_input.val( '' );
			GeoMashupLocationEditor.setHaveUnsavedChanges();
			saved_selector.selectNone();
			if ( saved_selector.selectByText( search_text ) ) {

				addSelectedMarker( saved_selector.getSelectedLatLng(), saved_selector.getSelectedLocation() );

			} else {

				// Do a Google geocoder search
				geocoder = new google.maps.ClientGeocoder();
				GeoMashupLocationEditor.showBusyIcon();
				geocoder.getLocations( search_text, function (response) { showAddresses( response ); } );

			} 

		},

		/**
		 * Handle keypresses in the search textbox.
		 *
		 * @param object e Event.
		 * @param string search_text Current contents of the textbox.
		 */
		searchKey = function( e, search_text ) {
			if ((e.keyCode && e.keyCode === 13) || (e.which && e.which === 13)) {
				// Enter key was hit - new search
				searchForLocations( search_text );
				return false;
			} else {
				return true;
			}
		},
		
		/**
		 * Note that changes have been successfully saved.
		 */
		clearHaveUnsavedChanges = function() {
			have_unsaved_changes = false;
			$changed_input.val( '' );
		};
		// End of private function variables

	// Define the location editor object that represents the editor's public interface
	GeoMashupLocationEditor = {

		setHaveUnsavedChanges: function() {
			have_unsaved_changes = true;
			$changed_input.val( 'true' );
			if ( object_id > 0 ) {
				// If there's no object id yet, the AJAX method won't work
				$update_button.show();
			}
			$ajax_message.hide();
		},

		getHaveUnsavedChanges: function() {
			return have_unsaved_changes;
		},

		loadKml : function(kml_url) {
			kml = new google.maps.GeoXml( kml_url, function() { addKml(); } );
			map.addOverlay( kml );
		},

		showBusyIcon : function() {
			$busy_icon.show();
		},

		hideBusyIcon : function() {
			$busy_icon.hide();
		}

	};

	// Show js stuff (hidden in the stylesheet) 
	$( '.geo-mashup-js' ).removeClass( 'geo-mashup-js' );
	$ajax_message.hide();
	$( '#geo_mashup_no_js' ).val( '' );

	// Help interface
	$inline_help_link.click( function() {
		$( this ).find( 'span' ).toggleClass( 'ui-icon-triangle-1-s' )
			.toggleClass( 'ui-icon-triangle-1-n' );
		$('#geo-mashup-inline-help').slideToggle();
		return false;
	} );

	$('#geo-mashup-inline-help').hide().click( function() {
		return $inline_help_link.click();
	} );

	// Geo date interface
	if ( typeof $.datepicker === 'object' ) {

		// We've managed to load the datepicker script
		$('#geo_mashup_date').datepicker( { 
			dateFormat: 'M d, yy', 
			changeYear: true,
			onSelect: function( newDate, picker) {
				GeoMashupLocationEditor.setHaveUnsavedChanges();
				$date_ui.addClass( 'ui-state-highlight' );
			} 
		} );

	} else {

		// Datepicker is not available
		$('#geo_mashup_date').change( function() {
			GeoMashupLocationEditor.setHaveUnsavedChanges();
			$date_ui.addClass( 'ui-state-highlight' );
		} );
	}
	$('#geo_mashup_hour').change( function() {
		GeoMashupLocationEditor.setHaveUnsavedChanges();
		$date_ui.addClass( 'ui-state-highlight' );
	} );
	$('#geo_mashup_minute').change( function() {
		GeoMashupLocationEditor.setHaveUnsavedChanges();
		$date_ui.addClass( 'ui-state-highlight' );
	} );

	// Saved name interface
	$location_name_input.keypress( function() {
		if ( ! GeoMashupLocationEditor.getHaveUnsavedChanges() ) { 
			GeoMashupLocationEditor.setHaveUnsavedChanges();
			saved_selector.selectNone();
			$saved_name_ui.addClass( 'ui-state-highlight' );
		}
	} );

	// Search interface
	$('#geo_mashup_search')
		.focus( function() { 
			this.select(); 
			map.checkResize();
		} )
		.keypress( function(e) {
			return searchKey( e, this.value );
		} );

	// Load the map
	google.load( 'maps', '2', { callback: init } );

	// Ajax error messages
	$ajax_message.ajaxError( function( event, request, settings ) {
		$ajax_message.text( request.statusText + ': ' + request.responseText ).show();
	} );

	// Update buttons
	$( '#geo_mashup_submit' ).appendTo( '#geo_mashup_ajax_buttons' );
	$delete_button.click( function() {
		var post_data;

		// Make sure no coordinates are submitted
		$location_input.val( '' );
	 	post_data = $( '#geo_mashup_location_editor input' ).serialize() + 
			'&geo_mashup_delete_location=true&action=geo_mashup_edit';
		$ajax_message.hide();
		$.post( ajax_url, post_data, function( data ) {
			$ajax_message.html( data.status.message ).fadeIn( 'slow' );
			if ( 200 == data.status.code ) {
				clearHaveUnsavedChanges();
				$display.find( '.ui-state-highlight' ).removeClass( 'ui-state-highlight' );
				map.clearOverlays();
				selected_marker = null;
				saved_selector.selectNone();
				$address_display.text( '' );
				$coordinate_display.text( '' );
				$location_name_input.val( '' );
				$delete_button.hide();
				$update_button.hide();
			}
		}, 'json' );

		return false;
	} );

	$update_button.click( function() {
		var post_data = $( '#geo_mashup_location_editor input' ).serialize() + 
			'&geo_mashup_update_location=true&action=geo_mashup_edit';
		$ajax_message.hide();
		$.post( ajax_url, post_data, function( data ) {
			$ajax_message.html( data.status.message ).fadeIn( 'slow' );
			if ( 200 == data.status.code ) {
				clearHaveUnsavedChanges();
				$display.find( '.ui-state-highlight' ).removeClass( 'ui-state-highlight' );
				$update_button.hide();
			}
		}, 'json' );
		return false;
	} );

	$add_button.hide();
	if ( ! have_unsaved_changes ) {
		$update_button.hide();
	}

	if ( ! object_id ) {
		$delete_button.hide();
	}

} );
